CakePHP 4.3.0-RC3 Released
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

Changes from RC2
----------------

Since the release of 4.3.0-RC2 the following changes have been made:

* ``TestCase::deprecated()`` now raises an assertion error if the callback
  doesn't trigger any deprecations.
* Improved API documentation and static analysis tool typing.
* Improved error messages from incorrect Command classes.
* Fixed behavior of cascading deletes when ``bindingKey`` values are ``null``.
* Improved stack references for deprecation warnings.
* Deprecated ``ModelAwareTrait``. Use the new ``LocatorAwareTrait`` features
  instead.
* Added ``LocatorAwareTrait::fetchTable()`` as a simpler API to get ORM Table
  instances.
* Added ``LocatorAwareTrait::$defaultTable``. This property replaces
  ``$modelClass``.
* Passed parameters from routes can now be typed as ``float``, ``bool`` and ``int``.
  If an invalid value is used in a route, a 404 error will be raised.
* Fixed BelongsToMany junction tables getting the incorrect entity class during
  association row replacement. Instead of getting entities from the association
  target table, you will receive entity records from the junction table.
* Duplicate deprecation warnings are only emit once now. You can enable
  duplicated output by setting ``Error.allowDuplicateDeprecations`` to true.
* ``cake plugin`` now adds to the bottom of the Application bootstrap instead of
  the top.

How you Can Help
----------------

You can help by trying out the RC in your application. Please open issues for
any new test failures or regressions the new version creates in your
application.

Contributors to 4.3.0-RC3
---------------------------

Thank you to all the contributors that have helped with 4.3.0:

* ADmad
* Corey Taylor
* Mark Scherer
* Mark Story
* ndm2
* othercorey
* Rolf Kaiser
* saeideng

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
