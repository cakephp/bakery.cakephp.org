CakePHP 3.6.6 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.6. This is a maintenance release for the 3.6 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.6.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.6.5...3.6.6>`_ for every commit.

* IntegrationTestCase now string casts all request data. This better emulates
  how HTTP POST data is handled.
* Improved API documentation.
* Routes using ``{var}`` now correctly calculate their static path segments
  making route parsing work correctly.
* ``Http\Client`` no longer lowercases cookie names when creating identifiers.
* ``Database\Query::fetchAll('obj')`` now returns all rows instead of just one.
* ``Table::saveMany()`` now restores entity state when saving fails due to
  database deadlocks or other operational errors.
* Improved compatibility between old and new plugin loading systems.
* ``BaseApplication::addPlugin()`` now creates a dynamic plugin class instead of
  throwing an error.
* ``RouteBuilder::loadPlugin()`` no longer results in duplicate plugin routes
  being loaded.
* ``TranslateBehavior`` now inherits the table locator used by the parent
  model.
* ``EntityTrait::setDirty()`` now defaults the second parameter to true.
* ``EntityTrait::setErrors()`` no longer uses ``array_merge()`` internally. This
  fixes issues when adding errors for multi-row fields.


Contributors to 3.6.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras Janušauskas
* Jeremy Harris
* Mark Scherer
* Mark Story
* Martijn de Hoog
* Robert Pustułka
* Tomas Saghy
* Walther Lalk
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
