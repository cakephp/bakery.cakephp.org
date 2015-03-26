CakePHP 2.4.10 and 2.5.1 released
=================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.10 and 2.5.1.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.10 and 2.5.1. 2.4.10 is the final bugfix release for
the 2.4 release series. Going forward, 2.4 will only receive security
releases. 2.5.1 is a bugfix release for the 2.5 release branch. A
short list of the changes you can expect in 2.4.10 is:

+ Controller::referer() behaves correctly when local URLs are
  generated.
+ TextHelper::tail() was restored.
+ FormHelper security tokens only use the path and query parts of a
  URL to generate hashes. This fixes problems when absolute URL's were
  used to create forms.
+ Missing component error pages have correct paths now.
+ Compatibility with PHP5.6 was improved. 2.5.1 contains the following
  changes:
+ Loading data from models and their associations with multiple
  datasources works properly now. This fixes a regression added in
  2.5.0-beta.
+ FormHelper::postLink() had a backwards incompatible signature change
  in 2.5.0-dev. This method is now backwards compatible.
+ CakeEmail now uses the correct mimetype for emails that contain text
  & html but no attachments. Previously, `multipart/mixed` was used
  which caused some clients to incorrectly handle email messages.
+ The test harness will now locate PHPUnit installed through composer.

If you haven't already purchased your ticket for `CakeFest 2014`_ the
`conference schedule`_ has recently been announced and this year is
shaping up to be another fantastic installment in the CakeFest
tradition.

You can view the full `2.4.10 changelog`_ and `2.5.1 changelog`_ on
cakephp.org. I'd like to thank the people who have contributed to this
release. Your bug tickets, documentation edits, and patches/pull
requests are a big part of what keeps CakePHP alive and ticking.

You can download `packaged releases on github`_



.. _2.5.1 changelog: http://cakephp.org/changelogs/2.5.1
.. _CakeFest 2014: http://cakefest.org
.. _2.4.10 changelog: http://cakephp.org/changelogs/2.4.10
.. _conference schedule: http://cakefest.org/schedule
.. _packaged releases on github: https://github.com/cakephp/cakephp/tags

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

