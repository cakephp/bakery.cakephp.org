CakePHP 1.3.8 and 1.2.10 released
=================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.8 and 1.2.10. These releases are bugfix/maintenance
releases for the 1.2 and 1.3 branches.

CakePHP 1.3.8 and 1.2.10 released

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.8 and 1.2.10. These releases are bugfix/maintenance
releases for the 1.2 and 1.3 branches. Since the release CakePHP 1.3.7
in January, there have been over 35 commits[1] and 30 tickets
resolved. The 1.2 branch has 20 commits[2] and 15 tickets resolved,
since the release of 1.2.9 in November. There have been a few changes
that may affect your application in each version:


1.3
~~~

+ Boolean handling for Postgres has been improved.
+ Installs using the top level index.php and no url re-writing should
  work better now.
+ DboMysqli no longer incorrectly handles socket and port options.
+ Blackholes caused by defining custom name attributes on fields has
  been fixed.
+ The %e time specifier now works on windows.
+ Cake console properly runs when started in C:\ on windows.
+ Actions starting with their prefix, but lacking a '_' are correctly
  handled now.
+ You can now create submit buttons with no text.



1.2
~~~

+ Paths for virtual machines are now correctly handled.
+ Installs using the top level index.php and no url re-writing should
  work better now.
+ Date headers are now correctly added to emails sent from
  EmailComponent.
+ EmailComponent now registers and un-registers its View instance,
  this allows helpers to access View when rendering email messages.
+ FormHelper::checkbox() now correctly handles checked = false.
+ TextHelper::autoLinkEmails now correctly links email addresses with
  '.'

Development on 2.0 continues to progress well. A few topic branches
have been merged in. Most notably, re-implementation of AuthComponent,
Pagination as a component, and HttpSocket. If you are interested in
what the future might contain, you can view the in progress wiki
pages[3], and open tickets[4] on lighthouse.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and otherwise contribute to the
framework. Without you there would be no CakePHP.

+ View the 1.2.10 changelog [1]
+ View the 1.3.8 changelog [2]
+ Download packaged releases [5]



Links
~~~~~

+ [1] `http://cakephp.org/changelogs/1.3.8`_
+ [2] `http://cakephp.org/changelogs/1.2.10`_
+ [3] `http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview`_
+ [4] `http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/bins/228812`_
+ [5] `http://github.com/cakephp/cakephp/downloads`_




.. _http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/bins/228812: http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/bins/228812
.. _http://cakephp.org/changelogs/1.3.8: http://cakephp.org/changelogs/1.3.8
.. _http://cakephp.org/changelogs/1.2.10: http://cakephp.org/changelogs/1.2.10
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads
.. _http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview: http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview

.. author:: markstory
.. categories:: news
.. tags:: CakePHP,releases,News

