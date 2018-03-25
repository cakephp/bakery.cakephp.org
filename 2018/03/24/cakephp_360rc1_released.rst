CakePHP 3.6.0-RC1 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.0-RC1. This is the release candidate for 3.6.0, and if no major issues are
found in the next couple of weeks will become a stable release.

Updating to the beta
--------------------

You can use composer to upgrade to the beta version of CakePHP 3.6.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.6.0-RC1"

We would greatly appreciate it if you temporarily upgraded your application,
and ran your tests. By opening issues for any regressions in the beta, we can
help ensure a smoother release of 3.6.0 before the stable release.

What's new in 3.6.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-6-migration-guide.html>`_ has
a complete list of what's new in 3.6.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes Since 3.6.0-beta3
-------------------------

* PHPStan level 3 checks have been enabled.
* ``Collection::count()`` and ``countKeys()`` have been added.
* Updated the bundled root certificate file.
* Additional test cases for ``Text``.
* ``ConsoleOptionParser::enableSubCommandSort()`` was added.
* All tests are passing on Windows once again. Appveyor was accidentally
  disabled for a month or so.
* ``MemcachedEngine`` now handles ``Memcached::getMulti()`` failing.
* ``TimestampBehavior`` now handles creating values for non-datetime columns, as
  it did in previous versions. This behavior is also deprecated.
* ``Form`` subclasses now correctly call ``validator()``.
* ``RequestHandlerComponent`` no longer overwrites view preferences when it
  shouldn't.
* ``RequestHandlerComponen`` no longer parses XML with recursive inline
  entities.
* PO message context can now be on multiple lines.
* Integration tests that use security tokens and query strings behave correctly
  once again.

Contributors to 3.6.0-RC1
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Iandenh
* Jeremy Harris
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Matthew Brown
* Ronald Chaplin
* Wouter van Os
* saeideng
* sohelrana820


As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
