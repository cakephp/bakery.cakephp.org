CakePHP 5.0.4
=============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.0.4. This is a maintenance release for the 5.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.0.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.0.3...5.0.4>`_ for every commit.

* Improve support for template paths being defined as an associative array.
* Improved output of ``cache_clear`` commands.
* Updated Sqlite mapping for ``binaryuuid`` to use ``UUID_TEXT``.
* Marshalling Date objects no longer attempts to set a timezone, as date values
  do not have timezones.
* The ``Exception.beforeRender`` event can now prevent default rendering from
  occurring by setting a result and stopping the event.
* Fixed regression in SQLite schema reflection for older versions of SQLite.
* Fixed off by one errors in code location for ``dd()``.
* Updated dependency on paragonie/csp-builder to accept 3.0
* The cookie assertions in ``IntegrationTestTrait`` now work with
  ``RedirectResponse`` values.
* Fixed dev error page rendering in PHP8.3
* Improved display of enum values in FormHelper.

Contributors to 5.0.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Chris Nizzardini
* fabian-mcfly
* Jens Mischer
* Jorge González
* Kevin Pfeifer
* Marc de Lima Lucio
* Marc Würth
* Mark Scherer
* Mark Story
* othercorey
* Robert Pustułka

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
