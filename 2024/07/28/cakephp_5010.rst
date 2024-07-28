CakePHP 5.0.10
=============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.0.10. This is a maintenance release for the 5.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.0.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.0.9...5.0.10>`_ for every commit.

- ``IntegrationTestTrait::enableCsrfTokens()`` will no longer add CSRF tokens to
  GET requests performed after a POST request in the same test method.
- Improved API documentation
- ``Router`` now gets an updated request set after each middleware is applied.
  This gives exception handling access to request attributes added by
  middleware.
- ``FormHelper::unlockFields()`` no longer raises errors when called without
  Form tampering protection being active.

Contributors to 5.0.10
----------------------

Thank you to all the contributors that submitted a pull request:

- ADmad
- jun-taniai
- Mark Story
- othercorey

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
