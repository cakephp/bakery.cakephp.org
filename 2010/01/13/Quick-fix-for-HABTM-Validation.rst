Quick fix for HABTM Validation
==============================

I was looking for a simple solution for HABTM validation, and
struggled to find one that didn't required me to write a lot of code.
i came up with this, hopefully it will help someone. This is my first
post here, so i guess someone will rewrite my code to be much better.
basically we want to add to the app_model.php the next code

Model Class:
````````````

::

    <?php 
    function beforeValidate() {
    		foreach($this->hasAndBelongsToMany as $k=>$v) {
    			if(isset($this->data[$k][$k]))
    			{
    				$this->data[$this->alias][$k] = $this->data[$k][$k];
    			}
    		}
    	}
    ?>


and then just add a simple "multiple" validation rule with the name of
the HABTM connection

let's say we have a baked code that looks like this

Model Class:
````````````

::

    <?php 
    var $hasAndBelongsToMany = array(
    		'Project' => array(
    			'className' => 'Project',
    			'joinTable' => 'projects_users',
    			'foreignKey' => 'user_id',
    			'associationForeignKey' => 'project_id',
    			'unique' => true,
    			'conditions' => '',
    			'fields' => '',
    			'order' => '',
    			'limit' => '',
    			'offset' => '',
    			'finderQuery' => '',
    			'deleteQuery' => '',
    			'insertQuery' => ''
    		)
    );
    ?>

all we do is add

Model Class:
````````````

::

    <?php 
    var $validate = array(
    		'Project' => array(
    			'multiple' => array(
    				'rule' => array('multiple',array('min' => 2)),
    				'message' => 'Please select at least 2 projects you attend'),
    		),
    	);
    ?>

more info about the multiple validation rule here
`http://book.cakephp.org/view/786/multiple`_

.. _http://book.cakephp.org/view/786/multiple: http://book.cakephp.org/view/786/multiple

.. author:: kogalex
.. categories:: articles, tutorials
.. tags:: validation,validate,hasAndBelongsToMany,HABTM,Tutorials

