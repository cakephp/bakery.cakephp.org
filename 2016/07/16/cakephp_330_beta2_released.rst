CakePHP 3.3.0-beta2 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.0-beta2. This is a beta release for the 3.3 release branch. 3.3 provides
a number improvements both large and small. It also deprecates several features
that will be removed in 4.0.0. We would appreciate any feedback you
might have on the new features before their API definitions become stable. In
particular for the new PSR7 related features, as we see PSR7 as playing a big
part in CakePHP's future.

Upgrading to this Beta
----------------------

You can use composer to upgrade to the new beta version of CakePHP 3.3.0::

    php composer.phar require "cakephp/cakephp:3.3.0-beta2"

What's new in 3.3.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-3-migration-guide.html>`_ has
a complete list of what's new in 3.3.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Bugfixes and Minor Features
---------------------------

This release fixes a few issues identified in the 3.3.0-beta, as well as
bugfixes from ``master``.

* ``Text::truncateWidth()`` was added. This method lets you truncate text by
  a visual width. This is useful when working with languages that have double
  width characters like Japanese. (@chinpei215)
* ``IntegrationTestCase`` can now correctly stub out the Content-Type header.
  (@dakota)
* Allow integration testing of secure post requests with a query string.
  (@dakota)
* ``requestAction()`` has been deprecated. Use view cells instead.
* ``TreeBehavior`` now disallows nodes from being their own parents.
  (@markstory)
* Dispatch Filters are now integrated in the new PSR7 middleware stack for
  backwards compatibility. (@markstory)
* ``Http\Client`` sends the correct content-type when array data is sent.
  (@markstory)
* No exceptions are raised when empty file inputs are uploaded. (@ADmad)
* ``FormHelper::error()`` now allows message translation by rule name, in
  addition to by error message string. (@oyas)
* ``Table::validateUnique()`` no longer raises an exception when non-scalar
  values are received. (@markstory)

Unless there are major issues with the 3.3.0-beta release, we will have
a release candidate and stable release packaged in the 4-5 weeks. The
documentation for 3.3.0 is now available in the `book <https://book.cakephp.org/3.0/en>`_.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
