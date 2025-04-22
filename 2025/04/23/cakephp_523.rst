CakePHP 5.2.3
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.3. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 5.2.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.2...5.2.3>`_ for every commit.

* Fixed template annotations for behaviors in ``ORM\Table``.
* Improved API doc blocks for helpers.
* Fixed reflection of primary keys with Sqlite.
* Added ``TestSuite.fixtureStrategy`` to enable choosing a default fixture
  strategy for an application or plugin test suite.
* Improved ``TestCase::deprecated()`` to allow PHP version conditions, and
  fixed deprecated method usage within CakePHP's test suite.

Contributors to 5.2.3
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Mark Scherer
* Mark Story

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
