Multiple Forms per page for the same model
==========================================

When CakePHP validates a form, validation errors appear on ALL forms
on the same page that belong to that model. Let's fix this.


The Problem - Seeing Double!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sample Situation
````````````````
You're at the dashboard of an imaginary website that allows you to
edit articles, but at the same time add a new one if you'd like. So
you have two forms, of the same model (say Article ) - one to edit an
article, another to add - and both of these forms are on the same
page. With the way CakePHP right now, on submitting data from one
form, validation errors will show up on both forms. Let's fix this
with as little effort as possible.


Sample Database For Reference
`````````````````````````````
Table: articles
title - VARCHAR (100)
details - MEDIUMTEXT
valid_till - DATETIME


The Solution
~~~~~~~~~~~~

Step 1. Separate the forms
``````````````````````````
At the place where you specify the model of the form, change it to the
function of the form. In the sample situation, you would change this
from Article to EditArticleForm in the first form, and AddArticleForm
in the second as shown (the naming conventions are arbitrary):


View Template:
``````````````

::

    
    <h1>Edit Your Article</h1>
    <?php
    echo $this->Form->create('EditArticleForm', array('url' => '/users/manage_articles'));
    echo $this->Form->input('id');
    echo $this->Form->input('title');
    echo $this->Form->input('details');
    echo $this->Form->input('valid_till');
    echo $this->Form->end('Edit');
    ?>
    
    <h1>Or, would you like to add another one?</h1>
    <?php
    echo $this->Form->create('AddArticleForm', array('url' => '/users/manage_articles'));
    echo $this->Form->input('title');
    echo $this->Form->input('details');
    echo $this->Form->input('valid_till');
    echo $this->Form->end('Add');
    ?>

However, CakePHP does not recognize these new "models"
(EditArticleForm and AddArticleForm) and hence, we lose the
automagical ability of Cake to determine the input type for us (the
'details' field won't be a textarea, and the 'valid_till' field will
not be nicely formatted into a date picker by Cake). We could
forcefully specify the type for each field in both forms, but there's
a better way.


Step 2. Save the Cake Magic!
````````````````````````````
Create two new models, edit_article_form.php and add_article_form.php
in app/models. You can create a new folder called app/models/forms and
place them there if you like to keep your code organized.


Model Class:
````````````

::

    <?php 
    class EditArticleForm extends Article {
    
    }
    ?>



Model Class:
````````````

::

    <?php 
    class AddArticleForm extends Article {
    
    }
    ?>

Note 1: The above models extend the Article model .
Note 2: Conforming to the conventions of the latest version of CakePHP
(which follows from Zend), the ending "?>" should be removed. The
BBCode in Bakery won't let me do that though.
You haven't gotten back the Cake magic just yet. There's one more
thing!


Step 3. One more thing!
```````````````````````
The final step is to load these models in the action of your
controller.


Controller Class:
`````````````````

::

    <?php 
    class UsersController extends AppController {
    
        var $uses = array('User', 'Article');
    
        function manage_articles {
            // Single Model - Single Page - Multiple Forms Hack
            $this->loadModel('EditArticleForm');
            $this->loadModel('AddArticleForm');
    
            if (!empty($this->data)) {
                if (isset($this->data['EditArticleForm'])) { // Check if the Edit Form was submitted
                    if ($this->EditArticleForm->save($this->data)) {
                        // Code
                    }
                } else if (isset($this->data['AddArticleForm'])) { // Check if the Add Form was submitted
                    if ($this->AddArticleForm->save($this->data)) {
                        // Code
                    }
                }
            }
        }
    
        // more code
    
    }
    ?>

Note 1: You're calling save() from the newly created models. using the
new models, you can also override validation for each form by
specifying the $validate variable.

Note 2: If you're interested in how this works:

+ The FormHelper's input() function uses a class called ClassRegistry
  in determining the type of the field (when not explicitly specified).
+ The controller's loadModel function is used to instantiate a new
  model (which ends up being added to the ClassRegistry).
+ Since these models are being extended from the original class, we
  get all the validation rules of the super class.

... And, you're done! Now when you submit from one form, the
validation error messages will appear only in that particular form.

Hope you found this tutorial useful. You can also use it in a
situation where you need both a Login form and a Signup form for the
"User" model to lie on the same page.

Feedback, comments, suggestions welcome!


.. author:: RabidFire
.. categories:: articles, tutorials
.. tags:: validation,form,multiple forms,Tutorials

