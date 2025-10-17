CakePHP 5.2.8
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.8. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions. 5.2.8 also contains a fix for
a potential security issue in the query builder. When using **already executed** queries as
subquery expressions, bound parameter values were overwritten which could lead
to inccorrect query results. Other usage of subqueries are not impacted.

I'd like to welcome `josbeir <https://github.com/josbeir>`_ to the CakePHP team.
They have been actively been developing a refesh of the documentation. You can
see a development preview of the documentation at
`newbook.cakephp.org <https://newbook.cakephp.org/>`_. If you have any feedback
about the new documentation site, please open an `issue in GitHub
<https://github.com/cakephp/docs/issues/new>`_.

Bugfixes
--------

You can expect the following changes in 5.2.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.7...5.2.8>`_ for every commit.

* Improved type checks and null coalescing operator usage.
* Fixed route generation when routes are defined with null ``prefix`` values.
* Improved type annotations in collection classes.
* Fixed more compatibility issues with PHP 8.5.
* Fixed loading nested associations with ``Table::loadInto()``.
* Fixed usage of ``lock`` option for ``PaginatorHelper::sort()``.
* Fixed an access before initialization in ``RedisEngine``.

Contributors to 5.2.8
----------------------

A special thanks to **Kei Akiyama** for reporting the vulnerability in the query
builder. As always, thank you to everyone who submitted a pull request:

* ADmad
* Arshid
* Marcelo Rocha
* Mark Scherer
* Mark Story
* othercorey

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
