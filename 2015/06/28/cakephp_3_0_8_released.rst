CakePHP 3.0.8 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.0.8. This is a maintenance release for the 3.0 branch.

Bugfixes
--------

You can expect the following changes in 3.0.8. See the `changelog
<http://cakephp.org/changelogs/3.0.8>`_ for every commit.

* ``EntityTrait::toArray()`` now handles mixed arrays better. Previously if the
  first element was an entity, it assumed that all elements were entities.
* Pagination now preserves query string arguments with ``0`` as their value.
* ``Validation::multiple()`` now correctly handles '0'.
* Previously it was impossible to use dot notation on two
  different calls to matching/contain when part of the string was
  shared (for example Articles.SpecialTags.Tags and Articles.SpecialTags.Authors).
* ``TableRegistry::get()`` now correctly merges pre-configured options.
* Table names in ``UPDATE`` queries are correctly quoted now.
* Fixtures now correctly reflect composite primary keys when generated.
* Both ``[]`` and ``''`` are now treated the same when saving belongsToMany
  associations. This fixes silent failures when '' was used.
* Numeric fields are cast to their string values when creating form security
  tokens. This resolves issues where integer values would cause validation
  failures.
* CsrfComponent now correctly sets the cookie expiry date.
* The list of available shell commands is now correct if there is an app Shell
  with the same name as a core one.
* Multicheckboxes generated with complex input types are now checked/disabled
  correctly.
* When updating belongsToMany links, association conditions are used. This fixes
  issues with polymorphic joint tables.
* Pagination with SQLServer 2008 now works better.

Improvements
------------

As part of the 3.0 patch releases we are experimenting with implementing smaller
net new features. We want try delivering new features incrementally. In 3.0.8
the following new features were added:

* The fallback domain for translations can be disabled with
  ``I18n::useFallback(false)``.
* PaginatorComponents' ``sortWhitelist`` option now allows ``false`` to disable
  sorting entirely.
* Components now have a ``response`` property set during initialization.
* ``cake i18n extract`` now generates missing directories.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
