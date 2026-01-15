CakePHP 5.3.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.3.1. This is a maintenance release for the 5.3 branch that fixes
community reported issues, regressions and a security issue with
``PaginatorHelper``.

Bugfixes
--------

You can expect the following changes in 5.3.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.3.0...5.3.1>`_ for every commit.

* Fixed outputting unescaped HTML generated from request query string data in ``PaginatorHelper::limitControl()``.
* Fixed plugin template paths.

Contributors to 5.3.1
----------------------

Thank you to all the contributors that submitted a pull request:

* Corey Taylor
* Mark Scherer
* Mark Story

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: othercorey
.. categories:: release, news, security
.. tags:: release, news, security
