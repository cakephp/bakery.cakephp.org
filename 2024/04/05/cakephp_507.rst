CakePHP 5.0.7
=============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.0.7. This is a maintenance release for the 5.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.0.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.0.6...5.0.7>`_ for every commit.

* Add logging to error rendering failures. When error rendering fails, CakePHP
  will log error messages.
* Fix file handle leak in ``StubConsoleInput``.
* Reverted recent changes in connection aliasing. The test runner will
  automatically alias all live connections to ``test_`` prefixed ones.
* Improved enum support in ``FormHelper``.
* ``IntegrationTestTrait`` no longer adds security tokens to GET requests with
  data.
* Improved response assertion method output. Failure messages will now include
  the response body.

Contributors to 5.0.7
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* KrzysiekNDS
* Mark Scherer
* Mark Story
* othercorey
* RoboSchmied

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
