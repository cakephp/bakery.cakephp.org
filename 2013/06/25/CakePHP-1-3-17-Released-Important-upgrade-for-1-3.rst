CakePHP 1.3.17 Released - Important upgrade for 1.3
===================================================

CakePHP 1.3.17 has been released. This is an important update for all
users of 1.3. It is recommended that all users of 1.3 should upgrade
as soon as possible.

CakePHP 1.3.17 has been released. This is an important update for all
users of 1.3. It is recommended that all users of 1.3 should upgrade
as soon as possible.

In the previous release for 1.3.16 a mistake was made when creating
the 1.3.16 tag. An important fix was missed from the packaged release.
We recommend that all applications using 1.3 upgrade to 1.3.17
immediately safeguard against the SQL injection issue that 1.3.16 was
intended to fix.


How did this happen?
~~~~~~~~~~~~~~~~~~~~

When creating the package for 1.3.16, a git clone was not correctly
updated before generating the new tag. To prevent this issue in the
future, we'll be updating the automated build script used to package
CakePHP to always update the local clone. This should prevent similar
errors in the future.


Links
~~~~~

+ Download a packaged release
  `http://github.com/cakephp/cakephp/tags`_
+ View the changelogs `http://cakephp.org/changelogs`_




.. _http://github.com/cakephp/cakephp/tags: http://github.com/cakephp/cakephp/tags
.. _http://cakephp.org/changelogs: http://cakephp.org/changelogs

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

