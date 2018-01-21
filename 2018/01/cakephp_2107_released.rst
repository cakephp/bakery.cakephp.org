CakePHP 2.10.7 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.7. This is a maintenance release for the 2.10 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 2.10.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.6...2.10.7>`_ for every commit.

* The CakePHP 2.x test suite now passes against PHP7.2. This should help unblock
  upgrades to PHP 7.2 for those wanting to make that upgrade.
* A regression introduced in the web test runner outputting broken pages in
  PHPUnit 3.x was fixed.
* ``ControllerTestCase`` can now mock aliased components.
* Cache keys used for groups are now hashed. This prevents keys overflowing
  Redis and Memcache key lengths. This will cause previously cached entries to
  be invalid as group keys have changed.

Contributors to 2.10.7
----------------------

Thank you to all the contributors that helped make this release happen:

* Koji Tanaka
* Mark Story
* Val Bancer

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
