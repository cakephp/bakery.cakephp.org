CakePHP 2.3.0 is out!
=====================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.0 and 2.2.6[1]. There have been a few small
improvements and fixes since the release of 2.3.0-RC2.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.0 and 2.2.6[1]. There have been a few small
improvements and fixes since the release of 2.3.0-RC2.


CakePHP 2.3 is now marked as stable
-----------------------------------

2.3.0 is a new version that is completely compatible with its 2.2.5
predecessor. If you get excited to upgrade your projects right away
after reading this announcement, make sure you read the migration
guide in the book [2], as there are a few changes that your
application might require

This is a quick review of the changes that made it in this new
iteration.


Authorization
~~~~~~~~~~~~~

AuthComponent received some love, it is now much easier to implement
stateless authorization mechanisms that will respond with appropriate
error codes instead of redirecting on missing access rights. The new `
AuthComponent::$unauthorizedRedirect` property was added to control
this behavior at runtime and it can be set to false or to an URL as
needed.

For improved security, we have added a new Blowfish adapter that will
hash your passwords using blowfish/bcrypt.

Additionally, we have deprecated ` AuthComponent::redirect()` in favor
of ` AuthComponent::redirectUrl` to better reflect what the method is
doing.


Paginator
~~~~~~~~~

If you want to use a custom find method in your pagination calls, it
is now easier. Just set the ` findType` key in the Paginator settings
array and profit!

We have also decided to return a NotFoundException error in case any
user tries to access a page of out range instead of serving an
inexistent one or the first, which was the previous behavior.

Now setting the 'limit' manually in the Paginator settings array to a
value bigger than maxLimit will actually bring maxLimit to the same
value, no need to repeat yourself.


Custom view classes
~~~~~~~~~~~~~~~~~~~

Don't like the built-in implementation for content type views? Need to
extend them somehow? That is easier than ever! Just set the view class
name using ` RequestHandlerComponent::viewClassMap()` or set the map
directly in the settings array for the RequestHandlerComponent.


We <3 PHP 5.4
~~~~~~~~~~~~~

Yeah, we still support 5.2. But, it did not prevent us from releasing
a cool shell command for creating an standalone php server for quick
development. Just start it with ` Console/cakeserver`


Configuring your app
~~~~~~~~~~~~~~~~~~~~

Configuration engines are now capable of storing their internal state
to the format they understand. ` ConfigReaderInterface::dump()` was
added and the correspondent implementation for the IniReader engine.
This is useful if you need to persist dynamically generated
configuration or if you want to implement a custom configuration
engine that stores in a database.

A common complaint about CakePlugin::loadAll() was that it did not
check whether the bootstrap files in plugins actually existed or not.
This made it difficult for applications like a CMS to load all
extensions in one go. While we still believe each plugin should be
loaded with the correct settings, we have added a new ` ignoreMissing`
key in the plugin configuration array. ` CakePlugin::loadAll(array('ro
utes'=>true,'bootstrap'=>true,'ignoreMissing'=>true))` will
load all plugins and not yell at you if one of the routes.php or
bootstrap.php files is missing.


Networking and email
~~~~~~~~~~~~~~~~~~~~

Just as you can read the posted data using dot notation with `
request->data('key')`, you can now do the same with the
querystring, by using the method ` request->query('key')`

After some thought, we decided to deprecate MediaView. All its code
lives now in CakeResponse::file(), this makes it a one-liner to send
files directly to the browser either by streaming it or making it an
download.

We added support for TLS connections in CakeSocket, this made it
possible to send emails over SMTP + TLS protocols. Also, it is now
possible to set the Content-Disposition header for attachments sent
with CakeEmail by using the ` contentDisposition` option

As a minor, but important change, HttpResponse was deprecated and all
its code resides in the new class HttpSocketResponse.


Views and helpers
~~~~~~~~~~~~~~~~~

The view class received some love once again, continuing our efforts
since 2.1. One of the changes is to make ` View::fetch()` have a
default text in case the requested block is empty. Also, `
View::prepend` handy method was added to prepend text to any existing
block. In case you were interested in executing some code only if a
block already existed, then the new ` View::startIfEmpty()` might be
what you were looking for.

