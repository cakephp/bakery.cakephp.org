CakePHP 3.0.12 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.0.12. This is a maintenance release for the 3.0 branch that fixes a couple
bugfixes and small enhancements.

Bugfixes
--------

You can expect the following changes in 3.0.12. See the `changelog
<https://cakephp.org/changelogs/3.0.12>`_ for every commit.

* ``RuleChecker::existsIn()`` handles nullable fields better.
* Entities created by plugin associations have the correct return value for
  ``source()``
* Case statements accept literal values now.
* Methods defined on Controller can never be used as actions. Before, methods
  redefined on AppController, or a subclass could be invoked as actions.
* Plugin dot syntax can no longer be used to reference controllers in URLs.
* ``LocaleSelectorFilter`` no longer sets the default locale. Instead it sets the
  active locale.
* AuthComponent correctly redirects when an application is in a subdirectory.

Enhancements
------------

* ``Query::orderAsc()`` and ``Query::orderDesc()`` were added. These methods
  make it possible to order on complex expressions.
* ``PaginatorHelper::next()`` and ``prev()`` accept a ``templates`` option now.
* The serialization format for ``Time`` objects can now be set with
  ``Time::setJsonEncodeFormat()``.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
