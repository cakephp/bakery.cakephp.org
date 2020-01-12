CakePHP 4.0.2 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.2. This is a maintenance release for the 4.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.0.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.0.1...4.0.2>`_ for every commit.

* An exception is now raised in development mode if the generated alias name for
  a table + column would exceed the maximum identifier length for your database
  platform.
* ``FormProtectionComponent`` now checks unlockedFields correctly.
* The deprecation warning in ``RequestHandlerComponent`` for parsing request
  bodies was removed. Conditionally triggering it had too many edge cases and
  was confusing users.
* Improved formatting of API documentation examples.
* The ORM more efficiently traverses and transforms query objects improving
  performance for all ORM operations.
* Associations that use ``formatResults`` and change the associated entities no
  longer result in records being marked as dirty when records are read.
* ``Cache`` and ``Log`` now handle numeric engine names correctly.
* Errors and warnings emitted while DebugKit is active now reference the correct
  file and line.
* Dependencies on abandoned zendframework packages are now referencing the
  Laminas project.
* Using ``contain()`` with a field list on a BelongsToMany association now works
  correctly.
* Session cookies now have ``SameSite=Lax`` instead of strict to better emulate
  how session cookies worked in the past.
* View element caching now works when elements are in subdirectories.
* ``PaginatorHelper::first()`` and ``last()`` now apply the ``url`` option when
  the title parameter is a string.

Contributors to 4.0.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Mark Scherer
* Mark Story
* gregs
* o0h
* othercorey
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
