Little FacebookHelper
=====================

Hello Cakers and Bakers! I've built a little FacebookHelper. Actually
the API has two functions wich you can use to integrate some cool
features to your website.
So, first of all the facebook API offers many ways to use some social
meda functionality. For example, they are some SDK's for PHP or
Javascript, a Graph API or some Social Plugin's.

The FacebookHelper uses two of Facebook's social plugin's. They are
very easy to integrate.

All you have to do, is to save the code below in
app/views/helpers/facebook.php and include the FacebookHelper into the
$helpers array in your controller, where you want to use it.


Helper Class:
`````````````

::

    <?php 
    <?php
    /**
     * Helper for facebook plugins.
     *
     * Helps using facebook plugins.
     *
     * PHP versions 4, 5
     *
     * Pascal Precht : hopelessart (http://hopelessart.com)
     * Copyright 2010, Pascal Precht (http://hopelessart.com)
     *
     * @copyright     Copyright 2010, Pascal Precht (http://hopelessart.com)
     * @link          http://hopelessart.com Pascal Precht (c) Web Project
     * @package       app
     * @subpackage    app.views.helpers
     * @since         Pascal Precht(c) v 0.0.1
     */
    
    /**
     * FacebookHelper helper library.
     *
     * Helps using facebook plugins using the Facebook API
     *
     * @package       app
     * @subpackage    app.views.helpers
     * @link http://hopelessart.com
     */
    class FacebookHelper extends AppHelper {
    
    /**
     * Predefined list of iframe attributes
     * 
     * @var array
     * @access private
     */
    	var $__iframeOptions = array(
    		'likeButton' => array(
    			'scrolling' => 'no',
    			'frameborder' => 0,
    			'style' => array(
    				'border' => 'none',
    				'overflow' => 'hidden',
    				'width' => 450,
    				'height' => 80
    			),
    			'allowTransparency' => true,
    		),
    		'likeBox' => array(
    			'scrolling' => 'no',
    			'frameborder' => 0,
    			'style' => array(
    				'border' => 'none',
    				'overflow' => 'hidden',
    				'width' => 292,
    				'height' => 587
    			),
    			'allowTransparency' => true,
    		),
    	);
    
    /**
     * List of likeButton default options to map
     * 
     * @var array
     * @access private
     */
    	var $__likeButtonDefaultOptions = array(
    		'layout' => 'standard',
    		'show_faces' => false,
    		'action' => 'like',
    		'font' => 'verdana',
    		'colorscheme' => 'light'
    	);
    
    /**
     * List of likeBox default options to map
     * 
     * @var array
     * @access private
     */	
    	var $__likeBoxDefaultOptions = array(
    		'connections' => 10,
    		'stream' => true,
    		'header' => true,
    	);
    
    /**
     * URL to facebooks plugins
     * 
     * @var const
     * @access public
     */
    	const HREF_PLUGIN = 'http://www.facebook.com/plugins/';
    
    /**
     * Returns the likeButton facebook plugin
     * 
     * @param string href href to target
     * @param array options Options for facebook plugin API
     * 
     * @return string HTML iframe
     * @access public
     */
    	function likeButton($href, $options = array()) {
    		$src = $this->__getIframeSource($href, $options);
    		$iframeOptions = $this->__getIframeOptionsToQueryString($this->__iframeOptions['likeButton']);
    		return $this->__iframe($src, $iframeOptions);
    	}
    
    /**
     * Returns the likeBox facebook plugin
     * 
     * @param string href href to target
     * @param array options Options for facebook plugin API
     * 
     * @return string HTML iframe
     * @access public
     */	
    	function likeBox($href, $options = array()) {
    		$src = $this->__getIframeSource($href, $options, true);
    		$iframeOptions = $this->__getIframeOptionsToQueryString($this->__iframeOptions['likeBox']);
    		return $this->__iframe($src, $iframeOptions);
    	}
    
    /**
     * Returns the needed value of src attributes for iframe
     * 
     * @param string href href to target
     * @param array options Options for facebook plugin API
     * @param boolean forLikeBox
     * 
     * @return string src Source value for src attribute
     * @access private
     */	
    	function __getIframeSource($href, $options, $forLikeBox = false) {
    		
    		if (!$forLikeBox) {
    			$src = self::HREF_PLUGIN . 'like.php?href=' . $href . '&';
    			$options = array_merge($this->__likeButtonDefaultOptions, $options);
    		} else {
    			$src = self::HREF_PLUGIN . 'likebox.php?href=' . $href . '&';
    			$options = array_merge($this->__likeBoxDefaultOptions, $options);
    		}
    		foreach($options as $option => $value) {
    			if ($value === true) {
    				$value = 'true';
    			} elseif ($value === false) {
    				$value = 'false';
    			}
    			$src .= $option . '=' . $value . '&';
    		}
    		$src = substr($src, 0, -1);
    		return $src;
    	}
    
    /**
     * Returns a query string for iframe attributes
     * 
     * @param mixed array options Options for src
     * 
     * @return string string generated String
     * @access public
     */	
    	function __getIframeOptionsToQueryString($options) {
    		$string = '';
    		foreach($options as $option => $value) {
    			if (is_array($value) && $option == 'style') {
    				$str = 'style="';
    				foreach($value as $attribute => $val) {
    					if (is_int($val)) {
    						$val = (string) $val . 'px';
    					}
    					$str .= $attribute . ':' . $val . '; ';
    				}
    				$str .= '"';
    				$string .= $str;
    			} else {
    				$string .= $option . '="' . $value . '" ';		
    			}
    		}
    		return $string;
    	}
    
    /**
     * Returns an html formatted iframe with given attributes
     * 
     * @param string src Source for iframe src attribute
     * @param array iframeOptions list of html attributes
     * 
     * @return string HTML iframe
     * @access public
     */	
    	function __iframe($src, $iframeOptions) {
    		$output = '<iframe src="'. $src . '" ' . $iframeOptions . '></iframe>';
    		return $output;
    	}	
    }
    
    ?>
    
    ?>



Controller Class:
`````````````````

