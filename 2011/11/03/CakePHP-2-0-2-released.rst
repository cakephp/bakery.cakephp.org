CakePHP 2.0.2 released
======================

A new version for the 2.0 branch has been released, containing a fix
for a regression introduced in 2.0.1, people using this version are
highly encouraged to do the upgrade as soon as possible.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.2 [1]. We saw the need to release this version after a
bug that was introduced in the 2.0.1 version regarding the calculation
of the Content-Length header. This bug can cause unexpected errors in
the ouput such as failed ajax requests, unclosed html tags, and more.
People using 2.0.1 are highly encouraged to upgrade their apps to use
this new version as soon as possible. In total, there were 13 commits
and 7 issues have been resolved for 2.0.2. A complete list of the
changes can be viewed in the changelogs page [2], but this is a quick
summary of changes that made it into 2.0.2:

+ Exception messages are shown instead of overridden in debug mode
+ Fixes encoding issues with debug().
+ Fixed typos in default css
+ MimeType audio/ogg added
+ Fixes UUID issue in SQLite
+ Fixes issue in RequestHandlerComponent.
+ Updates generated cache files to include the response object
+ Returns correct byte length instead of number of characters in
  Content-Length
+ Download a packaged release [1]
+ View the changelog [2]



Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/2.0.2`_




.. _http://cakephp.org/changelogs/2.0.2: http://cakephp.org/changelogs/2.0.2
.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp

.. author:: lorenzo
.. categories:: news
.. tags:: release,2.0.2,News

