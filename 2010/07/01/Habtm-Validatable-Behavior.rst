Habtm Validatable Behavior
==========================

A behavior to validate HABTM input fields (multi select or checkbox)
and save at the same time with just one instruction.
This behavior gives models the ability to validate the save or update
of a HABTM associated model (typically a multiple select or check
box). First I will show how to use it, and then I will show the code.

Example:
Post HABTM Tag

Usage:

post.php

Model Class:
````````````

::

    <?php 
    var $validate = array('Tag' => array('rule' => array('multiple', array('min' => 1))));
    var $actsAs = array('HabtmValidatable'); //This will apply to all HABTM related models
    var $actsAs = array('HabtmValidatable' => 'Tag'); //One field
    var $actsAs = array('HabtmValidatable' => array('Tag')); //One or multiple fields
    ?>

posts_controller.php

Controller Class:
`````````````````

::

    <?php 
    function add($id = null) {
    	if(!empty($this->data)) {
    		$this->Post->save($this->data);
    	}
    	$tags = $this->Post->Tag->find('list');
    	$this->set(compact('tags));
    }
    ?>

posts/add.ctp

View Template:
``````````````

::

    
    echo $form->create('Post');
    echo $form->input('Post.Tag'); //This is the only change to the user code
    echp $form->end();

There's only one change you need to make to be able to validate and
save a HABTM input. The input name needs to be changed to something
like "MainModelName.HABTMModelName".
And that's all.


Behavior Class:
```````````````

::

    <?php 
    /**
     * Gives models the ability to validate the save or update of a HABTM associated model (typically a 
     * multiple select or check box) 
     * 
     * Example:
     * 
     * Post HABTM Tag
     * 
     * Usage:
     * 
     * post.php
     * ----------------
     * var $validate = array('Tag' => array('rule' => array('multiple', array('min' => 1))));
     * 
     * var $actsAs = array('HabtmValidatable'); //This will apply to all HABTM related models
     * var $actsAs = array('HabtmValidatable' => 'Tag'); //One field
     * var $actsAs = array('HabtmValidatable' => array('Tag')); //One or multiple fields
     * 
     * posts_controller.php
     * ----------------
     * 	function add($id = null) {
     * 		if(!empty($this->data)) {
     * 			$this->Post->save($this->data);
     *  	}
     * 		$tags = $this->Post->Tag->find('list');
     * 		$this->set(compact('tags));
     * 	}
     * 
     * posts/add.ctp
     * ----------------
     * echo $form->create('Post');
     * echo $form->input('Post.Tag'); //This is the only change to the user code
     * echp $form->end();
     * 
     */
    class HabtmValidatableBehavior extends ModelBehavior {
    	
    	function setup(&$Model, $settings) {
    		if(empty($settings)) {
    			$settings = $Model->getAssociated('hasAndBelongsToMany');
    		}
    		foreach((array)$settings as $key) {
    			$fieldName = $key;
    			$this->settings[$Model->alias][] = $fieldName;
    		}
    	}
    	
    	function beforeSave(&$Model, $options = array()) {
    		foreach($this->settings[$Model->alias] as $fieldName) {
    			if(isset($Model->data[$Model->alias][$fieldName]) && 
    				!isset($Model->data[$fieldName][$fieldName])) {
    				$Model->data[$fieldName][$fieldName] = $Model->data[$Model->alias][$fieldName];
    				unset($Model->data[$Model->alias][$fieldName]);
    			}
    		}
    		return true;
    	}
    }
    ?>

You are free to make any suggestions and improvements you have or even
better, pointing me out that this is kind of useless.


.. author:: nachopitt
.. categories:: articles, models
.. tags:: model,validation,multiple,HABTM,Models

