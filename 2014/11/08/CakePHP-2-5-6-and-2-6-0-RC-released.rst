CakePHP 2.5.6 and 2.6.0-RC released
===================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.6 and 2.6.0-RC1.

The CakePHP core team is proud to announce the immediate availability
of CakePHP `2.5.6`_ and `2.6.0-RC1`_. 2.5.6 is a bugfix release for
the 2.5 release series, while 2.6.0-RC1 is beta release of the
upcoming 2.6.0 release. A list of the changes you can expect in 2.5.6
are:

+ CakeSession::read() returns null on all failure cases.
+ Model::isUnique() now works as validator for multiple fields.
+ CakeTestCase::getMockForModel() now injects the test datasource for
  all connection names.
+ Digest Auth now handles `&`, ` ?` in digest auth data.
+ FormHelper no longer generates a hidden input for disabled mulitple
  checkbox inputs.
+ Folder::create() now handles relative paths.
+ Stack traces now output more context on exceptions.
+ Fatal errors now include stack traces if xdebug is enabled.
+ Virtual fields no longer incorrectly replace ` IN` clauses.



Changes in 2.6.0-RC
-------------------

In addition to the changes in 2.5.6, 2.6.0-RC contains the following
changes:

+ ` Hash::merge()` and ` Hash::expand()` are now more performant.
+ ` TranslateBehavior` properly handles the atomic flag.
+ Redis Engine now includes a default prefix based on your application
  directory.
+ MySQL schema reflection includes comment support now.
+ ` CakeRoute::__set_state` was added. This helps make it easier to
  cache routes with ` var_export`.
+ ` CakeResponse::file()` accepts ranges even when the download option
  is set to ` false`.
+ ` AuthComponent` now has a ` userFields` option which allows you to
  limit which fields are loaded into the session.
+ ` PaginatorHelper::meta()` has been added. This method helps you
  easily generate meta tags containing pagination information.

If there are no blocking issues found in the RC release we expect to
have a stable 2.6.0 release ready in 3 or 4 weeks.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework.


.. _2.5.6: https://github.com/cakephp/cakephp/releases/2.5.6
.. _2.6.0-RC1: https://github.com/cakephp/cakephp/releases/2.6.0-RC1

.. author:: markstory
.. categories:: news
.. tags:: ,News

