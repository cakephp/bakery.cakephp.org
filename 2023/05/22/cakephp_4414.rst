CakePHP 4.4.14
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.14. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.14. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.14...4.4.14>`_ for every commit.

* Implemented ``SSL XOAUTH2`` support in ``SmtpTransport``. This improves
  compatibility with Microsoft based servers.
* Improve API documentation.
* Fixed support for postgres schemas other than ``public`` in Fixture schema generation.
* ``Validation::utf8()`` and by extension the ``Validator::utf8()`` method as
  well now fail on invalid UTF8 bytes even when the extended range is enabled.
* Fix usage of ``ROOT`` in ``deprecationWarning()``. This was causing failures
  in standalone package usage.

Contributors to 4.4.14
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Marc Würth
* Mark Story
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
