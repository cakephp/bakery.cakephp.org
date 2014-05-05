Composer Plugin for CakePHP
===========================

Use Composer conveniently with your CakePHP application and get access
to a vast library of reusable PHP components and packages through
Packagist.


About Composer
--------------

`Composer`_ is a tool for dependency management in PHP. It allows you
to declare the dependent libraries your project needs and it will
install them in your project for you.

With `Packagist`_, you get access to a vast library of reusable PHP
components that will help a lot in your development work.


About this plugin
-----------------

This is a CakePHP plugin to use Composer conveniently with your
CakePHP 2.x project.

There is no need to pre-install Composer.
This plugin will automatically download the latest version if Composer
is not installed at your system.

Packages downloaded via this Composer plugin will be installed at `
APP/Vendor` as per CakePHP convention.


Quick links
-----------

+ `Download Composer CakePHP 2.x plugin`_
+ `Composer plugin GitHub page`_


How to use
----------

#. `Download the plugin`_ and place it at ` APP/Plugin/Composer`. Or
   via Git:

::

    cd APP/Plugin
    git clone git://github.com/uzyn/cakephp-composer.git Composer

#. Load the plugin by adding this line to the bottom of your app's `
   Config/bootstrap.php`:

::

    <?php
    CakePlugin::load('Composer', array('bootstrap' => true));

#. That's all! Composer is ready for use. ` composer.json` is located
   at ` APP/composer.json`. It is automatically created if it is not
   found. Packages are installed to ` APP/Vendor` as per CakePHP
   convention. Invoke Composer from command line with `
   Console/cakecomposer.c`. For example, to install `opauth/opauth`_
   using Composer's ` require` command.

::

    cd APP
    Console/cake composer.c require opauth/opauth:0.*

   To install packages defined at ` composer.json`

::

    Console/cake composer.c install

#. This plugin also makes use of Composer's autoloader. Start using a
   Composer-loaded classes right away without needing ` require()`, `
   include()` or ` App::import()`. For example, to instantiate a new
   Opauth object, simply instantiate Opauth from anywhere (model,
   controller, view, *literally anywhere*) in your CakePHP application:

::

    <?php
    $Opauth = new Opauth();



Issues & questions
------------------

+ Issues: `Github Issues`_
+ Twitter: `@uzyn`_
+ Email me: `chua@uzyn.com`_
+ About me: `U-Zyn Chua`_



.. _Composer plugin GitHub page: https://github.com/uzyn/cakephp-composer
.. _Packagist: http://packagist.org/
.. _U-Zyn Chua: http://uzyn.com
.. _chua@uzyn.com: mailto:chua@uzyn.com
.. _opauth/opauth: http://packagist.org/packages/opauth/opauth
.. _Github Issues: https://github.com/uzyn/cakephp-composer/issues
.. _Download the plugin: https://github.com/uzyn/cakephp-composer/zipball/master
.. _Download Composer CakePHP 2.x plugin: https://github.com/uzyn/cakephp-composer/zipball/master
.. _Composer: http://getcomposer.org/
.. _@uzyn: http://twitter.com/uzyn

.. author:: uzyn
.. categories:: articles, plugins
.. tags:: plugin,dependencies,Components,library,composer,packagist,dependency manager,packages,package manager,Plugins

