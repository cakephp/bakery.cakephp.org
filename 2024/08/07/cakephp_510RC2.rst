CakePHP 5.1.0-RC2 Released
============================

The CakePHP core team is happy to announce the second release candidate for
CakePHP 5.1.0. Since the RC1 release the core team has added new features, and
includes bugfixes from the 5.0 releases. Some of the highlights of this work include:

* CakePHP will no longer check that ``zend.assertions`` is enabled in non-debug
  environments. The related ini setting cannot be controlled at the directory level,
  and cannot be changed in some shared/cloud hosting environments.
* Fixed ``BehaviorRegistry::removeBehavior()`` not clearing method maps.
* Fixed deprecations with PHPUnit 11 and made CakePHP base classes compatible
  with PHPUnit 11.
* Replaced internal usage of ``md5`` with ``xxh128``. This impacts hashes used
  for group prefixes in ``Cache``.
* Fixed ``IntegrationTestTrait::enableCsrfToken()`` causing GET requests that
  follow a POST request to fail.
* Added ``toFloat()``, ``toInt()``, ``toString()``, ``toBool()``, ``toDateTime()``,
  ``toDate()`` and ``toBool()`` to make it more ergonomic to convert request
  data into type-safe values.
* The new casting functions are used by ``ControllerFactory`` to cast parameters
  for controller actions.
* Components can now leverage the dependency injection container in their
  constructors.
* ``Console\Argument::hasArgument()`` no longer raises errors when arguments are
  undefined.
* ``ResultSetDecorator`` is no longer used internally by the ORM. Instead
  ``ResultSet`` is used directly.
* Added support for geospatial types of ``GEOMETRY``, ``POLYGON``, ``POINT``,
  and ``LINESTRING`` for database drivers that support them and emulated support
  for SQLite.
* The request returned by ``Router::getRequest()`` will now be updated after
  each middleware is processed, improving request mutations in error pages.
* The default ``valueSeparator`` for ``find(list)`` is now a space instead of
  ``;``. This makes results more useful for interfaces.

What's new in 5.1.0
-------------------

The `migration guide
<https://book.cakephp.org/5.next/en/appendices/5-1-migration-guide.html>`_ has
a complete list of what's new in 5.1.0. We recommend you give that page a read
when upgrading as it notes the behavior changes present in 5.1.0.

How you Can Help
----------------

You can help deliver 5.1.0 by contributing in one of many ways:

#. Check the `documentation <https://book.cakephp.org/5.next/en/>`_ for mistakes,
   outdated, unclear or broken examples. We've been trying to update the
   documentation as we go, but there are likely examples or sections we've
   missed.
#. Try it out! Give CakePHP 5.1.0 a test drive. Let us know how upgrading
   went and if there were any rough spots.
#. File issues for regressions in existing features, or suggest new features.
   Even if those features don't make it into 5.1.0, we're early in the process
   of planning 5.2 and value community feedback.

Contributors to 5.1.0-RC2
-------------------------

Thank you to all the contributors that have contributed to this release:

* Adam Halfar
* ADmad
* Jamison Bryant
* jun-taniai
* Mark Scherer
* Mark Story
* othercorey

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
