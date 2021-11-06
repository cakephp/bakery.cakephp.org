CakePHP 4.3.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.3.1. This is a maintenance release for the 4.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.3.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.0...4.3.1>`_ for every commit.

* Fixed incomplete cloning when ``Database\Query`` is cloned.
* Fixed ``Query::modifier()`` not handling expression objects correctly.
* Improved array typehints in API documentation blocks.
* Fixed custom type mappings defined in Table classes not being used when
  inserting fixture rows with the new fixture system.
* Improved deprecation messages for ``QueryExpression::case()``.
* Fixed base path handling in ``HttpsEnforcerMiddleware``.

Contributors to 4.3.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Mark Scherer
* Mark Story
* mirko-pagliai
* ndm2
* othercorey
* Remi Collet

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