::

    <?php 
    class ExamplesController extends AppController {
    
        var $name = 'Examples';
    
        var $helpers = array('Facebook', etc...);  
    }
    ?>

Now the FacebookHelper is available for you and you can use the API to
add some social features to your site.


The Like - Button
`````````````````

After including the FacebookHelper to your application, you can use it
in your View. Everybody knows the like - button of facebook. So if you
like to add a button like this to your site, you have to write this
code:


View Template:
``````````````

::

    
    <p>Some html code</p>
    
    <?php
        echo $this->Facebook->likeButton("http://www.url_to_like.com", 
                array('layout' => 'standard',
                      'action' => 'like',
                      'colorscheme' => 'light',
                      'show_faces' => false
             ));
    ?>

This code generates your facebook like-button. As you can see, you can
specify some options for the button. The FacebookHelper defines some
default values for these options, so if you want to, you just can pass
an empty array, it will work.

If you want to know, wich are the possible options for this function,
look at `http://developers.facebook.com/docs/reference/plugins/like`_.


The Like - Box
``````````````

Another cool feature is the facebook likebox. With the FacebookHelper,
you can add a facebook likebox to your site as simple as a likebutton.
All you have to do is to write this code:


View Template:
``````````````

::

    
    <p>Some Html again...</p>
    
    <?php
        echo $this->Facebook->likeBox("http://facebook.com/platform",
              array('connections' => 10,
                    'header' => true,
                    'stream' => true
             ));
    ?>


Is that simple? The likeBox() function expect the same params as the
likeButton() function. To get some information about the options
paramters look at
`http://developers.facebook.com/docs/reference/plugins/like-box`_.

Have fun with it, please comment.

.. _http://developers.facebook.com/docs/reference/plugins/like-box: http://developers.facebook.com/docs/reference/plugins/like-box
.. _http://developers.facebook.com/docs/reference/plugins/like: http://developers.facebook.com/docs/reference/plugins/like

.. author:: Tidus
.. categories:: articles, helpers
.. tags:: helper,social media,facebook,like,Helpers

