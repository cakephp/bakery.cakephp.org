CakePHP 4.1.0-RC1 Released
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

Changes Since 4.1.0-beta1
-------------------------

* ``Form\Form::set()`` was added to help incrementally update the data in a Form
  object.
* The interface for CommonTableExpressions and windowing functions were
  improved.
* ``TranslateBehavior`` now supports a ``locale`` option when finding records.
  This option lets you set the locale for a single find call.
* ``Query::clearResult()`` was added to clear the internal result and count
  value.
* Deprecation annotations now contain IDE clickable links.
* Added missing annotations in the Validation package.
* Datetime inputs created through ``FormHelper`` can have the ``step`` option
  unset.
* Cache adapters that require extensions now raise clearer exceptions when the
  required extensions are missing.
* ``Datasource\LocatorInterface`` was added to help easy other locator
  implementations.
* ``SmtpAdapter`` now supports ``AUTH PLAIN``.
* PHP8 nightly builds were added to the CakePHP test matrix.
* Delete operations with cascading callbacks now abort when an associated record
  fails to delete because of application rule failures.
* ``Query::orderAsc()`` and ``Query::orderDesc()`` now support closures to build
  the order clause.
* ``Session::read()`` now has a default parameter.
* ``Session::readOrFail()`` was added.


How you Can Help
----------------

You can help by trying out the beta in your application. Please open issues for
any new test failures or regressions the new version creates in your
application.

Contributors to 4.1.0-RC1
---------------------------

Thank you to all the contributors that have helped with 4.1.0:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Frank de Graaf
* Mark Scherer
* Mark Story
* Matthias Wirtz
* andrii-pukhalevych
* ndm2
* othercorey

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
