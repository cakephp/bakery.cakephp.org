CakePHP 5.1.5
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.1.5. This is a maintenance release with a security fix for the 5.1 branch that fixes several
community reported issues and regressions. If you are having problems with the framework
breaking your application when you upgrade from 5.0.11 to 5.1, please open an
`issue <https://github.com/cakephp/cakephp/issues/new?template=bug_report.yml>`_.

Bugfixes
--------

You can expect the following changes in 5.1.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.1.4...5.1.5>`_ for every commit.

- Streamline composer dependencies. `lib-ICU` is already an implicit dependency
  through `intl`.
- Improve API docs.
- Minor optimizations, by removing redundant assignments, `empty()` and `isset()`
  checks.
- The console package no longer has a hard dependency on `Router`. Instead
  `Router` will only be used if it is installed.
- Correct column ordering being incorrect in reflected foreign key data with
  postgres.
- The `EavStrategy` behavior now uses the entity class of the attached table
  instead of the `Entity` base class.
- `QueryException` now includes the problematic SQL that was created the error.
- The utility package no longer has a hard dependency on the i18n package.
- Fixed falsey value handling in `XmlView`.
- Using cached schema metadata no longer creates a database connection.

Contributors to 5.1.5
----------------------

Thank you to all the contributors that submitted a pull request:

- ADmad
- Hermann Vallieri
- Iacovos Constantinou
- Kevin Pfeifer
- Mark Scherer
- Mark Story
- othercorey

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news, security
