CakePHP 2.2.2 release
=====================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.2.2[1]. This is a bugfix/maintenance release for the
2.2.x release branch. Since the release of 2.2.1, there have been over
80 commits, and 39 tickets closed.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.2.2[1]. This is a bugfix/maintenance release for the
2.2.x release branch. Since the release of 2.2.1, there have been over
80 commits, and 39 tickets closed.

A short list of the changes you can expect are:

+ Configure::load() and Configure::dump() are now more consistent, and
  create a new PhpReader by default.
+ Error messaging is better for when fixture creation fails.
+ Logging on windows has been improved, and log levels are more
  correct.
+ Generated schema files no longer contain multiple primary keys.
+ Namespaced elements work correctly in the RssHelper now.
+ ( and ) are now correctly handled by TextHelper::autoLinkUrls()
+ Applications can now define `LOGS` and `CACHE` constants.
+ Recursive errors in `debug()` have been fixed in 5.2 and 5.3.
+ requestAction() now more correctly simulates GET requests, when the
  preceding request is a POST or PUT.
+ ModelValidator state is reset when models are created/saved.
+ Additional mimetypes added for Microsoft Office document formats.
+ Validation::decimal() reworked to fix a few edge cases.
+ Virtual fields containing `-` are quoted more correctly now.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.2.2`_
+ [2] `http://github.com/cakephp/cakephp/tags`_




.. _http://cakephp.org/changelogs/2.2.2: http://cakephp.org/changelogs/2.2.2
.. _http://github.com/cakephp/cakephp/tags: http://github.com/cakephp/cakephp/tags

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

