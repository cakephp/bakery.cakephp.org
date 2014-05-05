Password generator
==================

Is a simple component to generate passwords automatically.


1. Add component file to your app
=================================

Create this file app/controllers/components/password.php

Component Class:
````````````````

::

    <?php 
    class PasswordComponent extends Object {
     
    /**
     * Password generator function
     *
     */
    	function generatePassword ($length = 8){
    		// inicializa variables
    		$password = "";
    		$i = 0;
    		$possible = "0123456789bcdfghjkmnpqrstvwxyz"; 
    		
    		// agrega random
    		while ($i < $length){
    			$char = substr($possible, mt_rand(0, strlen($possible)-1), 1);
    			
    			if (!strstr($password, $char)) { 
    				$password .= $char;
    				$i++;
    			}
    		}
    		return $password;
    	}
    }
    ?>

or download the file password.php (
`http://deldan.com/downloads/password_component.zip`_).


2. Reference it on your controller
==================================
Refer the components on the controller together with the other
components you may be using.

Component Class:
````````````````

::

    <?php 
    var $components = array('Password', 'RequestHandler', 'Email');
    ?>



3. Use it in your controller
============================
To use the component password , this is a simple example:

Controller Class:
`````````````````

::

    <?php 
    $newpass = $this->Password->generatePassword();
    ?>



.. _http://deldan.com/downloads/password_component.zip: http://deldan.com/downloads/password_component.zip

.. author:: deldan
.. categories:: articles, components
.. tags:: password,new password,password generator,Components

