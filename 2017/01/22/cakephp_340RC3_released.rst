CakePHP 3.4.0-RC3 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.0-RC3. This is a release candidate for 3.4.0. 3.4.0 provides a number
improvements both large and small to CakePHP. It also deprecates several
features that will be removed in 4.0.0.

Upgrading to this version
-------------------------

You can use composer to upgrade to the RC version of CakePHP 3.4.0::

    php composer.phar require "cakephp/cakephp:3.4.0-RC3"

What's new in 3.4.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-4-migration-guide.html>`_ has
a complete list of what's new in 3.4.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Bugfixes and Minor Features
---------------------------

This release fixes a few issues identified in the 3.4.0-RC2, as well as
the recent bugfixes from ``master``. This release contains the following changes:

* Improve return types compatiblity with PHPStorm in doc blocks.
* Routes with ``_host`` options now use that option when generating URLs.
* Aura.Intl version was raised to 3.0
* Fix missing uploaded files in Request objects.
* Fix strict errors raised when ``Cake\Database\Schema\Table`` is used as
  a typehint.
* ``Query::update()`` raises an error when an invalid parameter is passed.
* Mailers are now reset when sending an email raises an exception.
* Improved error messages when associations are missing primary keys.
* ``Validator::multipleOptions`` no longer ignores the ``caseInsensitive``
  option.

If there are no major issues reported, we will release 3.4.0 stable next week.

Contributors to 3.4.0-RC3
-------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bernat Arlandis
* Cory Thompson
* Henrik Gemal
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Ross Chater

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
