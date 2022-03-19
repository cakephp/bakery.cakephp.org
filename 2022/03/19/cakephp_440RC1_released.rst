CakePHP 4.4.0-RC1 Released
==========================

The CakePHP core team is proud to announce the first release candidate of
CakePHP 4.4.0. The 4.4.0 release will introduce several new features and
a handful of deprecations. 

New Features
------------

The `migration guide
<https://book.cakephp.org/4.next/en/appendices/4-4-migration-guide.html>`_ has
a complete list of what's new in 4.4.0. We recommend you give that page a read
when upgrading as it outlines the deprecations present in 4.4.

New Feature Highlights
----------------------

* CakePHP 4.4.0 requires PHP 7.4+
* ``bin/cake routes`` now highlights route collisions.
* The ``SQLite`` driver now uses ``RETURNING *`` to update entities after saving
  with sqlite >=3.35+
* ``Query::expr()`` was added as a shorter alias for ``Query::newExpr()``.
* A new more extensible error handling subsystem has been added. The
  existing inheritance based system is now deprecated.
* ``HttpsEnforcerMiddleware`` now has an ``hsts`` option that allows you to
  configure the ``Strict-Transport-Security`` header.
* ``Controller::viewClasses()`` was added. This can be implemented by
  controllers that need to perform content-type negotiation. View classes will
  need to implement the static method ``contentType()`` to participate in
  content-type negotiation.

How you Can Help
----------------

You can help by trying out the RC in your application. Please open issues for
any new test failures or regressions the new version creates in your
application.

Contributors to 4.4.0-RC1
---------------------------

Thank you to all the contributors that have helped with 4.4.0:

* ADmad
* Alejandro Ibarra
* Corey Taylor
* Gerhard Lechner
* Jorge González
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* Markus Ramšak
* saeideng

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
