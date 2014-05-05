CakePHP 1.3.3 rainbow icing edition released
============================================

The CakePHP development team is happy to announce the release of
CakePHP 1.3.3[1]. 1.3.3 is a maintenance release for the 1.3 branch
and contains bugfixes and optimizations for features found in 1.3.
The CakePHP development team is happy to announce the release of
CakePHP 1.3.3[1]. 1.3.3 is a maintenance release for the 1.3 branch
and contains bugfixes and optimizations for features found in 1.3.

Since the release of CakePHP 1.3.0 last month, there have been more
than 50 commits and 35 tickets resolved. There have been a few changes
that may affect your application.

- Component beforeRender triggers were moved to occur before the View
  class was constructed.
- FormHelper::create() now calls $this->domId();
- Calling bindModel/unbindModel multiple times now correctly resets
  associations.
- TextHelper::autoLink() no longer strtolower()'s the urls, as this
  created issues with URL shorteners.

Be sure to check the full changelog[2] for all changes that have
occurred, and the related tickets. We'd like to give a big thanks to
the ongoing community efforts around the documentation. There are now
over 19,000 revisions in the cookbook! We'd also like to thank
everyone who sent in a proposal for CakeFest 2010[3], as well to
everyone who has already bought tickets. If you haven't already gotten
your tickets, there is no time like the present to get in on the best
CakePHP conference this year. Purchasing tickets before July 24th will
let you take advantage of the early bird pricing.

Disclaimer: No rainbows were harmed in the creation of this release.

Download a packaged release [1]
View the changelog[2]

[1] `http://github.com/cakephp/cakephp/downloads`_
[2] `http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-3`_
[3] `http://cakefest.org`_

.. _http://cakefest.org: http://cakefest.org/
.. _http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-3: http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-3
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

