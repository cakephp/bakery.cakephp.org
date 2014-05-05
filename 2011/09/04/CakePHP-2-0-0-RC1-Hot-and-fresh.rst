CakePHP 2.0.0-RC1 Hot and fresh
===============================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.0-RC1[1]. 2.0.0-RC1 marks the beggining of the release
candidate process for 2.0.0. From this point forward no additional new
features or backwards incompatabile changes will be made to CakePHP
2.0. We plan on having 3 RC releases, and if there are no outstanding
large issues we will release the final version. Read the changelog[2]
or download the release[1].

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.0-RC1[1]. 2.0.0-RC1 marks the beginning of the release
candidate process for 2.0.0. From this point forward no additional new
features or backwards incompatabile changes will be made to CakePHP
2.0. We plan on having 3 RC releases, and if there are no outstanding
large issues we will release the final version. Read the changelog[2]
or download the release[1].

At this time the oracle driver is incomplete, and is waiting on
getting a reliable and usable oracle connection setup. For now the
Oracle driver has been removed, but we hope that throughout the RC
process oracle functionality will be restored and more fully featured
than before.

Since 2.0.0-beta there have been over 180 commits and 50 tickets
resolved. There have been no major features added since the beta
release. A few small features have been added:

+ The API docs have been revised, corrected and expanded in many
  places.
+ New generic bake theme. The default bake theme has been refreshed to
  use more CSS3 and modern properties, to give a sexier bake experience.
+ SQL errors now raise exceptions instead of outputting warnings.
+ `Debugger::output()` has been deprecated and replaced with
  `Debugger::outputAs()` and `Debugger::addFormat()`.
+ Router::mapResources() works with plugins now.
+ RequestHandlerComponent::prefers() now correctly respects client `q`
  value preferences. CakeRequest::accepts() does as well.
+ CakeEmail has had a number of improvements made around API
  consistency, and ease of use.
+ Router extensions are no longer under
  `$this->request->params['url']['ext']`. Instead they can be found at
  `$this->request->params['ext']`.
+ A constant `TIME_START` has been added to with the microtime of the
  request start.
+ APC, Memcache, and Wincache engines only clear values matching the
  prefix when `Cache::clear()` is used.
+ Visibility of methods many has been updated.

As CakePHP goes through the RC process, no additional new features
will be added. The team will focus on getting the changes for 2.0
stable, completing the new documentation[3], and updating API
documentation with more examples.

We're also proud to announce the availability of
`http://ci.cakephp.org`_ [4]. Going forward CakePHP will have all of
its unit tests run against MySQL, Sqlite, and Postgresql after each
commit. The results of these unit tests will be published for the
community as well. We hope this additional automation and continuous
integration will help increase the quality of CakePHP.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and otherwise contribute to the
framework. Without you there would be no CakePHP.

Download a packaged release [1] View the changelog [2]


Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/2.0.0-RC1`_
+ [3] `http://github.com/cakephp/docs`_
+ [4] `http://ci.cakephp.org`_




.. _http://cakephp.org/changelogs/2.0.0-RC1: http://cakephp.org/changelogs/2.0.0-RC1
.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp
.. _http://github.com/cakephp/docs: http://github.com/cakephp/docs
.. _http://ci.cakephp.org: http://ci.cakephp.org

.. author:: markstory
.. categories:: news
.. tags:: cakephp release,News

