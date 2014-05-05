Universal Mobilization with WAPL
================================

Some potential future users of my current project requested mobile
accessibility. Your users might appreciate the same. I found WAPL to
be a good method for providing such accessibility.
This is now available as a plugin at `http://github.com/petteyg/wapl`_
While searching for CakePHP and mobile accessibility options, I came
across a tutorial by rgubby,
`http://bakery.cakephp.org/articles/view/mobilize-your-cake-app-in-minutes`_.
I found it useful, and have
improved upon the idea. My version consists of a Component and Helper.
The Component determines whether the device is mobile, and the Helper
converts the output appropriately.

The Component has a few options:

+ devKey - Required. Get one at `http://wapple.net/architect.htm`_.
+ force - Optional. Default false. If true, Component will submit
  device headers to WAPL on every request.
+ path - Optional. Default true. If false, Component will set
  Controller layout/view extension. If true, Component will set
  Controller layout/view path.
+ test - Optional. Default false. If true, Component will always load
  Helper and Helper will submit output to WAPL. If 'pre', Component will
  load Helper, but Helper will not submit output to WAPL.


Component Class:
````````````````

::

    <?php
    class WaplComponent extends Object {

    	var $components = array('RequestHandler', 'Session');
    	var $devKey;
    	var $force = false;
    	var $path = true;
    	var $test = false;

    	function initialize(&$controller, $settings = array()) {
    		$this->controller =& $controller;
    		$this->devKey = $settings['devKey'];
    		if (array_key_exists('force', $settings)) {
    			$this->force = $settings['force'];
    		}
    		if (array_key_exists('path', $settings)) {
    			$this->path = $settings['path'];
    		}
    		if (array_key_exists('test', $settings)) {
    			$this->test = $settings['test'];
    		}
    	}

    	function startup(&$controller) {
    		if (!$this->Session->check('User.isMobile') || $this->force) {
    			$sClient = @new SoapClient('http://webservices.wapple.net/wapl.wsdl');
    			if($sClient) {
    				$headers = array();
    				foreach($_SERVER as $k => $v) {
    					$headers[] = array('name' => $k, 'value' => $v);
    				}
    				$params = array(
    					'devKey' => $this->devKey,
    					'deviceHeaders' => $headers
    				);
    			}
    			$isMobile = false;
    			if($sClient->isMobileDevice($params)) {
    				$isMobile = true;
    			}
    			if (!$this->force) {
    				$this->Session->write('User.isMobile', $isMobile);
    			}
    		}
    		if ($this->Session->read('User.isMobile') || $this->test) {
    			$this->RequestHandler->respondAs('xml');
    			if ($this->path) {
    				$this->controller->layoutPath .= 'wapl';
    				$this->controller->viewPath .= DS.'wapl';
    			} else {
    				$this->controller->ext = '.wapl';
    			}
    		}
    	}

    	function beforeRender(&$controller) {
    		if ($this->Session->read('User.isMobile') || $this->test) {
    			$helpers = array_diff($this->controller->helpers, array('Wapl'));
    			$helpers['Wapl'] = array('devKey' => $this->devKey, 'test' => $this->test);
    			$this->controller->helpers = $helpers;
    		}
    	}

    }
    ?>

Do not place the Helper in var $helpers. The Component will load (or
not load) it automatically, as needed.

