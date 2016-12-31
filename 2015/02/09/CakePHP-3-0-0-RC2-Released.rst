CakePHP 3.0.0-RC2 Released
==========================

The CakePHP core team is excited to announce the release of CakePHP
3.0.0-RC2.

The CakePHP core team is excited to announce the release of CakePHP
3.0.0-RC2. Our plan is that this will be the final 3.0.0 release
candidate and in ~6 weeks time 3.0.0 stable will be released. Since
3.0.0-RC1, we've been hard at work incorporating community feedback,
fixing many issues and improving the documentation.


Upgrading From an Earlier 3.0.0 release
=======================================

When upgrading from an earlier 3.0.0 release there are a few important
changes you'll need to make.


Plugin Installation
-------------------

The use and role of the CakePHP Plugin installer has changed and
requires the following updates to your app's composer.json file:

::

    "require": {
        "cakephp/plugin-installer": "*",
        "cakephp/bake": "dev-master"
    },
    "scripts": {
        "post-autoload-dump": "Cake\\Composer\\Installer\\PluginInstaller::postAutoloadDump"
    }

These additions will ensure that your plugins continue to install
correctly. Plugins installed with composer will now be installed under
`/vendor`. This change was done to make the separation between
external and in-app plugins clearer. Having both in the same directory
was confusing for a number of users.


String renamed to Text
----------------------

In preparation for PHP7 and HHVM, the String class was renamed to
`Cake\Utility\Text`. The old class name continues to work but will be
removed in a future 3.x release.


Configuration File Changes
--------------------------

Configuration files loaded through `Configure::load()` previously
required the extension. The extension being present made switching
configuration file formats hard. For RC2, you must remove the
extensions. So `Configure::read('app.php')` is now
`Configure::read('app')`. PHP based configuration files should now
return their data instead of setting the `$config` variable. The
`$config` variable is now deprecated and will be removed in a future
3.x release.


ORM Callback Consistency
------------------------

The various ORM callbacks had somewhat inconsistent types used for the
`$options` parameter. All callbacks will now receive an `ArrayObject`
for the `$options` parameter. Query::formatResults() no longer gets
the query as an argument either. If you need access to the query from
a result formatter, use a closure.


EventManager::detach() and EventManager::attach() are deprecated
----------------------------------------------------------------

These methods have been replaced with `on()` and `off()`. These new
methods use an interface much like jQuery's methods. `attach()` and
`detach()` are now deprecated and will be removed in a future 3.x
release. We'd like to welcome Jad Bitar (jadb), Walther Lalk (dakota)
and Anthony Grassiot (antograssiot) to the core team. Each of them has
helped make 3.0.0 what it is today.

For more details on all the changes in 3.0.0, you should consult the
`migration guide`_. In closing, we'd like to thank all of the people
that have helped so far with the 3.0 release. Download a `packaged
release`_.


.. _migration guide: https://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html
.. _packaged release: https://github.com/cakephp/cakephp/releases/3.0.0-RC2

.. author:: markstory
.. categories:: release, news
.. tags:: release,CakePHP,News
