Happy Holiday yule cake - CakePHP 2.0-dev released
==================================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.0-dev. This is the first packaged release of the 2.x
branch.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.0-dev. This is the first packaged release of the 2.x
branch. The 2.0.0-dev release contains a number of backwards
incompatible changes, and new features , and is not yet ready for
production use. The biggest backwards incompatible change is that
CakePHP 2.0.x will require at least PHP 5.2.6. There will be no
support for PHP4 or PHP5 < 5.2.6.


New features
~~~~~~~~~~~~

This is by no means an exhaustive list of new features in CakePHP 2.0,
but some of the highlights so far include:

+ PHPUnit as a test framework. PHPUnit is the de-facto standard for
  unit testing, and CakePHP is part of that. There are a number
  backwards compatible additions to help you update your tests easier.
+ Separate Request and Response objects - Giving you easier access to
  information you need, and making testing easier.
+ Lazy loading model associations - Associated models are loaded on-
  demand greatly improving the memory use and performance of larger
  applications.
+ Lazy loading of Helpers and Components - Helpers and components are
  loaded/constructed as needed helping performance.
+ New console framework - The console framework has been re-worked to
  provide a more flexible, powerful and colourful console.
+ Exceptions and Errors - CakePHP uses exceptions internally and
  provides developers with a more extensible and configurable way to
  handle errors and exceptions in their applications.

You can find out more about all the features in CakePHP 2.0 in the new
features wiki pages[1]. As previously mentioned, there are a number of
backwards incompatible changes in CakePHP 2.0, and the core team has
been documenting them all in the 2.0 migration guide[2].

If you are interested in helping with the on-going development of
CakePHP 2.0, there are a number of ways you can help. You can give the
code a try, and open tickets/provide test cases + patches for issues
you find. You can help close the existing open un-assigned tickets [3]
by creating patches and test cases for them. You can also give input
on the many RFC and Enhancement tickets in lighthouse.

I'd like to thank everyone in the CakePHP community for a fantastic
year. Looking back, 2010 was an impressive year. We saw the release of
CakePHP 1.3.0 and a total of 10 release over the year. There was an
amazing conference in Chicago, 1000's of documentation edits,
countless blog posts, including an advent calendar from the japanese
community[4]. On top of all that great stuff, we also had the re-
release of the bakery and the launch of `http://tv.cakephp.org/`_ . A
great year, and it wouldn't be possible without the fantastic
community that CakePHP has. So to everyone who helped make this year
fantastic, thank you.

+ Download a packaged release [5]
+ View the changelog [6]

Links

+ [1] `http://cakephp.lighthouseapp.com/projects/42648/20-new-features`_
+ [2] `http://cakephp.lighthouseapp.com/projects/42648/2-0-migration-guide`_
+ [3] `http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/bins/228812`_
+ [4] `http://cakephp.jp/modules/newbb/viewtopic.php?viewmode=flat&topic_id=2510&forum=16`_
+ [5] `http://github.com/cakephp/cakephp/downloads`_
+ [6] `http://cakephp.org/changelogs/2.0.0-dev`_




.. _http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/bins/228812: http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/bins/228812
.. _http://cakephp.jp/modules/newbb/viewtopic.php?viewmode=flat&topic_id=2510&forum=16: http://cakephp.jp/modules/newbb/viewtopic.php?viewmode=flat&topic_id=2510&forum=16
.. _http://cakephp.lighthouseapp.com/projects/42648/20-new-features: http://cakephp.lighthouseapp.com/projects/42648/20-new-features
.. _http://tv.cakephp.org/: http://tv.cakephp.org/
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads
.. _http://cakephp.org/changelogs/2.0.0-dev: http://cakephp.org/changelogs/2.0.0-dev
.. _http://cakephp.lighthouseapp.com/projects/42648/2-0-migration-guide: http://cakephp.lighthouseapp.com/projects/42648/2-0-migration-guide

.. author:: markstory
.. categories:: news
.. tags:: CakePHP,releases,News

