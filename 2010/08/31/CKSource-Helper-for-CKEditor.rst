CKSource Helper for CKEditor
============================

CKEditor is a text editor to be used inside web pages. It's a WYSIWYG
editor, which means that the text being edited on it looks as similar
as possible to the results users have when publishing it. It brings to
the web common editing features found on desktop editing applications
like Microsoft Word and OpenOffice. This helper extends CakePHP's Form
core helper. I created the ckeditor function to make it easy to add a
CKEditor to any form. I called it CKSource so you can add CKFinder
later and have all the CKSource products in one helper. This is still
very basic, so feel free to submit changes in the comments. Update:
Added comment for single or double underscore regarding initInputField
Update: Added $this->webroot to base path. This should fix some
problems when working in sub-directories.
Please rate and leave comments

Usage
~~~~~

1. Download `CKEditor 3.1`_
2. Extract the archive to the webroot/js directory. i.e.
   webroot/js/ckeditor
3. Copy the the CKSource Helper ( cksource.php ) to the helpers
   directory.

Helper Class:
`````````````

::

    <?php
    class CksourceHelper extends FormHelper {

        var $helpers = array('Html');

        function ckeditor($fieldName, $options = array()) {
            //CakePHP 1.2.4.8284
            $options = $this->_initInputField($fieldName, $options);
            //If you have probelms, try adding a second underscore to _initInputField.  I haven't tested this, but some commenters say it works.
            //$options = $this->__initInputField($fieldName, $options);
            $value = null;
            $config = null;
            $events = null;

            if (array_key_exists('value', $options)) {
                $value = $options['value'];
                if (!array_key_exists('escape', $options) || $options['escape'] !== false) {
                    $value = h($value);
                }
                unset($options['value']);
            }
            if (array_key_exists('config', $options)) {
                $config = $options['config'];
                unset($options['config']);
            }
            if (array_key_exists('events', $options)) {
                $events = $options['events'];
                unset($options['events']);
            }

            require_once WWW_ROOT.DS.'js'.DS.'ckeditor'.DS.'ckeditor.php';
            $CKEditor = new CKEditor();
            $CKEditor->basePath = $this->webroot.'js/ckeditor/';

            return $CKEditor->editor($options['name'], $value, $config, $events);
        }
    }
    ?>


4. Include fckeditor.js in each view that will use it, or in your
layout if you'll be using it in several views. eg. default.ctp

View Template:
``````````````

::


    <?php
    echo $javascript->link('ckeditor/ckeditor');
    ?>

5. Include the helper to your view's controller or the AppController.
eg. app_controller.ctp

Controller Class:
`````````````````

::

    <?php
    var $helpers = array('Html', 'Form', 'Javascript', 'Cksource');
    ?>

6. Now all that's left to do is create your form. Now instead of using
$form you use $cksource. eg. demo.ctp

View Template:
``````````````

::


    <?php
    echo $cksource->create('CKSource');
    echo $cksource->ckeditor('example1');

    $config['toolbar'] = array(
        array( 'Source', '-', 'Bold', 'Italic', 'Underline', 'Strike' ),
        array( 'Image', 'Link', 'Unlink', 'Anchor' )
    );
    $events['instanceReady'] = 'function (ev) {
    	      alert("Loaded: " + ev.editor.name);
    	  }';

    echo $cksource->ckeditor('example2', array('value'=>'It works!', 'config'=>$config, 'events'=>$events));
    echo $cksource->end();
    ?>



.. _CKEditor 3.1: http://ckeditor.com/download

.. author:: wernerhp
.. categories:: articles, helpers
.. tags:: WYSIWYG,editor,fck editor,ckeditor,cksource,ckfinder,Helpers