Helper Class:
`````````````

::

    <?php
    class WaplHelper extends AppHelper {

    	var $tags = array(
    		'cell' => "<cell>%s</cell>\n",
    		'chars' => "<chars%s>\n<value>%s</value>\n</chars>\n",
    		'css' => "<css>\n%s</css>\n",
    		'easyChars' => "<easyChars>\n<value>%s</value>\n</easyChars>\n",
    		'externalImage' => "<externalImage%s>%s</externalImage>",
    		'head' => "<head>\n%s</head>\n",
    		'item' => "[*]%s[/*]\n",
    		'layout' => "<layout>\n%s</layout>\n",
    		'list' => "[listFIXME]\n%s\n", // Remove FIXME. Added because Bakery parses list as BBcode.
    		'row' => "<row>\n%s\n</row>\n",
    		'span' => "[span=%s]%s[/span]",
    		'title' => "<title>%s</title>\n",
    		'url' => "<url>%s</url>",
    		'words' => "<wordsChunk>\n<display_as>%s</display_as>\n<quick_text>%s</quick_text>\n</wordsChunk>\n",
    	);

    	var $devKey;
    	var $test = false;

    	function __construct($settings) {
    		$this->devKey = $settings['devKey'];
    		$this->test = $settings['test'];
    	}

    	function _parseAttributes($data) {
    		$attributes = '';
    		foreach($data as $name => $value) {
    			$attributes .= ' '.$name.'="'.$value.'"';
    		}
    		return $attributes;
    	}

    	function _parseItems($data) {
    		$items = '';
    		if (is_array($data)) {
    			foreach($data as $item) {
    				$items .= sprintf($this->tags['item'], $item);
    			}
    		} else {
    			$items .= sprintf($this->tags['item'], $data)."\n";
    		}
    		return $items;
    	}

    	function _parseUrls($data) {
    		$urls = '';
    		if (is_array($data)) {
    			foreach($data as $url) {
    				$urls .= sprintf($this->tags['url'], $url)."\n";
    			}
    		} else {
    			$urls .= sprintf($this->tags['url'], $data)."\n";
    		}
    		return $urls;
    	}

    	function afterLayout() {
    		if ($this->test != 'pre') {
    			$View =& ClassRegistry::getObject('view');
    			$sClient = @new SoapClient('http://webservices.wapple.net/wapl.wsdl');
    			$headers = array();
    			foreach($_SERVER as $k => $v) {
    				$headers[] = array('name' => $k, 'value' => $v);
    			}
    			if($sClient) {
    				$params = array(
    					'devKey' => $this->devKey,
    					'deviceHeaders' => $headers,
    					'wapl' => $View->output
    				);
    			}
    			$xml = simplexml_load_string($sClient->getMarkupFromWapl($params));
    			foreach ($xml->header->item as $v) {
    				header($v);
    			}
    			$View->output = trim($xml->markup);
    		}
    	}

    	function chars($data, $options = array()) {
    		return $this->output(sprintf($this->tags['chars'], $this->_parseAttributes($options), $data));
    	}

    	function css($data) {
    		return $this->output(sprintf($this->tags['css'], $this->_parseUrls($data)));
    	}

    	function easyChars($data) {
    		return $this->output(sprintf($this->tags['easyChars'], $data));
    	}

    	function externalImage($data, $options = array()) {
    		return $this->output(sprintf($this->tags['externalImage'], $this->_parseAttributes($options), sprintf($this->tags['url'], $data)));
    	}

    	function head($data) {
    		return $this->output(sprintf($this->tags['head'], $data));
    	}

    	function layout($data) {
    		return $this->output(sprintf($this->tags['layout'], $data));
    	}

    	function ul($data) {
    		return $this->output(sprintf($this->tags['list'], $this->_parseItems($data)));
    	}

    	function span($data) {
    		return $this->output(sprintf($this->tags['span'], $data));
    	}

    	function title($data) {
    		return $this->output(sprintf($this->tags['title'], $data));
    	}

    	function wapl($data) {
    		return $this->output(sprintf('<'.'?xml version="1.0" encoding="UTF-8" ?'.'>'."\n".'<wapl xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://wapl.wapple.net/wapl.xsd">'."\n".'%s</wapl>'."\n", $data));
    	}

    	function waplend() {
    		return $this->output('</wapl>');
    	}

    	function waplstart() {
    		$begin = '<'.'?xml version="1.0" encoding="UTF-8" ?'.'>';
    		$begin .= '<wapl xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://wapl.wapple.net/wapl.xsd">';
    		return $this->output($begin);
    	}

    	function words($data, $type = 0) {
    		switch($type) {
    			case 1:
    				$type = 'h1';
    				break;
    			case 2:
    				$type = 'h2';
    				break;
    			case 3:
    				$type = 'h3';
    				break;
    			case 4:
    				$type = 'h4';
    				break;
    			case 5:
    				$type = 'h5';
    				break;
    			case 6:
    				$type = 'h6';
    				break;
    			default:
    				$type = 'p';
    				break;
    		}
    		return $this->output(sprintf($this->tags['words'], $type, $data));
    	}

    }
    ?>

Sample Layout (depending on path setting, this could be
views/layouts/wapl/default.ctp or views/layouts/default.wapl):

View Template:
``````````````

::


    <?php
    e(
            $wapl->wapl(
                    $wapl->head(
                            $wapl->title($title_for_layout)
                    )
                    .
                    $wapl->layout($content_for_layout)
            )
    );
    ?>

Sample View (depening on path setting, this could be
views/pages/wapl/wapltest.ctp or views/pages/wapltest.wapl):

View Template:
``````````````

::


    <?php
    echo $wapl->easyChars('Test'); // easyChars outputs text.
    echo $wapl->chars('ClassTest', array('class' => 'test')); // chars outputs text with CSS styles.
    echo $wapl->words('PTest'); // words outputs text inside a <p> element.
    echo $wapl->words('BigTest',1); // words with a second parameter (1-6) outputs text in a <h1-6> element.
    ?>

If you prefer to write plain WAPL without using the Helper methods, or
want to use some elements that the Helper doesn't support yet, see
`http://wapl.info`_.

My Helper doesn't currently support all elements (such as forms), but
I'll be updating it :)

.. _http://wapl.info: http://wapl.info/
.. _http://bakery.cakephp.org/articles/view/mobilize-your-cake-app-in-minutes: http://bakery.cakephp.org/articles/view/mobilize-your-cake-app-in-minutes
.. _http://github.com/petteyg/wapl: http://github.com/petteyg/wapl
.. _http://wapple.net/architect.htm: http://wapple.net/architect.htm

.. author:: petteyg
.. categories:: articles, tutorials
.. tags:: mobile,wml,wapl,Tutorials

