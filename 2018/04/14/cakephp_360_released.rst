CakePHP 3.6.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.0. This is the first stable release of 3.6.0. 3.6.0 provides a number
improvements both large and small to CakePHP.

In following with our :doc:`previously announced roadmap
</2017/06/23/upcoming-cakephp-roadmap>` work will now begin on 4.0. This work
will take place in the ``4.x`` branch, while the ``master`` branch contains
``3.6.x``.

Upgrading to 3.6.0
------------------

You can use composer to upgrade to CakePHP 3.6.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.6.*"

Deprecation Warnings
--------------------

3.6.0 adds runtime deprecations for all previously deprecated functions and
behaviors. These deprecation warnings represent most of the breaking changes
that will come in 4.0.0. By resolving deprecation warnings in your application
now you will have a simpler upgrade experience when 4.0.0 is ready.

Because fixing all the deprecation warnings in a large application can be
a non-trivial task you will likely want to disable deprecation warnings allowing
you to make incremental progress in fixing them. To disable deprecation warnings
set ``Error.errorLevel`` to ``E_ALL ^ E_USER_DEPRECATED`` in **config/app.php**.

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-6-migration-guide.html#deprecations>`__
has the full list of deprecated methods and their replacements. Deprecated
features will continue to exist and behave as they always have until 4.0.0

What's new in 3.6.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-6-migration-guide.html>`_ has
a complete list of what's new in 3.6.0. We recommend you give that page a read
when upgrading.

* New Middleware - New middleware was added to parse encoded request bodies,
* Improved Console Environment - 'Command' classes have been added providing
  a simpler and more flexible abstractions to build CLI applications
* Improved Plugins - Plugins can now declare a plugin object that defines how
  a plugin integrates into the application. This makes installing plugins
  simpler and provides plugin authors better integration hooks.
* Binary UUID support - For engines that support them binary UUIDs are
  available.
* Entity Routing - A new routing class makes it simpler to generate routes that
  require multiple entity properties by accepting an entire entity as a route
  parameter.
* Compact Routes - Route targets can now be defined with a compact string
  format. E.g. ``Bookmarks::view``.
* Cached Routes - Your application's routes can now be cached improving startup
  time for applications with a large number of routes.

Contributors to 3.6.0
---------------------------

Thank you to all the contributors that helped make this release happen:

* AD7six
* ADmad
* Andrej Griniuk
* Anton Nguyen
* Ceeram
* Code-Working
* Dustin Haggard
* Elias De Vos
* Eugene Ritter
* Florian Krämer
* Gabriel Caruso
* Gene Ritter
* Hideki Kinjyo
* Jeremy Harris
* Johannes Jordan
* Jorge González
* Jose Diaz-Gonzalez
* Joshua Lückers
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Mathew Foscarini
* Michael Hoffmann
* Raúl Arellano
* Robert Pustułka
* Ronald Chaplin
* antograssiot
* chinpei215
* inoas
* mosaxiv
* ndm2
* saeideng

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 3.6.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
