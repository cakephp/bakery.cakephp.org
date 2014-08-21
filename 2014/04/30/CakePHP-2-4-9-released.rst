CakePHP 2.4.9 released
======================

The CakePHP core team is happy to announce the immediate availability
of 2.4.9[1]. This releases contain a bug fix related to the security
fix in 2.4.8.

The CakePHP core team is happy to announce the immediate availability
of 2.4.9[1]. This releases contain a bug fix related to the security
fix in 2.4.8. A short list of changes you can expect in 2.4.9 are:

+ FormHelper::postLink() now works correctly with SecurityComponent.
  In 2.4.8 a mistake was made that resulted in incorrect hashes being
  generated.

If you use `postLink()` and have upgraded to 2.4.8 it is recommended
that you upgrade to 2.4.9 to avoid any potential issues. You can
download a packaged release from github[2].


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.4.9`_
+ [2] `http://github.com/cakephp/cakephp/tags`_




.. _http://github.com/cakephp/cakephp/tags: http://github.com/cakephp/cakephp/tags
.. _http://cakephp.org/changelogs/2.4.9: http://cakephp.org/changelogs/2.4.9

.. author:: markstory
.. categories:: news
.. tags:: ,News

