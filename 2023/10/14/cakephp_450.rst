CakePHP 4.5.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.5.0. This is the first stable release of 4.5.0. 4.5.0 provides a number
improvements to CakePHP. 4.5.0 introduces a large number of deprecation warnings
aimed at assisting with future upgrades to CakePHP 5.0.

Upgrading to 4.5.0
------------------

You can use composer to upgrade to CakePHP 4.5.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:4.5.*"

Deprecation Warnings
--------------------

4.5 introduces a few deprecations. All of these features will continue for the
duration of 4.x but will be removed in 5.0. See the `migration guide
<https://book.cakephp.org/4/en/appendices/4-5-migration-guide.html>`_.

What's new in 4.5.0?
--------------------

The `migration guide
<https://book.cakephp.org/4/en/appendices/4-5-migration-guide.html>`_ has
a complete list of what's new in 4.5.0. We recommend you give that page a read
when upgrading. A few highlights from 4.5.0 are:

- ``bin/cake cache clear_group <name>`` was added. This command gives a CLI
  interface to clearing a specific cache group.
- ``ComponentRegistry`` is now automatically added to your application's
  :term:`DI container`.
- ``Controller::addViewClasses()`` was added. This method lets you build
  a controller's view classes programatically.
- Database and ORM connections now support ``read`` and ``write`` connection roles. 
  Connection roles let you scale an application up by using read-replicas.
  When defining connections, roles can be configured with ``read`` and ``write`` keys 
  in the connection config that override the shared config.
- New methods were added to queries to select the ``read`` or ``write``
  connection role to be used.
- ``ModelAwareTrait::fetchModel()`` was added. This method works similar to
  ``loadModel()`` but does not set the model as an attribute.
- The development error page design has been improved. It now renders chained
  exceptions and makes navigating stack traces easier as each frame can be
  collapsed individually.
- Console exception messages now include stack traces for chained exceptions.
- ``EntityTrait::$_hasAllowsNull`` was added. This property allows you to
  incrementally opt-in to a breaking change present in 5.x for
  ``EntityTrait::has()``.
- ``View::addHelper()`` was added. This method compliments ``addBehavior()`` and
  ``addComponent()``.

Contributors to 4.5.0
---------------------

Thank you to all the contributors that helped make 4.5 happen:

* ADmad
* Alejandro Ibarra
* Brian French
* Chris Nizzardini
* Jaro Varga
* Jose Daian
* Kevin Pfeifer
* Lars Ebert
* leon.schaub
* Marcelo Rocha
* Mark Scherer
* Mark Story
* Matthias Wirtz
* othercorey
* Roland Waldner
* wowDAS Ing. Markus Ramšak

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 4.5.0 is a large
release and would not have been possible without the community support and
feedback.

What's Next
-----------

With both 5.0 and 4.5 shipped the core team's focus will be primarily on CakePHP
5.x. Future 4.x releases will be primarily community driven. Feature and bugfix
releases for 4.x will continue until September 2025. Security fixes will
continue for 4.x until September 2026.

The roadmap for 5.x is still under development. We're interested in making the
upgrade from 4.5.0 to 5.0 a smooth one, and would appreciate any feedback you
have on upgrade difficulties. Please open an issue and get the discussion started.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
