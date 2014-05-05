Output valid and clean (x)HTML with TidyHelper
==============================================

Small helper that you can use to output valid, minified and clean
(x)HTML automatically!


Requirements
````````````
1. Tidy enabled on your server:
`http://php.net/manual/en/book.tidy.php`_


How to use
~~~~~~~~~~
First, add the helper in your AppController with your other helpers:

Controller Class:
`````````````````

::

    <?php 
    class AppController extends Controller {
    
    	var $helpers = array('Html', 'Js', 'Session', 'Tidy');
    }
    ?>



The TidyHelper
~~~~~~~~~~~~~~
Then you create the TidyHelper file in app/views/helpers/tidy.php :


Helper Class:
`````````````

::

    <?php 
    /**
     * TidyHelper to clean HTML output
     *
     * @author Thiago Belem <contato@thiagobelem.net>
     */
    class TidyHelper extends AppHelper {
    
    	/**
    	 * TidyHelper constructor
    	 *
    	 * @see TidyHelper::filter()
    	 *
    	 * @uses Configure::read()
    	 *
    	 * @return void
    	 */
    	public function __construct() {
    		// If the function exists and is production mode
    		if (function_exists('tidy_repair_string') && !Configure::read('debug'))
    			ob_start(array(__CLASS__, 'filter'));
    	}
    
    	/**
    	 * Filter the output with TidyHTML
    	 *
    	 * @uses {@link http://php.net/manual/en/tidy.repairstring.php tidy_repair_string()}
    	 * @uses Configure::read()
    	 *
    	 * @param string $output The HTML output
    	 *
    	 * @return string
    	 */
    	static function filter($output) {
    		// Convert "UTF-8" to "utf8"
    		$encoding = low(str_replace('-', '', Configure::read('App.encoding')));
    
    		// Clean the output using Tidy
    		$output = tidy_repair_string($output, array(
    			'indent' => false, // Remove indentation
    			'hide-comments' => true, // Remove the comments
    			'drop-proprietary-attributes' => true, // Remove Office attributes from HTML tags
    			'wrap' => false, // Don't break each line after 80 chars
    			'output-xhtml' => true, // Output as xHTML
    			'char-encoding' => $encoding // The input/output encoding
    		), $encoding);
    
    		return $output;
    	}
    }
    ?>



.. _http://php.net/manual/en/book.tidy.php: http://php.net/manual/en/book.tidy.php

.. author:: TiuTalk
.. categories:: articles, helpers
.. tags:: html,xhtml,tidy,clean,valid,tidyhtml,output,Helpers

