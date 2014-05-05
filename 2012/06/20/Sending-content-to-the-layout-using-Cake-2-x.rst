Sending content to the layout using Cake 2.x
============================================

This post is based on Robert Conner's code for CakePHP 1.x., and I
made some changes to get it to work on CakePHP 2.x and add some
explanations on how to use it. The original post is on
http://bakery.cakephp.org/articles/rtconner/2007/08/28
/anything_for_layout-making-html-from-the-view-available-to-the-layout
Maybe many people have faced the problem for sending some content to
the layout on CakePHP. By saying content I mean not only a simple
string but a whole a piece of HTML code. To solve this, we can create
a Helper on CakePHP 2.x, according to the following steps:

1. Create the Helper
--------------------
On the Views/Helpers folder, you need to create the .php file for the
helper. In this case we will call it LayoutHelper.php

::

    
    class LayoutHelper extends AppHelper { 
    
     var $__blockName = null; 
    
     function blockStart($name) { 
     if (empty($name)) trigger_error('LayoutHelper::blockStart - name is a required parameter'); 
     if (!is_null($this->__blockName)) 
     trigger_error('LayoutHelper::blockStart - Blocks cannot overlap'); 
     $this->__blockName = $name; ob_start(); 
     return null; 
     } 
    
     function blockEnd(&$view) { 
     $buffer = @ob_get_contents(); 
     @ob_end_clean(); 
     $out = $buffer; 
     $view->viewVars[$this->__blockName . '_for_layout'] = $out; $this->__blockName = null; 
    } 
    
    function output($var) { 
     if (isset($var) && $var != null) 
     echo $var; 
     } 
     } 



2. Setting up the content
-------------------------
For setting up the content that we want to send to the layout, we use
the Helper

::

    
    $layout = $this->Helpers->load('Layout'); 
    $layout->blockStart('custom_content'); 

right after this, we specify the content that will be sent to the
layout

::

    
    <div>
    Custom content
    </div>

and we close the block

::

    
    $layout->blockEnd($this); 



3. Show the content
-------------------
For showing the content on the layout, we add the following

::

    
    $layout = $this->Helpers->load('Layout'); 
    $layout->output($custom_content_for_layout); 

As we can see, this is really simple and also very useful when trying
to customize the content on the layout according to the view we are
loading


.. author:: pollirrata
.. categories:: articles, helpers
.. tags:: layout helper,Helpers

