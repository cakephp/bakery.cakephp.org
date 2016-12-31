CakePHP 2.4.0-RC1 and 2.3.9 released
====================================

The CakePHP core team is happy to announce the immediate availability
of the first release candidate for 2.4.0 and a new maintenance release
for the 2.3 branch.

The CakePHP core team is happy to announce the immediate availability
of the first release candidate for 2.4.0[1] and a new maintenance
release for the 2.3 branch[2].

As the date for CakeFest 2013[3] comes closer, you should be thinking
on buying a ticket if haven't already. It will be a great time to
learn way beyond just CakePHP, this year we feature talks about
performance, the future of PHP and modern javascript frontend
frameworks. The core team is making great strides for having a new
stable version for CakeFest and workshops will be based off the great
new features next release is including.

A short list of changes you can expect in 2.4.0-RC1 are:

+ Support for query parameters on Router::parse()
+ Add option to send email attachment from string in CakeEmail
+ Allow variable aliasing when using `_serialize` for the JsonView and
  XmlView. It also support pretty printing when available
+ Improving phone validation for USA and Canada
+ New option to multiply decimal percentages in
  CakeNumber::toPercentage()
+ Ability to provide custom strings for timeAgoInWords()
+ Minutes display with FormHelper can now be rounded to the next or
  previous custom value
+ PaginatorHelper won't display the first page argument for the first
  page, to avoid duplication on search engines
+ Added CakeResponse::location() to quickly send redirect status codes
  and location
+ Ability to set multiple headers at once with CakeRespose::header()
+ Improved handling of response codes to avoid sending invalid HTTP
  responses
+ Added SSL support to MySQL PDO connections
+ IMAGES_URL, CSS_URL, JS_URL are now deprecated and can be controlled
  with a new Configure value
+ ConsoleShell was also deprecated
+ Support for setting full URLs in css/js/image constants and
  configure values
+ CakeTestCase::getMockForModel() is now smarted and can mock AppModel
+ Deprecated DEFAULT_LANGUAGE constant
+ Deprecated Sanitize class
+ Missing directories under tmp used for logging and caching are now
  created automatically in debug mode

Maintenance release 2.3.9 incorporates over 20 bugfixes and some
performance improvements, developers are encouraged to upgrade their
apps to profit from these changes.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.
Download a packaged release [4].


Links
~~~~~

+ [1] `https://cakephp.org/changelogs/2.4.0-RC1`_
+ [2] `https://cakephp.org/changelogs/2.3.9`_
+ [3] `http://cakefest.org/`_
+ [4] `https://github.com/cakephp/cakephp/tags`_




.. _http://cakefest.org/: http://cakefest.org/
.. _https://cakephp.org/changelogs/2.4.0-RC1: https://cakephp.org/changelogs/2.4.0-RC1
.. _https://cakephp.org/changelogs/2.3.9: https://cakephp.org/changelogs/2.3.9
.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags

.. author:: lorenzo
.. categories:: news
.. tags:: News

