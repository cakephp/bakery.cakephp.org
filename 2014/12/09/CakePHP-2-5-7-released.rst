CakePHP 2.5.7 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.7. 2.5.7 is a bugfix release for the 2.5 release
branch.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.7. 2.5.7 is a bugfix release for the 2.5 release
branch. A short list of the changes you can expect is:

+ Unsetting the email address pattern in CakeEmail now works as
  documented.
+ Console tools now exit non-zero on failure.
+ Fixed inflection of schema class names in SchemaShell.
+ SQLite datasource correctly parses field names out of queries
  containing subqueries.
+ TreeBehavior now works with models that have a default order
  property defined.
+ HttpSocket gracefully handles invalid chunked responses now.
+ HttpSocket now honors the version config option, allowing HTTP 1.0
  connections to be made.
+ Postgres datasource now works with sequences defined outside
  schemas.
+ CakeEmail no longer strips lines that only contain '0'.
+ Fix more segfaults in Memcached cache engine.
+ Cached file_map no longer regenerates on every request.
+ CakePHP is now compatible with the phpunit.phar package.
+ Improved API docs, specifically around triggered events.

You can view the full `changelog on cakephp.org`_. I'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a `packaged release on
github`_.


.. _packaged release on github: https://github.com/cakephp/cakephp/releases/2.5.7
.. _changelog on cakephp.org: http://cakephp.org/changelogs/2.5.7

.. author:: markstory
.. categories:: news
.. tags:: ,News

