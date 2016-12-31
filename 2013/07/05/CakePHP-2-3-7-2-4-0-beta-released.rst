CakePHP 2.3.7 & 2.4.0-beta released
===================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.7 & 2.4.0-beta. 2.3.7 is a bugfix release for the 2.3
branch, while 2.4.0-beta is the first release of the 2.4 branch

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.7 & 2.4.0-beta[1]. 2.3.7 is a bugfix release for the
2.3 branch, while 2.4.0-beta is the first release of the 2.4 branch. A
short list of the changes you can expect in 2.3.7 are:

+ Cached views now contain their Content-Type header. It is
  recommended that you flush your view caches when upgrading.
+ Return-Path is now excluded on emails delivered via SMTP.
+ The automatic created & modified times when saving records are now
  consistent. There used to be an edge case where they could differ by
  one second.
+ Undocumented, untested features around the IIS_SERVER constant have
  been removed.
+ FormHelper::dateTime() now selects the correct year when creating an
  input which has a maxYear earlier than the current year.
+ Email views now calculate the boundary later in the rendering
  process fixing issues where View callbacks could append inline images
  or attachments, resulting in incorrect boundary markers.
+ AuthComponent now correctly generates redirect URL's when the
  application base path matches the controller name.
+ Errors generated from requests containing 'index.php' now render
  correctly.
+ Classnames containing '..' are now rejected.

There was a security fix in this release that fixes an issue where
controllers outside of the application could be loaded under certain
conditions. This is an important upgrade for applications that accept
uploaded PHP files where user data is used to determine the final file
name. In these situations it would be possible for an attacker to
upload a PHP file and remotely execute code. A big thanks to Adrian
Ulrich for contacting us about the issue, and providing steps to
reproduce it.


2.4.0-beta
----------

The 2.4.0-beta release contains several new features that improve
CakePHP's performance, security and ease of use. When done, this new
version is intended to be a replacement for the 2.3.x branch. A
migration guide is provided in the book [2] and we encourage you to
read it if you are upgrading from an older version.

The current list of the new features & changes you can expect in
2.4.0:


Console
-------

+ Logged notice messages will now be colourized in terminals that
  support colours.



SchemaShell
~~~~~~~~~~~

+ `cake schema generate` now supports the `--exclude` parameter.



BakeShell
~~~~~~~~~

+ `cake bake model` now supports baking `$behaviors`. Finding `lft`,
  `rght` and `parent_id` fields in your table it will add the Tree
  behavior, for example. You can also extend the ModelTask to support
  your own behaviors to be recognized.



FixtureTask
~~~~~~~~~~~

+ `cake bake fixture` now supports a `--schema` parameter to allow
  baking all fixtures with noninteractive "all" while using schema
  import.



Object
~~~~~~

+ `Object::log()` had the `$scope` parameter added.



Components
----------


AuthComponent
~~~~~~~~~~~~~

+ AuthComponent now supports proper stateless mode when using `Basic`
  or `Digest` authenticators. Starting of session can be prevented by
  setting `AuthComponent::$sessionKey` to false. Also now when using
  only `Basic` or `Digest` you are no longer redirected to login page.
  For more info check the `AuthComponent` page.
+ Property `AuthComponent::$authError` can be set to boolean `false`
  to suppress flash message from being displayed.



PasswordHasher
~~~~~~~~~~~~~~

+ Authenticating objects now use new password hasher objects for
  password hash generation and checking.



Models
------

+ `Model::save()`, `Model::saveField()`, `Model::saveAll()`, `
  Model::saveAssociated()`, `Model::saveMany()` now take a new `
  counterCache` option. You can set it to false to avoid updating
  counter cache values for the particular save operation.
+ `Model::clear()` was added.



Datasource
----------

+ Mysql, Postgres, and SQLserver now support a 'settings' array in the
  connection definition. This key => value pair will be issued as `SET`
  commands when the connection is created.



View
----


JsonView
~~~~~~~~

+ JSONP support has been added to :php:class: `JsonView`.



HtmlHelper
~~~~~~~~~~

+ The API for `HtmlHelper::css()` has been changed.
+ New option `escapeTitle` added to `HtmlHelper::link()` to control
  escaping of only link title and not attributes.



TextHelper
~~~~~~~~~~

+ `TextHelper::autoParagraph()` has been added. It allows to
  automatically convert text into HTML paragraphs.



PaginatorHelper
~~~~~~~~~~~~~~~

+ `PaginatorHelper::param()` has been added.



