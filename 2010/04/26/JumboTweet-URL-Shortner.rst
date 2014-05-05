JumboTweet URL Shortner
=======================

This component works with the URL Shortner JumboTweet (http://jmb.tw)
and is provided as a service by The Easy API.
The component below is released by The Easy API -
`http://theeasyapi.com`_ and implements a URL shortner provided by
`http://jmb.tw`_. The author of the JumboTweet approached me to
implement into The Easy API and when I saw that it is also using Cake
I was more than happy to put it in. There is an API for this available
on The Easy API but here's the code that it's using.


Component - /app/controllers/components/jumbotweet.php
``````````````````````````````````````````````````````

Component Class:
````````````````

::

    <?php 
    // Let's use HttpSocket
    App::import('Core', 'HttpSocket');
    
    class JumbotweetComponent extends Object {
    	function makeshorter($url){		
    		// Start a new Socket
    		$HttpSocket = new HttpSocket();
    		
    		// We need to base64-encode it and then url-encode that.
    		$result = $HttpSocket->get("http://jmb.tw/api/create/?newurl=" . $url);
    		
    		if(strlen(trim($result)) > 0){
    			return $result;
    		}else{
    	       	return false;
    	    }
    	}
    }
    ?>

As you can see what it's doing is using HttpSocket to connect to
JumboTweet's API then returns the shorten URL. If the URL already
exists it will provide the original URL to you not a new one.


Sample Usage:
~~~~~~~~~~~~~

/app/controllers/urls_controller.php
````````````````````````````````````

Controller Class:
`````````````````

::

    <?php 
    class UrlsController extends AppController {
    	var $name = 'Urls';
    	var $helpers = array('Html', 'Form', 'Javascript', 'Ajax');
    	var $components = array('Jumbotweet');
    	
    	function index($url) {
    		$this->autoLayout = false;
    		$this->autoRender = false;
    		echo "New URL = " . $this->Jumbotweet->makeshorter(urldecode($url));
    	}
    }
    ?>

With that in place you can go to
http://{domain}/urls/http%3A%2F%2Ftheeasyapi.com and you will see on
the screen: `http://jmb.tw/8h`_
I hope that this helps anyone who is looking to implement a URL
shortner that is built with CakePHP, I know that I'm going to be
supporting them more and expanding upon what they have already started
to build.

Take care and happy baking,
Chad R. Smith


.. _http://jmb.tw/8h: http://jmb.tw/8h
.. _http://theeasyapi.com: http://theeasyapi.com/
.. _http://jmb.tw: http://jmb.tw

.. author:: chadsmith729
.. categories:: articles, components
.. tags:: api,easy api,jumbotweet,the easy api,Components

