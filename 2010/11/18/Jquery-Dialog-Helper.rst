Jquery Dialog Helper
====================

Jquery dialog Helper is a useful helper.It help you to write only
native PHP code and get a JQuery dialog box.

Before we starting this tutorial ,we should note about That you can
find all steps in attachment.
I packed app folder of cakePHP which I run it before and attached it
as zip file,so that you can download it `here`_ and see the result.

`download attachment`_

For use this helper you should following this step:

1) download `JQuery`_ & `JQuery UI`_

2) create structure in your cakePHP webroot::

    |---webroot\
    | -----js\
    |---jquery\
    |------jquery.js
    |-------ui\
    |----"jquery ui files"
    |-----css\
    |---jquery\
    |---ui\
    |----Jquery ui themed

3) download Jquery Helper as a attachment's file.

4) add jquery helper to your controller

::

    <?php
    class UsersController extends AppController {
        var $name = 'Users';
        var $uses = array();
        var $helpers = array('Jdialog');

        function index() { }
    }
    ?>

5)create your view an add this script on it.

::

    <?php
    echo $this->Jdialog->loadScripts();
    //Optional: you can defaine id for dialog box.
    $this->Jdialog->setId("dialog");
    //set Title of you'r dialog.
    $this->Jdialog->setTitle(__("Title Of Box",true));
    //add options for your dialog
    $this->Jdialog->addOption('autoOpen','true');
    $this->Jdialog->addOption('modal','true');
    //Add Text which can be a pragraph.
    $this->Jdialog->addItem("This is the default dialog which is useful for displaying information.");
    //add Html From element
    $this->Jdialog->addItem($this->Form->input('name'));
    //Add Required buttons for you'r dialogs.
    $this->Jdialog->addButton(__("Confirm",true),'alert("milad")');
    //print your dialog html elments. echo $this->Jdialog->create();
    //print JQuery script which run and show you'r dialog box. echo
    $this->Jdialog->printScript();
    ?>


Note that you can change themed of dialog box by modified *
loadScripts * method of * Jdialog * Helper. I put some comment for
this change.

6)Finally you can see your dialog box.

Download Attachment
-------------------
You can download demo of Jdialog helper from `here`_


contact me
----------

I hope that * JdialogHelper * help you for escaping *javascript* and
writing clean and readable PHP script.I will happy if you can improve
this helper and also find bugs of it ,if so , please annonce me.

If you had any problem about using *jdialogHelper* , you could contact
me.

Email Address: `milad.jafary@gmail.com`_
`````````````````````````````````````````````






.. _here: http://www.arsh.ir/app/webroot/web_blogs/cakephp/jquery_dialog_helper.zip
.. _JQuery UI: http://jqueryui.com/download
.. _milad.jafary@gmail.com: mailto:milad.jafary@gmail.com
.. _JQuery : http://code.jquery.com/jquery-1.4.4.min.js

.. author:: milad.jafary
.. categories:: articles, helpers
.. tags:: helper,helpers,jquery,dialog,jquery helper,Helpers

