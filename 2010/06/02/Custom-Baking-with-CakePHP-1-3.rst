Custom Baking with CakePHP 1.3
==============================

Although I like CakePHP and Bake, I needed to change the basic baked
screens and behaviors. This sent me to explore how to customize the
actions and templates for CakePHP 1.3
For the past few weeks, I have been working with CakePHP to develop a
new application. Because I do not want to code all the data entry
screens yet, I was researching how to custom bake my controllers and
views.
First thing I have done is to remove the code that generates the bar
stripes and replace it with jquery doing the same. First part of
customization was to add a default.ctp in my app/views/layouts. Added

::

    $this->Html->script(array('jquery-1.4.2.min','jquery.tools.min'));

before the echo $scripts_for_layout; line.

Further I have added a script to slide the flash messages up and have
the bar stripes in the tables and forms.

::

    <script>
    $(document).ready(function() {
        //This works.
        //TODO Change to a nicer jquery plugin over the page
        if ( $('#flashMessage').text() != '') {
          setTimeout(function() {
             $('#flashMessage').slideUp(400);
         }, 3000);};
         //TODO this needs to be designed to be more specific, its too general purpose now.
         $('tr:odd,dt:odd').addClass('altrow');
     });

    </script>

The Session->flash message was also moved after the
content_for_layout, this was to avoid the jquery animation to scroll
the whole screen.

::


    <div id="content">
      <?php echo $content_for_layout; ?>
      <?php echo $this->Session->flash(); ?>
    </div>

This was pretty easy, so it inspired me to change the baked screens
more. First there is no cancel button in the baked forms. I saw this
old post `http://fat-tier.blogspot.com/2008/09/cancel-button-for-form.html`_
that reminded me that having cancel button would be a nice
thing. Being the efficient (read: lazy) person that I am, I was not
about to manually add that code to all my view and controllers. So
after some research and head scratching, I figured that a folder under
app/vendors/shells/templates is necessary for custom view and
controller generation. I named the folder and created two more folders
under it. actions and views. Copied the same folders from the
cake/console/templates. Edit the controller_actions from the actions
folder to add the checking for cancellation and flashing the
information in all the necessary parts.

