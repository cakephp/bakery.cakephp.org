Markdown plugin for CakePHP 2.+
===============================

Can be used to convert markdown to HTML markup. It may be useful, for
example, to create a help session in a system. That way you can also
put your help files on github which also has an interpreter of
markdown files.


Installation
~~~~~~~~~~~~
You can clone the plugin into your project (or if you want you can use
as a `submodule`_):

::

    
    cd path/to/app/Plugin or /plugins
    git clone https://github.com/maurymmarques/markdown-cakephp.git Markdown

Bootstrap the plugin in app/Config/bootstrap.php:

::

    
    CakePlugin::load(array('Markdown' => array('bootstrap' => true)));



Usage
~~~~~
Enable the helper using the `plugin syntax`_
If desired, set the component to assist with the return of data from
the markdown.

::

    
    // in app/Controller/BakeriesController.php
    class BakeriesController extends AppController {
    
            public $helpers = array('Markdown.Markdown');
            public $components = array('Markdown.Markdown');
    
            public function index() {
                $this->set('textInMarkdownFormat', $this->Markdown->getFile($pathToFile));
            }
    }

In the view you can use something like:

::

    
    // in app/View/Bakeries/index.ctp
    echo $this->Markdown->transform($textInMarkdownFormat);



GitHub
~~~~~~
`https://github.com/maurymmarques/markdown-cakephp`_

.. _submodule: http://help.github.com/submodules
.. _plugin syntax: https://book.cakephp.org/2.0/en/appendices/glossary.html#term-plugin-syntax
.. _https://github.com/maurymmarques/markdown-cakephp: https://github.com/maurymmarques/markdown-cakephp

.. author:: maurymmarques
.. categories:: articles, plugins
.. tags:: markup,plugin,html,convert,markdown,Plugins

