CakePHP 3.3.3 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.3. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.2...3.3.3>`_ for every commit.

* ``HasMany::unlink()`` no longer emits errors when an empty list is provided.
* The global event manager now tracks events when the local event manager does
  not have tracking enabled.
* Selecting SQL computed fields in contained associations no longer emits
  warnings in PHP7
* Redirect routes work correctly once again. Previously the beforeDispatch event
  was not stopped causing errors.
* ``Folder::inPath()`` now only accepts absolute paths. It previously had
  ambiguous behavior when relative paths were used.
* ``TestCase::getMockForModel()`` now ensures that generated mocks have the
  correct table name.
* ``EntityTrait::clean()`` now resets the original value states. This means
  that you will no longer have access to original values after
  a successful save.
* Marshalling no longer marks unchanged ``null`` values as dirty.
* Numeric column names are now correctly quoted when identifier quoting is
  enabled.

New Features
------------

* Improved API docs in the ORM and Database packages.
* ``Cake\TestSuite\EmailAssertTrait`` was added. This trait makes it easier to
  to write tests for Mailer classes.
* ``Hash::sort()`` now supports sorting by the current locale.
* ``FormHelper::create()`` now supports the ``templateVars`` option.

Contributors to 3.3.3
---------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Alexandros Solanos
* Benjamin Tamási
* Jad Bitar
* Jeremy Harris
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Nick Busey
* Thinking Media
* mscherer
* ndm2

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