If you had a case where you could not know in advance whether an
element file existed or not, 2.3 is now for you. We have introduced `
View::elementExists()` and added the ` ignoreMissing` option to `
View::element()` to suppress the missing element errors.

Another simple yet important change: our default layout uses HTML5 as
doctype. We did this because now FormHelper will add the ` required`
attribute to your fields.

FormHelper got even more intelligent, it can now select the correct
input type for telephone and email fields. Also, it is now possible to
to use any HTTP verb in ` FormHelper::postLink()`

PaginatorHelper got a few new and very much anticipated features:

+ ` PaginatorHelper::numbers()` now has a new option currentTag to
  allow specifying extra tag for wrapping current page number.
+ For ` PaginatorHelper::prev()` and ` PaginatorHelper::next()` it is
  now possible to set the tag option to false to disable the wrapper.
  Also a new option disabledTag has been added for these two methods.

Finally, helpers got a $settings property, that will be set with any
array specified from the controller.


Caching
~~~~~~~

+ File Engine is now the default caching engine, this solves quite a
  few problems with people not having APC installed or forgetting to
  change the cache prefix when having multiple apps on the same server
+ It is finally possible to have different full page caches, for
  example a different cache per subdomain. This is achieved with the new
  viewPrefix setting in the cache configuration. `
  Configure::write(‘Cache.viewPrefix’,‘YOURPREFIX’);`


Models
~~~~~~

IMPORTANT: ` Model::find('first')` will now return an empty array when
no records are found. Make sure you update your tests!

+ Added support for bigint data types and MySQL FULLTEXT indexes.
+ ` Validation::fileSize()` was added.

When testing models, or controllers, you can now use `
CakeTestCase::getMockForModel()` for quickly generating model mocks
that will have the correct alias, table name and be correctly
registered in the ClassRegistry.


Since 2.3.0-RC2 the following bit were changed
----------------------------------------------

+ Renamed AuthComponent::redirect() to AuthComponent::redirectUrl().
+ Added "tel" and "email" input type guessing.
+ Controller::_getViewObject() method for constructing the View object
  when rendering
+ Don't set "required" attribute for checkboxes (unless explicitly
  specified).
+ Removed Security.level from core.php
+ Display exact PDO error on default homepage
+ Allow AuthComponent::$unauthorizedRedirect to be an url.
+ Added feature to ignore include errors for CakePlugin
+ Allowed ` between` option for radio buttons to be an array of
  strings

See the changelog for a full list of changes in 2.3.0[3]


Changes for the 2.2.x branch
----------------------------

+ Make sure sessions are started before destroying them.
+ Consistently inflecting theme names, this means that every theme
  should start with an uppercase as the other folders
+ Add OK or Successful HTTP codes 200-206 to HttpResponse::isOK().
  Fixes #3531
+ Only bake HABTM associations for tables that exist.
+ Add support for --admin to bake controller all.
+ Fixing the way to follow redirects when fetching XML files.
+ Fix Token fields being added to GET forms.
+ Allow afterFind() to fully remove an associated record. By returning
  array() or unsetting the 0'th result an afterFind callback should be
  able to fully remove data from the results.

The changelog[4] has the full list of changes in 2.2.5

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.

Download a packaged release [1]


Links
-----

+ [1] `https://github.com/cakephp/cakephp/tags`_
+ [2] `https://book.cakephp.org/2.0/en/appendices/2-3-migration-guide.html`_
+ [3] `https://cakephp.org/changelogs/2.3.0`_
+ [4] `https://cakephp.org/changelogs/2.2.6`_



.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _https://book.cakephp.org/2.0/en/appendices/2-3-migration-guide.html: https://book.cakephp.org/2.0/en/appendices/2-3-migration-guide.html
.. _https://cakephp.org/changelogs/2.2.6: https://cakephp.org/changelogs/2.2.6
.. _https://cakephp.org/changelogs/2.3.0: https://cakephp.org/changelogs/2.3.0

.. author:: lorenzo
.. categories:: news
.. tags:: release,2.3,News

