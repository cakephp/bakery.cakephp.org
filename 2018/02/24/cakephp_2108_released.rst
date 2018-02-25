CakePHP 2.10.8 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.8. This is a maintenance release for the 2.10 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 2.10.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.7...2.10.8>`_ for every commit.

* Queries using ``COUNT(DISTINCT field)`` are now quoted correctly on SQLServer.
* Mcrypt is now an optional dependency of CakePHP. You can use the
  ``Security.useOpenSsl`` confiugration flag to force encrypt()/decrypt() to use
  ``ext/openssl`` now. This improves compatibility with PHP 7.2
* Updated PHPUnit version constraint to match messaging in test shell.
* When query execution returns false and doesn't raise an exception, the correct
  ``_result`` property is now updated.

Contributors to 2.10.8
----------------------

Thank you to all the contributors that helped make this release happen:

* David Yell
* Mark Sch
* Mark Story
* Val Bancer
* chinpei215

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
