CakePHP 4.3.10 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.3.10. This is a maintenance release for the 4.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.3.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.3.9...4.3.10>`_ for every commit.


* Fixed ``patchEntity()`` failing when a table contains a field that matches the
  name and casing of the table alias.
* Fixed ``Collection::__debugInfo()`` failing when a count could not be
  generated.

Contributors to 4.3.10
----------------------

Thank you to all the contributors that helped make this release happen:

* Kevin Pfeifer
* Mark Story
* naveen
* othercorey
* Robert Gasch
* Sheldon Reiff

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
