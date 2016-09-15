CakePHP 2.8.8 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.8.8. This is a maintenance release for the 2.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.8.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.8.7...2.8.8>`_ for every commit.

* ``CakeTestCase::getMockForModel()`` no longer fails when when models interact
  with their data source in the constructor.
* A regression in ``FormHelper`` related to security tokens and applications in
  sub-directories was fixed.

Contributors to 2.8.8
---------------------

Thank you to all the contributors that helped make this release happen:

* José Lorenzo Rodríguez
* Mark Story

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
