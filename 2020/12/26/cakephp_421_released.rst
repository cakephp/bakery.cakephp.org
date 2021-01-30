CakePHP 4.2.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.1. This is a maintenance release for the 4.2 branch that fixes several
community reported issues. We'd like to thank `Xhelal Likaj
<https://github.com/xhlika>`_ for reporting the BREACH weaknesses via our
security process.

Bugfixes
--------

You can expect the following changes in 4.2.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.2.0...4.2.1>`_ for every commit.

* Fix fixture file casing.
* Improved API documentation for ``TimeHelper``.
* Added additional setup warnings for short ``Security.salt`` values. Ideally
  salt values are 32 bytes or longer.
* Fix null values being passed to controller actions when resolving
  dependencies.
* Fix BREACH weakness in ``SessionCsrfProtectionMiddleware``.

Contributors to 4.2.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Mark Scherer
* Mark Story
* Remi Collet

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
