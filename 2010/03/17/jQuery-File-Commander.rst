jQuery File Commander
=====================

A CakePHP 1.2.6 plugin which allow you to manage your server files
similar to Total Commander.


Description
~~~~~~~~~~~
jQuery File Commander front end is build with jQuery 1.4.1, it
generate two panels with files and allows to make basic operations on
them like copy, move, rename which are run on server files. As a
server base I create a controller and component which servs all
operations called by JFC (it's also very easy to make JFC working with
any other server side technology like python, ruby and more).


Available shortcuts (v0.3)
~~~~~~~~~~~~~~~~~~~~~~~~~~

Navigation keys
```````````````

#. space - file/folder selection
#. backspace - folder up
#. pgup, pgdown - scroll page up, down
#. home, end - to begining, end of file list
#. up, down - move cursor up, down
#. tab, left, right - move cursor between panels


Operation keys
``````````````

#. enter - open folder
#. f5 - copy selected file(s)/folder(s)
#. f6 - move selected file(s)/folder(s)
#. shift+f6 - rename current file/folder
#. del - delete selected file(s)/folder(s)
#. f7 - create new folder
#. f9 - reset path
#. ctrl+R - reload current view


Navigation keys
```````````````

#. FireFox 3.0.x - ok
#. Chrome 4.0.x - ok
#. IE 8 - use shift+f5 instead of F5



Installation
~~~~~~~~~~~~

Just copy the content of archive file to your application and you are
ready.


Configuration
~~~~~~~~~~~~~
In fc/controllers/fc_controller.php there is a variable

::

    
    public $pathToFiles = WWW_ROOT;

Here you can point to the folder where you want to manage your files.
There is also more paramaters you can set when creating JFC view.
Please see example view which is located in fc/view/fc/index.ctp to
see how to use them.

::

    
    var options = {
    	'imgPath':		"/fc/img/ext-ico/",
    	'lsPath':		"/fc/fc/ajax_ls",
    	'copyPath':		"/fc/fc/ajax_copy",
    	'movePath':		"/fc/fc/ajax_move",
    	'delPath':		"/fc/fc/ajax_del",
    	'renPath':		"/fc/fc/ajax_ren",
    	'mkdirPath':	"/fc/fc/ajax_mkdir",
    	'height':		400,
    	'leftPath':		'/',
    	'rightPath':	'/'
    };
    
    var fc = new FC('#fc', options);
    $(document).bind('keydown', function(event){
    	fc.keyDown(event);
    });

Short parameters description:

#. leftPath, rightPath - folder path for every panel (if paths are not
   given then panel start with last visited saved in cookies),
#. height - panels height in pixels
#. imgPath - path to files icons

Rest of the parameters allow to configure AJAX paths which are called
for files operations like lsPath, copyPath, movePath, delPath,
renPath, mkdirPath.


Demo and download
~~~~~~~~~~~~~~~~~
For the latest demo and sources please visit
`http://blog.niepokoj.com/en/cakephp/jquery-file-commander`_
For demo direct url `http://fc-demo.niepokoj.com/fc`_

.. _http://blog.niepokoj.com/en/cakephp/jquery-file-commander: http://blog.niepokoj.com/en/cakephp/jquery-file-commander
.. _http://fc-demo.niepokoj.com/fc: http://fc-demo.niepokoj.com/fc

.. author:: Quess
.. categories:: articles, plugins
.. tags:: jquery,plugin,jfc,file manager,Plugins

