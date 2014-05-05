CakePHP 2.2.0-RC2
=================

The CakePHP team is proud to announce the immediate availability of
CakePHP 2.2.0-RC2, the final Release Candidate for this branch.

A bit later than expected, but charged with new awesome features and
stability, CakePHP 2.2.0-RC2 finally lands for a final test-drive
before it's marked stable. As mentioned in previous releases, 2.2.x
will be an API compatible release with 2.0.x, and 2.1.x and should be
generally transparent when upgrading, except for a few additions you
need to make in configuration files.

We let a few new features sneak into this release as we considered
them safe and useful enough to our community. A quick list of new
features added in 2.2.0-RC2:


Validation
----------

A few new methods were added to the Validation class: `naturalNumber`,
`uploadError` and `mimeType`. Natural number validation is used in
case you want a numeric validation but only for non-negative numbers.
Upload related methods were added to make it easier for models to
correctly validate uploaded files, specifically `mimeType` method will
validate the correct mimetype for files without relying on file
extension.


Bake
----

Several small enhancements were added to improve experience of baking
test cases and new plugins. For instance, creating a new plugin will
automatically configure it in bootstrap.php


CakeRequest
-----------

`PUT` and `DELETE` methods' payload data will now be placed into
`$request->data` if it is encoded correctly. This makes it easier for
controllers to implement actions transparently without taking explicit
actions for each of those methods.


Misc Changes
------------

+ `session.gc_maxlifetime` is now set when using files for sessions.
  This prevents session files from being garbage collected too early.
+ `cake i18n extract` now has an `--overwrite` option to force
  overwriting all existing pot files.
+ App::uses() now supports namespaced classes better.
+ belongsTo and hasOne associations should generate fewer queries when
  recursive > 1.
+ TranslateBehavior::unbindTranslation() works as documented now.
+ HtmlHelper::tableHeaders() now accepts HTML attributes for each
  cell.
+ Router::setExtensions() was added to allow new extensions to be
  added instead of replacing all existing extensions.
+ Security::rijndael() was added and exposed to CookieComponent. This
  allows strong encryption to be used, and is recommended for all
  applications using ciphered cookies.
+ The datasource method cache is now more resistant to collisions.
+ Email templates using images now work correctly more often.
+ app/Console/cake now correctly determines the app directory in more
  situations.
+ PUT and DELETE requests with `application/www-form-urlencoded` data
  are now automatically parsed and set as `$this->data` in the request
  object.
+ Session cookies are now httpOnly by default.
+ All validation errors are returned when saving/validating associated
  models if the primary model's validation fails.

View the complete changelog available [1]. Download a packaged release
[2]

`CakeFest 2012`_ is around the corner and we already expect awesome
talks and workshops during the best PHP conference out there. If you
haven't `booked your tickets`_ yet, it's about time your do.

As always, thanks to the friendly CakePHP community for the patches,
documentation changes and new tickets. Without you there would be no
CakePHP!

Links

+ [1] `http://cakephp.org/changelogs/2.2.0-RC2`_
+ [2] `http://github.com/cakephp/cakephp/zipball/2.2.0-RC2`_
+ [3] `http://cakefest.org`_




.. _CakeFest 2012: http://cakefest.org/
.. _booked your tickets: http://cakefest.org/ticket-info
.. _http://cakephp.org/changelogs/2.2.0-RC2: http://cakephp.org/changelogs/2.2.0-RC2
.. _http://cakefest.org: http://cakefest.org
.. _http://github.com/cakephp/cakephp/zipball/2.2.0-RC2: http://github.com/cakephp/cakephp/zipball/2.2.0-RC2

.. author:: lorenzo
.. categories:: news
.. tags:: News

