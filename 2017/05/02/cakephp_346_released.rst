CakePHP 3.4.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.6. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.5...3.4.6>`_ for every commit.

* The CSRF and Security token fields now have ``autocomplete=off``. This
  resolves a problem with the back button in new versions of Safari.
* The SQLServer driver now supports more connection options.
* Improved API documentation.
* FixtureManager always uses connection aliases now. This prevents accidentally
  using the live connection when the test connection has not been defined.
* Translation packages can initialize from cache files created in 3.3 without
  errors now.
* Fix the conjugation of conditions by ``and*()`` and ``or*()``. Previously
  ``and*()`` methods appended conditions, while ``or*()`` methods prepended them.

Contributors to 3.4.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Joep Roebroek
* José Lorenzo Rodríguez
* Marc Würth
* Mark Scherer
* Mark Story
* Michael Hoffmann
* Sohel Rana
* Stephan Meyer
* Travis Rowland
* lilHermit
* mehdi fathi
* ndm2
* saeid

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
