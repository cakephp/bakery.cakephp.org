CakePHP 2.9.8 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.9.8. This is a maintenance release for the 2.9 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 2.9.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.9.7...2.9.8>`_ for every commit.

* Support for TLS 1.2 was added to CakeSocket. Using newer TLS versions requires
  PHP5.6 or greater.
* The CSRF and Security token fields now have ``autocomplete=off``. This
  resolves a problem with the back button in new versions of Safari.
* ``ControllerTestCase::testAction()`` now works as expected when ``App.base``
  is set.
* ``Validation::notEmpty()`` accepts ``-0.0`` as it does on 3.x.

Contributors to 2.9.8
----------------------

Thank you to all the contributors that helped make this release happen:

* Livia Scapin
* Marc Würth
* Marcin Stramek
* Mark Story
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
