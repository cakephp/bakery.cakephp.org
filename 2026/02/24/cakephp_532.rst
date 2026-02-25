CakePHP 5.3.2 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.3.2. This is a maintenance release for the 5.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.3.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.3.1...5.3.2>`_ for every commit.

* Improved API documentation.
* Fixed incorrect cache key usage within ``Inflector``.
* Fixed ``isset`` bug in debug output formatters.
* Fixed loose equality comparisons.
* Made ``EventInterface`` template covariant, improving type inference.
* Improved performance of DTO projection. Benchmark results show ~70% reduction
  in DTO mapping overhead.
* Add ``BIT`` type support to ``MysqlSchemaDialect``. This improves
  compatibility with existing migrations.
* Add support for a ``fixed`` option to the ``binary`` type in MySQL. This
  enabled migrations to preserve fixed/variable length binary column types.
* Add collation support for uuid columns in MySQL.
* Fixed reflection of ``ON UPDATE CURRENT_TIMESTAMP`` in MySQL.
* Command names are now coloured in help output.
* ``PaginatorHelper::limitControl()`` now preserves passed parameters in the form
  action.
* Updated anchor links in documentation to match new book.cakephp.org site.
* ``BelongsToMany::unlink()`` now returns ``false`` if deleting the association
  link fails.
* Improve generic type annotations in several places.
* ``QueryException`` now contains the connection that an error is from to
  improve debugging of multi-connection applications.
* Update to support PHPUnit 13, and continue to adopt Mockery for mocks.
* Application rules ``setError()`` now handles dotted field paths consistently
  with other ORM components.
* Fix sliding window rate limiter boundary conditions because of rounding down.
* Fix compatibility issues with PHP 8.4 and database reflection queries that
  trigger errors under PHP 8.4's more strict float-to-int coercion.
* ``FormHelper`` will no longer mark fields as required, when they have
  a callable condition in a ``allowEmpty*()``.


Contributors to 5.3.2
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Jasper Smet
* Kevin Pfeifer
* kuldeep22somaiya
* Marc Würth
* Mark Scherer
* Mark Story
* othercorey

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
