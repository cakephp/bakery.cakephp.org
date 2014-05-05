Simple XML-RPC Services Implementation
======================================

Recently I was entrusted with a project which required me to setup a
XML-RPC services server on an installation of CakePHP. I could not
find an implementation that would suit my needs so I thought about
embarking on this adventure on my own. This implementation is
beautifully simple and one more example of extending Cake's power. I
have tried to enumerate the implementation in a few steps. I hope it
will be easy for everyone to follow.
STEP 1:
Download a XML-RPC server implementation library. I used my favorite
library "XML-RPC for PHP" written by Edd Dumbill, Gaetano Giunta,
Miles Lott, Justin R. Miller, and Andres Salomon. It comes with
extremely well written documentation and sample files. You can
download the library from `http://phpxmlrpc.sourceforge.net/`_
I have used 3.0.0beta for this tutorial.

STEP 2:
Copy xmlrpc.inc and xmlrpcs.inc in the app/vendors folder.

STEP 3: Create a controller file in app/controllers and name it
rpc2_controller.php. My controller file contains the following:

::

    
    <?php
    /**
     * XML-RPC server implementation
     * 
     * To implement the XML-RPC services I have used the XML-RPC server library 
     * written by Edd Dumbill and others.
     * You can download the library from http://phpxmlrpc.sourceforge.net/
     *
     * Copyright (c) 2010 Dominion Enterprises
     *
     * The MIT License
    
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     *
     * If you have any questions or comments, please email:
     * Jayesh Wadhwani - Employment Guide
     * jayesh.wadhwani@dominionenterprises.com
     *
     */
    require_once ("vendors/xmlrpc.inc");
    require_once ("vendors/xmlrpcs.inc");
    
    
    /**
     * A simple class to demonstrate the implementation of xml-rpc services.
     *
     */
    
    class Rpc2Controller extends AppController {
    	
    	
    	/**
    	 * No model for this class.
    	 * @var array
    	 */
    	var $uses = array ();
    	
    	/**
    	 * Debug level for the XML-RPC server.
    	 * Detailed information in the manual
    	 * level - 0, no debug info
    	 * level - 1, default error reporting
    	 * level - 2, the complete client request is added to the response, as part of the xml comments
    	 * level - 3, custom error handler - see manual for details
    	 * @var int
    	 */
    	private $_debug = 0;
    	
    	
    	/**
    	 * This sets up the XML-RPC server. All requests come via here.
    	 * All the parameters used are documented in the manual.
    	 */
    	function index() {
    		//put in all data types here that you will be using
    		global $xmlrpcString;
    		
    		//No debug messages from cake
    		Configure::write ( 'debug', 0 );
    		
    		//valid services
    		//add more services here
    		//see manual for format
    		$services = array ("test.echo_string" => array ("function" => array ($this, "echoString" ), 
    														"signature" => array( array ($xmlrpcString, $xmlrpcString) ),
    														"docstring" => 'Echoes back the passed in string' )
    							);
    														
    														
    		
    		//xml-rpc server variables
    		//see manual for details
    		$server = new xmlrpc_server ( $services, false );
    		$server->setdebug ( $this->_debug );
    		$server->compress_response = false;
    		
    		//start up
    		$server->service ();
    		exit ();
    	
    	}
    	
    	/**
    	 * echoes back the passed string
    	 * 
    	 * @param $params - xmlrpc encoded string
    	 * @return $results - xmlrpc encoded
    	 */
    	function echoString($params) {
    		
    		//retreive the encoded string
    		$param = $params->getParam ( 0 );
    		
    		//get the php values
    		$inputString = php_xmlrpc_decode ( $param );
    					
    		//echo back
    		$outputString = php_xmlrpc_encode ( $inputString );
    		return new xmlrpcresp ( $outputString );
    			
    	}
    }
    
    ?>

STEP 4: Create a test file to check your server. I created es.php and
put it in my app/webroot directory. It contains:

::

    
    <?php
    include ("../vendors/xmlrpc.inc");
    $hostName = 'localhost'; //your services endpoint here.
    $rpcPath = '/index.php/rpc2';
    $port = 80;
    
    
    $stringToEcho = 'Hello World';
    
    $echoString = new xmlrpcmsg ( 'test.echo_string', array(php_xmlrpc_encode ( $stringToEcho ) ) );
    
    //create a client handle and send request
    $client = new xmlrpc_client ( $rpcPath, $hostName, $port );
    
    //a little verbose debug
    $client->setDebug ( 2 );
    
    //the response
    $response = &$client->send ( $echoString );
    
    //check if response is good
    if (! $response->faultCode ()) {
    	$returnedString = php_xmlrpc_decode($response->value());
    	print "<br/>Returned string is: " . $returnedString . "<br/>";
    } else {
    	print "An error occurred: <br/>";
    	print "Code: " . htmlspecialchars ( $response->faultCode () ) . " Reason: '" . htmlspecialchars ( $response->faultString () ) . "'<br/>";
    }
    
    ?>

STEP 5: Confirm your service works by executing your test file. eg.
`http://yourdomain.com/es.php`_ to check if the service echoed back
the string

As you can see the implementation is quite straight forward and can
co-exist with any other controller files you may have.

Enjoy!



.. _http://phpxmlrpc.sourceforge.net/: http://phpxmlrpc.sourceforge.net/
.. _http://yourdomain.com/es.php: http://yourdomain.com/es.php

.. author:: jayesh
.. categories:: articles, snippets
.. tags:: xml,xmlrpc,web services,rpc,jj,Snippets

