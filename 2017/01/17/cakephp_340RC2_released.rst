CakePHP 3.4.0-RC2 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.0-RC2. This is a release candidate for 3.4.0. 3.4.0 provides a number
improvements both large and small to CakePHP. It also deprecates several
features that will be removed in 4.0.0.

Upgrading to this version
-------------------------

You can use composer to upgrade to the RC version of CakePHP 3.4.0::

    php composer.phar require "cakephp/cakephp:3.4.0-RC2"

What's new in 3.4.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-4-migration-guide.html>`_ has
a complete list of what's new in 3.4.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Bugfixes and Minor Features
---------------------------

This release fixes a few issues identified in the 3.4.0-RC1, as well as
the recent bugfixes from ``master``. This release contains the following changes:

* ``Router::prefix()`` now supports a ``path`` option for customizing a prefix
  scope's URL path.
* Postgres dialect now correctly handles nullable datetime columns.
* SqlServer dialect now correctly handles nullable datetime columns.
* ``Http\Client`` correctly generates request URIs when behind an HTTP proxy.
* Improved API documentation.
* ``Xml::build()`` now supports the ``parseHuge`` option to enable very large
  XML payloads to be loaded.
* A regression causing CLI subcommands to not inherit the parent shell's options
  and arguments was fixed.

If there are no major issues reported, we will release 3.4.0 stable next week.

Contributors to 3.4.0-RC2
-------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* AJ Quick
* Dmitrii Romanov
* Joris Vaesen
* Jose Diaz-Gonzalez
* José Lorenzo Rodríguez
* Mark Story
* Ross Chater
* Yves P
* antograssiot
* ndm2

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
