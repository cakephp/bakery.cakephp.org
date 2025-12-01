CakePHP 4.6.3
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.6.3. This is a maintenance release for the 4.6 branch that fixes several
community reported issues and regressions. 4.6.3 also contains a fix for
a potential security issue in the query builder. When using **already executed** queries as
subquery expressions, bound parameter values were overwritten which could lead
to inccorrect query results. Other usage of subqueries are not impacted.


Bugfixes
---------

You can expect the following changes in 4.6.3. See the [changelog](https://github.com/cakephp/cakephp/compare/4.6.2...4.6.3) for every commit.

- Fixed PHP 8.4 and 8.5 deprecation warnings.
- Fixed queries that use subqueries that already been executed.
- Fixed Query::bind() not setting the dirty flag.
- Backported Cell action events

Contributors to 4.6.3
----------------------

Thank you to all the contributors that submitted a pull request:

* bancer
* krugerman007
* markstory
* othercorey
* skie

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
