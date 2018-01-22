CakePHP 3.5.0-RC2 Released
==========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.0-RC2. This is a release candidate for 3.5.0. 3.5.0 provides a number
improvements both large and small to CakePHP. It also deprecates several
features that will be removed in 4.0.0.

Upgrading to this Version
-------------------------

You can use composer to upgrade to the RC version of CakePHP 3.5.0::

    php composer.phar require "cakephp/cakephp:3.5.0-RC2"

Changes since 3.5.0-RC1
-----------------------

The following changes have been made to 3.5 since 3.5.0-RC1.

* ``Cake\Collection\Collection::avg()`` and ``median()`` were added.
* ``Cake\Http\Client`` now raises a 504 HttpException when a timeout occurs.
* Improved deprecation comments in API doc blocks.
* ``Cake\Http\Client`` response bodies can be read with the PSR7 interface once
  again.
* ``Cake\Http\Client`` no longer emits an empty cookie header when there are no
  cookies.
* Improved SQLServer 2008 pagination shims to work when results are ordered by
  a computed field.
* ``Cake\Auth\DefaultPasswordHasher`` now includes the hashCost option as a factor into
  whether or not a password needs to be rehashed.
* ``IntegrationTestCase`` now correctly generates form-tampering prevention
  tokens for requests with query string arguments in the URL string.
* Empty translation messages now return the key for messages with no context.
* ``Cake\Validation\Validator::scalar()`` was added.
* ``Cake\TestSuite\TestCase::loadFixtures()`` now loads all fixtures if no
  arguments are provided.
* CommandRunner now outputs a command list if no arguments are provided.
* Unknown subcommands, options and arguments now output more helpful error
  messages with suggestions of what you may have wanted to do.
* Empty MO files are no longer ignored by I18n message collections.
* Missing Controller error messages were improved when routing parameters were
  not correctly inflected.
* RoutingMiddleware now preserves keys in the ``params`` attribute defined
  earlier in the request.
* Improved compatibility with PHP7.2.
* ``Cake\Core\InstanceConfigTrait::getConfig()`` now has a default value
  parameter.
* ``Cake\Datasouce\EntityTrait::setDirty()`` now returns ``$this`` as
  documented.
* The ``hiddenField`` option for radio buttons now works as documented.

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-5-migration-guide.html>`_ has
a complete list of what's new in 3.5.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Contributors to 3.5.0-RC2
-------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bernat Arlandis
* Ian den Hartog
* Jeremy Harris
* Joris Vaesen
* José Lorenzo Rodríguez
* Marc Würth
* Mark Scherer
* Mark Story
* Michael Hoffmann
* Mike Fellows
* Yves P
* antograssiot
* chinpei215
* inoas
* saeid

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
