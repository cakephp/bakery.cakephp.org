CakePHP 2.3.0-RC2 and 2.2.5 released
====================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.0-RC2 and 2.2.5[1]. There have been a few small
improvementsand fixes since the release of 2.3.0-RC1. If there are no
serious issues reported 2.3.0 stable should be released within a few
weeks.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.0-RC2 and 2.2.5[1]. There have been a few small
improvementsand fixes since the release of 2.3.0-RC1. If there are no
serious issues reported 2.3.0 stable should be released within a few
weeks.


Changes since 2.3.0-RC1
-----------------------

Since the release fo 2.3.0-RC1 a few new improvements have been added.
In addition, all changes in 2.2.5 are also present in 2.3.0-RC2. The
new improvments to 2.3.0-RC2 are:

+ Using an unknown cache engine results in exceptions being thrown.
+ Improved support for HTML5 attributes.
+ PaginatorComponent now throws exceptions when users request page
  numbers that are out of range. This is instead of displaying duplicate
  content from the last page in the series.
+ PaginatorHelper::prev() and PaginatorHelper::next() now support the
  'disabledTag' option. This option can be used to set the wrapping tag
  when these controls are not available.
+ An .editorconfig file was added.
+ The default doctype is now HTML5
+ FormHelper sets the required attribute on inputs based on detected
  validation rules.
+ Support for php.ini style numbers was added to
  CakeNumber::fromReadableSize()
+ Generated text for pagination buttons in related models are now
  easier to read.
+ FormHelper::postLink() sets the target attribute on the form element
  instead of the a element.

See the changelog[2] for a full list of changes in 2.3.0-RC2


Changes in 2.2.5
----------------

2.2.5 is a bugfix/maintenance release for the 2.2.x release branch.
There have been 40 commits & 19 issues fixed since 2.2.4. Some of the
notable fixes are:

+ Fields using the || operator are now quoted correctly.
+ Stack traces on error pages now highlight code excerpts correctly.
+ File inputs no longer include the value attribute. This fixes HTML
  validation with HTML5 doctypes.
+ ConsoleOptionParser now correctly handles options with the value of
  '0'.
+ Mysql datasource now correctly handles indexes with a length value.
+ The 5th argument is no longer passed to mail() when safe_mode is
  active.
+ Email bodies are now wrapped at 998 instead of 78 characters. This
  fixes issues where HTML content would be spliced.
+ TreeBehavior and nested deletes work as expected now.
+ Infinite loops when rendering error 500 pages with extensions
  declared by Router::parseExtensions() have been fixed.
+ Requests to the SecurityComponent's blackholeCallback are now
  blackholed. This was an issue when using a public unprefixed method as
  the SecurityComponent's blackhole callback.
+ Theme names are now consistently camelcased in both helper assets &
  view files.
+ FormHelper::radio() now treats boolean values as equivalents to 1
  and 0 respectively.
+ Hash::expand() no longer loops infinitely in PHP5.2 when expanding
  deeply nested structures.

The changelog[3] has the full list of changes in 2.2.5

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.
Download a packaged release [1]


Links
~~~~~

+ [1] `https://github.com/cakephp/cakephp/tags`_
+ [2] `http://cakephp.org/changelogs/2.3.0-RC2`_
+ [3] `http://cakephp.org/changelogs/2.2.5`_




.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _http://cakephp.org/changelogs/2.2.5: http://cakephp.org/changelogs/2.2.5
.. _http://cakephp.org/changelogs/2.3.0-RC2: http://cakephp.org/changelogs/2.3.0-RC2

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

