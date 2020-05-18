CakePHP 2.10.21 Released
========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.21. This is a maintenance release for the 2.10 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.10.21. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.20...2.10.21>`_ for every commit.

* Improve compatibility with PHP7.4 by removing usage of deprecated string
  offset syntax.
* Added support for TLS 1.3 to ``CakeSocket``.
* Fixed argument order for ``implode()`` call that would fail in PHP8.

Contributors to 2.10.21
-----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Jakub Onderka
* Mark Sch
* Mark Story
* Markus Podar
* Val Bancer
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
