CakePHP 4.1.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.1.7. This is a maintenance release for the 4.1 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.1.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.1.6...4.1.7>`_ for every commit.

* Improved API documentation 
* Added additional tests for flash message retention in tests.
* Fixed SQL Server missing parenthesis on pagination subquery order clause.
* Fixed SQL Server binding conflicts when ordering by expression objects.
* Improved error messages when database queries are missing operators.
* Fixed ``Hash::mergeDiff()`` not handling scalar values well.

Contributors to 4.1.7
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Ikko Ashimine
* Mark Scherer
* Mark Story
* Markus Ramšak
* ndm2
* othercorey
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
