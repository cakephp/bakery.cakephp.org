CakePHP 5.2.6
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.6. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 5.2.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.5...5.2.6>`_ for every commit.

* Pagination now uses a cloned query to get a count instead of using the loaded
  records.
* Improved API docs.
* Fixed generation and reflection of unsigned integer column types in sqlite.
* Fixed deprecation errors in ``FormProtectionComponent``.
* Fixed translate behavior with iI8n locale that has options defined.
* Improved exception messages in ``SelectQuery``.
* Fixed error when xdebug is enabled and uninitialized properties are accessed.
* You can now join and contain the same table in an ``loadInto()`` operation.
* Datetime validation correctly handles booleans now.

Contributors to 5.2.6
----------------------

* ADmad
* Corey Taylor
* Eriknag
* Felix Kempf
* freefri
* Juan Pablo Ramirez
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* wowDAS Markus Ramšak

Thank you to all the contributors that submitted a pull request:

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
