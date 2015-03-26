CakePHP 2.5.8 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.8.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.8. 2.5.8 is a bugfix release for the 2.5 release
branch. A short list of the changes you can expect is:

+ Improved error messages when fixtures are missing fields.
+ Human is now properly pluralized by Inflector
+ TreeBehavior regression introduced in 2.5.7 was fixed.
+ RequestHandler::startup() failures no longer prevent error pages
  from rendering. This could happen when custom input parsers were used.
+ Fixture baking will now ignore unconventional tables instead of
  stopping.
+ Importing schema from MySQL tables using timestamp columns now works
  better.

With the release of 2.6.0 complete, this will be the last release of
2.5.x barring any security related issues.

You can view the full `changelog on cakephp.org`_. I'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a `packaged release on
github`_.


.. _changelog on cakephp.org: http://cakephp.org/changelogs/2.5.8
.. _packaged release on github: https://github.com/cakephp/cakephp/releases/2.5.8

.. author:: markstory
.. categories:: news
.. tags:: ,News

