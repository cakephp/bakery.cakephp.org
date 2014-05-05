CakePHP 2.3.2 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.2[1]. 2.3.2 is a bugfix release for the 2.3 release
branch.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.2[1]. 2.3.2 is a bugfix release for the 2.3 release
branch. Since the release of 2.3.1 there have been 60 commits and 17
tickets resolved. A short list of the changes you can expect is:

+ API documentation has been improved for a number of methods.
+ Imported fixtures without a primary key no longer trigger notice
  errors.
+ FormHelper::year() supports dates outside of 1901-2038 on all
  platforms now.
+ SchemaShell should more reliabily detect schema changes when dumping
  schema.
+ CakeTestCase::$dropTables is no longer ignored in some situations.
+ PHPUnit can now be included as a dependency via composer.
+ Using a Datasource from a non-datasource package will now raise an
  exception. This prevents hard to debug errors when you accidentally
  use a model/other class as a datasource.
+ FormHelper now correctly selects the hour at midnight with a 12hr
  format. As well as correctly handling the meridian.
+ Validation::uuid() is now more strict.
+ Canadian postal code validation is now more strict.
+ Default values for SqlServer are now correctly handled for nullable
  columns.
+ The object cache used by App is only loaded as needed now instead of
  on every request.
+ HtmlHelper::script() and HtmlHelper::css() now handle the fullBase
  option.
+ JS, CSS, IMAGES constants are now conditionally defined by CakePHP
  making it possible to override them in your application.
+ FormHelper now better handles the disabled attribute when defined as
  an array value instead of an array key.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.
Download a packaged release[2].


Links
~~~~~

[1] `http://cakephp.org/changelogs/2.3.2`_

[2] `http://github.com/cakephp/cakephp/tags`_


.. _http://github.com/cakephp/cakephp/tags: http://github.com/cakephp/cakephp/tags
.. _http://cakephp.org/changelogs/2.3.2: http://cakephp.org/changelogs/2.3.2

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

