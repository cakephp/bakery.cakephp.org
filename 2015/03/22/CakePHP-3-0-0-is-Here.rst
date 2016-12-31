CakePHP 3.0.0 is Here!
======================

The CakePHP team is thrilled to announce the immediate availability of
version 3.0.0 stable.

The CakePHP core team is thrilled to announce the release of CakePHP
3.0.0. This is the first API stable release for the 3.0 branch. This
release is a backwards incompatible release with previous CakePHP
versions. The new minimum requirements for CakePHP are:

+ PHP 5.4.16 or greater.
+ mbstring extension
+ intl extension

Some of the key features in CakePHP 3.0 are outlined in the following
sections.


Key Features
============


A New ORM
---------

The largest and most exciting change in CakePHP 3.0, is the new ORM.
While the Model layer in CakePHP has served the community very well
for the past 8 years, we felt there was a big opportunity to learn
from the tools other frameworks provide and create a flexible and
powerful ORM for CakePHP. We are very proud of the results. The
`ORM migration guide`_ gives an overview of the new ORM, and how it
differs from the old one.

Some of the key features of the new ORM are:

+ Use of the `Datamapper Pattern`_.
+ Support for different `eager loading strategies`_.
+ Improved `query building with a fluent interface`_.
+ Embedded support for data post-processing with a `full featured
  collections library`_.
+ Support for composite primary keys.
+ Ability to both return plain arrays or objects as results.
+ `Custom data types`_ logic for casting complex types from, and to,
  the database.



Faster and More Flexible Routing
--------------------------------

Reverse routing has almost consistent time complexity now. In previous
releases reverse routing performance decreased as the number of routes
increased. Thanks to named routes and some additional optimizations,
routing performance will not degrade even with large numbers of
routes.

With the usage of routing scopes, routes can also be parsed and
dispatched even faster than in previous releases of CakePHP. You can
learn more about the new Router in the `Routing section of the
manual`_.


Improved Migrations
-------------------

A more powerful `migrations`_ plugin based on `phinx`_ allows you to
easily create and deploy migrations for your application.


Better Internationalization
---------------------------

The I18n subsystem was completely rewritten to take advantage of the
*intl* PHP extension. This allows CakePHP to offer:

+ `Feature-rich translation messages`_.
+ `A locale-aware Time Library`_.
+ `A locale-aware Number Library`_.



Improved Debugging Toolbar
--------------------------

DebugKit has been rebuilt for 3.0 and offers more features than ever
before with less overhead to your application. DebugKit is installed
by default in the new application skeleton.

|DebugKit History Panel|

Composer Usage
--------------

CakePHP, the Application skeleton and several components (`bake`_,
`acl`_, `migrations`_ and `DebugKit`_ are now installed with composer.
We recommend using composer for installing CakePHP as it greatly
simplifies maintaining the dependencies for your application.


Standalone libraries
--------------------

A number of CakePHP libraries have been split out into standalone
libraries. Each of these libraries can be used outside of CakePHP
applications, or in a 2.x application where you want to start
leveraging some of the new features in 3.0.


View Cells
----------

View cells are small classes that offer controller-like functionality
but can be used directly in the view to pull data from any source and
render certain template. `Read more about View Cells`_.


Getting started
===============

On top of the framework changes, we've created a new repository for
the application skeleton[3]. You can install this and the development
preview of CakePHP using composer[4]. After downloading and installing
composer you can use:

::

    $php composer.phar create-project cakephp/app


This will generate a new application, so you can start experimenting
with CakePHP 3.0.


Learn More With the Documentation
=================================

Once you have an application started, you can read
`the quickstart guide`_ or `migration guide`_ to learn more about all
the changes and new abilities in CakePHP 3.0.


Community Plugins
=================

Even though CakePHP 3.0 is young, it already counts on a big community
behind it. A big list of plugins has been created for this new version
and some of the favorite plugins that are used for version 2 have
already been upgraded.
You can check the `list of CakePHP 3 community plugins`_. To get an
overview of what is available and what still needs to be upgraded to
the new version.

This new release of CakePHP has been a few years in the making and
we're very thankful for all the help we've received. From
documentation edits, to pull requests and bug reports, we've been
impressed with the level of community involvement starting from before
the first development preview.

Download a `packaged release`_ or get started with
`the quickstart guide`_.


.. _bake: https://github.com/cakephp/bake
.. _query building with a fluent interface: https://book.cakephp.org/3.0/en/orm/query-builder.html
.. _DebugKit: https://github.com/cakephp/debug_kit
.. _acl: https://github.com/cakephp/acl
.. _the quickstart guide: https://book.cakephp.org/3.0/en/quickstart.html
.. _ORM migration guide: https://book.cakephp.org/3.0/en/appendices/orm-migration.html
.. _eager loading strategies: https://book.cakephp.org/3.0/en/orm/associations.html#hasmany-associations
.. _Custom data types: https://book.cakephp.org/3.0/en/orm/database-basics.html#adding-custom-types
.. _Read more about View Cells: https://book.cakephp.org/3.0/en/views/cells.html
.. _Feature-rich translation messages: https://book.cakephp.org/3.0/en/core-libraries/internationalization-and-localization.html#using-variables-in-translation-messages
.. _migrations: https://github.com/cakephp/migrations/
.. _phinx: https://phinx.org/
.. _full featured collections library: https://book.cakephp.org/3.0/en/core-libraries/collections.html
.. _Datamapper Pattern: https://book.cakephp.org/3.0/en/orm.html#models
.. _A locale-aware Time Library: https://book.cakephp.org/3.0/en/views/helpers/time.html
.. _migration guide: https://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html
.. _list of CakePHP 3 community plugins: https://github.com/FriendsOfCake/awesome-cakephp
.. _packaged release: https://github.com/cakephp/cakephp/releases/3.0.0
.. _Routing section of the manual: https://book.cakephp.org/3.0/en/development/routing.html
.. _A locale-aware Number Library: https://book.cakephp.org/3.0/en/views/helpers/number.html
.. |DebugKit History Panel| image:: https://book.cakephp.org/3.0/en/_images/history-panel-use.gif

.. author:: lorenzo
.. categories:: news
.. tags:: release,CakePHP,News
