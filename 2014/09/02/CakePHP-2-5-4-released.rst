CakePHP 2.5.4 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.4.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.4. 2.5.4 is a bugfix release for the 2.5 release
branch. A short list of the changes you can expect is:

+ Improved SMTP auth reply checks.
+ Headers are now correctly sent when using ajaxLogin elements with
  AuthComponent.
+ Errors in sample schema files were corrected.
+ SecurityComponent no longer puts URLs containing a space into the
  blackhole callback.
+ Year validation now accepts dates from 1800 and later.
+ RequestHandlerComponent will unserialize request bodies on DELETE
  requests.
+ Transactions are now rolled back in saveAssociated/saveMany when
  exceptions are raised.
+ Model::afterFind() is no longer called twice for hasOne/belongsTo
  associations. It is now only called once, with the model alias format.
+ Join building now accepts no conditions. When joins are created with
  no conditions a cross will be created unless where conditions
  correctly restrict the query.
+ SchemaShell now correctly handles the --file and --name switches.
+ Generated schema files have more predictable names now. Instead of
  using the APP_DIR value, they will always used 'App' for application
  schema files.
+ Exceptions arising from race conditions in FileEngine are now
  ignored.
+ CakeTime now returns '' on invalid input.
+ Translation functions correctly format placeholders when the first
  value is null.
+ CURRENT_TIMESTAMP is no longer used as a string default value for
  TIMESTAMP columns with UPDATE CURRENT_TIMESTAMP in MySQL.
+ Words ending in 'data' are no longer inflected to datum. This means
  works like 'FileMetadata' are not inflected incorrectly.

You can view the full `changelog on cakephp.org`_. I'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a `packaged release on
github`_.


.. _packaged release on github: https://github.com/cakephp/cakephp/releases/2.5.4
.. _changelog on cakephp.org: https://cakephp.org/changelogs/2.5.4

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News
