CakePHP 1.3.9 and 2.0.0-alpha released
======================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.9 and 2.0.0-alpha.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.9 and 2.0.0-alpha. 1.3.9 is a bugfix/maintenance
release for the the 1.3 branch. 2.0.0-alpha is the first alpha release
of the 2.x branch, and is not API stable or intended for production
systems. Since the release CakePHP 1.3.8 in March, there have been
over 45 commits[1] and 25 tickets resolved. There have been a few
changes that may affect your application:


1.3
~~~

+ An issue introduced in 1.3.8 that caused the `-app` flag to not work
  correctly, has been fixed.
+ The MySQL driver no longer does joins on delete queries unless a
  join is required.
+ TextHelper::autoLinkEmail() no longer creates links for email
  addresses missing TLD's
+ CakeSocket::write() works better with lazy/slow servers.
+ Fixtures are a bit more robust, and field order/missing fields do
  not cause spurious errors.
+ Cookies are recursively deleted when a top-level key is removed.
+ Xml::toArray() was updated and support for various xml formats is
  improved.
+ MemcacheEngine now supports persistent connections correctly.

Development on 2.0 has continued at a rapid pace, with a number of new
commiters, and the return of some familiar faces. Since 2.0.0-dev
there have been over 1000 commits, and a number of large changes have
occured. The biggest of which is a change in filenaming and directory
structure conventions. All directories and classnames are
`CamelCased`, filenames match the class name exactly. In addition to
filename changes, a new loader `App::uses()` has been added. This
loader supports lazy loading, and works well with the new directory
layout. In addition to these large changes, a number of other changes
have been done:

+ Models are now lazy loaded in Controllers, when defined in `$uses`.
+ EmailComponent has been broken out into a number of smaller classes
  that are more easily re-used in Shells.
+ CakePlugin has been added. It provides features for including
  bootstrap and route files from plugins.
+ AuthComponent has been re-factored to be more extensible and
  flexible.

You can view the full changelogs[2] on cakephp.org. The temporary
documentation for these features, and most changes in 2.0 can be found
on lighthouse[3]. We're working away on new, fully updated
documentation for 2.0.0 as well. We hope to have in-progress versions
of it up soon. There is still no final release date planned for 2.0.0,
but it each release brings it closer.

We're also proud to announce CakeFest 2011[4]. It will be held in
Manchester, England in September of 2011. Tickets are available now,
so get them while you still can. If you are interested in speaking at
CakeFest, the call for speakers is still open[5].

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and otherwise contribute to the
framework. Without you there would be no CakePHP.

+ View the 1.3.8 changelog [1]
+ View the 2.0.0-alpha changelog [2]
+ Download packaged releases [6]



Links:
~~~~~~

+ [1] `http://cakephp.org/changelogs/1.3.9`_
+ [2] `http://cakephp.org/changelogs/2.0.0-alpha`_
+ [3]
  `http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview`_
+ [4] `http://cakefest.org`_
+ [5] `http://cakefest.org/speak`_
+ [6] `http://github.com/cakephp/cakephp/downloads`_




.. _http://cakephp.org/changelogs/1.3.9: http://cakephp.org/changelogs/1.3.9
.. _http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview: http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview
.. _http://cakefest.org/speak: http://cakefest.org/speak
.. _http://cakefest.org: http://cakefest.org
.. _http://cakephp.org/changelogs/2.0.0-alpha: http://cakephp.org/changelogs/2.0.0-alpha
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads

.. author:: markstory
.. categories:: news
.. tags:: CakePHP,releases,News

