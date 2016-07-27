CakePHP 3.3.0-beta3 Released
===========================

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

    php composer.phar require "cakephp/cakephp:3.3.0-beta3"

What's new in 3.3.0?
--------------------

The `migration guide
<http://book.cakephp.org/3.0/en/appendices/3-3-migration-guide.html>`_ has
a complete list of what's new in 3.3.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Breaking Changes Since beta2
----------------------------

* ``Cake\Http\MiddlewareStack`` is now ``Cake\Http\MiddlewareQueue``. The new
  name better reflects the implementation (@ADmad)
* The ``allowPartialNulls`` option in the ExistsIn rule has been renamed to
  ``allowNullableNulls``. (@ionas)

Bugfixes and Minor Features
---------------------------

This release fixes a few issues identified in the 3.3.0-beta, as well as
bugfixes from ``master``.

* The default ErrorController now always loads the RequestHandlerComponent.
  (@ADmad)
* Router methods consistently use ``static`` now, making user-land extensions
  easier. (@skie)
* BelongsToMany::replaceLinks() now returns false when persisting an entity
  fails due to application rules. (@markstory)
* Throwing an exception from a Table's afterSave now aborts the transaction
  correctly. (@lorenzo)
* ``Text::stripLinks()`` now recursively strips HTML links. This method is also
  now deprecated. (@markstory)
* A new exception class for HTTP status code 451 was added. (@Graziel)
* ExistsIn now has better errors for missing associations. (@burzum)

Unless there are major issues with the 3.3.0-beta3 release, we will have
a release candidate and stable release packaged in the 2-3 weeks. The
documentation for 3.3.0 is now available in the `book <http://book.cakephp.org/3.0/en>`_.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
