CakePHP 3.10.1 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.10.1. This is a maintenance release for the 3.10 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.10.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.10.0...3.10.1>`_ for every commit.

* Fixed radio inputs generating duplicate id attribute values when values had
  trailing/leading ``-``.
* Fixtures now only reset sequences in SQLServer if required.
* Fix ``DateType`` not clearing time for ``DateTimeImmutable``.
* Fixed cascading deletes generating incorrect SQL when bindingKey values are
  null.

Contributors to 3.10.1
----------------------

Thank you to all the contributors that helped make this release happen:

* Marc Würth
* Mark Scherer
* Mark Story
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
