CakePHP 1.3.0-RC4 has arisen
============================

The CakePHP development team is happy to announce the release the
CakePHP 1.3.0-RC4. This release marks the last release candidate,
before 1.3.0 goes to stable.
The CakePHP development team is happy to announce the release the
CakePHP 1.3.0-RC4. This release marks the last release candidate,
before 1.3.0 goes to stable. Since 1.3.0-RC3 was released 2 weeks ago
there have been over 55 commits and 22 tickets fixed. The plan is to
release 1.3.0 in 2 weeks, barring the discovery of any critical
issues.

Since the last release there have been a few significant changes.
Plugin shortcut routes were mostly removed[1]. This was done for a
couple reasons. Firstly, they have never 'really' worked properly, and
were prone to creating ambiguous routes that possibly left some
actions not accessible, by the urls generated for them. Secondly, they
incurred additional overhead as the Dispatcher attempted various
parameter permutations until finding the correct controller. For these
reasons the feature was removed. We are suggesting that users needing
the old routing, setup the appropriate routes in their routes.php
file.

In other project news, thanks to some contributions the API now has
far more links back to the book than ever before. The 1.3 book has
been receiving a healthy amount of translation attention. There are
now 4 languages with more than 70% complete translations. A big thanks
to everyone who has contributed to the translation efforts. You can
now download CakePHP logos, powered by logos and iPad wallpapers[2].

We'd like to thank everyone who has contributed documentation, tickets
and code between the last release and now.

Download a packaged release [3]
View the changelog [4]

[1] `http://cakephp.lighthouseapp.com/projects/42648/tickets/535-paginator-sort-produces-incorrect-url-in-plugins`_
[2] `http://cakephp.org/logos`_
[3] `http://github.com/cakephp/cakephp1x/downloads`_
[4] `http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-0-rc4`_

.. _http://cakephp.org/logos: http://cakephp.org/logos
.. _http://github.com/cakephp/cakephp1x/downloads: http://github.com/cakephp/cakephp1x/downloads
.. _http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-0-rc4: http://cakephp.lighthouseapp.com/projects/42648/changelog-1-3-0-rc4
.. _http://cakephp.lighthouseapp.com/projects/42648/tickets/535-paginator-sort-produces-incorrect-url-in-plugins: http://cakephp.lighthouseapp.com/projects/42648/tickets/535-paginator-sort-produces-incorrect-url-in-plugins

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

