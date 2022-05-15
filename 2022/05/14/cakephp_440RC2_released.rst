CakePHP 4.4.0-RC2 Released
==========================

The CakePHP core team is proud to announce the second release candidate of
CakePHP 4.4.0. The 4.4.0 release will introduce several new features and
a handful of deprecations. 

New Features
------------

The `migration guide
<https://book.cakephp.org/4.next/en/appendices/4-4-migration-guide.html>`_ has
a complete list of what's new in 4.4.0. We recommend you give that page a read
when upgrading as it outlines the deprecations present in 4.4.

Changes Since 4.4.0-RC1
-----------------------

* The current request is now automatically added to your application's
  dependency injection container making it easier to have services that depend
  on the current request.
* Fixture schema reflection now clears the table registry to prevent errors with
  applications that initialize tables in ``initialize()`` hooks.
* ``PaginatorHelper::limitControl()`` now works with multiple pagination.
* Additional features on ``Debugger`` were deprecated in favour of using
  ``ErrorTrap`` instead.
* Pagination classes were moved under ``Cake\Datasources\Paging``.
* Renamed ``DefaultPaginator`` to ``NumericPaginator``.
* The experimental flag was removed from the dependency injection container. It
  is now considered a stable API.
* Improved the logging configuration in ``ErrorTrap`` and ``ExceptionTrap``.
* Fixed missing use of ``bindingKey`` in ``BelongsToMany`` associations.
* Improved handling of invalid cookie names.
* Improved content-negotiation with file types that have multiple content-type
  options.
* The ``FormContext`` adapter for ``FormHelper`` now supports non-default
  validation rule sets.
* Added a 'match all' type to ``View`` so that fallback view classes can be
  implemented in the new content-negotiation feature.
* Added ``deleteAsync()`` and ``clearBlocking()`` methods to the redis cache
  engine.
* Added new methods to ``ErrorLoggerInterface`` with annotations. The new
  ``logError()`` and ``logException()`` methods will replace the
  ``logMessage()`` and ``log()`` methods respectively in 5.x. Before using the
  new error handling subsystem you should update any custom error loggers.
* Improved API documentation.
* Removed usage of string interpolation that is deprecated in PHP 8.2

How you Can Help
----------------

You can help by trying out the RC in your application. Please open issues for
any new test failures or regressions the new version creates in your
application.

Contributors to 4.4.0-RC2
---------------------------

Thank you to all the contributors that have helped with 4.4.0:

* ADmad
* Andrii Pukhalevych
* Corey Taylor
* Danial Khoshkhou
* dependabot[bot]
* Gerasimos
* itosho
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* OJMichael
* othercorey
* Remy Bos

We would also like to thank Guarang Maheta for notifying us of a security issue
in ``bakery.cakephp.org`` and helping us resolve it.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
