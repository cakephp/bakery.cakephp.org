CakePHP triple layered edition released
=======================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.2.11, 1.3.12 and 2.0.0-RC2. Both 1.2.11 and 1.3.12 are
bugfix/maintenance releases. This triple release also contains the
second iteration of the 2.0 version release candidates mostly
featuring fixes, new test cases and a few new enhancements. There were
no backwards incompatible changes in any of three versions.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.2.11, 1.3.12 and 2.0.0-RC2. Both 1.2.11 and 1.3.12 are
bugfix/maintenance releases. This triple release also contains the
second iteration of the 2.0 version release candidates mostly
featuring fixes, new test cases and a few new enhancements. There were
no backwards incompatible changes in any of three versions.

Grab them while they're fresh in the download[1] page!

Among the relevant changes introduced in every branch we can highlight
the following: (please note that every version is sharing the relevant
fixes and commits for common bugs)


1.2
~~~

+ Fixed file deletion issue in windows where unlink() cannot delete
  files that have open file handles.
+ Fixed multiple issues with security component
+ Fixed issue where times between 12:00 and 12:59 would be incorrectly
  marked as am in TimeHelper
+ Fixed multiple bugs in Xml library
+ Fixed bugs in Set::extract() function
+ Fixing issues with duplicate content/empty tags with CacheHelper

This version has finally been tagged after a very long time featuring
over 15 commits and 10 tickets resolved. For a complete list of
changes please take a look at the changelog[2]


1.3
~~~

+ Fixed bugs in CakeSchema related to Postgres
+ Fixed bugs on Containable behavior
+ Added unix sockets support to memcache.
+ Fixed bug where scientific notations were not passed to mysql in
  their original form which resulted in loss of precision
+ Fixed bugs in Set::extract() function
+ Changing Postgresql to use DELETE FROM instead of TRUNCATE. This
  should improve compatibility with databases using constraints in
  Fixtures

A total of 53 commits closing over 20 tickets consolidates this
version as the most stable and well tests CakePHP version yet. For a
complete list of changes please take a look at the changelog[3]


2.0
~~~

+ The 'default' config for Configure class is now auto created on
  first use if not already created.
+ Made full page caching + Themes work.
+ Fixed multiple bugs in form helper and Rss helper
+ Improved the upgrade shell
+ Deprecated the %page% style placeholders in PaginatorHelper.
  Updating scaffold and bake templates to not use deprecated
  placeholders.
+ Model validation messages now accept sprintf placeholders that will
  get filled with parameter from the 'rule' key in the validation array
+ Added a bunch of new tests to the suite

64 commits and over 10 tickets closed can be found at the complete
changelog[4]

We're getting very close to a final stable 2.0 release. The team is
now focused in fixing any remaining bugs and improving the
documentation which can be found in the new 2.0 book[5]. If you feel
like you can give us a hand on polishing and improving the
documentation, please feel free to fork the repo[6] and send us pull
request for changes. We are also looking forward improving our API
documentation, so pull requests for doc blocks in code are also very
welcome!

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and people attending CakeFest
2011 which was even better than last year's.


Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp/downloads`_
+ [2] `http://cakephp.org/changelogs/1.2.11`_
+ [3] `http://cakephp.org/changelogs/1.3.12`_
+ [4] `http://cakephp.org/changelogs/2.0.0-RC2`_
+ [5] `http://book.cakephp.org/2.0/en/`_
+ [7] `https://github.com/cakephp/docs`_




.. _https://github.com/cakephp/docs: https://github.com/cakephp/docs
.. _http://cakephp.org/changelogs/1.2.11: http://cakephp.org/changelogs/1.2.11
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads
.. _http://book.cakephp.org/2.0/en/: http://book.cakephp.org/2.0/en/
.. _http://cakephp.org/changelogs/1.3.12: http://cakephp.org/changelogs/1.3.12
.. _http://cakephp.org/changelogs/2.0.0-RC2: http://cakephp.org/changelogs/2.0.0-RC2

.. author:: lorenzo
.. categories:: news
.. tags:: News

