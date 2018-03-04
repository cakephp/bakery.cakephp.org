CakePHP 3.5.13 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.13. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.13. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.12...3.5.13>`_ for every commit.

* ``Form`` now allows schema classes to be customized via the ``_schemaClass``
  property.
* A notice error in the missing template error page was fixed.
* Tables with no primary key can no longer be updated by the ORM. Instead of
  a dangerous update operation an exception will be raised.
* Entity virtual fields are now included in debug output.
* PaginatorComponent no longer prefixes sort fields. This makes defining
  ``sortWhitelist`` easier.
* Improved API documentation.
* Session configuration in integration test cases should not emit errors in
  PHP7.2 with database sessions.
* ``FormHelper`` now accepts ``multiple => false`` to disable multi-select
  generation.

Contributors to 3.5.13
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bryan Crowe
* Cauan Cabral
* David Yell
* Jose Diaz-Gonzalez
* Keoma
* Mark Scherer
* Mark Story
* saeideng
* sak39

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

