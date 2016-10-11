CakePHP 2.9.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.9.1. This is a maintenance release for the 2.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.9.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.9.0...2.9.1>`_ for every commit.

* Regressions in FormHelper & SecurityComponent token generation were fixed.
* A number of plugins and applications were relying on CakePHP to autoload
  ``Object`` which it now does again.
* Length detection for ``ENUM`` columns was fixed.
* Schema generation now omits table names that would result in invalid
  property names.
* The default flash template had incorrect content removed.
* ``Model::query()`` now defaults the ``$cache`` argument to
  ``Model::$cacheQueries``.

Contributors to 2.9.1
---------------------

Thank you to all the contributors that helped make this release happen:

* Andrej Griniuk
* David Maicher
* José Lorenzo Rodríguez
* Mark Sch
* Mark Story
* Mischa ter Smitten

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
