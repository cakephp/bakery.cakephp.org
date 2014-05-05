CakePHP 2.5.0-RC1 Released
==========================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.0-RC1.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.0-RC1[1]. This is the first release candidate for the
2.5.0 branch. The 2.5.0-RC contains bugfixes and a few new features
added since 2.5.0-beta was released. When complete, 2.5.0 will replace
the 2.4.x branch. A migration guide is available in the book [2] and
we encourage you to read it if you are upgrading from an older
version.


Changes since 2.5.0-beta
------------------------

+ HtmlHelper::addCrumb() can now be chained to add multiple crumbs.
+ BaseAuthorize::mapActions() can now map custom action types.
+ `cake acl delete` now deletes all matching rows.
+ Dispatcher::\_invoke() no longer takes a response parameter.
+ Set class is now deprecated and has been removed in 3.0. You should
  use Hash class instead.
+ CakePlugin::loadAll() now merges settings with defaults.
+ AssetDispatcher now returns 404 errors with no content body when
  plugin/theme assets cannot be found.

If there are no important issues found, a stable release of 2.5.0
should be released in the next few weeks.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework.


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.5.0-RC1`_
+ [2] `https://github.com/cakephp/cakephp/tags`_




.. _http://cakephp.org/changelogs/2.5.0-RC1: http://cakephp.org/changelogs/2.5.0-RC1
.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

