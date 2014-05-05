Du_BundleFu helper - Simple CSS and JavaScript file bundling
============================================================

[url=http://github.com/dotsunited/du-bundlefu]Du_BundleFu[/url] is PHP
5.3+ library which bundles multiple css/javascript files into a big
package and sends it out at once. This helper integrates Du_BundleFu
into your CakePHP applications.
In short, it turns this:

View Template:
``````````````

::

    <script type="text/javascript" src="/js/jquery.js"></script>
    <script type="text/javascript" src="/js/jquery.myplugin.js"></script>
    <script type="text/javascript" src="/js/app.js"></script>
    <script type="text/javascript" src="/js/app.module.js"></script>
    <link media="screen" type="text/css" href="/css/reset.css">
    <link media="screen" type="text/css" href="/css/jquery.myplugin.css">
    <link media="screen" type="text/css" href="/css/app.css">
    <link media="screen" type="text/css" href="/css/app.module.css">

Into this:

View Template:
``````````````

::

    <link href="/css/cache/bundle_3f84da97fc873ca8371a8203fcdd8a82.css?1234567890" rel="stylesheet" type="text/css">
    <script src="/js/cache/bundle_3f84da97fc873ca8371a8203fcdd8a82.css?1234567890" type="text/javascript"></script>

It is highly inspired by the Ruby on Rails plugin `bundle-fu`_.


Installation
~~~~~~~~~~~~

Install the Du_BundleFu library. This can be done via PEAR:

::

    pear channel-discover pear.dotsunited.de
    pear install dotsunited/Du_BundleFu

Place `bundle_fu_helper.php`_ in app/views/helpers and load the helper
inside your controllers:

Controller Class:
`````````````````

::

    <?php 
    class MyController extends AppController {
        var $helpers = array('BundleFu');
    }
    ?>

The bundle files will be stored under your document root (the
app/webroot directory). The css bundles in app/webroot/css/cache and
the javascript files in app/webroot/js/cache. You should create these
folders and make them writable by PHP.


Usage
~~~~~

The helper captures link and script tags in your views and bundles
them. To capture, surround the tags with a start() and a end() call:

View Template:
``````````````

::

    <?php $bundleFu->start(); ?>
    
    <script type="text/javascript" src="/js/jquery.js"></script>
    <script type="text/javascript" src="/js/jquery.myplugin.js"></script>
    <script type="text/javascript" src="/js/app.js"></script>
    <script type="text/javascript" src="/js/app.module.js"></script>
    <link media="screen" type="text/css" href="/css/reset.css">
    <link media="screen" type="text/css" href="/css/jquery.myplugin.css">
    <link media="screen" type="text/css" href="/css/app.css">
    <link media="screen" type="text/css" href="/css/app.module.css">
    
    <?php $bundleFu->end(); ?>

Capturing can be done as often as you want.

To output the tags for the bundles, simply call render():

::

    <?php echo $bundleFu->render(); ?>

This will output something like this:

View Template:
``````````````

::

    <link type="text/css" src="/js/cache/bundle_3f84da97fc873ca8371a8203fcdd8a82.css?1234567890">
    <script type="text/javascript" src="/js/cache/bundle_3f84da97fc873ca8371a8203fcdd8a82.css?1234567890"></script>

You can also output the link and script tags separately:

View Template:
``````````````

::

    <?php echo $bundleFu->renderCss(); ?>
    <?php echo $bundleFu->renderJs(); ?>

If you want to output a XHTML compliant tags, do:

View Template:
``````````````

::

    <?php $bundleFu->setRenderAsXhtml(true); ?>

before you call any render*() method.


Notes
~~~~~

1. Du_BundleFu automatically detects when a bundled file has changed
and regenerates the bundle.

2. All content inside of start() and end() will be lost. Be sure to
only put css / js includes inside of the block.

3. External dependencies via querystring loading will not work:

View Template:
``````````````

::

    <script src="/js/scriptaculous.js?load=effects,controls" type="text/javascript"></script>


Instead, you'll need to include each javascript file as normal.

4. Scripts / stylesheets are detected by parsing the output and
looking for include files. HTML comments are ignored, so if you
comment out a script like this:

View Template:
``````````````

::

    <!-- <script src="/js/script.js" type="text/javascript"></script> -->


the comment will be ignored and the file will be bundled anyways. Be
sure to comment out via PHP:

View Template:
``````````````

::

    <?php /* <script src="/js/script.js" type="text/javascript"></script> */ ?>

Happy bundling!

.. _bundle-fu: http://code.google.com/p/bundle-fu/
.. _bundle_fu_helper.php: http://github.com/dotsunited/du-bundlefu/raw/master/integration/cakephp/bundle_fu.php

.. author:: jsor
.. categories:: articles, helpers
.. tags:: Helpers

