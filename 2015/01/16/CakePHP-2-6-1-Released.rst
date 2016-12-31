CakePHP 2.6.1 Released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.6.1.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.6.1. 2.6.1 is a bugfix release for the 2.6 release
branch. A short list of the changes you can expect is:

+ I18nShell now correctly extracts messages with context.
+ Improved web test runner. All URL options now have links in the
  interface.
+ Session directories are now created when debug is enabled.
+ Text columns in SQLServer no longer contain length when reflected.
  The length value was not useful and was causing FormHelper to
  misbehave.
+ AssetDispatcher no longer sets the Content-Length header as it was
  incorrect when assets included PHP code.
+ URL autolinking has been improved.
+ Criterion is now correctly inflected.
+ Time strings are now correct when mbstring is not installed.
+ The exception emitted when headers were sent has been removed. This
  exception was causing more problems than it was solving, including
  infinite loops on fatal error pages.
+ Radio buttons that are only partially disabled are now added to the
  list of secured fields.
+ MySQL now correctly quotes SET column values.

You can view the full `changelog on cakephp.org`_. We'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a `packaged release on
github`_.


.. _packaged release on github: https://github.com/cakephp/cakephp/releases/2.6.1
.. _changelog on cakephp.org: https://cakephp.org/changelogs/2.6.1

.. author:: markstory
.. categories:: release,news
.. tags:: release,CakePHP,News
