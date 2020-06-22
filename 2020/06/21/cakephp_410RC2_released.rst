CakePHP 4.1.0-RC2 Released
============================

The CakePHP core team is proud to announce the first release candidate of CakePHP
4.1.0. This beta introduces a handful of deprecations. It also adds window
function support and common-table-expression support to the ORM. Furthermore, 
it features improved ``debug()`` output, and new ORM events for marshalling.

New Features
------------

The `migration guide
<https://book.cakephp.org/4.next/en/appendices/4-1-migration-guide.html>`_ has
a complete list of what's new in 4.1.0. We recommend you give that page a read
when upgrading as it outlines the deprecations present in 4.1.

Changes Since 4.1.0-RC1
-------------------------

* ``Table::saveMany()`` now triggers the ``Model.afterSaveCommit`` event.
* Improved deprecation links.
* Fix a regression in RC1 where associations with ``dependent`` but not
  associated records would cause deletions to fail.
* Fixed inflection of CamelCase words.
* Deprecated ``TableRegistry::get()``. Use the ``TableLocatorAwareTrait``
  instead.
* Fix query LoggingStatement prematurely fetching records.
* The ``whitelist`` and ``sortWhitelist`` options for ``PaginatorComponent``
  have been deprecated. Use ``allowedParameters`` and ``sortableFields``
  instead.
* Fixed incorrect paths in missing layout exception pages.
* ``CsrfProtectionMiddleware::whitelistCallback()`` has been deprecated. Use
  ``skipCheckCallback()`` instead.
* Add support for console colors in Windows 10 and bash emulation.

How you Can Help
----------------

You can help by trying out the RC in your application. Please open issues for
any new test failures or regressions the new version creates in your
application.

Contributors to 4.1.0-RC2
---------------------------

Thank you to all the contributors that have helped with 4.1.0:

* ADmad
* Corey Taylor
* Mark Scherer
* Mark Story
* Walther Lalk
* ndm2

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
