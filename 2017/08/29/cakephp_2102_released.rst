CakePHP 2.10.2 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.2. This is a maintenance release for the 2.10 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 2.10.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.1...2.10.2>`_ for every commit.

* Improved performance of test suites by not truncating tables that were
  just created.
* Web test runner now works with PHPUnit > 4.
* The ``hiddenField`` option on radio buttons now works as documented.
* SQLServer driver now emits exceptions when the ``persistent`` option is used.
  This option does not work properly with SQLServer.
* ``SessionHelper`` now handles stacked flash messages created by
  ``FlashComponent``.

Contributors to 2.10.2
----------------------

Thank you to all the contributors that helped make this release happen:

* Jeremy Harris
* Luis Cano
* Mark Story
* Mike Fellows
* Val Bancer

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
