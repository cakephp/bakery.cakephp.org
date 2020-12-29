CakePHP 3.9.5 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.5. This is a maintenance release for the 3.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.9.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.9.4...3.9.5>`_ for every commit.

* Fixed missing parenthesis on subqueries in SQLServer.
* Fixed incorrect bindings when ordering queries by expressions in SQLServer.
* Fix ``Hash::mergeDiff()`` not handling scalar values during merging well.

Contributors to 3.9.5
----------------------

Thank you to all the contributors that helped make this release happen:

* Mark Story
* ndm2
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
