CakePHP 4.3.0-RC2 Released
==========================

The CakePHP core team is proud to announce the first release candidate of
CakePHP 4.3.0. The 4.3.0 release will introduce several new features and
a handful of deprecations. 

New Features
------------

The `migration guide
<https://book.cakephp.org/4.next/en/appendices/4-3-migration-guide.html>`_ has
a complete list of what's new in 4.3.0. We recommend you give that page a read
when upgrading as it outlines the deprecations present in 4.3.

Changes from RC1
----------------

Since the release of 4.3.0-RC1 the following changes have been made:

* ``View::addHelpers()`` was added and the ``$merge`` flag of ``setHelpers()``
  was deprecated.
* ``Association::setName()`` was deprecated.
* A type error in ``CsrfProtectionMiddleware`` was fixed. This error could be
  triggered if cookie data was invalid.
* ``MailContains`` only escapes patterns once noce.
* Fixture cleanup performance was improved for SQLServer.
* ``BaseLog::resolve()`` was renamed to ``BaseLog::interpolate()``.
* ``TestCase::loadFixtures()`` is now deprecated.
* The automatic nonce policy features of ``CspMiddleware`` now require opt-in
  configuration to enable. This improves backwards compatibility for
  applications with existing CSP policies.
* Improved API documentation.
* Improved extensibility of fixture strategies by always calling setup/teardown
  methods.

How you Can Help
----------------

You can help by trying out the RC in your application. Please open issues for
any new test failures or regressions the new version creates in your
application.

Contributors to 4.3.0-RC2
---------------------------

Thank you to all the contributors that have helped with 4.3.0:

* ADmad
* Corey Taylor
* Juan Pablo Ramirez
* Julian Pollmann
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* othercorey

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
