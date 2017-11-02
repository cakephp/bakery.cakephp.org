CakePHP 3.5.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.5. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.4...3.5.5>`_ for every commit.

* SQLServer no longer reports double column lengths for NVARCHAR and NCHAR
  columns.
* ``IntegrationTestSuite::enableCsrfToken()`` no longer emits errors when the
  POST body is a string.
* ``Response::getType()`` has been added as a replacement for
  ``Response::type()``.
* ``Network\Socket`` now supports explicit use of TLS1.1 and 1.2. Support for
  SSL2 is deprecated and will be removed in 4.0.0.
* ``IntegrationTestCase::assertResponseCode()`` now allows custom messages to be
  set.
* ``Cake\Http\Client\FormData::addFile()`` now adds parts as documented.
* ``Router::$initialized`` is deprecated. As we migrate to routes being loaded
  via middleware this property will no longer be in use.
* ``TableSchema`` now provides more succinct debug information.

Contributors to 3.5.5
----------------------

We'd like to welcome `ravage84 <https://github.com/ravage84>`_ to the CakePHP
core team. Marc is a long time contributor to both the documentation and code.
We look forward to more involvement from Marc as we work on 3.6.0 and beyond.

Thank you to all the contributors that helped make this release happen:

* ADmad
* Chris Valliere
* Dmitrii Romanov
* Edgaras Janušauskas
* Mark Scherer
* Mark Story
* Robert Pustułka
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
