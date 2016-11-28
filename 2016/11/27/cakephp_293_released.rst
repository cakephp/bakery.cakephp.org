CakePHP 2.9.3 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.9.3. This is a maintenance release for the 2.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.9.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.9.2...2.9.3>`_ for every commit.

* The constructor of ``AclNode`` now lets you pass in an alias when instances
  are created via ``ClassRegistry::init()``.
* A regression introduced in 2.9.1 where bootstrap files would not be correctly
  processed preventing bake from creating new applications.
* PagesController no longer allows ``..`` in paths allowing other view templates
  to be loaded potentially causing application errors.

New Features
------------

The 2.9.3 introduces a few new features:

* Shell commands now accept the ``--webroot`` CLI parameters allowing you to
  customize the path to your application's webroot directory if necessary.
* ``Cache::engine()`` was backported from 3.x
* ``DboSource`` now supports hook methods for customizing how the method cache
  works.

Contributors to 2.9.3
---------------------

Thank you to all the contributors that helped make this release happen:

* Marc Würth
* Mark Sch
* Mark Story
* Mischa ter Smitten
* Val Bancer
* chinpei215

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
