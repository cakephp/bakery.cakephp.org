CakePHP 3.3.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.1. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.


Bugfixes
--------

You can expect the following changes in 3.3.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.0...3.3.1>`_ for every commit.

* ``AssetFilter`` now interacts properly with PSR7 based applications.
* Cookie decryption when using the PSR7 stack now works properly.
* Regressions around marshalling associated data have been fixed.
* All associations now marshall correctly when TranslateBehavior is enabled.
* BelongsToMany ``_joinData`` records with complex properties now hydrate
  correctly again when loaded with find().
* ``Request::is()`` no longer caches results. This fixes an issue where
  parameterized detectors would return cached results when parameters are
  different.
* ``CakeEmail::deliver()`` correctly uses ``default`` as the default transport
  configuration instead of 'fast'.
* ``MiddlewareStack::insertAt()`` behaves correctly when adding non-Closure
  based middleware.
* Dispatcher filters are not doubly invoked when an application uses the PSR7
  HTTP stack and dispatcher filters.
* ``CrossSchemaTableExpression`` and automatic cross database join prefixing
  has been removed. This was a new feature in 3.3.0 that caused regressions for
  a number of folks. Removing the problematic feature feels like a better
  solution over trying to patch issues as they come up.
* Session cookie rotation works correctly, when setting custom cookies, and
  using the PSR7 HTTP stack.

Minor Enhancements
------------------

* ``Cake\ORM\SaveOptionsBuilder`` was added. This class provides a builder
  interface for building option sets for save operations. By using a fluent
  interface you can reduce the number of errors made.
* Exceptions are now raised when duplicate named routes are connected.

Contributors to 3.3.1
---------------------

Thank you to all the contributors that helped make this release happen:

*  Florian Krämer
*  Jad Bitar
*  José Lorenzo Rodríguez
*  Juan Basso
*  Mark Sch
*  Mark Story
*  Mirko Pagliai
*  Walther Lalk
*  antograssiot
*  saeideng

As always, we would like to thank all the contributers that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
