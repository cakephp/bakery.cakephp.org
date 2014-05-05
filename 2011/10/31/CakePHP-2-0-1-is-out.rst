CakePHP 2.0.1 is out
====================

The first maintenance release of the 2.0 branch is out, learn what the
changes are and start upgrading your applications now!

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.1 [1]. 2.0.1 is the first bugfix/maintenance release
for the 2.0 branch. Since the very well received release of 2.0 stable
two weeks ago there have been 95 commits, and 6 issues resolved. For
people still hesitant on upgrading from 1.3 good news is that we have
improved the effectiveness of the UpgradeShell, which eases a lot the
migration efforts. A quick summary of all the changes that made it
into2.0.1 [2]:

+ Params in router are now correctly urlencoded/urldecoded
+ Added automatic Content-Length header to hint browser of the end of
  the response when using persistent connections
+ AuthComponent deny() when called without parameters will now deny
  all actions
+ Prevented unneeded afterFind callback triggering on associated
  models
+ Added Opera Mobi to mobile detectors.
+ RedirectRoute will now terminate the script execution after setting
  the headers
+ Better support for email sending in japanese charsets

Development on 2.1 has started and is progressing well, and we hope to
have a alpha release soon. A huge thanks to all involved in terms of
both contributions through commits, tickets, documentation edits, and
otherwise contribute to the framework. Without you there would be no
CakePHP.

+ Download a packaged release [1]
+ View the changelog [2]



Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/2.0.1`_




.. _http://cakephp.org/changelogs/2.0.1: http://cakephp.org/changelogs/2.0.1
.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp

.. author:: lorenzo
.. categories:: news
.. tags:: News

