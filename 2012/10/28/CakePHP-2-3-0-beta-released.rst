CakePHP 2.3.0-beta released
===========================

This release contains several new features that improves CakePHP
performance, security and ease of use.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.0-beta[1]. This release contains several new features
that improves CakePHP performance, security and ease of use. When it
is done, this new version is intended to be a replacement for the
2.2.x branch and will be completely backwards compatible. A migration
guide is provided in the book [2] and we encourage you to read it if
you are upgrading from an older version.

A short list of the changes you can expect are:


Constants
---------

+ An application can now easily define CACHE and LOGS, as they are
  conditionally defined by CakePHP now


Caching
-------

+ FileEngine is always the default cache engine. In the past a number
  of people have had difficulty setting up and deploying APC correctly
  both in cli + web. Using files should make setting up CakePHP simpler
  for new developers.


Components
----------


AuthComponent
~~~~~~~~~~~~~

+ A new authenticate adapter has been added to support blowfish/bcrypt
  hashed passwords. You can now use Blowfish in your $authenticate array
  to allow bcrypt passwords to be used.
+ Allow throwing exception instead of redirecting upon unauthorized
  access attempt, this is controlled by a new option in AuthComponent.
  This is useful when you want to block access to users with stateless
  authentication


PaginatorComponent
~~~~~~~~~~~~~~~~~~

+ PaginatorComponent now supports the findType option. This can be
  used to specify what find method you want used for pagination. This is
  a bit easier to manage and set than the 0’th index.


SecurityComponent
~~~~~~~~~~~~~~~~~

+ SecurityComponent now supports the unlockedActions option. This can
  be used to disable all security checks for any actions listed in this
  option.


RequestHandlerComponent
~~~~~~~~~~~~~~~~~~~~~~~

+ RequestHandlerComponent::viewClassMap() has been added, which is
  used to map a content type to view class name. You can add
  $settings['viewClassMap'] for automatically setting the correct
  viewClass based on extension/content type.


CookieComponent
~~~~~~~~~~~~~~~

+ CookieComponent::check() was added. This method works the same as
  CakeSession::check() does.


Console
-------

+ The server shell was added. You can use this to start the PHP5.4
  web-server for your CakePHP application.
+ Baking a new project now sets the application’s cache prefix to the
  name of the application.
+ Adding symlink resolution to app/Console/cake


I18n
----

+ nld is now the default locale for Dutch as specified by ISO 639-3
  and dut its alias. The locale folders have to be adjusted accordingly
  (from /Locale/dut/ to /Locale/nld/).
+ Albanian is now sqi, Basque is now eus, Chinese is now zho, Tibetan
  is now bod, Czech is now ces, Farsi is now fas, French is now fra,
  Icelandic is now isl, Macedonian is now mkd, Malaysian is now msa,
  Romanian is now ron, Serbian is now srp and Slovak is now slk. The
  corresponding locale folders have to be adjusted, as well.
+ Corrected the usage of domain translation for a few internal strings
  in validation rules.
+ Now all translation functions can be overridden by declaring the
  function first.


Configure
---------

+ Configure::check() was added. This method works the same as
  CakeSession::check() does.


Exceptions
----------

+ CakeBaseException was added, which all core Exceptions now extend.
+ The base exception class also introduces the responseHeader() method
  which can be called on created Exception instances to add headers for
  the response, as Exception responses don’t reuse any response
  instances.


Model
-----

+ Support for the biginteger type was added to all core datasources,
  and fixtures.
+ Support for FULLTEXT indexes was added for the MySQL driver.
+ Model::find('list') now sets the recursive based on the max
  containment depth or recursive value. When find('list') is used with
  ContainableBehavior.
+ Added DboSource::resetSequence(). This allows datasources to reset
  sequence values in tables. This is useful for datasources like
  Postgres, and makes using fixtures much easier.
+ DboSource::getLog() will now show the last 200 queries instead of
  the first 200.


Validation
----------

+ Missing validation methods will always trigger errors now instead of
  only in development mode.
+ Added CakeNumber::fromReadableSize() and Validation::filesize()


Network
-------

+ Added enableCrypto() method to CakeSocket class
+ TLS/SSL support was added for SMTP connections.


CakeRequest
-----------

+ CakeRequest::onlyAllow() was added.
+ CakeRequest::query() was added to access variables in the query
  string using dot notation.


CakeResponse
------------

+ CakeResponse::file() was added. This deprecates MediaView.
+ When instantiating a CakeResponse, it will by default set its
  charset to App.encoding


CakeEmail
---------

+ The contentDisposition option was added to CakeEmail::attachments().
  This allows you to disable the Content-Disposition header added to
  attached files.


Router
------

+ Support for tel:, sms: were added to Router::url().
+ Enable dot notation for passing plugin for routeClass parameter
+ Routes are loaded as late as possible. As a consequence - routes
  will also work by default in the cli.


View
----

+ MediaView is deprecated, and you can use new features in
  CakeResponse to achieve the same results.
+ Serialization in Json and Xml views has been moved to _serialize()
+ beforeRender and afterRender callbacks are now being called in Json
  and Xml views when using a view templates.
+ View::fetch() now has a $default argument. This argument can be used
  to provide a default value should a block be empty.
+ View::prepend() has been added to allow prepending content to
  existing block.


Helpers
-------


FormHelper
~~~~~~~~~~

+ FormHelper::select() now accepts a list of values in the disabled
  attribute. Combined with 'multiple' => 'checkbox', this allows you to
  provide a list of values you want disabled.
+ FormHelper::postLink() now accepts a method key. This allows you to
  create link forms using HTTP methods other than POST.
+ Fixed disabled attribute for multiple checkboxes
+ Hidden divs created by FormHelper can now be customized by using the
  hiddenblock template in HtmlHelper::$tags property
+ Improved "required" field detection.


TextHelper
~~~~~~~~~~

+ TextHelper::tail() was added to truncate text starting from the end.
+ ending option in TextHelper::truncate() is deprecated in favor of
  ellipsis


PaginatorHelper
~~~~~~~~~~~~~~~

+ PaginatorHelper::numbers() now has a new option currentTag to allow
  specifying extra tag for wrapping current page number.


CakeNumber
----------

+ CakeNumber::fromReadableSize() was added.
+ CakeNumber::formatDelta() was added.
+ CakeNumber::defaultCurrency() was added.


Folder
------

+ Folder::copy() and Folder::move() now support the ability to merge
  the target and source directories in addition to skip/overwrite.


String
------

+ String::tail() was added to truncate text starting from the end.
  ending in String::truncate() is deprecated in favor of ellipsis


Debugger
--------

+ Debugger::exportVar() now outputs private and protected properties
  in PHP >= 5.3.0.


Security
--------

+ Support for bcrypt was added. See the Security::hash() documentation
  for more information on how to use bcrypt.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.
Download a packaged release [3]


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.3.0-beta`_
+ [2] `http://book.cakephp.org/2.0/en/appendices/2-3-migration-guide.html`_
+ [3] `http://github.com/cakephp/cakephp/tags`_



.. _http://github.com/cakephp/cakephp/tags: http://github.com/cakephp/cakephp/tags
.. _http://cakephp.org/changelogs/2.3.0-beta: http://cakephp.org/changelogs/2.3.0-beta
.. _http://book.cakephp.org/2.0/en/appendices/2-3-migration-guide.html: http://book.cakephp.org/2.0/en/appendices/2-3-migration-guide.html

.. author:: lorenzo
.. categories:: news
.. tags:: release,2.3.0,News

