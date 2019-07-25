CakePHP 2.10.19 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.19. This is a maintenance release for the 2.10 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.10.19. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.18...2.10.19>`_ for every commit.

* Added missing ``App::uses()`` call to ``CakeEventManager``.
* ``CakeTestRunner`` now passes the ``$exit`` parameter to ``doRun()``. This
  improves compatibility with PHPUnit 5.2.x

Contributors to 2.10.19
-----------------------

Thank you to all the contributors that helped make this release happen:

* Koji Tanaka
* Mark Story

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
