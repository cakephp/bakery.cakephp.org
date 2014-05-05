Set up IDE for CakePHP
======================

This tutorial is about how to set up IDE to provide the best help in
CakePHP developing.
Many times happens that you hit Ctrl+Space and nothing. What next?
Here is my solution how to develop comfortable in CakePHP. Some of you
already knew this method but new users might not.

This solution works with NetBeans IDE and Eclipse PHP plugin (I've
tested). If it works with another IDEs please make comment and write
name of the IDE.


Controller settings
~~~~~~~~~~~~~~~~~~~

Controller Class:
`````````````````

::

    <?php 
    <?
    class ControllerNameController extends AppController {
       var $name = 'ControllerName';
       var $uses = array('SomeModel');
    
       /**
        * Some model description (optional)
        * @var SomeModel
        */
       var $SomeModel;
    }
    ?>
    ?>

In this code everything is known except @var SomeModel. This
insignificant comment is the key to Ctrs+Space code proposals in
controller. This comment tells our IDE to search deeper in files. This
is whole magic.

How to do that in View files ?


View files
~~~~~~~~~~
In view files it's not very complicated at all. You have to write
somewhere file like this:

::

    
    <?
    exit();
    if(false) {
     $html = new $HtmlHelper;
     //and more if you want to
    }
    ?>

This file name whatever you want and put somewhere in your project.
Your IDE do all stuff independently. What you have to do is only write
more helpers. Don't include that file! This file presences is
sufficient.


Conclusions
~~~~~~~~~~~
This is the simplest way to achieve in my opinion the most comfortable
way of CakePHP developing.


.. author:: mytnik
.. categories:: articles, tutorials
.. tags:: configuration,ide,code,proposals,Tutorials

