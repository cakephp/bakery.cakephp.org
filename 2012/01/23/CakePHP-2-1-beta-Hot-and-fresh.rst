CakePHP 2.1 beta Hot and fresh
==============================

Following the release of 2.1.0-alpha two weeks ago, the CakePHP core
team is excited to annonce the immediate availability of 2.1.0-beta.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.1.0 beta [1]. As noted in previous release, this version
is fully backwards compatible with 2.0.5, making it a breeze to update
your apps to start taking advantage of the many improvements that made
into this release.

In total, there were over 100 commits and 5 new features or
enhancements added to this beta version, in addition to the initial
2.1 alpha release. A complete list of the changes can be viewed in the
changelogs page [2]. This is a quick list of this version's main
highlights:


ThemeView is now deprecated
---------------------------

We realized that having to use a separate class and add more
configuration to the controller class was not the ideal solution.
We've merged all the `ThemeView` functionality into the `View` class.
Easier theme support!


Improved HTTP caching
---------------------

One of the major differences between 2.0 and 1.3 is the response class
with which you can set response headers more easily. This change has
helped a lot people who set cache headers to take advantage of reverse
proxies such as Varnish. We have taken this one step further and
provided several new methods in `CakeResponse` class to fine-tune
options for HTTP caching.

`RequestHandlerComponent` will now stop the view rendering process if
it detects the client has a cached version of the resource. This means
reduced response times, and less CPU cycles per request. In order to
take advantage of this you need to use the `modified()` or `etag()`
methods provided in the `CakeResponse` class. The CakePHP book has
some examples to help you understand this new feature.


Miscellaneous Changes
---------------------

+ Transaction commands (BEGIN, COMMIT, ROLLBACK) are now shown in
  database log
+ Added `Set::nest()` and `Set::get()`. The former is used to created
  a nested array out of a plain one using an array key as reference.
  `Set::get()` is used to access any array value using dot notation.
+ Added `Router::defaultRouteClass()` to get/set the default Route
  class. This makes it easy to set a global default, useful for slug
  routes or i18n.
+ `I18n::translate()` now accepts a new $language param. It also now
  exposes methods to read .po files, useful for custom translation
  interfaces.`
+ Authenticate objects can now receive a 'recursive' option to limit
  data returned in queries used for finding users.

We have decided to keep a single book for the whole 2.x branch. You
can read changes related to the 2.1 version in the current book. We
are working towards having a new api site for this new version as soon
as possible. As always, thanks to the friendly CakePHP community for
the patches, documentation changes and new tickets. Without you there
would be no CakePHP!

+ Download a packaged release [1]
+ View the changelog [2]



Links
~~~~~

+ [1] `https://github.com/cakephp/cakephp`_
+ [2] `https://cakephp.org/changelogs/2.1.0-beta`_




.. _https://cakephp.org/changelogs/2.1.0-beta: https://cakephp.org/changelogs/2.1.0-beta
.. _https://github.com/cakephp/cakephp: https://github.com/cakephp/cakephp

.. author:: lorenzo
.. categories:: news
.. tags:: release,2.1.0-beta,News

