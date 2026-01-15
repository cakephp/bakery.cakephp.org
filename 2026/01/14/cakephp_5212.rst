CakePHP 5.2.12 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.12. This is a security fix release for the 5.2 branch that fixes
a security issue with ``PaginatorHelper``. This release is recommended for all
applications using ``PaginatorHelper::limitControl()`` with CakePHP >= 5.2.10.
Earlier releases are not impacted.

Bugfixes
--------

You can expect the following changes in 5.2.11. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.11...5.2.12>`_ for every commit.

* Fixed outputting unescaped HTML generated from request query string data in ``PaginatorHelper::limitControl()``.

Contributors to 5.2.12
----------------------

Thank you to all the contributors that submitted a pull request:

* Mark Story
* phpcss-ankue

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
