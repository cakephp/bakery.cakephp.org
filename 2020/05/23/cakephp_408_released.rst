CakePHP 4.0.8 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.8. This is a maintenance release for the 4.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.0.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.0.7...4.0.8>`_ for every commit.

* Update API documentation and method typing.
* Fixed marshalling datetime values of ``HH:mm``.
* Removed ``@throws`` annotations from ``IntegrationTestTrait`` methods.
* Fixed handling of ``false`` values in ``FormHelper``. Instead of ``''``, ``0``
  is used now.
* Improved CSRF validation error messages.
* Fixed ``application/www-form-urlencoded`` payloads in integration tests
  showing up as empty arrays.
* ``XmlView`` no longer tries to get keys of non-array values.

Contributors to 4.0.8
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Frank de Graaf
* Mark Scherer
* Mark Story
* diegosardina

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
