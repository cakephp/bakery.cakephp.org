CakePHP 3.3.10 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.10. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.9...3.3.10>`_ for every commit.

* Literal ``%`` in string template variables no longer cause errors.
* Query Logging now correctly replaces placeholders for ``IN`` clauses.
* ``BreadcrumbsHelper::render()`` now returns ``''`` when there are no crumbs.
  This makes its return type consistent in all cases.
* MissingHelper errors raised when rendering an error page, no longer cause
  a blank page response.
* ``PaginatorComponent`` now caps the ``limit`` option to the ``maxLimit``
  option if both are specified.
* All SQL dialects now correctly generate default values for ``DATETIME`` and ``TIMESTAMP`` columns
  for values other than ``CURRENT_TIMESTAMP``.
* ``Debugger`` now HTML encodes error message contents. Previously, applications
  running in debug mode could be vulnerable to reflected cross-site-scripting
  (XSS) in some scenarios. Thank you to Teppei Fukuda for reporting this issue
  via the security disclosure process.

New Features
------------

The 3.3.10 introduces a few new features:

* ``FlashComponent`` now supports a ``duplicate`` option. When disabled, this
  option will prevent duplicate messages from being set.
* ``IntegrationTestCase::assertResponseRegExp()`` and
  ``IntegrationTestCase::assertResponseNotRegExp()`` were added.
* ``MissingElementException`` provides more context now.

Contributors to 3.3.10
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Alex Bogdanov
* Cees-Jan Kiewiet
* JayPHP
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Mirko Pagliai
* Yasuaki Hamano
* gregs

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
