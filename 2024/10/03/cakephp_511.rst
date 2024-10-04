CakePHP 5.1.1
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.1.1. This is a maintenance release for the 5.1 branch that fixes several
community reported issues and regressions. If you are having problems with the framework
breaking your application when you upgrade from 5.0.11 to 5.1, please open an
`issue<https://github.com/cakephp/cakephp/issues/new?template=bug_report.yml>`__.

Bugfixes
--------

You can expect the following changes in 5.1.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.1.0...5.1.1>`_ for every commit.

- Improve FormHelper's request method inference. The ``method`` option now takes
  precedence over the value of ``type`` option.
- Fixed regression in meta tag generation.
- Fix missing method errors in Console only applications.
- EventAwareApplicationInterface was added. This interface was is to solve
  the console compatibility issue.
- Event hooks are now called application first, plugins after. This aligns
  behavior with other hooks.
- I18n message translation now supports ``gettext`` compatible paths.
- PaginatorHelper will now reset the current page to 1 when changing the per
  page limit. This reduces the chances of end users getting 404 errors changing
  their per page limit.
- The new ``to*()`` type coercion functions are now available as a global functions for
  applications that prefer to use global functions.
- Removed inline javascript from disabled pagination buttons. This improves
  compatibility with strict CSP policies.
- Fixed a type error if ``Mailer::reset()`` was called without proper setup.
- Fixed a SQL generation regression for UNION queries in MySQL < 8.

Contributors to 5.1.1
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* bancer
* Kevin Pfeifer
* Mark Story
* Robert Pustułka

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
