CakePHP 3.0.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.0.5. This is a maintenance release for the 3.0 branch.

Bugfixes
--------

You can expect the following changes in 3.0.5. See the `changelog
<https://cakephp.org/changelogs/3.0.5>`_ for every commit.

* Filesystem libraries are now available as a standalone package through
  composer.
* QueryLogger correctly interpolates parameters when there are more than 10
  placeholders.
* Datetime inputs correctly render seconds picker elements. Previously they did
  not include 00.
* Marshalling belongsToMany ``_joinData`` was improved. The marshaller now
  correctly handles a mix of new and existing entities.
* InstanceConfigTrait deletes nested data correctly now.
* SQLite fixtures now generate primary key columns correctly in all situations.
* Property caching in Entities was made less aggressive. The mutator caches are
  now completely invalided when any property is changed.
* Association conditions are no longer used when marshalling existing
  belongsToMany records.
* i18n shell creates separate po file entries for messages with differing
  contexts.
* The ``@`` syntax for file uploads in Http\Client was deprecated. Instead you
  should use resource handles. The ``@`` syntax is unsafe with user supplied
  data and will be removed in a future version of CakePHP.
* Blob fields in SQLServer are now hexdecoded before being converted into
  resource handles.
* FormHelper will not default datetime pickers to 'now' unless the input also
  has the ``default => true`` option supplied. This was done to make it easier
  to work with nullable datetime fields.
* QueryExpressions containing subqueries now correctly wrapped in parenthesis.

Improvements
------------

As part of the 3.0 patch releases we are experimenting with implementing smaller
net new features. We want try delivering new features incrementally. In 3.0.5
the following new features were added.

* ``Validator::addNested()`` and ``Validator::addNestedMany()`` were added.
  These methods allow you to create validators for nested array properties.
* ``Collection::unwrap()`` was added.
* ``Folder::copy()`` now supports a non-recursive mode.
* ``Collection::zip()`` and ``Collection::zipWith()`` were added.
* The ``__debugInfo()`` method was implemented in Form and Validator objects. This
  improves DebugKit and ``debug()`` output.

CakeFest 2015 Tickets
---------------------

`CakeFest 2015 <http://cakefest.org/tickets>`_ is happening in 11 days in NYC.
If you haven't already purchased your tickets, there is still time.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release
.. comments::
