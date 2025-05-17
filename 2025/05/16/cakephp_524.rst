CakePHP 5.2.4
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.4. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 5.2.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.3...5.2.4>`_ for every commit.

* Improves foreign key reflection with sqlite to resolve gaps between
  functionality offered in migrations.
* Fixed a regression in ``EntityTrait::isModified()``.
* Fixed PHP warnings being emit when rendering a development error page for
  ``MissingActionException``.
* Fixed regressions that broke documented custom message loaders for ``I18n``.
* CLI options are now coerced to string to avoid type errors
  with ``ConsoleInputOption:`` constructor.
* Fixed regression with ``App.base`` configuration not being used.
* Added the ``clearUsesFlushDb`` option to ``RedisEngine``. When enabled this
  allows ``clear()`` and ``clearGroup()`` to use ``FLUSHDB``. This option should
  be used with caution as it will drop all keys in the current redis database.
* Primary key reflection in SQLServer now retains the primary key name to
  support primary key operations in migrations.
* Improved support for mockery, and increased usage of mockery in cakephp's
  tests.
* Replaced `PHPUnitConsecutiveTrait::withConsecutive()` with mockery's methods.

Contributors to 5.2.4
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Jamison Bryant
* Mark Scherer
* Mark Story
* Mirko Pagliai

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
