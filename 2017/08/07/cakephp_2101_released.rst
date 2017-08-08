CakePHP 2.10.1 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.1. This is a maintenance release for the 2.10 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 2.10.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.0...2.10.1>`_ for every commit.

* Added backwards compatibility shim for ``getMock()`` on ``CakeTestCase``. This
  makes upgrading to newer versions of PHPUnit easier.
* ``Model::deleteAll()`` once again uses ``recursive=0`` by default. This
  reverts a change done in 2.10.0 that attempted to improve performance of
  ``deleteAll()``.
* ``CakeEmail`` once again attachs files that define the ``data`` key, but no
  mimetype.

Contributors to 2.10.1
----------------------

Thank you to all the contributors that helped make this release happen:

* Mark Story
* Val Bancer
* bclay

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
