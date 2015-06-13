CakePHP 3.0.7 Released
######################

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.0.7. 3.0.7 is a maintenance release for the 3.0 release series.

Bug Fixes in 3.0.7
--------------

* Time validation rules now accept 12:15pm
* Table names with .'s to access tables in other databases in MySQL, now
  correctly generate foreignKeys using conventions.
* Collection::sumOf() uses an identity function by default.
* Overlapping irregular inflections are now handled correctly.
* IntegrationTestCase::assertTemplate() now works when a view renders one or
  more cells.
* Custom fields used in pagination will not be auto-prefixed. This was
  a regression introduced in 3.0.6
* Fixed incorrect ORDER BY clauses on SQLServer. Older versions of SQLServer
  require that ORDER BY expressions be not constant.
* Bound parameters in columns for belongsToMany joint tables are now properly
  type cast to their statement representations.
* Parameter typehints in function expressions are now set correctly.
* EventManager::off() can now disable all events of a single type as documented.
* MySQL schema generation for unconventional tables has been improved.
* Radio button sets now always include the hidden field as long as the option is
  enabled.
* Identifier quoting in order by and ``is null`` and ``is not null`` expressions
  is now correct.
* TreeBehavior now aliases the fields used to sort.

Improvements in 3.0.7
---------------------

* AssetFilter now supports a ``cacheTime`` option to control the cache headers.
* RulesChecker features for the ORM were separated into a trait. This makes
  rules easier to reuse in other datasources.
* ``EventDispatcherInterface`` was added. This lets you use ``instanceof``
  instead of ``method_exists`` when testing if an object supports events.
* A console output test stub class has been added.
* Collection::extract() now supports the ``{*}`` wildcard when extracting
  properties.
* Console commands and tasks now support the ability to overwrite all files,
  removing the need to answer ``y`` to each file.
* All tests pass on PHP7.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues, writing documentation and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: CakePHP, release
