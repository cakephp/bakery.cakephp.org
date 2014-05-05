CakePHP 2.0 released
====================

The CakePHP core team is very exited to announce a major jump in the
version numbering. CakePHP 2.0 stable is out! we have put endless
hours into this release and great ideas have made it into the the
framework for this version. This is a quick summary of what 2.0 means
for you

The CakePHP core team is very exited to announce a major jump in the
version numbering. CakePHP 2.0 stable is out! we have put endless
hours into this release and great ideas have made it into the the
framework for this version. This is a quick summary of what 2.0 means
for you:

+ We have dropped PHP 4 support and we have refactored all the code to
  be strictly compliant with PHP 5.2+.
+ Use of native features like exceptions, PDO, SPL, json_encode and
  much more.
+ Embraced the PSR-0 recommendation for file naming. Now all your
  classes map to a file with the same name. Less things to remember!
+ New Error and Exception handlers provide easier to configure, and
  ease working with errors such as page not found, unauthorized error
  and lots more.
+ Improved I18n functions for easier multilingual development.
+ Support for injecting your own objects to act as CakePHP libraries,
  such as component, helpers and behaviors, no more excuses for
  modifying core files.
+ Console libraries rebuilt from scratch, automatic help generation,
  parameter checking, and colors!
+ New Request and Response objects for easier handling of HTTP
  requests.
+ Better session handling for easier custom engines. Put your sessions
  into storage systems like Memcache with less effort.
+ Completely refactored Auth system. It is now easier to configure and
  plug in your own implementations for external login services or your
  permissions system.
+ Brand new email library with support for multiple transports. With
  easy to use global configuration, logging, and charset support.
+ Dropped SimpleUnit in favor of PHPUnit. PHPUnit is the defacto
  testing framework for PHP with support for more options, better mock
  objects, and improved console output [16]
+ Reworked the SecurityComponent to suck less, now you can more easily
  protect your apps against CSRF and form tampering attacks while having
  fun.
+ Improved support for PostgreSql, SQLite and SqlServer, they are now
  first class citizens along with Mysql datasource.
+ HTML 5 form inputs support in form helper.
+ A Sexier default look taking advantage of new CSS 3 features.
+ A lot faster, almost everything is now lazy-loaded, and even on
  debug mode you will feel your applications flying.

We are probably falling short in describing all the goodness CakePHP
2.0 is bundling, so we invite you to read the excellent new book[1]
that we have put together to make this release the best documented
version of the framework yet. You're invited to watch this video[2] to
get a better idea of all the goodness inside 2.0, we also have slides!
[3] Also take some time to check out this video[4] that details the
roadmap we followed to bring you today's release. The overall CakePHP
ecosystem has also been improved. We took the time to make the
complete core test suite run with a single command. This allowed us to
measure the health of the core code using the new continuous
integration server[5]. We are more confident than ever, that this is a
rock solid framework.

For those of you migrating from CakePHP 1.3, please check the very
detailed migration guide[6] and make sure you use the new Upgrade
shell bundled with this release. A lot of applications have already
been migrated and overall opinions on the process is that it is very
smooth and straight forward. This version already comes with a
complete working ecosystem of well known and new plugins. This is a
list of some noteworthy:

+ DebugKit [7]: provides a development toolbar an additional tools to
  measure performance, get requests history, inspect view variables and
  other goodies.
+ AclExtras [8]: easy generation and synchronization of Access control
  objects for you ACL permissions
+ Localized [9]: A set of country specific classes for validation a
  displaying correct texts for each country in your application
+ Datasources [10]: Additional datasources such as XmlRPC, Ldap, and
  more
+ Migrations [11]: Easy database schema migrations and history
  tracking
+ Search [12]: Create complex search queries out from url requests in
  minutes
+ Entity [13]: Make your models return objects instead of arrays
+ MongoDb [14]: A drop in solution to use MongoDB as a database, you
  won't even notice you changed the datasource!
+ MongoCake [15]: Compatibility bridge with Doctrine ODM to use
  MongoDB and return objects in models

Since 2.0.0-RC3 there have been 79 commits and 20 tickets resolved.
Some of the changes include:

+ Added support for configuring the body and header charset in
  CakeEmail, this allows users to send emails in japanese charsets.
+ Updated all internal documentation links.
+ Dropped string syntax for configuring behaviors and helpers. It is
  not possible to do `array('MyBehavior' => 'config string')` use the
  array syntax instead.
+ Using sessions with custom adapters will not throw errors anymore.
+ Unused Exception classes were removed.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and otherwise contribute to the
framework. Without you there would be no CakePHP.

