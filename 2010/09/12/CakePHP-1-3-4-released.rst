CakePHP 1.3.4 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP release 1.3.4. This release follows a month of effort from
the team, and numerous reports from the community. Since the release
of CakePHP 1.3.3 there have been 77 commits[1] and 54 tickets
resolved.
The CakePHP core team is proud to announce the immediate availability
of CakePHP release 1.3.4. This release follows a month of effort from
the team, and numerous reports from the community. Since the release
of CakePHP 1.3.3 there have been 77 commits[1] and 54 tickets
resolved. There have been a few changes that may affect your
application:

- Schema files generated for plugins now have $PluginSchema for the
  classname instead of AppSchema
- Route parameters with - in them should now work as expected.
- Issues related to SessionComponent::destroy() not always removing
  data were fixed.
- Scaffold works better with Themes.
- String::insert() works better with keys that begin with sub-patterns
  containing other keys.
- DboMysql now correctly pulls out column + table parameters.
- Issues related to setlocale() and SQL errors caused by locales that
  use ',' for the decimal separator on floats were fixed.
- EmailComponent now more correctly handles email addresses with name
  aliase

Download the release[2] today, and catch up on the updates by perusing
the changelog[1].

Work on the 2.0 branch is continuing to progress and a few topic
branches have already been merged it. If you are interested in what
the future might contain, you can view the in progress wiki pages[3]
on lighthouse. There is still no estimated time of completion. But
when there is you can find out about it here. The 1.3 temporary wiki
pages will be removed in the next few weeks, as they have not been in
use for quite some time. If you have any links or bookmarks pointing
at them you should update them to the cookbook pages.

A huge thanks to all involved in terms of both contributions through
commits and diffs, as well as those that took the time and effort to
submit tickets, update documentation and otherwise contribute to the
framework.

Download a packaged release [2]
View the changelog[1]
[1] `http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-4`_
[2] `http://github.com/cakephp/cakephp/downloads`_
[3] `http://cakephp.lighthouseapp.com/projects/42648`_

.. _http://cakephp.lighthouseapp.com/projects/42648: http://cakephp.lighthouseapp.com/projects/42648
.. _http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-4: http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-4
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads

.. author:: predominant
.. categories:: news
.. tags:: release cakephp,News

