CakePHP 2.8.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.8.7. This is a maintenance release for the 2.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.8.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.8.6...2.8.7>`_ for every commit.


* ``CakeRequest::header()`` can now read the ``Authorization`` header when it is
  set by fast-cgi.
* ``TestShell`` now supports the ``--coverage-text`` option.
* ``Folder::inPath()`` now only accepts absolute paths. It previously had
  ambiguous behavior when relative paths were used.
* ``Mysql::insertMulti()`` now performs better, as all rows are inserted in one
  query.
* ``FormHelper`` now generates security tokens correctly when
  ``AppHelper::url()`` injects parameters into generated URLs.

New Features
------------

* ``FormHelper::submit()`` now supports the ``confirm`` option.
* ``Hash::sort()`` now supports sorting by the current locale.
* ``CakeFixtureManager`` will only truncate tables if tables are not being
  dropped between test methods.

Contributors to 2.8.7
---------------------

Thank you to all the contributors that helped make this release happen:

* Kenya Yamaguchi
* Marc Würth
* Mark van Driel
* Sebastien Barre
* Val Bancer
* mark_story
* mscherer
* ndm2
* nojimage

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
