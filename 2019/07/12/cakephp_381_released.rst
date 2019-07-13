CakePHP 3.8.1 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.1. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.0...3.8.1>`_ for every commit.

* Improved error messages when ``ConsoleIntegrationTestTrait`` is missing
  replies for interactive questions.
* Fixed how ``Http\Client\Adapter\CurlAdapter`` selects HTTP protocol versions.
* Added ``getVisible()`` to the annotations in ``EntityInterface``.
* Fixed ``Table::loadInto()`` not loading translations.
* Switched to using ``SCAN`` instead of ``KEYS`` to clear redis caches.

Contributors to 3.8.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Anne
* Anne van de Venis
* Marc Würth
* Mark Story
* Robert Pustułka
* Walther Lalk
* gregs

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
