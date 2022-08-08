CakePHP 4.4.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.4. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.3...4.4.4>`_ for every commit.

* Simplify tests for Database package. This helps with the development of 5.x.
* Fix build errors from new versions of intl, MySQL, and openssl.
* Improved README docs.
* Fix regression in route parameter coercion intoduced in 4.4.3 with the value
  ``0`` being cast to an int.

Contributors to 4.4.4
----------------------

* ADmad
* blieb
* Edgaras Janušauskas
* Mark Scherer
* Mark Story
* othercorey

Thank you to all the contributors that helped make this release happen:

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
