CakePHP 5.2.1
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.1. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 5.2.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.0...5.2.1>`_ for every commit.

- Column generation in Sqlite preserves commments now.
- ``BehaviorRegistry::set()`` now updates method and finder mappings.
- Fixed regression in ``Response::mapType()`` with array parameters.
- Update documentation for ``Table::buildRules()``.
- Several methods on ``NumberHelper`` had types widened to allow ``null``. This
  makes ``NumberHelper`` more ergonomic to use and increases compatibility with
  code from 4.x.
- Fixed regression where custom validation methods would have not get
  ``$context`` passed.
- Fixed regression in update queries with expressions in the ``SET`` clause.


Contributors to 5.2.1
----------------------

Thank you to all the contributors that submitted a pull request:

- ADmad
- fabian-mcfly
- Mark Scherer
- Mark Story
- mscherer

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
