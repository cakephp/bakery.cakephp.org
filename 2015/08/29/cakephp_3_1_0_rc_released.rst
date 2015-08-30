CakePHP 3.1.0-RC1 Released
==========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.1.0-RC1. This release is the first release candidate for the 3.1 branch which
adds several new features to the 3.x series. We would appreciate any feedback
you might have on the new features before their API definitions become stable.

Changes Since 3.1.0-beta
------------------------

There have been several changes to 3.1 through feedback on the beta releases.
The following aspects have changed since the beta releases:

* ``Controller::getView()`` has been removed. In its place ``viewBuilder()`` has
  been added. This method and new builder class resolves the issues that were
  caused by creating view instances eagerly.
* Mailer instances now set their template names based on the action that was
  invoked.
* ``View::viewPath()`` is now ``View::templatePath()``.
* ``Auth.redirect`` is no longer set to referrer URL when accessing login action.
  Instead it is only set to a protected URL when trying to access it without
  authentication, before redirecting to login action.

Additional Features
-------------------

* ``Validation::latitude()``, and ``Validation::longitude()`` were added.
* ``Validation::ascii()``, ``Validation::utf8()``, and
  ``Validation::isInteger()`` were added.
* ``Cache::add()`` was ported from 2.x. This method allows you to atomically add
  data to a cache backend if the key did not already exist.
* ``Time::listTimezones()`` now supports options to display timezone
  abbreviations.
* ``Hash::get()`` now supports objects implementing ArrayAccess.
* ``Hash::sort()`` supports case-insensitive sorting through a new
  ``ignoreCase`` option.

Unless there are major issues with the 3.1.0-RC release, we will have a stable
release packaged in the 2-3 weeks. The `3.1 migration guide
<http://book.cakephp.org/3.0/en/appendices/3-1-migration-guide.html>`_ has
a full list of all the changes in 3.1.0 and is recommended reading for those
considering upgrading.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
