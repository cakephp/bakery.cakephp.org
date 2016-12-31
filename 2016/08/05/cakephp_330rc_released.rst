CakePHP 3.3.0-RC1 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.0-RC1. This is a release candidate for 3.3.0. 3.3.0 provides a number
improvements both large and small to CakePHP. It also deprecates several
features that will be removed in 4.0.0.

Upgrading to this Version
-------------------------

You can use composer to upgrade to the RC version of CakePHP 3.3.0::

    php composer.phar require "cakephp/cakephp:3.3.0-RC1"

What's new in 3.3.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-3-migration-guide.html>`_ has
a complete list of what's new in 3.3.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Bugfixes and Minor Features
---------------------------

This release fixes a few issues identified in the 3.3.0-beta3, as well as
the recent bugfixes from ``master`` as documented in the `3.2.13
release notes </2016/08/01/cakephp_3213_released.html>`__. In addition to those
changes 3.3.0-RC1 contains:

* ``Cake\Database\TypeInterface`` was added. This interface formalizes an
  implied interface for database type classes. (@davidyell)
* Middleware objects can be added by their string class name now. (@ADmad)
* The ``Mcrypt`` backend for ``Security`` has been deprecated. (@antograssiot)
* Content-Type headers are now transformed correctly between PSR7 and CakePHP
  request layers. (@dakota)
* PHP7 now reports CLI errors with the original file/line number. (@Jippi)

If there are no major issues reported, we will release 3.3.0 stable next week.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
