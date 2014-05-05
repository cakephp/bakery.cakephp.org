CakePHP 1.2.8 released
======================

The CakePHP development team is happy to announce the release of
CakePHP 1.2.8. 1.2.8 is a maintenance release for the 1.2 branch and
contains bugfixes and optimizations for features found in 1.2.
The CakePHP development team is happy to announce the release of
CakePHP 1.2.8[1]. 1.2.8 is a maintenance release for the 1.2 branch
and contains bugfixes and optimizations for features found in 1.2.

Since the release of CakePHP 1.2.7 in April, there have been more than
30 commits and 20 tickets resolved. There have been a few changes that
may affect your application.

- Welsh was added to the supported list of locales in l10n
- Controller::validateErrors now accepts arbitrary model objects. This
  better reflects the intention of the documentation.
- Calling bindModel/unbindModel multiple times now correctly resets
  associations.
- TextHelper::autoLink() no longer strtolower()'s the urls, as this
  created issues with URL shorteners.
- HttpSocket no longer loses auth credentials when multiple requests
  are made with same object.
- String::insert() will now correctly handle two keys starting with
  the same subpattern.

Be sure to check the full changelog[2] for all changes that have
occurred, and the related tickets. There is continued work and ongoing
support for 1.3. Work on the 2.0 branch is also ongoing, with several
branches seeing development, if you are interested in helping with the
development of 2.0, take a look at the wiki pages[3], and open
tickets. We'd like to thank everyone who contributed tickets, patches
and documentation to this release. Cakefest 2010[4] is also
approaching quickly and if you haven't purchased tickets they are
moving quickly, so get one while you still can.

Download a packaged release [1]
View the changelog[2]

[1] `http://github.com/cakephp/cakephp/downloads`_
[2] `http://cakephp.lighthouseapp.com/projects/42648/changelog-1-2-8`_
[3] `http://cakephp.lighthouseapp.com/projects/42648/milestones/71894-200`_
[4] `http://cakefest.org`_

.. _http://cakefest.org: http://cakefest.org/
.. _http://cakephp.lighthouseapp.com/projects/42648/changelog-1-2-8: http://cakephp.lighthouseapp.com/projects/42648/changelog-1-2-8
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads
.. _http://cakephp.lighthouseapp.com/projects/42648/milestones/71894-200: http://cakephp.lighthouseapp.com/projects/42648/milestones/71894-200

.. author:: markstory
.. categories:: news
.. tags:: CakePHP,releases,News

