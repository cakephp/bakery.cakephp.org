CakePHP 1.3.11 and 2.0.0-beta released
======================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.11 and 2.0.0-beta.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 1.3.11 and 2.0.0-beta. 1.3.11 is a bugfix/maintenance
release for the the 1.3 branch. 2.0.0-beta marks the beginning of API
stabilization and means no more backwards incompatible changes should
be done from this point, but it does not mean it is intended for
production systems yet. Since the release CakePHP 1.3.10 in late May,
there have been over 27 commits[1] and 10 tickets resolved. There have
been a few changes that may affect your application:


1.3
~~~

+ Fixtures are now truncated in reverse order, this can help some
  applications with constraints in database to run tests more smoothly
+ Database credentials will now be hidden from debug output to protect
  users that forgot to set debug = 0 in their production servers
+ Fixed bug for detecting correct setup for mod_rewrite
+ Datasource will now return false instead of raising an error if
  unable to connect to Mysql or Mysqli
+ Added a banner to the default home.ctp to show important CakePHP
  announcements



2.0
~~~

In the 2.0 the team has made huge strides on implementing the
remaining items on the todo list for the next version of the
framework, we had a big tide of new committers and lots of pull
requests on github. We're thrilled on the interest the community is
putting on CakePHP 2.0. Since 2.0.0-alpha there have been over 375
commits[2] with various topic branches merged in. There are a couple
of big changes that will require you to update your app if already
running apps in 2.0. the biggest change is in the Dispatching process
that will require an instance on CakeResponse passed from the
index.php webroot file. Also the default routes were extracted to
their own file that needs to be included in your app's routes.php
file, just update app/Config/routes.php according to the one bundled
in the default distribution. Here is a quick list of the highlight for
this release:

+ Microsoft SqlServer 2008 and 2011 is now a first class citizen
+ FormHelper is now able to guess model metadata again, it is now
  advisable to hint the helper with the controller $uses property of
  what models is the controller using. This contrasts with 1.3
  applications where $uses supposed a performance hit. This is not true
  anymore for 2.0
+ The i18n extract shell is now able to exclude plugins from the
  process or extract one in particular
+ The validation messages in models can now be automatically extracted
  by the i18n shell, there is no need as in 1.3 applications for
  translating the messages in the constructor anymore
+ Default routes are now located in their own file that needs to be
  included in your app/Config/routes.php, make sure you update it!
+ Dispatcher now takes a CakeResponse as a second argument, make sure
  you update your app/webroot/index.php file!
+ Model::saveAll() was refactored and now the model has saveMany,
  saveAssociatied, validateMany and validateAssociated methods
+ Model::find() was refactored and the query building process is done
  a in new buildQuery() method
+ Lots of performance improvements From this point, the CakePHP core
  team will focus on fixing any bug that pops out on the lighthouse[3]
  and finish the new 2.0 book[4] which is now git based and compiled
  using sphinx. If you feel like you can give us a hand on getting an
  excellent documentation, please feel free to fork the repo and send us
  pull request for changes. We are also looking forward improving our
  API documentation, so pull requests for doc blocks in code are also
  very welcome!

As CakeFest 2011[5] is near we're encouraging developers to buy
tickets before the early bird prices are over. We'll have a bunch of
surprises to show in Manchester this September including certificates
for attendees to the training workshops, two tracks for talks, lots of
international speakers, and much more. Make sure you know the
schedule[6] if you have not yet made up your mind!

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and otherwise contribute to the
framework. Without you there would be no CakePHP.

Download packaged releases [7]


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/1.3.11`_
+ [2] `http://cakephp.org/changelogs/2.0.0-beta`_
+ [3]
  `http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview`_
+ [4] `https://github.com/cakephp/docs/`_
+ [5] `http://cakefest.org`_
+ [6] `http://cakefest.org/schedule`_
+ [7] `http://github.com/cakephp/cakephp/downloads`_




.. _http://cakephp.org/changelogs/2.0.0-beta: http://cakephp.org/changelogs/2.0.0-beta
.. _https://github.com/cakephp/docs/: https://github.com/cakephp/docs/
.. _http://cakefest.org: http://cakefest.org
.. _http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview: http://cakephp.lighthouseapp.com/projects/42648-cakephp/overview
.. _http://cakephp.org/changelogs/1.3.11: http://cakephp.org/changelogs/1.3.11
.. _http://cakefest.org/schedule: http://cakefest.org/schedule
.. _http://github.com/cakephp/cakephp/downloads: http://github.com/cakephp/cakephp/downloads

.. author:: lorenzo
.. categories:: news
.. tags:: News

