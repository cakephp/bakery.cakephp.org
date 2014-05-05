GiveMeData: Insert fake data plugin for CakePHP
===============================================

Now I want the data roughly. Such time for?
In that case, Please leave GiveMeData Plugin for CakePHP.
`http://github.com/slywalker/give_me_data`_


Features
--------

+ insert fake data with associate.


Usage
-----

First, put `give_me_data` directory on CAKE_CORE_INCLUDE_PATH/plugins
or APP/plugins in your CakePHP application.
Second, add the following code in app_controller.php.

::


    <?php
    class AppController extends Controller {
        var $components = array('DebugKit.Toolbar' => array('panels' => 'GiveMeData.GiveMeData'));
    }
    ?>




Give me all
~~~~~~~~~~~

[Give me all] is to insert fake data in all tables. (not cascade)


More!
~~~~~

[More!] is to inset fake data in one table. (not cascade)


More and More!
~~~~~~~~~~~~~~

[More and More!] is to insert fake data in some table. (with cascade
association hasOne and hasMany, hasAndBelongsToMany)


Customizing
-----------

`php-faker`_ used for data creation in this plugin.


GiveMeDatum::__caseGuess
~~~~~~~~~~~~~~~~~~~~~~~~

When you want to change the data format of field name, You can
customize this method.

::


    	function __caseGuess($fieldName, $field) {
    		if (in_array($fieldName, array('email')) && $field['type'] === 'string') {
    			return $this->_Faker->Internet->email();
    		}

    		if (in_array($fieldName, array('pass', 'password')) && $field['type'] === 'string') {
    			return $this->_Faker->bothify('?#?#?#');
    		}

    		if (in_array($fieldName, array('phone', 'tel')) && $field['type'] === 'string') {
    			return $this->_Faker->Phone_Number->phone_number();
    		}

    		if (in_array($fieldName, array('name', 'user', 'username', 'tag', 'category')) && $field['type'] === 'string') {
    			return $this->_Faker->Internet->user_name();
    		}

    		if (in_array($fieldName, array('slug')) && $field['type'] === 'string') {
    			return $this->_Faker->lexify('???_???_???????');
    		}

    		return null;
    	}



GiveMeDatum::__caseDefault
~~~~~~~~~~~~~~~~~~~~~~~~~~

When you want to change default data format of field type, You can
customize this method.

::


    	function __caseDefault($field) {
    		switch ($field['type']) {
    			case 'integer':
    			case 'float':
    				$insert = $this->_Faker->numerify('####');
    			break;

    			case 'string':
    			case 'binary':
    				$insert = $this->_Faker->Lorem->sentence();
    				if (!empty($field['length'])) {
    					 $insert = substr($insert, 0, (int)$field['length'] - 2);
    				}
    			break;

    			case 'timestamp':
    				$insert = time();
    			break;

    			case 'datetime':
    				$insert = $this->_Faker->numerify('20##-0#-2# 0#:2#:3#');
    			break;

    			case 'date':
    				$insert = $this->_Faker->numerify('20##-0#-2#');
    			break;

    			case 'time':
    				$insert = $this->_Faker->numerify('0#:2#:3#');
    			break;

    			case 'boolean':
    				$insert = mt_rand(0, 1);
    			break;

    			case 'text':
    				$insert = $this->_Faker->Lorem->paragraph();
    			break;
    		}
    		return $insert;
    	}



GiveMeDatum::$ignoreFields
~~~~~~~~~~~~~~~~~~~~~~~~~~

CakePHP automatically created in the field has better to specify here.

::


    	var $ignoreFields = array('id', 'lft', 'rght');



Requirement
-----------

DebugKit


LICENCE
-------

Released under the MIT Licence


.. _php-faker: http://github.com/caius/php-faker
.. _http://github.com/slywalker/give_me_data: http://github.com/slywalker/give_me_data

.. author:: slywalker
.. categories:: articles, plugins
.. tags:: data,plugin,Plugins