Network
-------


CakeRequest
~~~~~~~~~~~

+ `CakeRequest::param()` has been added.
+ `CakeRequest::is()` has been modified to support an array of types
  and will return true if the request matches any type.
+ `CakeRequest::isAll()` has been added to check that a request
  matches all the given types.



CakeEmail
~~~~~~~~~

+ Logged email messages now have the scope of `email` by default. If
  you are not seeing email contents in your logs, be sure to add the `email`
  scope to your logging configuration.



HttpSocket
~~~~~~~~~~

+ `HttpSocket::patch()` has been added.



L10n
----

+ `ell` is now the default locale for Greek as specified by ISO 639-3
  and `gre` its alias. The locale folders have to be adjusted
  accordingly (from `/Locale/gre/` to `/Locale/ell/`).
+ `fas` is now the default locale for Farsi as specified by ISO 639-3
  and `per` its alias. The locale folders have to be adjusted
  accordingly (from `/Locale/per/` to `/Locale/fas/`).
+ `sme` is now the default locale for Sami as specified by ISO 639-3
  and `smi` its alias. The locale folders have to be adjusted
  accordingly (from `/Locale/smi/` to `/Locale/sme/`).
+ `mkd` replaces `mk` as default locale for Macedonian as specified
  by ISO 639-3. The corresponding locale folders have to be adjusted, as
  well.
+ Catalog code `in` has been dropped in favor of `id` (Indonesian),
  `e` has been dropped in favor of `el` (Greek), `n` has been dropped
  in favor of `nl` (Dutch), `p` has been dropped in favor of `pl`
  (Polish), `sz` has been dropped in favor of `se` (Sami).
+ Kazakh has been added with `kaz` as locale and `kk` as catalog
  code.
+ Kalaallisut has been added with `kal` as locale and `kl` as
  catalog code.



Logging
-------

+ Log engines do not need the suffix `Log` anymore in their setup
  configuration. So for the FileLog engine it suffices to define
  `'engine'=>'File'` now. This unifies the way engines are named in
  configuration (see Cache engines for example). Note: If you have a Log
  engine like `DatabaseLogger` that does not follow the convention of
  using the `Log` suffix, you will have to adjust your class name to `
  DatabaseLog`. You should also avoid class names like `SomeLogLog`
  which include the suffix twice at the end.



FileLog
~~~~~~~

+ Two new config options `size` and `rotate` have been added for `FileLog` engine.



SyslogLog
~~~~~~~~~

+ The new logging engine `SyslogLog` was added to stream messages to
  syslog.



Utility
-------

+ `pr` no longer outputs HTML when running in cli mode.



Validation
~~~~~~~~~~

+ `Validation::date()` now supports the `y` and `ym` formats.
+ The country code of `Validation::phone()` for Canada has been
  changed from `can` to `ca` to unify the country codes for validation
  methods according to ISO 3166 (two letter codes).



CakeNumber
~~~~~~~~~~

+ The currencies `AUD`, `CAD` and `JPY` have been added.
+ The symbols for `GBP` and `EUR` are now UTF-8. If you upgrade a
  non-UTF-8 application, make sure that you update the static `$_currencies`
  attribute with the appropriate HTML entity symbols (`&#163;` and `&#8364;`)
  before you use those currencies.



CakeTime
~~~~~~~~

+ `CakeTime::isPast()` and `CakeTime::isFuture()` were added.



Xml
~~~

+ New option `pretty` has been added to `Xml::fromArray()` to return
  nicely formatted Xml.



Error
-----


ErrorHandler
~~~~~~~~~~~~

+ New configuration option `skipLog` has been added, to allow
  skipping certain Exception types to be logged. `Configure::write('Exc
  eption.skipLog',array('NotFoundException','ForbiddenException'));`
  will skip logging these exceptions and the ones extending them when `
  'Exception.log'` config is `true`



Routing
-------


Router
~~~~~~

+ `Router::baseUrl()` was added. This method replaces `
  FULL_BASE_URL`. Which is now deprecated.

The API docs[3] and cookbook have been updated to reflect the changes
and updates for 2.4.0.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.
Download a packaged release [4].


Links
~~~~~

+ [1] https://cakephp.org/changelogs/2.4.0-beta
+ [2] https://book.cakephp.org/2.0/en/appendices/2-4-migration-
  guide.html
+ [3] https://api.cakephp.org/2.4
+ [4] https://github.com/cakephp/cakephp/tags



.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

