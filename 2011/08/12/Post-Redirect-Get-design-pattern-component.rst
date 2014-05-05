Post/Redirect/Get design pattern component
==========================================

Post/Redirect/Get (PRG) is a common design pattern for web developers
to help avoid certain duplicate form submissions and allow user agents
to behave more intuitively with bookmarks and the refresh button. When
a web form is submitted to a server through an HTTP POST request, a
web user that attempts to refresh the server response in certain user
agents can cause the contents of the original HTTP POST request to be
resubmitted, possibly causing undesired results, such as a duplicate
web purchase. To avoid this problem, many web developers use the PRG
pattern — instead of returning a web page directly, the POST operation
returns a redirection command. When using the cakePHP pagination
helper, you will notice that it sends it's parameters by GET and they
are available in the $this->params array. So you can't use this->data
because all POST magic is lost when changing the page with the
pagination helper. A solution is to use the Post/Redirect/Get design
pattern to redirect the POST data by GET to the current page.
This component has two methods:

redirect() - makes the actual redirect and conversion between POST
data and GET data. After calling redirect() the data is available in
$this->params['named']
decode() - needed for converting back the previous POST data located
now in $this->params['named'] after using redirect(). After calling
decode the data is back in $this->data

The data is transported by HTTP GET as serialized base64-encoded.

So a common usage is to have a method in your controller like this:

::


    <?php
    function index() {
        $this->prgPattern->redirect();
        $this->prgPattern->decode();

        // data is magically available here even when using pagination
        pr($this->data);
    }
    ?>



::


    <?php
    <?php

    /**
     * prgPattern - cakePHP component for applying the Post/Redirect/Get design pattern
     * the vars will be accesibile after applying redirect() in $this->params['named']
     *
     * @author Lucian SABO (luci@criosweb.ro)
     */

    class prgPatternComponent extends Object {
        public $controller;
        private $_encodedData;

        //called before Controller::beforeFilter()
        function initialize(&$controller, $settings = array()) {

    	// saving the controller reference for later use
            $this->controller =& $controller;

        }

        //called after Controller::beforeFilter()
        function startup(&$controller) {
        }

        //called after Controller::beforeRender()
        function beforeRender(&$controller) {
        }

        //called after Controller::render()
        function shutdown(&$controller) {
        }

        //called before Controller::redirect()
        function beforeRedirect(&$controller, $url, $status = null, $exit = true) {
        }

        function encodeData($data, $section) {
    	$this->_encodedData[$section] = base64_encode(serialize($data));
    	return (isset($this->_encodedData[$section]) && !empty($this->_encodedData[$section]));
        }

        function decodeSectionData($section, $data) {
    	return unserialize(base64_decode($data));
        }

        /**
         * Following the Post/Redirect/Get design pattern, we take all POST parameters
         * and send them by GET to the specified URL
         *
         * @param array $url cakePHP url to redirect the request
         */
        function redirect($url = array()) {

    	    // Use Post/Redirect/Get design pattern to make the code compatible with pagination parameters
    	    if (! empty($this->controller->data)) {

    		// encode form data
    		if (! empty($this->controller->params['form'])) {
    		    $this->encodeData($this->controller->params['form'], 'form');
    		}

    		// loop through POST parameters, encode them
    		$this->encodeData($this->controller->data, 'data');

    		// add the params to the URL
    		$url = array_merge($url, $this->_encodedData);

    		// Do the (magical) redirect
    		// Proper compliance for HTTP 1.1 spec requires that applications provide a HTTP 303 response
    		// in this situation to ensure that the web user's browser can then safely refresh the server
    		// response without causing the initial HTTP POST request to be resubmitted.
    		$this->controller->redirect($url, 303);
    		exit;
    	    }
        }

        function decode() {
    	// decode the params
    	if (isset($this->controller->params['named'])) {

    	    if (isset($this->controller->params['named']['form'])) {
    		$decodedFormData = $this->decodeSectionData('form', $this->controller->params['named']['form']);

    		foreach ($decodedFormData as $name => $value) {
    		    $this->controller->params['form'][$name] = $value;
    		}
    	    }

    	    if (isset($this->controller->params['named']['data'])) {
    		$decodedDataData = $this->decodeSectionData('data', $this->controller->params['named']['data']);
    		foreach ($decodedDataData as $name => $value) {
    		    $this->controller->data[$name]	= $value;
    		}
    	    }

    	}
        }

    }

    ?>



.. author:: luciansabo
.. categories:: articles, components
.. tags:: pagination,post-redirect-get,post/redirect/get,PRG,Components

