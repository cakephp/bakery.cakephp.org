In Place Editing with jQuery
============================

In 2008, I wrote an [url="http://bakery.cakephp.org/articles/abalonepa
ul/2008/07/07/using_the_ajax_helper_for_inplaceeditor_and_inplacecolle
ctioneditor_fields"]article on using the Scriptaculous InPlaceEditor
and InPlaceCollectionEditor[/url]. I recently updated that project and
converted the editors to jQuery. This is a brief tutorial on using the
[url=http://code.google.com/p/jquery-in-place-editor/]jQuery In Place
Editor[/url]. This is much easier than using Prototype and
Scriptaculous.
I am assuming that you are using CakePHP 1.3 or greater and the Js
Helper with jQuery. For our example, we are going to use a simple
contact form with fields for the contact's name and the contact's
state.

The first thing you need to do is download the jQuery In Place Editor
Plugin from `here`_. Unzip the file and put jquery.editinplace.js into
your /webroot/js/ folder. You can include the plugin in your layout or
in the view file as you will see below.

Create your tables and models. The contacts table needs a state_id
field and name field. The states field needs an id and a name field.
Your Contact Model should look something like this.


Model Class:
````````````

::

    <?php
    class Contact extends AppModel {

        var $name = 'Contact';
        var $belongsTo = array(
                'State' => array(
                                    'className' => 'State',
                    'foreignKey' => 'state_id'
                )
            );
    }
    ?>

And your State Model should look something like this:


Model Class:
````````````

::

    <?php
    class State extends AppModel {

        var $name = 'State';
    }
    ?>

Now let's move on to your Contacts Controller which should start out
looking something like this:


Controller Class:
`````````````````

::

    <?php
    class ContactsController extends AppController {

        var $name = 'Contacts';
        var $uses = array('Contact', 'State');
        var $helpers = array('Html', 'Form', 'Js');

        function view($id = null) {

            if (!$id) {
                $this->redirect(array('action'=>'index'));
            }
            $this->set('contact', $this->Contact->read(null, $id));

            // Build the states array and set the view variable
            $states = $this->State->find('list');
            foreach ($states as $key => $value) {
                $options[] = $key . ':' . $value;
            }

            $this->set('stateListAjax', implode(',',$options));
        }

    }
    ?>

Now lets add the method to your Contacts Controller that will handle
the update. This method is responsible for updating the database.
Let's add the ajax_update method and then discuss it.


Controller Class:
`````````````````

::

    <?php
    class ContactsController extends AppController {

        var $name = 'Contacts';
        var $uses = array('Contact', 'State');
        var $helpers = array('Html', 'Form', 'Js');

        function ajax_update($id){
        //Step 1. Update the value in the database
        $value = $this->params['form']['update_value']; //new value to save
        $field = $this->params['form']['element_id'];
        $this->Contact->id = $id;
            if (!$this->Contact->saveField($field,$value,true)) { // Update the field
                $this->set('error', true);
            }
            $contact = $this->Contact->read(array($field), $id);

            //Step 2. Get the display value for the field if the field is a foreign key
            // See if field to be updated is a foreign key and set the display value
            if (substr($field,-3) == '_id'){

                // Chop off the "_id"
                $new_field = substr($field,0,strlen($field)-3);

                // Camelize the result to get the Model name
                $model_name = Inflector::camelize($new_field);

                // See if the model has a display name other than default "name";
                if (!empty($this->$model_name->display_field)){
                    $display_field = $this->$model_name->display_field;
                }else {
                    $display_field = 'name';
                }

                // Get the display value for the id
                $value = $this->$model_name->field($display_field,array('id' => $value));
            }

            //Step 3. Set the view variable and render the view.
            $this->set('value',$value);
            $this->beforeRender();
            $this->layout = 'ajax';
        }
    }
    ?>


Now, we need to include the RequestHandler Component and disable
debugging output for the AJAX calls, so modify your App Controller so
it looks like this:


Controller Class:
`````````````````

::

    <?php
    class AppController extends Controller {

        var $components = array('RequestHandler');

        function beforeRender() {
            if($this->RequestHandler->isAjax() || $this->RequestHandler->isXml()) {
                Configure::write('debug', 0);
        }
        }
    }
    ?>

Now we can move onto the views. We need two views. One for the actual
form and one to return the value from the ajax call.

ajax_update.ctp

View Template:
``````````````

::


    <?php e($value);?>

Our contact form should look like this:

View Template:
``````````````

::


    <?php
        echo $this->Html->script('jquery.1.4.3.min',array('inline' => false));
        echo $this->Html->script('jquery.editinplace',array('inline' => false));
        echo $this->Html->scriptBlock('
            jQuery(function () {
    		jQuery(".textField").editInPlace({
    		    url: "\/path\/to\/ajax_update\/'. $contact_id . '\/",
    		    default_text: "" //Disable the default text
    		});
    		jQuery("#state_id").editInPlace({
    		    url: "\/path\/to\/ajax_update\/'. $contact_id . '\/",
    		    default_text: "",
    		    field_type: "select",
    		    select_options: ' . $stateListAjax . ',
                        success: function(html) {
                           this.dom.html(html);
                        }
    		});
                });
    ',array('inline' => false));
    ?>
    <label for="name"><?php __('Name');?>:</label><div id="name" class="textField"><?php echo $contact['Contact']['name'];?></div>
    <label for="state_id"><?php __('State');?>:</label><div id="state_id"><?php echo $contact['State']['name'];?></div>

Now just browse to the url of the view, passing a contact id to see
the form. When you click the text box and change the value, the value
is updated and pushed back to the view. When you click the State
field, the select box appears and you select a state. The table is
updated with the state id and state name is pushed back to the view.
Sweet!!

As long as you add the textField class your text field divs, the
editor will be enabled. Select boxes need to be done for each select
box as you need to generate the option lists for each. There is a fork
of this plugin that supports dynamic selects, however, I don't like
how it handles some other situations.

Occasionally, you will have a field that is empty. By default, empty
fields will be filled with "Click to Edit...". I don't like the way
this looks when there are many empty fields. I disable the default
text in the plugin configuration. You can simply remove the
default_text configuration option, or you can Add the text of your
choice.

This will usually make the empty fields difficult to find. I use CSS
to set the height or min-height of that element. I then add a title
attribute to the field divs with "Click to Edit" as the value. Now you
don't see "Click to Edit" in every empty field, however you see it as
a tooltip when you hover over the empty field. You would do the Name
field like this.


View Template:
``````````````

::


    <label for="name"><?php __('Name');?>:</label><div title="Click to Edit" id="name">
    <?php
            echo $contact['Contact']['name'];
    ?>
    </div>



.. _here: http://code.google.com/p/jquery-in-place-editor/downloads/list

.. author:: abalonepaul
.. categories:: articles, tutorials
.. tags:: jquery,inplaceeditor,edit in place,inline editor,in place,Tutorials

