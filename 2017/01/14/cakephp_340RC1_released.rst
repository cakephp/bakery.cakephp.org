CakePHP 3.4.0-RC1 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.0-RC1. This is a release candidate for 3.4.0. 3.4.0 provides a number
improvements both large and small to CakePHP. It also deprecates several
features that will be removed in 4.0.0.

Upgrading to this Version
-------------------------

You can use composer to upgrade to the RC version of CakePHP 3.4.0::

    php composer.phar require "cakephp/cakephp:3.4.0-RC1"

What's new in 3.4.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-4-migration-guide.html>`_ has
a complete list of what's new in 3.4.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Bugfixes and Minor Features
---------------------------

This release fixes a few issues identified in the 3.4.0-beta4, as well as
the recent bugfixes from ``master`` as documented in the `3.3.12
release notes </2017/01/13/cakephp_3312_released.html>`__. In addition to those
changes 3.4.0-RC1 contains:

* ``InstanceConfigTrait::config()`` has been deprecated. Instead you should used
  ``setConfig()`` and ``getConfig()`` methods.
* Routes can now use the ``_host`` option to restrict which hosts routes will
  match on.
* ``Router::parse()``, ``RouteCollection::parse()`` and ``Route::parse()`` have
  all been deprecated. Instead you should use the ``parseRequest()`` method
  which has access to the entire request allowing more flexible routing to be
  created.
* Subcommands will inherit their description from the parent shell if they don't
  have a description explicitly set.
* ``HtmlHelper`` no longer emits ``<![CDATA`` blocks by default. If you use an
  XHTML document type, you may need to enable ``<![CDATA`` again using the
  ``safe`` option.
* ``Collection::every()`` now returns ``true`` for empty collections. This
  rectifies a mistake made in 3.2.
* ``TranslateBehavior::translateField()`` was added.

If there are no major issues reported, we will release 3.4.0 stable next week.

Contributors to 3.4.0-RC1
-------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Michael Underwood
* Robert Pustułka
* antograssiot

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
