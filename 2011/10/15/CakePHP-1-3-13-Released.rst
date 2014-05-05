CakePHP 1.3.13 Released
=======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.13 [1]. 1.3.13 is a bugfix/maintenance release for the
1.3 branch. Since the release of 1.3.12 one month ago there have been
31 commits, and 16 issues resolved.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.13 [1]. 1.3.13 is a bugfix/maintenance release for the
1.3 branch. Since the release of 1.3.12 one month ago there have been
31 commits, and 16 issues resolved. Updating to 1.3.13 is encouraged
for all developers, especially for those using 1.3.12. 1.3.13 fixes
two regressions introduced in 1.3.12. The key changes that may affect
your application are:

+ Mime type notices have been removed from the EmailComponent. They
  were causing deliverability issues with SQS and other email services.
+ The default Email Message-ID's have been modified to increase
  compatibilty with spam assassin rules.
+ SecurityComponent now works correctly with Model.field.1 style
  inputs.
+ Joins in TranslateBehavior have been updated and optimized.
+ Application of configuration/model prefixes has been moved into
  DboSource. It was previously done inconsistently. If you are using
  'joins' in your queries, you should omit calling
  `$db->fullTableName()`.
+ Errors can now have empty messages in FormHelper.
+ Incorrect formatting of floats in MySQL introduced in 1.3.12 has
  been fixed. There were issues with lost precision that are now
  resolved.
+ Permission issues with FileCache introduced in 1.3.12 have been
  fixed.

Development on 2.0 is progressing well, and we hope to have a stable
release ready soon. A huge thanks to all involved in terms of both
contributions through commits, tickets, documentation edits, and
otherwise contribute to the framework. Without you there would be no
CakePHP.

+ Download a packaged release [1]
+ View the changelog [2]



Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/1.3.13`_




.. _http://cakephp.org/changelogs/1.3.13: http://cakephp.org/changelogs/1.3.13
.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp

.. author:: markstory
.. categories:: news
.. tags:: cakephp release,News

