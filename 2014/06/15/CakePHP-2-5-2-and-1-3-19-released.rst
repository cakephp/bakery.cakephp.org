CakePHP 2.5.2 and 1.3.19 released
=================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.2 and CakePHP 1.3.19.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.2 and CakePHP 1.3.19. CakePHP 2.5.2 is a bugfix release
for the 2.5.x release branch. 1.3.19 is a bugfix release for 1.3.x.
The 1.3.18 release contained a regression related to the form
tampering security fix that 1.3.19 resolves.

A short list of the changes you can expect in 2.5.2 are:

+ `cake` console command now works when CDPATH is used.
+ Inflection of 'feedback' is now correct.
+ Incorrect status line parsing in HttpSocketResponse has been fixed.
+ Form tampering protection has been fixed when form URL's contain
  multiple query string parameters.
+ Creating disabled select options no longer disables the select
  element when `array(1)` is used for the disabled option.
+ Trailing star routes can now be reverse routed.
+ Older blowfish hashes are now accepted, and can be used with
  AuthComponent.
+ A username of '0' can now be used with AuthComponent.
+ Improved API docs.
+ Hash::extract() now allows `[prop=1]` to match boolean true.

If you haven't already purchased your ticket for `CakeFest 2014`_ the
`conference schedule`_ has been announced and this year is shaping up
to be another fantastic installment in the CakeFest tradition.

You can view the full `2.5.2 changelog`_ and `1.3.19 changelog`_ on
cakephp.org. I'd like to thank the people who have contributed to this
release. Your bug tickets, documentation edits, and patches/pull
requests are a big part of what keeps CakePHP alive and ticking.

You can download `packaged releases on github`_



.. _2.5.2 changelog: http://cakephp.org/changelogs/2.5.2
.. _CakeFest 2014: http://cakefest.org
.. _conference schedule: http://cakefest.org/schedule
.. _1.3.19 changelog: http://cakephp.org/changelogs/1.3.19
.. _packaged releases on github: https://github.com/cakephp/cakephp/tags

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

