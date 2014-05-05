CakePHP 1.3.6 and 1.2.9 released
================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.6 and 1.2.9. These releases are recommended for all
users as they fix a security issue. Since the release CakePHP 1.3.5
less a month ago, there have been over 25 commits[1] and 10 tickets
resolved. The 1.2 branch has 20 commits[2] and 15 tickets resolved,
since the release of 1.2.8 in August.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.6 and 1.2.9. These releases are recommended for all
users as they fix a security issue. Since the release CakePHP 1.3.5
less a month ago, there have been over 25 commits[1] and 10 tickets
resolved. The 1.2 branch has 20 commits[2] and 15 tickets resolved,
since the release of 1.2.8 in August. There have been a few changes
that may affect your application in each version:


1.3
```

+ CakeSchema::compare() now better handles comparing '' and null.
+ NumberHelper::currency() better formats € amounts of less than 1.0.
+ Race conditions in Model::delete() were fixed, so deletions only
  occur for the specified record.
+ A security issue in SecurityComponent was fixed.



1.2
```

+ Race conditions in Model::delete() were fixed, so deletions only
  occur for the specified record.
+ A security issue in SecurityComponent was fixed.
+ SecurityComponent and digest auth work correctly with email address
  usernames.
+ EmailComponent now more correctly handles email addresses with name
  aliases

These releases are recommended for all users, as they include a fix
for a possible security risk inside SecurityComponent. The issue could
possibly allow malicious users to perform Local file inclusion, or
possibly remote file inclusion attacks by manipulating the serialized
string in the form data. The fix for this specific issue was don in
e431e86aa4301ced4273dc7919b59362cbb353cb[3]. We'd like to thank Felix
Wilhelm for bringing this issue to our attention, and assisting in
getting this issue resolved.

2.0 continues progress steadily. A few topic branches have been merged
in, and a few more are on deck. If you are interested in what the
future might contain, you can view the in progress wiki pages[4] on
lighthouse. We're also happy to announce a new place to find all the
changelogs for CakePHP. For the last year or so, we've been using wiki
pages on lighthouse. However, its become clear that without the
ability to create nested pages, this is going to become unwieldy. The
new changelog[5] pages on cakephp.org will be the future home for all
past and future changelogs.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and otherwise contribute to the
framework. Without you there would be no CakePHP.

+ View the 1.2.9 changelog [1]
+ View the 1.3.6 changelog [2]
+ Download packaged releases [6]



Links
`````

+ [1] `http://cakephp.org/changelogs/1.3.6`_
+ [2] `http://cakephp.org/changelogs/1.2.9`_
+ [3] `http://github.com/cakephp/cakephp/commit/e431e86aa4301ced4273dc7919b59362cbb353cb`_
+ [4] `http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview`_
+ [5] `http://cakephp.org/changelogs`_
+ [6] `http://github.com/cakephp/cakephp/downloads`_




.. _http://cakephp.org/changelogs: http://cakephp.org/changelogs
.. _http://cakephp.org/changelogs/1.3.6: http://cakephp.org/changelogs/1.3.6
.. _http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview: http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview
.. _http://github.com/cakephp/cakephp/commit/e431e86aa4301ced4273dc7919b59362cbb353cb: http://github.com/cakephp/cakephp/commit/e431e86aa4301ced4273dc7919b59362cbb353cb
.. _http://cakephp.org/changelogs/1.2.9: http://cakephp.org/changelogs/1.2.9
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads

.. author:: markstory
.. categories:: articles
.. tags:: release,CakePHP,news,Articles

