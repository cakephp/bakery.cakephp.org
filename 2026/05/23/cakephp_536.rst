CakePHP 5.3.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.3.5. This is a maintenance release for the 5.3 branch that fixes community
reported issues and a low severity security issue in ``View::element()``. Thank
you to Nguyen Danh Quan (@z3moo) and Ta Quoc Hung (@get-wright) for reporting
this issue through our security process. The security fix has been backported
and released as 5.2.13, 5.1.7, 4.6.4, and 4.5.11 as well.

Bugfixes
--------

You can expect the following changes in 5.3.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.3.5...5.3.6>`_ for every commit.

* ``DateTimeType`` now marshals date only formats like ``Y-m-d`` to midnight.
* ``ConsoleOutput::_write()`` now guards against unset streams.
* Improved API documentation.
* Improved generic typehints for ``find()``, ``findCreate()`` and
  ``loadInto()``.
* Fixed missing path normalization and directory separator handling in ``CommandScanner::scanPlugin()``.
* Improved error messages when validation rules are duplicated.
* Fixed element path name handling with relative directory traversals.

Contributors to 5.3.6
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Mark Scherer
* Mark Story
* Stuart

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
