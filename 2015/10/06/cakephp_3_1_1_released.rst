CakePHP 3.1.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.1.1. This is a maintenance release for the 3.1 branch that fixes bugs and
includes small enhancements.

Bugfixes
--------

You can expect the following changes in 3.1.1. See the `changelog
<https://cakephp.org/changelogs/3.1.1>`_ for every commit.

* ``Query::contain()`` now correctly overwrites existing containments when
  ``$override`` is true.
* Integration tests no longer swallow database errors stemming from missing
  tables or other low level issues. Instead these errors are bubbled up making
  the test failure obvious.
* RequestHandlerComponent no longer overwrites explict viewClass usage.
* Fixed dependencies for database package.
* Email construction with a profile name works as expected now.
* Plural form of 'virus' is now 'viruses'.
* Deprecation warnings related to ViewBuilder have been improved.
* ``Validation::datetime()`` now correctly handles 12:xx PM with 12 hour formats.
* JsonView serializes single variables more consistently now. Now if a single
  view var is set it's inferred as ``'_serialize' => ['var']`` instead
  of ``'_serialize' => 'var'``.
* IntegrationTestCase accepts POST bodies that are strings.

Enhancements
------------

* ``env()`` has an additional parameter for supplying default values.
* ``Request::env()`` has an additional parameter for supplying default values.
* Improved API documentation.
* Console logging now abides the ``--verbose`` and ``--quiet`` flags.
* ``Validator::requirePresence()`` accepts a callable to determine whether or
  not a field is required.
* ``Validation::containsNonAlphaNumeric()`` was added.
* ``Hash::extract()`` works with ArrayAccess objects now.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
