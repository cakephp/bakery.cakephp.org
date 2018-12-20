CakePHP 2.10.14 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.14. This is a maintenance release for the 2.10 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.10.14. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.13...2.10.14>`_ for every commit.

* Replace hard coded test directory paths with constants.
* Add model id to all interal ``exists()`` method calls. This makes the
  usage compatible with the shim plugin.
* Tests are all passing with PHP 7.3
* Improved API documentation.
* ``ENUM`` columns will use strings for all values instead of conditionally
  using an integer.
* Fixed errors when using ``cake schema`` with ``ENUM`` columns.

Contributors to 2.10.14
-----------------------

Thank you to all the contributors that helped make this release happen:

* Joseph Zidell
* Koji Tanaka
* Mark Story
* Martin Stücklschwaiger
* Val Bancer
* Yaser Naderi
* bancer
* mark_story

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
