PersistentValidation - keeping your validation data after redirects
===================================================================

I decided to wrap this functionality in a component because when you
have several forms in a view and each one relates to a different
controller it's much easier to point the form to it's controller
respective action and redirect back to the originating view.
But the validations don't persist. Here we use Session to persist
them.
The main issue would be if you go back to the edit form of the ModelA
your validated ModelB belongsTo. The chances are that after a
ModelA->read() in the $this->data[ModelB] there already are some
records. In this case you'll get a debug message:
"persistent data written in data[ModelB]. Find records moved to
data[ModelBRecords]"
so that the forms are refilled correctly from the expected
data[ModelB] value.
So thi sis basically a way to have a UserHobbyAdd form in a UserEdit
view :) May sound twisted but I need this to add user related stuff in
a user profile edit page...

This works but if someone finds a glitch please drop a comment.

Important note: the line "if (in_array($k, $controller->modelNames)"
makes it mandatory for the User Controller to have the Hobby model in
the $uses property!


Component Class:
````````````````

::

    <?php 
    /*
     * Created on Oct 7, 2009
     * Created by Cosmin Cimpoi <cosmin@binarycrafts.com>
     */
    
    class PersistentValidationComponent extends Object {
    	var $components = array('Session');
    
    	//called before Controller::beforeFilter()
    	function initialize(&$controller, $settings = array()) {
    		$this->controller =& $controller;
    	}
    
    	//called after Controller::beforeRender()
    	function beforeRender(&$controller) {
    		$validations = $this->Session->read('PersistentValidation');
    		if (empty($validations)) return;
    		foreach ($validations as $k=>$v) {
    			if (in_array($k, $controller->modelNames)) {
    				if (empty($controller->data))  $controller->data = array();
    				if (array_key_exists($k, $controller->data) && array_key_exists('0', $controller->data[$k])) {
    					//	there's data for this model from an associaton query
    						$controller->data[$k. 'Records'] = $controller->data[$k];
    				}
    				$controller->data[$k] = $v['data'];
    				$controller->$k->validationErrors = $v['errors'];
    				$this->Session->delete('PersistentValidation.'. $k);
    			}
    		}
    	}
    
    	//called before Controller::redirect()
    	function beforeRedirect(&$controller, $url, $status=null, $exit=true) {
    		foreach ($this->controller->modelNames as $mn) {
    			if (count($controller->$mn->validationErrors)) {
    				$this->Session->write('PersistentValidation.'. $mn. '.data', $controller->$mn->data[$mn]);
    				$this->Session->write('PersistentValidation.'. $mn. '.errors', $controller->$mn->validationErrors);
    			}
    		}
    	}
    }
    
    ?>



.. author:: binarycrafts
.. categories:: articles, components
.. tags:: session,validation,redirects,Components

