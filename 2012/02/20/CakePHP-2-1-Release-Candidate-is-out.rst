CakePHP 2.1 Release Candidate is out
====================================

The first, and hopefully only, release candidate for CakePHP 2.1 was
released. If you have an application running on 2.0 or planning to
migrate, this is the best moment to start checking this version out!

The CakePHP core team is proud to announce the immediate availability
of the first CakePHP 2.1.0 Release Candidate [1]. As noted in the
previous releases, this version is fully backwards compatible with
2.0.6, making it a breeze to update your apps to start taking
advantage of the many improvements that made into this release. This
will hopefully be the only release candidate for the branch, should
any serious bugs arise we will keep offering release candidates until
we reach stable.

In total, there were over 170 commits and over 4 new major features or
enhancements added to this release candidate, in addition to the
previous 2.1 beta release. A complete list of the changes can be
viewed in the changelogs page [2]. This is a quick list of this
version's main highlights:


Most helpers converted to utility libs
--------------------------------------

One common feature request was to be able to use methods from the
Text, Time and Number helpers outside views. Valid uses for the
methods exposed in those helpers are email sending in shells, data
formatting before saving in models and a few other cases in
controllers. We have now refactored those helpers into libraries
`CakeTime` and `CakeNumber`, while all methods found in the Text
helper were placed into the `String` class.

Importing one of those libs is as easy as `App::uses('String',
'Utility')` and use it as follows `String::truncate($text);`

All new libraries are composed of static methods, no need to
instantiate the class. Additionally, refactored helpers will still
work as usual, but they now rely in the underlying libs to function.
This opens up the posibility of swapping the "engine" those helpers
are using to produce the same results in views.


Deep saving
-----------

`saveAll` and friends ( `saveMany`, `saveAssociated`,
`validateAssociated` ...) now accept a new `deep` option param. If you
set this param to `true` the it will save data as deep as it can,
bringing the posibility of saving any level of data nesting you like
in a single transaction. For instance you can save the Author, Posts
and related comments in just one call.

The aforementioned functions also accept a `fieldList` option to
specify which of those fields should be saved or validated. This list
will apply to deep associations too.


New ACL engine
--------------

In addition to the good old database ACL engine, we have added a new
one based on configuration files. This engine takes a php file
containing specific variables describing AROS, ACOS and permissions to
grant access to resources in your application. This is a great
alternative to the database solution for those who want to get a
speedy permissions checking system when not requiring a database to
dynamically manage permissions.


HtmlHelper::media()
-------------------

The HtmlHelper gained a new `media()` method to generate HTML5
compatible audio and video tags with support for multiple alternate
sources.


Other improvements and changes
------------------------------

+ Updated minimum PHP version requirement to 5.2.8 due to PHP bugs
  #44251 and #45748
+ Paginator helper now accepts an option to set the default class for
  the "current" page link
+ Extending non-existing views will throw an exception
+ Extending views using an absolute path (relative to the View folder)
  is now possible
+ Most view files in the cake core such as home.ctp and the default
  layout were moved into the app folder.
+ Query params are now shown in database log when using prepared
  statements

We're almost ready with this version and we have a couple of surprises
for the community, so stay tuned! As always, thanks to the friendly
CakePHP community for the patches, documentation changes and new
tickets. Without you there would be no CakePHP!

+ Download a packaged release [1]
+ View the changelog [2]



Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/2.1.0-RC`_




.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp
.. _http://cakephp.org/changelogs/2.1.0-RC: http://cakephp.org/changelogs/2.1.0-RC

.. author:: lorenzo
.. categories:: news
.. tags:: release,2.1.0,News

