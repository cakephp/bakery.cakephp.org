CakePHP 2.4.0 is ready
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.0 and 2.3.10[1]. There have been a few small
improvements and fixes since the release of 2.4.0-RC2.


CakePHP 2.4.0
-------------

CakePHP 2.4.0 is now marked as stable. It is a new version in the 2.x
series that is API compatible with other releases in the 2.x series.
Make sure you read the migration guide [2] before upgrading as there
are a few changes you may need to make.

A quick overview of the changes in 2.4 are:

+ The constants IMAGES_URL, JS_URL, CSS_URL have been deprecated and
  replaced with config variables App.imageBaseUrl, App.jsBaseUrl,
  App.cssBaseUrl respectively. Each of the deprecated constants will be
  removed in 3.0.
+ The CAKEPHP_SHELL constant has been deprecated and will be removed
  in 3.0.
+ Sanitize class has been deprecated and will be removed in 3.0.
+ FileLogs can now have a max size and simple rotation configured.
+ Logging now support syslog out of the box.
+ A number of locales have been renamed.
+ JSONP support has been added to the JsonView
+ You can disable updating counterCache values with the `counterCache`
  option when saving models.
+ Password hashing has been extracted into a set of PasswordHasher
  classes. These classes make changing out password hashing strategies
  for the various authentication adapters simple.
+ Stateless authentication has been improved.

For a full list of the changes and improvements you should review the
2.4 Migration guide [2].


Changes to 2.4.0 since 2.4.0-RC2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+ confirm handlers are now correctly encoded.
+ Helpers are now loaded during View construction. This ensures that
  helpers are always available.
+ View blocks can now operate on any object that can be converted to a
  string.
+ All changes detailed in the 2.3.10 changelogs are also included with
  2.4.0



CakePHP 2.3.10
--------------

2.3.10 marks the end of normal bug fix releases for 2.3.x. Security
fixes will continue to be released for 2.3.x until 2.6.0. The
following is a short list of issues fixed and changes you can find in
2.3.10

+ Configuration values are now merged between Emails and their
  transports.
+ CakeTime::timeAgoInWords() now uses 'about X ago' when the time
  delta is lower than accuracy.
+ DbAcl now uses INNER joins instead of LEFT joins. This yields
  improved performance with some database vendors.
+ CakeEmail::template() can now disable the layout as documented.
+ Number formatting in locales that use ',' for a decimal separator is
  now correct.
+ RedirectRoute now honors the 'persist' parameter correctly.
+ Constants are now conditionally defined in ShellDispatcher.
+ session.auto_start is no longer set as it never worked and triggers
  errors in PHP 5.5.
+ Sqlite now generates schema correctly when BIGINT columns are used
  as a primary key.
+ FileCache now removes special characters that would cause issues on
  windows systems.
+ i18n shell now correctly extracts categories other than LC_MESSAGES.

Development continues to progress on 3.0 with pull requests being
frequently opened. Work has also begun on 2.5, another API compatible
release in the 2.x line of releases. A huge thanks to all involved in
terms of both contributions through commits, tickets, documentation
edits, and those whom have otherwise contributed to the framework.
Without you there would be no CakePHP. Download a packaged release
[3].


Links
~~~~~

+ [1] `https://github.com/cakephp/cakephp/releases`_
+ [2] `https://book.cakephp.org/2.0/en/appendices/2-4-migration-guide.html`_
+ [3] `https://github.com/cakephp/cakephp/tags`_




.. _https://book.cakephp.org/2.0/en/appendices/2-4-migration-guide.html: https://book.cakephp.org/2.0/en/appendices/2-4-migration-guide.html
.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _https://github.com/cakephp/cakephp/releases: https://github.com/cakephp/cakephp/releases

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

