CakePHP 2.2 and 2.1.4 released
==============================

The CakePHP core team is proud to announce the immediate availability
of both CakePHP 2.2.0 stable and 2.1.4 which is the final bugfix
release for the 2.1.x branch

The CakePHP team is proud to announce the immediate availability of
CakePHP 2.2.0 stable. As mentioned in previous releases, 2.2 is a API
compatible release with 2.1 and should be generally transparent when
upgrading, except for a few additions you need to make in
configuration files. In addition to this release we have also tagged
version 2.1.4 which would be the last work we do on the 2.1.x series.
Any further stability fixes will be done in 2.2 branch, so we
encourage people to upgrade your apps as soon as possible.

CakePHP 2.2 comes with a great set of new features and goodies, here
is a quick summary of what you can find after upgrading:

+ Dispatcher filters, a lightweight way of attaching callbacks as
  middleware to the dispatcher lifecycle for easier caching or faster
  action responses.
+ New rich api for creating and removing validation rules on the fly
  for models
+ Seamless pagination for custom find types
+ Support for real nested database transactions
+ Cache groups, a nice way for tagging and mass deleting cache entries
  using such tags
+ Improved logging support, several new utility methods were added to
  CakeLog
+ Configure class can now dump stored values into any persistent
  storage
+ AuthComponent now accepts ` contain` as a key for storing extra user
  information in session
+ Several improvements to CakeEmail, such as custom header charset,
  custom themes, setting links domain and custom helpers defined at
  configuration time
+ PUT and DELETE requests encoded with application/x-www-form-
  urlencoded will have its data placed into CakeRequest::$data
+ Set class was deprecated in favor of Hash, a faster and more
  reliable implementation
+ CakeTime is now timezone aware and fully capable of translating
  dates from one zone to the other
+ CakeTime can now also accept DateTime objects in addition to strings
  and timestamps
+ FormHelper now shows more reliably required fields based on
  validation rules
+ HtmlHelper::tableHeaders() now supports setting attributes per table
  cell.
+ Better web tester experience
+ Improved error handling, featuring custom fatal error templates
+ Redis support for caching
+ Added new validation methods for upload checking and natural numbers

Please make sure you read the complete migration guide available at
`http://book.cakephp.org/2.0/en/appendices/2-2-migration-guide.html`_

If you were following each release for 2.2 and 2.1, here's a summary
of the changes that made into this final iteration:


2.1
~~~

+ Fixtures will not be loaded again if associated tables exist already
  in database, making it possible to load fixtures as SQL
+ Better error message in MissingConnectionException when driver is
  not enabled
+ Better locale support for numbers in Number helper
+ Test suite to fail louder if PHPUnit was not found
+ Small improvements to debug functions
+ Fixed issues in data validation when using beforeValidate callback
  to change internal model data
+ Improving reliability in page numbers links for PaginatorHelper
+ Increased compatibility with CentOS servers
+ Reduced chance of cache collision in internal method cache for
  DboSource
+ Fixed issues with default exception renderer and custom helpers
+ Allow Set::extract() to match null.
+ Small bugfixes in XmlView
+ Fixed bugs in Translate Behavior
+ Set session.gc_maxlifetime by default.
+ Fixed bugs in sessions when using long numeric keys in arrays


2.2
~~~

+ More descriptive diffs in web test runner for failed tests
+ Complete E_STRICT compliance
+ Bug fixes for CakeTime timezone support
+ Helpers can now be defined at configuration time for sending emails.
+ Console commands are now grouped by plugin, core and app shells are
  always listed last.
+ Fixed small issues with ModelValidator and improved performance

View the complete changelog available for 2.2.0 [1] and 2.1.4 [2].
Download a packaged release [3]

`CakeFest 2012`_ is around the corner and we already expect awesome
talks and workshops during the best PHP conference out there. If you
haven't `booked your tickets`_ yet, it's about time your do, don't
miss your chance as we're still offering early bird prices!!

As always, thanks to the friendly CakePHP community for the patches,
documentation changes and new tickets. Without you there would be no
CakePHP!


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.2.0`_
+ [2] `http://cakephp.org/changelogs/2.1.4`_
+ [3] `http://github.com/cakephp/cakephp/zipball/2.2.0`_
+ [4] `http://cakefest.org`_



.. _CakeFest 2012: http://cakefest.org/
.. _http://cakephp.org/changelogs/2.1.4: http://cakephp.org/changelogs/2.1.4
.. _booked your tickets: http://cakefest.org/ticket-info
.. _http://book.cakephp.org/2.0/en/appendices/2-2-migration-guide.html: http://book.cakephp.org/2.0/en/appendices/2-2-migration-guide.html
.. _http://cakefest.org: http://cakefest.org
.. _http://cakephp.org/changelogs/2.2.0: http://cakephp.org/changelogs/2.2.0
.. _http://github.com/cakephp/cakephp/zipball/2.2.0: http://github.com/cakephp/cakephp/zipball/2.2.0

.. author:: lorenzo
.. categories:: news
.. tags:: release,2.2,News

