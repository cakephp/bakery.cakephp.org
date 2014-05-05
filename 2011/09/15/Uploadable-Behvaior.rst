Uploadable Behvaior
===================

I have a few tables that contain a field that needs to be photo or
other type of file that needs to be uploaded. Instead of writing
upload stuff for each method I just built a behavior to handle it.

Download the behavior here:

`https://github.com/mdunham/Uploadable-Behavior`_

Then in your model let use Recipe as an example:

::

    <?php
    
    /**
     * Recipe Model
     */
    class Recipe extends AppModel {
    
        /**
         * Define the behavior of this model
         * 
         * @var array 
         */
        public $actsAs = array('Uploadable');
    }

Then make sure you turn on enctype = multipart/formdata in your view:

::

    <?php
        echo $this->Form->create('Recipe', array('enctype' => 'multipart/form-data')); 
        echo $this->Form->input('title');
        echo $this->Form->input('photo', array('type' => 'file'));
        echo $this->Form->end(__('Submit'));
    ?>

And thats all it takes to start using it you can customize it to work
on specific fields and specific file types. Happy baking.


.. _https://github.com/mdunham/Uploadable-Behavior: https://github.com/mdunham/Uploadable-Behavior

.. author:: mdunham918
.. categories:: articles, behaviors
.. tags:: model,behavior,upload,upload behavior,image upload,Behaviors

