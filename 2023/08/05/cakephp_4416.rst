CakePHP 4.4.16
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.16. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.16. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.15...4.4.16>`_ for every commit.

* Improve API documentation.
* Correct pagination URL generation for the current page from ``numbers()`` when
  using the ``modulus`` option.
* ``ProgressHelper`` now initializes options with default values solving errors
  when ``output()`` is called before ``init()`` is.
* Fixed failure to reflect schema for tables in MySQL 8+ that use functional
  indexes.

Contributors to 4.4.16
----------------------

Thank you to all the contributors that helped make this release happen:

* Edoardo Cavazza
* Jozef Grencik
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
