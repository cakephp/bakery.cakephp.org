CakePHP 1.3.5 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP release 1.3.5.

The CakePHP core team is proud to announce the immediate availability
of CakePHP release 1.3.5. Since the release of CakePHP 1.3.4 a month
and half ago, there have been over 50 commits[1] and 40 tickets
resolved. There have been a few changes that may affect your
application:

+ A warning to inform developers about broken PCRE libs was added to
  the default home page.
+ RequestHandlerComponent now sends content-type and encoding headers
  for html pages automatically.
+ Writing Cache entries with duration 0, would not create non-expiring
  entries for memcache and apc engines.
+ Table names with spaces should now work correctly.
+ Compatibility with Postgres 9.0 was improved.
+ MemcacheEngine now correctly works with IPv6 addresses.
+ Conditions for removing <cake:nocache> tags was relaxed so they are
  removed even when the CacheHelper is not loaded.
+ SecurityComponent and digest auth work correctly with email address
  usernames.
+ Router now correctly handles patterns for the :action parameter.
+ Schema generation for connections with prefixes was updated to omit
  the prefix in the schema, to avoid issues where two prefixes would be
  appended.

Download the release[2] today, and catch up on the updates by perusing
the changelog[1].

Progress on 2.0 continues steadily, with a few new topic branches well
under way for merging. If you are interested in what the future might
contain, you can view the in progress wiki pages[3] on lighthouse. The
temporary wiki pages for 1.3 have been removed to make room for the
in-progress 2.0 wiki pages. We'd also like to thank and welcoem Jeremy
Harris onto the CakePHP core team. We'd also like to thank the people
at CakeDC[4] for taking the time to improve the bakery and create this
current iteration.

A huge thanks to all involved in terms of both contributions through
commits and diffs, as well as those that took the time and effort to
submit tickets, update documentation and otherwise contribute to the
framework. Without you there would be no CakePHP.

+ Download a packaged release [2]
+ View the changelog[1]

Links

+ [1]
  `http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-5`_
+ [2] `http://github.com/cakephp/cakephp/downloads`_
+ [3] `http://cakephp.lighthouseapp.com/projects/42648`_
+ [4] `http://cakedc.com`_




.. _http://cakephp.lighthouseapp.com/projects/42648: http://cakephp.lighthouseapp.com/projects/42648
.. _http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-5: http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-5
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads
.. _http://cakedc.com: http://cakedc.com

.. author:: markstory
.. categories:: articles
.. tags:: release,CakePHP,1.3.5,Articles

