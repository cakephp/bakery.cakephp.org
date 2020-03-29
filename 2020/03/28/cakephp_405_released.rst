CakePHP 4.0.5 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.5. This is a maintenance release for the 4.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.0.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.0.4...4.0.5>`_ for every commit.

* SMTP delivery failure exceptions now include the error text received from the
  destination server.
* Improved API documentation.
* ``Table::saveMany()`` now correctly rollbacks a transaction when an entity
  other than the first fails to save because of application rules or database
  failure.
* ``ConsoleIntegrationTestTrait`` now uses mocked ``_out`` and ``_err`` objects
  if they have been set.
* ``ConsoleInput::read()`` now handles ``false`` values from ``fgets()`` and
  readline.
* ``CounterCacheBehavior`` now handles null association values better when
  custom finders are used.
* ``Http\Response`` now allows usage of unassigned HTTP status codes between 100
  and 599.
* Binary data in SQL query logs is now encoded as hexadecimal to improve
  readability of query logs.

Contributors to 4.0.5
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Jad Bitar
* Mark Scherer
* Mark Story
* Victor Eduardo de Assis
* nook24

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
