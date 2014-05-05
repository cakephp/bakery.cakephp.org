Habtm Updatable Behavior
========================

A behavior to sync data POST'ed from a select box input and data
already saved. Useful in edit actions.
Gives models the ability to update HABTM records using a single multi
select or check box input. Behavior inserts and/or deletes records
when appropiate, depending on the input data.
It tries to override the default behavior of CakePHP that deletes all
the rows first and then inserts the new ones when you are editing the
main model. If there is no difference between the POST'ed data and the
existing data, no changes are going to be made.

First, I will show you the usage of this Behavior.

Example:

Post HABTM Tag

Usage:

post.php

Model Class:
````````````

::

    <?php 
    var $actsAs = array('HabtmUpdatable'); //This will apply to all HABTM related models
    var $actsAs = array('HabtmUpdatable' => 'Tag'); //One field
    var $actsAs = array('HabtmUpdatable' => array('Tag')); //One or multiple fields
    ?>

posts_controller.php

Controller Class:
`````````````````

::

    <?php 
    function edit($id = null) {
    	if(!empty($this->data)) {
    		$this->Post->save($this->data);
     	}
    	else {
    		$this->recursive = 1;
    		//$this->Post->contain(array('Tag' => array('fields' => array('Tag.id'));
    		$this->data = $this->Post->read(null, $id);
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
    echo $form->input('Tag');//or $form->input('Post.Tag') //If you use the Validatable Behavior too
    echo $form->end();

habtm_updatable.php

Behavior Class:
```````````````

::

    <?php 
    /**
     * Gives models the ability to update HABTM records using a single multi select or check box input. 
     * Behavior inserts and/or deletes records when appropiate, depending on the input data POST'ed.
     * It tries to override the default behavior of CakePHP deleting all the rows first and then inserting 
     * the new ones when you are editing the main model.
     * If there is no difference between the POST'ed data and the existing data, no changes are going to
     * be made.
     * 
     * Example:
     * 
     * Post HABTM Tag
     * 
     * Usage:
     * 
     * post.php
     * ----------------
     * var $actsAs = array('HabtmUpdatable'); //This will apply to all HABTM related models
     * var $actsAs = array('HabtmUpdatable' => 'Tag'); //One field
     * var $actsAs = array('HabtmUpdatable' => array('Tag')); //One or multiple fields
     * 
     * posts_controller.php
     * ----------------
     * 	function edit($id = null) {
     * 		if(!empty($this->data)) {
     * 			$this->Post->save($this->data);
     *  	}
     * 		else {
     * 			$this->recursive = 1;//or $this->Post->contain(array('Tag' => array('fields' => array('Tag.id'));
     * 			$this->data = $this->Post->read(null, $id);
     * 		}
     * 		$tags = $this->Post->Tag->find('list');
     * 		$this->set(compact('tags));
     * 	}
     * 
     * posts/add.ctp
     * ----------------
     * echo $form->create('Post');
     * echo $form->input('Tag');//or $form->input('Post.Tag') //If you use the Validatable Behavior too
     * echo $form->end();
     * 
     */
    class HabtmUpdatableBehavior extends ModelBehavior {
    	
    	function setup(&$Model, $settings) {
    		if(empty($settings)) {
    			$settings = $Model->getAssociated('hasAndBelongsToMany');
    		}
    		foreach((array)$settings as $key) {
    			$association = $key;
    			$this->settings[$Model->alias][] = $association;
    		}
    	}
    	
    	function beforeSave(&$Model, $options = array()) {
    		foreach($this->settings[$Model->alias] as $association) {
    			$association_Ids = null;
    			if(isset($Model->data[$Model->alias][$association])) {
    				$association_Ids = empty($Model->data[$Model->alias][$association]) ? 
    					array() : (array)$Model->data[$Model->alias][$association];
    				$Model->data[$Model->alias][$association] = array();
    			}
    			else if(isset($Model->data[$association][$association])) {
    				$association_Ids = empty($Model->data[$association][$association]) ? 
    					array() : (array)$Model->data[$association][$association];
    				$Model->data[$association][$association] = array();
    			}
    			if($association_Ids !== null && $Model->exists() === true) {
    				$withModel = $Model->hasAndBelongsToMany[$association]['with'];
    				$foreignKey = $Model->hasAndBelongsToMany[$association]['foreignKey'];
    				$associationForeignKey = $Model->hasAndBelongsToMany[$association]['associationForeignKey'];
    				$associatedField = "$withModel.$associationForeignKey";
    				$thisField = "$withModel.$foreignKey";
    				$associated_Ids = $Model->{$withModel}->find('all', array(
    					'fields' => array($associatedField), 'conditions' => array($thisField => $Model->id)));
    				$associated_Ids = Set::classicExtract($associated_Ids, "{n}.$associatedField");
    				$insertAssociations = array();
    				$deleteAssociations = array();
    				$operations = array(
    					'insert' => array('needles' => 'association_Ids', 'haystack' => 'associated_Ids'), 
    					'delete' => array('needles' => 'associated_Ids', 'haystack' => 'association_Ids'));
    				foreach($operations as $operation => $settings) {
    					foreach(${$settings['needles']} as $id) {
    						if(!in_array($id, ${$settings['haystack']}) && 
    							!in_array($id, ${"{$operation}Associations"})) {
    							//Insert association
    							${"{$operation}Associations"}[] = $id;
    						}
    						//else Skip insert
    					}
    				}
    				$db =& ConnectionManager::getDataSource($Model->useDbConfig);
    				if($options['atomic'] && $options['validate'] !== 'only') {
    					$db->begin($this);
    				}
    				$Model->{$withModel}->recursive = -1;
    				foreach($deleteAssociations as $deleteId) {
    					$conditions = array($thisField => $Model->id, $associatedField => $deleteId);
    					if(!$Model->{$withModel}->deleteAll($conditions, false)) {
    						return false;
    					}
    				}
    				foreach($insertAssociations as $insertId) {
    					$insertData = array(
    						$withModel => array($foreignKey => $Model->id, $associationForeignKey => $insertId));
    					$Model->{$withModel}->create($insertData);
    					if(!$Model->{$withModel}->save()) {
    						return false;
    					}
    				}
    			}
    		}
    		return true;
    	}
    }
    ?>



.. author:: nachopitt
.. categories:: articles, behaviors
.. tags:: save,multiple,Edit,HABTM,update,Behaviors

