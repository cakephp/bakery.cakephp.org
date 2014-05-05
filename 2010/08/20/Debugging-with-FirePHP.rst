Debugging with FirePHP
======================

Don't use this. Use [url]http://github.com/cakephp/debug_kit[/url]

You may have read the other article on FirePHP which deals with the
query log, if not check it out here:
`http://bakery.cakephp.org/articles/view/baking-cakes-with-firephp`_

With a little massaging of Cake's Debugger class you can have all
errors logged to the Firebug console instead of having them displayed
on your site.

Things you'll need for this to work:

+ Firefox 3 (if ya haven't already, its time to upgrade :p)
  `http://getfirefox.com`_
+ FireBug `http://getfirebug.com`_
+ FirePHP (the FireFox extension and the PHP class)
  `http://firephp.org`_
+ And yeah I'm assuming you already have CakePHP otherwise you
  wouldn't be here right?


You'll need to download the FirePHP.class.php file and save it to
vendors. I saved it to vendors/FirePHP/FirePHP.class.php

Then save the following file to vendors/FirePHP/FirePHP.debugger.php :

::

    <?php
    /**
     * The majority of code in this file is based on CakePHP's Debugger.
     * This code is designed to work with CakePHP 1.2RC2 and no warranty is given nor implied.
     * @link http://www.cakephp.org
     * @link http://www.firephp.org
     * @license	http://www.opensource.org/licenses/mit-license.php The MIT License
     */
    if(!class_exists('Debugger')) {
    	App::import('Core', 'Debugger');
    }
    if(!class_exists('FirePHP')) {
    	App::import('Vendor', 'FirePHP', array ( 'file' => 'FirePHP.class.php'));
    }
    if(!function_exists('fb')) {
    	function fb() {
    		$instance = FirePHP::getInstance(true);
    		$args = func_get_args();
    		return call_user_func_array(array($instance,'fb'),$args);
    		return true;
    	}
    }
    class FirePHPDebugger extends Debugger {

    /**
     * holds current output format
     *
     * @var string
     * @access private
     */
    	var $__outputFormat = 'fb';

    /**
     * FirePHP error level
     *
     * @var string
     * @access public
     */
    	var $FirePHPLevel = '';

    /**
     * Gets a reference to the Debugger object instance
     *
     * @return object
     * @access public
     */
    	function &getInstance() {
    		static $instance = array();

    		if (!isset($instance[0]) || !$instance[0]) {
    			$instance[0] =& new FirePHPDebugger();
    			if (Configure::read() > 0) {
    				Configure::version(); // Make sure the core config is loaded
    				$instance[0]->helpPath = Configure::read('Cake.Debugger.HelpPath');
    			}
    		}
    		return $instance[0];
    	}

    /**
     * Overrides PHP's default error handling
     *
     * @param integer $code Code of error
     * @param string $description Error description
     * @param string $file File on which error occurred
     * @param integer $line Line that triggered the error
     * @param array $context Context
     * @return boolean true if error was handled
     * @access public
     */
    	function handleError($code, $description, $file = null, $line = null, $context = null) {
    		if (error_reporting() == 0 || $code === 2048) {
    			return;
    		}

    		$_this = FirePHPDebugger::getInstance();

    		if (empty($file)) {
    			$file = '[internal]';
    		}
    		if (empty($line)) {
    			$line = '??';
    		}
    		$file = $_this->trimPath($file);

    		$info = compact('code', 'description', 'file', 'line');
    		if (!in_array($info, $_this->errors)) {
    			$_this->errors[] = $info;
    		} else {
    			return;
    		}

    		$level = LOG_DEBUG;
    		switch ($code) {
    			case E_PARSE:
    			case E_ERROR:
    			case E_CORE_ERROR:
    			case E_COMPILE_ERROR:
    			case E_USER_ERROR:
    				$error = 'Fatal Error';
    				$level = LOG_ERROR;
    				$this->FirePHPLevel = FirePHP::ERROR;
    			break;
    			case E_WARNING:
    			case E_USER_WARNING:
    			case E_COMPILE_WARNING:
    			case E_RECOVERABLE_ERROR:
    				$error = 'Warning';
    				$level = LOG_WARNING;
    				$this->FirePHPLevel = FirePHP::WARN;
    			break;
    			case E_NOTICE:
    			case E_USER_NOTICE:
    				$error = 'Notice';
    				$level = LOG_NOTICE;
    				$this->FirePHPLevel = FirePHP::INFO;
    			break;
    			default:
    				return false;
    			break;
    		}

    		$helpCode = null;
    		if (!empty($_this->helpPath) && preg_match('/.*\[([0-9]+)\]$/', $description, $codes)) {
    			if (isset($codes[1])) {
    				$helpCode = $codes[1];
    				$description = trim(preg_replace('/\[[0-9]+\]$/', '', $description));
    			}
    		}

    		echo $_this->__output($level, $error, $code, $helpCode, $description, $file, $line, $context);

    		if (Configure::read('log')) {
    			CakeLog::write($level, "{$error} ({$code}): {$description} in [{$file}, line {$line}]");
    		}

    		if ($error == 'Fatal Error') {
    			die();
    		}
    		return true;
    	}

    /**
     * Handles object conversion to debug string
     *
     * @param string $var Object to convert
     * @access private
     */
    	function __output($level, $error, $code, $helpCode, $description, $file, $line, $kontext) {
    		$_this = FirePHPDebugger::getInstance();
    		if($_this->__outputFormat !== 'fb') {
    			return Debugger::__output($level, $error, $code, $helpCode, $description, $file, $line, $kontext);
    		}
    		$files = $_this->trace(array('start' => 2, 'format' => 'points'));
    		$listing = $_this->fbFormat($_this->excerpt($files[0]['file'], $files[0]['line'] - 1, 1));
    		$trace = $_this->fbFormat($_this->trace(array('start' => 2, 'depth' => '20')));
    		$context = '<br />';
    		foreach ((array)$kontext as $var => $value) {
    			$context.= "\${$var} = " . $_this->exportVar($value, 1)."\n";
    		}
    		$context = $_this->fbFormat($context);
    		$instance = FirePHP::getInstance(true);
    		$message = "{$error} ({$code}): {$description} [{$file}, line {$line}";
    		$out = array(
    			'trace' => $trace,
    			'code' => $listing,
    			'context' => $context,
    		);
    		call_user_func_array(array($instance,'fb'),array($out, $message,  $this->FirePHPLevel));
    	}

    /**
     * Function to format data to look purdy in FireBug
     *
     * @param mixed $data Data to be formatted for FireBug
     * @return string Formatted FireBug data
     */
    	function fbFormat($data = '') {
    		if(is_array($data)) {
    			$data = join($data);
    		}
    		$data = strip_tags($data);
    		$data = '<br /> ' . str_ireplace("\t", '  ', str_ireplace("\n", '<br />', $data)) . '<br />';
    		return $data;
    	}
    }

    if (!defined('DISABLE_DEFAULT_ERROR_HANDLING')) {
    	FirePHPDebugger::invoke(FirePHPDebugger::getInstance());
    }
    ?>


Now add the following line to app/config/bootstrap.php :

::

    <?php
    App::import('Vendor', 'FirePHPDebugger', array('file' => 'FirePHP' . DS . 'FirePHP.debugger.php'));
    ?>


When an error occurs (and debug > 0) you'll see something like this in
your FireBug console:

::

    http://yoursite.com
    ["Notice (1024): Foo [APP\config\bootstrap.php, line 46", Array(3)]


Hover over the "Array(3)" and you'll see a new window open with the
Trace, Code, and Context info.

I haven't tested this code thoroughly, so if you have an issue leave a
comment here and we can work it out.

Happy Baking!
Heath


.. _http://getfirebug.com: http://getfirebug.com/
.. _http://bakery.cakephp.org/articles/view/baking-cakes-with-firephp: http://bakery.cakephp.org/articles/view/baking-cakes-with-firephp
.. _http://firephp.org: http://firephp.org/
.. _http://getfirefox.com: http://getfirefox.com/

.. author:: HeathNail
.. categories:: articles, tutorials
.. tags:: Tutorials

