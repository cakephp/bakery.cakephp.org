CakePHP 3.4.9 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.9. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.9. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.8...3.4.9>`_ for every commit.

* ``RedisEngine`` now uses multiple delete operations when clearing keys. This
  resolves a compatibility issue with redis cluster.
* Plugin fixtures in sub-directories can now be used as documented.
* ``Query::contain()`` on HasMany associations with a ``finder`` option now
  works as expected.
* ``IntegrationTestCase`` now simulates the correct environment variables
  enabling ``getRequestTarget()`` to work as expected.
* ``Debugger::excerpt()`` can now be used on the last line in a file.
* An incompatibility introduced in PHPUnit 5.7.21 and CakePHP's forwards
  compatibility shims has been resolved.

Contributors to 3.4.9
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bryan Crowe
* Jeremy Harris
* José Lorenzo Rodríguez
* Marc Würth
* Mark Story
* Michael Hoffmann
* h-moriya
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
