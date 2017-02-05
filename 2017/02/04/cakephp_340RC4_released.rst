CakePHP 3.4.0-RC4 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.0-RC4. This is a release candidate for 3.4.0. 3.4.0 provides a number
improvements both large and small to CakePHP. It also deprecates several
features that will be removed in 4.0.0.

Upgrading to this version
-------------------------

You can use composer to upgrade to the RC version of CakePHP 3.4.0::

    php composer.phar require "cakephp/cakephp:3.4.0-RC4"

What's new in 3.4.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-4-migration-guide.html>`_ has
a complete list of what's new in 3.4.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Bugfixes and Minor Features
---------------------------

This release fixes a few issues identified in the 3.4.0-RC3, as well as
the recent bugfixes from ``master``. This release contains the following changes:

* ``Email::setPriority()`` was added. This method lets you set the
  ``X-Priority`` header in email messages.
* ``EntityTrait`` had the following methods added: ``getVirtual()``,
  ``setVirtual()``, ``getHidden()``, ``setHidden()``, ``setAccess()``,
  ``isAccessible()``, ``isDirty()``, ``setDirty()``, ``setErrors()``,
  ``setError()``, ``getErrors()``, and ``getError()``. These methods provide
  separate get/set methods for the combined get/set methods on
  ``EntityInterface``.
* ``HasMany::link()`` now uses a single transaction to link all records.
* ``FormHelper::input()`` no longer emits the ``nestedInput`` option as an
  attribute.
* Improved API documentation examples.
* ``ValueBinder::placeholder()`` now works as documented when anonymous
  placeholders are used.
* ``TestCase::assertHtml()`` now accepts whitespace before a closing tag.
* The translation helper functions e.g. ``__()`` now correctly string cast
  explict null parameters.
* Caching result sets on PHP 7.1.1 works again. There was an incompatibility due
  to a change in how SplFixedArray was unserialized.
* CakePHP internals no longer use ``config()`` where possible.
* ``Validation::notBlank()`` now works with float 0.
* ``Collection::transpose()`` with different number of columns and rows now
  works as expected.
* Session destruction now works properly using the cache engine and memcached.

If there are no major issues reported, we will release 3.4.0 in the following
week.

Contributors to 3.4.0-RC4
-------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Ceeram
* Cory Thompson
* Edgaras Janušauskas
* Florian Krämer
* Gareth Ellis
* Joep Roebroek
* Johan Meiring
* José Lorenzo Rodríguez
* Marc Würth
* Mark Scherer
* Mark Story
* Mathew Foscarini
* Rodrigo moyle
* Ross Chater
* Walther Lalk
* antograssiot
* chinpei215
* lilHermit

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
