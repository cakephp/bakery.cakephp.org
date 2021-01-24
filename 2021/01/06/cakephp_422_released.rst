CakePHP 4.2.2 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.2. This is a maintenance release for the 4.2 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.2.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.2.1...4.2.2>`_ for every commit.

* Integration tests now persist flash message more reliably when custom view
  classes are used, and when redirects are performed.
* Changes made to ``FixtureManager`` were reverted fixing problems with fixture
  schema management and partial data loading.
* API documentation was improved.
* CSRF tokens created by ``CsrfProtectionMiddleware`` are now salted to mitigate
  BREACH vulnerabilities. The tokens are now longer, and are encoded with base64
  instead of hexadecimal encoded.

Contributors to 4.2.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Mark Scherer
* Mark Story

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
