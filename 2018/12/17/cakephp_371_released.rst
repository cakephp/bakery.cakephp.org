CakePHP 3.7.1 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.7.1. This is a maintenance release for the 3.7 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.7.1. See the `changelog <https://github.com/cakephp/cakephp/compare/3.7.0...3.7.1>`_ for every commit.

* Fixed incorrect error messages when cells cannot find their template.
* Fixed a regression in ``assertCookieNotSet()``.
* Added missing ``@deprecated`` annotations on methods on Email.
* Improve typehints on array properties.
* Loosened type checking in integer and decimal type classes. Both these types
  now allow whitespace, and commas to accept more number formats.
* ``IntegrationTestTrait`` now uses annotations for its setup/teardown logic.
  This removes the need for awkward method aliasing when using the trait.
* ``Console\Arguments::getArgument()`` no longer raises a notice error on
  missing arguments.
* ``Console\ConsoleIo::createFile()`` will now recursively create directories if
  necessary. This improves compatibility with ``Shell::createFile()``.

Contributors to 3.7.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Florian Krämer
* Jeremy Harris
* Mark Scherer
* Mark Story
* Tomas Saghy
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
