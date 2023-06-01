CakePHP 2.4.0-RC2 released
==========================

The CakePHP core team is happy to announce the immediate availability
of the second release candidate for 2.4.0[1].

The CakePHP core team is happy to announce the immediate availability
of the second release candidate for 2.4.0[1].

CakeFest 2013[2] is just around the corner. If you haven't already
bought your ticket do it now. It will be a great time to learn way
beyond just CakePHP, this year we feature talks about performance, the
future of PHP and modern javascript frontend frameworks. The core team
is making great strides for having a new stable version for CakeFest
and workshops will be based off the great new features next release is
included.

A short list of changes you can expect in 2.4.0-RC2 are:

+ Config data between Email and Transport classes now merges
  correctly.
+ CakeTime::timeAgoInWords() uses fuzzy terms when time is below
  thresholds.
+ Confirm values are now correctly encoded. This was a regression
  introduced in 2.4.0-RC1.
+ DbAcl uses INNER joins instead of LEFT joins to help increase
  performance.
+ CakeEmail::template() can now disable rendering the layout as
  documented.
+ Formatting number in european locales now works correctly.
+ Translation strings were updated to exclude non-translable content.
+ RedirectRoute now persists parameters using the same methods as
  normal routes.
+ Components with settings are now mocked better.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.
Download a packaged release [3].


Links
~~~~~

+ [1] `https://cakephp.org/changelogs/2.4.0-RC2`_
+ [2] `https://cakefest.org/`_
+ [3] `https://github.com/cakephp/cakephp/tags`_




.. _https://cakephp.org/changelogs/2.4.0-RC2: https://cakephp.org/changelogs/2.4.0-RC2
.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _https://cakefest.org/: https://cakefest.org/

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

