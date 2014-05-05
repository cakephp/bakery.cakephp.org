CakePHP 2.1.2 & 2.2.0-beta released
===================================

The CakePHP core team is proud to announce the immediate availability
of both CakePHP 2.1.2 [1], and 2.2.0-beta [2]. 2.1.2 is a bugfix
release for the 2.1.x branch, while 2.2.0-beta is the first release
for 2.2.x.

The CakePHP core team is proud to announce the immediate availability
of both CakePHP 2.1.2 [1], and 2.2.0-beta [2]. 2.1.2 is a bugfix
release for the 2.1.x branch, while 2.2.0-beta is the first release
for 2.2.x.


CakePHP 2.1.2
-------------

There are a number of bugfixes in 2.1.2, the most notable of those
changes is:

+ Set::insert() now overwrites values that were previously string
  values.
+ AuthComponent now uses loginRedirect as the default redirect
  location, should the session be empty.
+ CakeNumber::format() now supports multiple bytes for
  thousands/decimals when using PHP lower than PHP 5.4
+ A change to CakeSession was reverted to help solve issues with IE8
  and sessions being lost.
+ Fixed an issue with SQLServer + boolean columns.
+ DboSource::buildJoinStatement() does not add the schema when the
  table is a subquery.
+ SessionComponent::id() always returns the sessionid. It will auto-
  start the session if necessary.
+ Method checking in Model for expression() and calculate() is only
  done when required now.
+ The testsuite now always uses the test datasource. Previously, if
  you did not include any fixtures and ran tests that required the
  database, the default connection was used.
+ URL fragments are no longer urlencoded. This caused issues with
  client side frameworks like backbone.
+ The return of L10n::get() consistently returns the language.
+ HTML escaping for string urls on css() and script() was fixed.
+ Warnings from saveAll() with an empty hasMany data set are fixed.
+ Validation::decimal() accepts values like 10 and 10.0 .
+ FormHelper::postButton() no longer makes invisible buttons.
+ The $_FILES array is now recursively reformatted. This fixes issues
  when file inputs are deeply nested.
+ EmailComponent no longer double encodes addresses containing UTF-8
  characters.
+ File::create() no longer juggles umask. This was a workaround for
  file caching which is no longer needed.



CakePHP 2.2.0-beta
------------------

Following hot on the heels of 2.1.0, the CakePHP team is proud to
announce the beta release for 2.2.0. 2.2.x will be an API compatible
release with 2.0.x, and 2.1.x. All of the changes mentioned in the
2.1.2 release, are also be present in 2.2.0-beta. We've decided to
skip the standard ` -dev` and ` -alpha` releases, as we think the new
features are relatively stable, and should be generally transparent
when upgrading. A quick list of new features added in 2.2.0-beta:


Timezone support for CakeTime utility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+ Added "Config.timezone" param to configure global timezone for the
  application.
+ CakeTime functions can now use timezone string or DateTimeZone
  object for user offsets
+ The $userOffset parameter has been replaced with $timezone parameter
  in all relevant functions.
+ Passing numeric offsets for $timezone parameter is still possible
  for backwards compatibility.
+ New methods added: CakeTime::toServer() and CakeTime::timezone()`



Support pagination for complex custom finders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Model ` findCount()` will now pass ` $query['operation']='count'` for
more flexibility.

In many cases custom finds already return correct counts for
pagination, but 'operation' key allows more flexibility to build other
queries, or drop joins which are required for the custom finder
itself. As the pagination of custom find methods never worked quite
well it required workarounds for this in the model level, which are
now no longer needed


ACL methods now part of Permission model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now the Permission model has available all methods exposed in the
AclComponent for easier permissions check in the model layer.


New Hash class
~~~~~~~~~~~~~~

A new utility library ` Hash` was added. It is intended as a
replacement for the Set class featuring improved performance, and a
more consistent API. All internal calls to Set were replaced and Set
has been deprecated and will be removed in the next major version.

Also added were Set::expand() and Hash::expand() to convert a plain
list of dot separated keys into a nested array.


Helper Lazy Loading
~~~~~~~~~~~~~~~~~~~

Helpers located in the app folder can now be lazy loaded, there is no
need to declare helpers anymore in the ` $helpers` controller property
if they are located in the app folder and you do not rely on them
triggering any callback.


Redis cache engine
~~~~~~~~~~~~~~~~~~

A new cache engine was added to interface with a Redis server, which
is similar to Memcache


Cache groups
~~~~~~~~~~~~

It is now possible to tag or label cache keys under groups. This makes
it simpler to mass-delete cache entries associated to the same label.
Groups are declared at configuration time when creating the cache
engine


Fatal error & console error handlers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can now configure separate error handlers for console and fatal
errors. If you leave these configurations undefined the defaults will
be used. If you are using a custom error handler, it will now receive
fatal error codes, in addition to the other types.


Nested transaction support
~~~~~~~~~~~~~~~~~~~~~~~~~~

Dbo datasources now supports real nested transactions. If you need to
use this feature in your application, enable it using ` ConnectionMana
ger::getDataSource('default')->useNestedTransactions=true;`


Dispatcher filters
~~~~~~~~~~~~~~~~~~

Event listeners can now be attached to the dispatcher calls, those
will have the ability to change the request information or the
response before it is sent to the client. ` app/Config/bootstrap.php`
should be changed to add configuration related to Dispatcher filters.
If your application relies on assets in themes or plugins being
dispatched, or if your are using the full page caching feature you
*must* copy the relevant configuration to your bootstrap file. You
need to add the following:

::

    <?php
    Configure::write('Dispatcher.filters', array(
        'AssetDispatcher',
        'CacheDispatcher'
    ));

Additionally, the new AssetDispatcher filter will return a 304 code if
it can detect the browser has the asset cached already


Other Changes
~~~~~~~~~~~~~

+ Add charset() / headerCharset() methods to CakeEmail class
+ Travis CI support
+ Added support for 'on' validation key in FormHelper. This will set
  the required class accordingly depending on the type of operation
  (create or update)

Following the beta of 2.2.0, the core team will be focusing on
solidifying 2.2.x towards a final release, and beginning inital work
on the next release of CakePHP.

As always, thanks to the friendly CakePHP community for the patches,
documentation changes and new tickets. Without you there would be no
CakePHP!



.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

