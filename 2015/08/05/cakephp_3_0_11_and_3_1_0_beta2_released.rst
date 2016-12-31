CakePHP 3.0.11 and 3.1.0-beta2 Released
=======================================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.0.11 and 3.1.0-beta2. These releases are a maintenance releases that contain
bugfixes and fixes for security issues.

Security Fixes
--------------

There are two issues that can impact the security of a CakePHP application:

* ``Cake\ORM\Query::where()`` would allow static methods to be invoked. This
  could create unintentional side effects, or undesired query manipulation.
* ``Validation::compare()`` and ``Validation::range()`` would allow specifically
  crafted data past certain criteria.

We'd like to thank 'Kurita Takashi' for contacting us through our `security issue
<https://book.cakephp.org/3.0/en/contributing/tickets.html#reporting-security-issues>`_
process about the CsrfComponent issue. We recommend that all users of CakePHP
upgrade to 3.0.11 or 3.1.0-beta as soon as possible.

Bugfixes
--------

In addition to the security issues the following issues have been fixed on both
branches:

* ``Hash::insert()`` and ``Hash::remove()`` now support attribute matchers
  at all depths.
* ``Table::get()`` supports a ``finder`` option that allows custom finders to be
  combined with get().
* Terminal colours are enabled for Windows users using the ConEmu terminal
  application.
* ``Query::matching()`` operations with no conditions no longer cause errors.
* ``requestAction()`` with array parameters includes all default routing
  parameters.
* ``View::prepend()`` now supports a capturing mode like ``start()``.
* Typos in alias names used in ``contain()`` now trigger exceptions instead of
  generating incorrect result sets.
* ``Http\Client`` better supports complex multipart requests.
* ``PaginatorHelper::numbers()`` supports a modulus of 0 now.
* DateTime instances can be sorted by Collection now.

For a deeper insight of what changed, have a look at the
`release notes <https://cakephp.org/changelogs/3.0.11>`_.

.. author:: markstory
.. categories:: security, release, news
.. tags:: security, release, news