Download a packaged release [17] View the changelog [18]


Links
~~~~~

+ [1] `http://book.cakephp.org/2.0/en/`_
+ [2] `http://tv.cakephp.org/video/CakeFoundation/2011/10/06/ch-ch-anges_cakephp_2_0_-_by_mark_story`_
+ [3] `http://www.slideshare.net/markstory/ch-chchanges-cake-php2`_
+ [4] `http://tv.cakephp.org/video/CakeFoundation/2011/04/07/la_meetup_2011_part_one/playlist:4d9d4e65-5e44-4daf-919c-129c82f0cb67`_
+ [5] `http://ci.cakephp.org`_
+ [6] `http://book.cakephp.org/2.0/en/appendices/2-0-migration-guide.html`_
+ [7] `https://github.com/cakephp/debug_kit/tree/2.0`_
+ [8] `https://github.com/markstory/acl_extras/tree/2.0`_
+ [9] `https://github.com/cakephp/localized/tree/2.0`_
+ [10] `https://github.com/cakephp/datasources/tree/2.0`_
+ [11] `https://github.com/CakeDC/migrations/tree/2.0`_
+ [12] `https://github.com/CakeDC/search/tree/2.0`_
+ [13] `https://github.com/kanshin/CakeEntity/tree/2.0`_
+ [14] `https://github.com/ichikaway/cakephp-mongodb/tree/cake2.0`_
+ [15] `https://github.com/lorenzo/MongoCake`_
+ [16] `http://tv.cakephp.org/video/CakeFoundation/2011/10/03/phpunit_and_you_-_by_mark_story`_
+ [17] `https://github.com/cakephp/cakephp/zipball/2.0.0`_
+ [18] `http://cakephp.org/changelogs/2.0.0`_




.. _https://github.com/lorenzo/MongoCake: https://github.com/lorenzo/MongoCake
.. _http://tv.cakephp.org/video/CakeFoundation/2011/10/06/ch-ch-anges_cakephp_2_0_-_by_mark_story: http://tv.cakephp.org/video/CakeFoundation/2011/10/06/ch-ch-anges_cakephp_2_0_-_by_mark_story
.. _https://github.com/kanshin/CakeEntity/tree/2.0: https://github.com/kanshin/CakeEntity/tree/2.0
.. _https://github.com/cakephp/cakephp/zipball/2.0.0: https://github.com/cakephp/cakephp/zipball/2.0.0
.. _https://github.com/CakeDC/migrations/tree/2.0: https://github.com/CakeDC/migrations/tree/2.0
.. _https://github.com/cakephp/localized/tree/2.0: https://github.com/cakephp/localized/tree/2.0
.. _http://book.cakephp.org/2.0/en/: http://book.cakephp.org/2.0/en/
.. _http://tv.cakephp.org/video/CakeFoundation/2011/10/03/phpunit_and_you_-_by_mark_story: http://tv.cakephp.org/video/CakeFoundation/2011/10/03/phpunit_and_you_-_by_mark_story
.. _https://github.com/cakephp/debug_kit/tree/2.0: https://github.com/cakephp/debug_kit/tree/2.0
.. _http://tv.cakephp.org/video/CakeFoundation/2011/04/07/la_meetup_2011_part_one/playlist:4d9d4e65-5e44-4daf-919c-129c82f0cb67: http://tv.cakephp.org/video/CakeFoundation/2011/04/07/la_meetup_2011_part_one/playlist:4d9d4e65-5e44-4daf-919c-129c82f0cb67
.. _https://github.com/ichikaway/cakephp-mongodb/tree/cake2.0: https://github.com/ichikaway/cakephp-mongodb/tree/cake2.0
.. _http://ci.cakephp.org: http://ci.cakephp.org
.. _http://book.cakephp.org/2.0/en/appendices/2-0-migration-guide.html: http://book.cakephp.org/2.0/en/appendices/2-0-migration-guide.html
.. _https://github.com/cakephp/datasources/tree/2.0: https://github.com/cakephp/datasources/tree/2.0
.. _http://www.slideshare.net/markstory/ch-chchanges-cake-php2: http://www.slideshare.net/markstory/ch-chchanges-cake-php2
.. _https://github.com/CakeDC/search/tree/2.0: https://github.com/CakeDC/search/tree/2.0
.. _http://cakephp.org/changelogs/2.0.0: http://cakephp.org/changelogs/2.0.0
.. _https://github.com/markstory/acl_extras/tree/2.0: https://github.com/markstory/acl_extras/tree/2.0

.. author:: lorenzo
.. categories:: news
.. tags:: News

