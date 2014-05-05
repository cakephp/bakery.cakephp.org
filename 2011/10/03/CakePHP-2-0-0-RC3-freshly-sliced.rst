CakePHP 2.0.0-RC3 freshly sliced
================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.0-RC3. 2.0.0-RC3 marks the end of the release
candidates for 2.0. If no critical issues arise during the life time
of the RC, we should expect a stable release really soon. As usual, mo
additional new features or backwards incompatible changes will be made
to CakePHP 2.0

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.0-RC3[1]. 2.0.0-RC3 marks the end of the release
candidates for 2.0.0. If no critical issues arise during the life time
of the RC, we should expect a stable release really soon. As usual, mo
additional new features or backwards incompatible changes will be made
to CakePHP 2.0. Read the changelog[2] or download the release[1].

Since 2.0.0-RC2 there have been 82 commits and 24 tickets resolved.
There have been no major features added since the beta release. Some
of the changes include:

+ Ensured the stability of test cases for the CakePHP core
+ Refactored how the joins key for Model::find() is treated, this
  means the ability to auto add the table prefix for join tables and
  cleaner code
+ Making locking file caching the default. Locking files prevents many
  issues with unserialize() warnings caused by partially written files.
+ Now custom Authorization classes can implement their own password
  hashing. See this article for a clear example[6]

Documentation efforts are on the good track and we are very happy
because of the very valuable contributions from the community. If you
feel that anything in the new book is missing or inaccurate please
follow send us a patch on github! The API page[6] is already up with
the updated method documentation for all CakePHP 2 classes.

We're also happy to see that `http://ci.cakephp.org`_ [4] is proving
key to ensure the quality of CakePHP releases. This tool allows the
team to quickly tests every change made on the code against all
supported datasources. We're proud to announce that this might be the
first time in the project's history that absolutely all tests pass
uniformly in all supported datasources.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and otherwise contribute to the
framework. Without you there would be no CakePHP.

Download a packaged release [1] View the changelog [2]


Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/2.0.0-RC3`_
+ [3] `http://github.com/cakephp/docs`_
+ [4] `http://ci.cakephp.org`_
+ [5] `http://api20.cakephp.org`_
+ [6] `http://mark-story.com/posts/view/using-bcrypt-for-passwords-in-cakephp`_




.. _http://mark-story.com/posts/view/using-bcrypt-for-passwords-in-cakephp: http://mark-story.com/posts/view/using-bcrypt-for-passwords-in-cakephp
.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp
.. _http://github.com/cakephp/docs: http://github.com/cakephp/docs
.. _http://api20.cakephp.org: http://api20.cakephp.org
.. _http://cakephp.org/changelogs/2.0.0-RC3: http://cakephp.org/changelogs/2.0.0-RC3
.. _http://ci.cakephp.org: http://ci.cakephp.org

.. author:: lorenzo
.. categories:: news
.. tags:: latest release,News

