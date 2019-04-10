CakePHP 3.7.6 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.7.6. This is a maintenance release for the 3.7 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.7.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.7.5...3.7.6>`_ for every commit.

* Improved the error message displayed when a route filter fails to apply.
* Improved API documentation.
* Blackhole callbacks for ``SecurityComponent`` can now return responses as they
  could in CakePHP 3.6.
* The console ``TableHelper`` now calculates cell widths correctly when cells
  contain formatted content.
* Fixed a persistence failure when HasMany associations had string keys.
* Updated the CA bundle to curl 2019-01-23.
* Fixed requirements on standalone Cache package.

Contributors to 3.7.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras Janušauskas
* Kyle Burton
* Marc Wilhelm
* Marc Würth
* Mark Scherer
* Mark Story

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