::

    <?php
    /**
     * Bake Template for Controller action generation.
     *
     * PHP versions 4 and 5
     *
     * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
     * Copyright 2005-2009, Cake Software Foundation, Inc. (http://cakefoundation.org)
     *
     * Licensed under The MIT License
     * Redistributions of files must retain the above copyright notice.
     */
    ?>

     function <?php echo $admin ?>index() {
      $this-><?php echo $currentModelName ?>->recursive = 0;
      $this->set('<?php echo $pluralName ?>', $this->paginate());
     }

     function <?php echo $admin ?>view($id = null) {
      if (!$id) {
    <?php if ($wannaUseSession): ?>
       $this->Session->setFlash(sprintf(__('Invalid %s', true), '<?php echo strtolower($singularHumanName) ?>'));
       $this->redirect(array('action' => 'index'));
    <?php else: ?>
       $this->flash(sprintf(__('Invalid %s', true), '<?php echo strtolower($singularHumanName); ?>'), array('action' => 'index'));
    <?php endif; ?>
      }
      $this->set('<?php echo $singularName; ?>', $this-><?php echo $currentModelName; ?>->read(null, $id));
     }

    <?php $compact = array(); ?>
     function <?php echo $admin ?>add() {
        if (array_key_exists('cancel', $this->params['form'])) {
            $this->Session->setFlash(sprintf(__('Adding new %s has been cancelled', true), '<?php echo strtolower($singularHumanName); ?>'));
            $this->redirect(array('action' => 'index'));
        }
        else {
      if (!empty($this->data)) {
       $this-><?php echo $currentModelName; ?>->create();
       if ($this-><?php echo $currentModelName; ?>->save($this->data)) {
    <?php if ($wannaUseSession): ?>
        $this->Session->setFlash(sprintf(__('The %s has been saved', true), '<?php echo strtolower($singularHumanName); ?>'));
        $this->redirect(array('action' => 'index'));
    <?php else: ?>
        $this->flash(sprintf(__('%s saved.', true), '<?php echo ucfirst(strtolower($currentModelName)); ?>'), array('action' => 'index'));
    <?php endif; ?>
       } else {
    <?php if ($wannaUseSession): ?>
        $this->Session->setFlash(sprintf(__('The %s could not be saved. Please, try again.', true), '<?php echo strtolower($singularHumanName); ?>'));
    <?php endif; ?>
        }
        }
      }
    <?php
     foreach (array('belongsTo', 'hasAndBelongsToMany') as $assoc):
      foreach ($modelObj->{$assoc} as $associationName => $relation):
       if (!empty($associationName)):
        $otherModelName = $this->_modelName($associationName);
        $otherPluralName = $this->_pluralName($associationName);
        echo "\t\t\${$otherPluralName} = \$this->{$currentModelName}->{$otherModelName}->find('list');\n";
        $compact[] = "'{$otherPluralName}'";
       endif;
      endforeach;
     endforeach;
     if (!empty($compact)):
      echo "\t\t\$this->set(compact(".join(', ', $compact)."));\n";
     endif;
    ?>
     }

    <?php $compact = array(); ?>
     function <?php echo $admin; ?>edit($id = null) {
      if (!$id && empty($this->data)) {
    <?php if ($wannaUseSession): ?>
       $this->Session->setFlash(sprintf(__('Invalid %s', true), '<?php echo strtolower($singularHumanName); ?>'));
       $this->redirect(array('action' => 'index'));
    <?php else: ?>
       $this->flash(sprintf(__('Invalid %s', true), '<?php echo strtolower($singularHumanName); ?>'), array('action' => 'index'));
    <?php endif; ?>
      }
        if (array_key_exists('cancel', $this->params['form'])) {
            $this->Session->setFlash(sprintf(__('Editing %s has been cancelled', true), '<?php echo strtolower($singularHumanName); ?>'));
            $this->redirect(array('action' => 'index'));
        }
        else {
      if (!empty($this->data)) {
       if ($this-><?php echo $currentModelName; ?>->save($this->data)) {
    <?php if ($wannaUseSession): ?>
        $this->Session->setFlash(sprintf(__('The %s has been saved', true), '<?php echo strtolower($singularHumanName); ?>'));
        $this->redirect(array('action' => 'index'));
    <?php else: ?>
        $this->flash(sprintf(__('The %s has been saved.', true), '<?php echo strtolower($singularHumanName); ?>'), array('action' => 'index'));
    <?php endif; ?>
       } else {
    <?php if ($wannaUseSession): ?>
        $this->Session->setFlash(sprintf(__('The %s could not be saved. Please, try again.', true), '<?php echo strtolower($singularHumanName); ?>'));
    <?php endif; ?>
        }
        }
      }
      if (empty($this->data)) {
       $this->data = $this-><?php echo $currentModelName; ?>->read(null, $id);
      }
    <?php
      foreach (array('belongsTo', 'hasAndBelongsToMany') as $assoc):
       foreach ($modelObj->{$assoc} as $associationName => $relation):
        if (!empty($associationName)):
         $otherModelName = $this->_modelName($associationName);
         $otherPluralName = $this->_pluralName($associationName);
         echo "\t\t\${$otherPluralName} = \$this->{$currentModelName}->{$otherModelName}->find('list');\n";
         $compact[] = "'{$otherPluralName}'";
        endif;
       endforeach;
      endforeach;
      if (!empty($compact)):
       echo "\t\t\$this->set(compact(".join(', ', $compact)."));\n";
      endif;
     ?>
     }

     function <?php echo $admin; ?>delete($id = null) {
      if (!$id) {
    <?php if ($wannaUseSession): ?>
       $this->Session->setFlash(sprintf(__('Invalid id for %s', true), '<?php echo strtolower($singularHumanName); ?>'));
       $this->redirect(array('action'=>'index'));
    <?php else: ?>
       $this->flash(sprintf(__('Invalid %s', true), '<?php echo strtolower($singularHumanName); ?>'), array('action' => 'index'));
    <?php endif; ?>
      }
        if (array_key_exists('cancel', $this->params['form'])) {
            $this->Session->setFlash(sprintf(__('Deleting of %s has been cancelled', true), '<?php echo strtolower($singularHumanName); ?>'));
            $this->redirect(array('action' => 'index'));
        }
        else {
      if ($this-><?php echo $currentModelName; ?>->delete($id)) {
    <?php if ($wannaUseSession): ?>
       $this->Session->setFlash(sprintf(__('%s deleted', true), '<?php echo ucfirst(strtolower($singularHumanName)); ?>'));
       $this->redirect(array('action'=>'index'));
    <?php else: ?>
       $this->flash(sprintf(__('%s deleted', true), '<?php echo ucfirst(strtolower($singularHumanName)); ?>'), array('action' => 'index'));
    <?php endif; ?>
      }
    <?php if ($wannaUseSession): ?>
      $this->Session->setFlash(sprintf(__('%s was not deleted', true), '<?php echo ucfirst(strtolower($singularHumanName)); ?>'));
    <?php else: ?>
      $this->flash(sprintf(__('%s was not deleted', true), '<?php echo ucfirst(strtolower($singularHumanName)); ?>'), array('action' => 'index'));
    <?php endif; ?>
      $this->redirect(array('action' => 'index'));
     }
     }

Did changes in the form.ctpÂ to add the save and cancel buttons. Just
after the closing fieldset tag

::


    <div class="button">
    <?php
      echo "<?php echo \$form->submit('Save', array('div'=>false, 'name'=>'submit')); ?>\n \n";
      echo "<?php echo \$form->submit('Cancel', array('div'=>false, 'name'=>'cancel')); ?>\n";
      echo "<?php echo \$this->Form->end();?>\n";
     ?>
    </div>

Changed the views to remove the 'id' fields too.Â Although Ids are
important, they are important to the program(computer) not the
application user. As a matter of fact the more, I can remote the id
from the user's perception the better.

Result of all this exercise is that my views are now cleaner, (no more
$i++ lines) and they behave the way I want.

I am very happy to be using CakePHP and that there is such a good code
generation tool as part of the code.

Hope this article was useful to you! Please leave feedback in the
comments below.
`richard.scoop@gmail.com`_

.. _richard.scoop@gmail.com: mailto:richard.scoop@gmail.com
.. _http://fat-tier.blogspot.com/2008/09/cancel-button-for-form.html: http://fat-tier.blogspot.com/2008/09/cancel-button-for-form.html

.. author:: rascoop
.. categories:: articles, general_interest
.. tags:: bake cakephp,General Interest

