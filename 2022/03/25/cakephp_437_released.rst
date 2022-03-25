CakePHP 4.3.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.3.7. This is a maintenance release for the 4.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.3.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.3.6...4.3.7>`_ for every commit.

* Fixed additional errors where FileEngine could raise exceptions by calling 
  ``unlink`` incorrectly.
* Fixed 'table already configured' errors in reflection based fixtures when
  a table loads and configures another table during its ``initialize()`` hook.
* Fixed ``contain()`` emitting errors when an association querybuilder uses both
  explicit fields and ``autoFields()`` at the same time.
* Fixed ``PaginatorHelper::limitControl()`` not working with
  multiple-pagination.


Contributors to 4.3.7
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Mark Story
* Markus Ramšak
* OJMichael
* Val Bancer
* ndm2
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
