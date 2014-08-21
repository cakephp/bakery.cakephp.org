CakePHP 2.5.0-RC2 Released
==========================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.0-RC2

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.0-RC2[1]. This is the second release candidate for the
2.5.0 branch. 2.5.0-RC2 contains bugfixes and a few new features added
since 2.5.0-RC1 was released. When complete, 2.5.0 will replace the
2.4.x branch. A migration guide is available in the book [2] and we
encourage you to read it if you are upgrading from an older version.


Changes since 2.5.0-RC1:
~~~~~~~~~~~~~~~~~~~~~~~~

+ AssetDispatcher early 404's were reverted. They caused problems with
  extension based routing in plugins.
+ View paths for plugins are now cached. This change optimizes lookup
  times when using multiple views/elements from a plugin.
+ CakeEmail configuration can now set the layout without setting the
  template.
+ Transliteration rules used by Inflector::slug() have been expanded.
+ CakeResponse::file() now rejects paths with `..`

If there are no important issues found, a stable release of 2.5.0
should be released in the next few weeks.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework.


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.5.0-RC2`_
+ [2] `https://github.com/cakephp/cakephp/tags`_




.. _http://cakephp.org/changelogs/2.5.0-RC2: http://cakephp.org/changelogs/2.5.0-RC2
.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

