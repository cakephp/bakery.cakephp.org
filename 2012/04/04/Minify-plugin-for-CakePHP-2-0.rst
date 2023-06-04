Minify plugin for CakePHP 2.0+
==============================

`Minify`_ is an application that combines multiple CSS or Javascript
files, removes unnecessary whitespace and comments, and serves them
with gzip encoding and optimal client-side cache headers.
More info: `https://code.google.com/p/minify`_
For this plugin, the application Minify is inside Vendor


Installation
~~~~~~~~~~~~
You can clone the plugin into your project (or if you want you can use
as a `submodule`_)

::


    cd path/to/app/Plugin or /plugins
    git clone https://github.com/maurymmarques/minify-cakephp.git Minify

Bootstrap the plugin in app/Config/bootstrap.php:

::


    CakePlugin::load(array('Minify' => array('routes' => true)));



Configuration
~~~~~~~~~~~~~
Set the configuration file in your app/Config/core.php

::


    Configure::write('MinifyAsset', true);

If you do not want to use compression, set false. Create a folder
called **"minify"** in **app/tmp/cache** and give permission to
**read** and **write**.



Usage
~~~~~
Enable the helper using the `plugin syntax`_

::


    class BakeriesController extends AppController {
        public $helpers = array('Minify.Minify');
    }

This plugin uses `HtmlHelper`_, and works virtually the same. In the
view you can use something like:

::


    echo $this->Minify->css(array('default', 'global'));
    echo $this->Minify->script(array('jquery', 'interface'));



Observation
~~~~~~~~~~~
Minify is designed for efficiency, but, for very high traffic sites,
Minify may serve files slower than your HTTPd due to the CGI overhead
of PHP. See the `FAQ`_ and `CookBook`_ for more info. You can check
the performance results using the networking tools of the Google
Chrome or Mozilla Firefox with `Firebug`_ and `YSlow`_



GitHub
~~~~~~
Any criticism or suggestion is welcome on
`https://github.com/maurymmarques/minify-cakephp`_.

.. _submodule: https://help.github.com/submodules
.. _CookBook: https://code.google.com/p/minify/wiki/CookBook
.. _Firebug: https://addons.mozilla.org/pt-br/firefox/addon/firebug/
.. _YSlow: https://addons.mozilla.org/en-US/firefox/addon/yslow/
.. _HtmlHelper: https://book.cakephp.org/2.0/en/core-libraries/helpers/html.html
.. _plugin syntax: https://book.cakephp.org/2.0/en/appendices/glossary.html#term-plugin-syntax
.. _Minify: https://github.com/mrclay/minify
.. _FAQ: https://code.google.com/p/minify/wiki/FAQ
.. _https://code.google.com/p/minify: https://code.google.com/p/minify
.. _https://github.com/maurymmarques/minify-cakephp: https://github.com/maurymmarques/minify-cakephp

.. author:: maurymmarques
.. categories:: articles, plugins
.. tags:: javascript,CSS,CakePHP,plugin,Compression,performance,minify,Plugins

