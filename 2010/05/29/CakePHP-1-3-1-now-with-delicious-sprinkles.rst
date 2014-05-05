CakePHP 1.3.1 now with delicious sprinkles
==========================================

The CakePHP development team is happy to announce the release of
CakePHP 1.3.1[1]. 1.3.1 is the first maintenance release for 1.3 and
contains bugfixes and optimizations for features found in 1.3. No new
features will be introduced in the maintenance releases for 1.3.
Regular maintenance releases for 1.3 are planned on a monthly basis
for the near future.
The CakePHP development team is happy to announce the release of
CakePHP 1.3.1[1]. 1.3.1 is the first maintenance release for 1.3 and
contains bugfixes and optimizations for features found in 1.3. No new
features will be introduced in the maintenance releases for 1.3.
Regular maintenance releases for 1.3 are planned on a monthly basis
for the near future.

Since the release of CakePHP 1.3.0 last month, there have been more
than 70 commits and 45 tickets resolved. There have been a few changes
that may affect your application.

- The conditional check around including custom session configuration
  files was removed. This fixes issues where requestAction could cause
  loss of session settings, and improves the end developers ability to
  customize the session. Custom session files should ensure that
  classes/functions are conditionally declared.

- How virtualFields are detected and parsed was modified to allow
  virtualFields on the same table. A virtualFieldSeparator property was
  added to DboSource to allow customization of the virtualField
  separator. If you have fields containing '__' you may have to modify
  this setting to avoid issues.

- EmailComponent had a number of changes made to better support ELHO
  and slow SMTP servers.

Be sure to check the full changelog[2] for all changes that have
occurred. We'd like to welcome Juan Basso[3] to the development team.
Juan has been very active in the brazilian community and we're really
happy to have him. Work on the 2.0 branch continues to progress.
Currently much of the effort is focused on getting our migration to
PHPUnit complete. We'd like to thank the ongoing community efforts
around the documentation. There are now over 18,500 revisions in the
cookbook and 4 languages now have more than 70% of the documentation
translated.

As always, thank you for helping us make a great framework and
fantastic community.

Download a packaged release [1]
View the changelog [2]

[1] `http://github.com/cakephp/cakephp/downloads`_
[2] `http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-1`_
[3] `http://blog.cakephp-brasil.org/`_

.. _http://blog.cakephp-brasil.org/: http://blog.cakephp-brasil.org/
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads
.. _http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-1: http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-1

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

