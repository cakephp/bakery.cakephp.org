CakePHP 1.3.7 Released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP release 1.3.7.

The CakePHP core team is proud to announce the immediate availability
of CakePHP release 1.3.7. Since the release of CakePHP 1.3.6 a month
and half ago, there have been over 55 commits[1] and 40 tickets
resolved. There have been a few changes that may affect your
application:

+ Usage of serialize() was removed from SecurityComponent.
+ View::element() now correctly uses '.ctp' as a fallback extension.
+ View variables are now passed to CacheHelper, making view caches
  more powerful.
+ EmailComponent now registers and un-registers its view class, this
  fixes issues where helpers needing a view would trigger errors.
+ Memcache engine now correctly stores entries with expiry dates
  greater than 30 days.
+ Empty session ids no longer cause errors with database session
  storage.
+ TextHelper::autoLinkEmails works with emails containing '.
+ Console test suite now exits with a non zero code on test failure.

Download the release[2] today, and catch up on the updates by perusing
the changelog[1].

Development on 2.0 is continuing well, and thanks to everyone who has
taken the time to give it a spin and report any issues found with it.
At this time we will start removing the changelog wiki pages on
lighthouse. Instead all changelogs can be found on cakephp.org
itself[1]. This will keep the wiki list shorter, and solves issues
with long changelogs not fitting onto a single wiki page in
lighthouse.

The CakePHP team is considering a change in how documentation is
generated for future versions. While the current book.cakephp.org
application has served us extremely well over the past 3 years, we are
always looking to improve the documentation for CakePHP. We frequently
get requests for documentation in other formats, such as CHM, PDF and
e-books. Its also become evident over time that converting the book
content into these formats is no small task. In order to address these
needs, we're considering moving the documentation for 2.0 into text
files, and using a tool like sphinx[4] to generate the documentation.
Sphinx is used for documentation by a number of large open source
projects such as Python, Django and Bazaar. We feel that this approach
will allow us to provide documentation in a number of requested
formats, as well as maintain the existing work on translations and
involve the community through contributions. However, documentation is
a community effort, and we'd like some feedback on the direction we
take with the documentation. Leave a comment with your thoughts on the
proposed documentation changes.

These are exciting times for CakePHP documentation, the new
CakePHPTV[5] site is gaining momentum and some great tutorials have
been already published. We'd like to remind you that the video
tutorials contest is in place until February 14, when we will be
counting community votes for your tutorials and start giving away
awesome prizes including a brand new iPad. Don't forget to get your
screen cast filmed and enter the contest at tv.cakephp.org to start
participating!

A huge thanks to all involved in terms of both contributions through
commits and diffs, as well as those that took the time and effort to
submit tickets, update documentation and otherwise contribute to the
framework. Without you there would be no CakePHP.

+ View the changelog[1]
+ Download a packaged release [2]

Links

+ [1] `http://cakephp.org/changelogs/1.3.7`_
+ [2] `http://github.com/cakephp/cakephp/downloads`_
+ [3] `http://cakephp.lighthouseapp.com/projects/42648`_
+ [4] `http://sphinx.pocoo.org/`_
+ [5] `http://tv.cakephp.org/launch-competition`_




.. _http://tv.cakephp.org/launch-competition: http://tv.cakephp.org/launch-competition
.. _http://cakephp.org/changelogs/1.3.7: http://cakephp.org/changelogs/1.3.7
.. _http://sphinx.pocoo.org/: http://sphinx.pocoo.org/
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads
.. _http://cakephp.lighthouseapp.com/projects/42648: http://cakephp.lighthouseapp.com/projects/42648

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

