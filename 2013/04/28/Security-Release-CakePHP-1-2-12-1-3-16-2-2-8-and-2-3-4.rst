Security Release - CakePHP 1.2.12, 1.3.16, 2.2.8 and 2.3.4
==========================================================

If you are using CakePHP's PaginatorComponent without whitelisted sort
fields you should upgrade as soon as possible to prevent possible SQL
injections.

CakePHP 1.2.12, 1.3.16, 2.2.8 and 2.3.4 have just been released to fix
a critical issue with how pagination & PaginatorComponent handle sort
criteria. When paginating without a sort column whitelist it was
possible to execute arbitrary SQL by manipulating the sort conditions.
In the following days we will offer a full description of the
vulnerability and how it can be exploited, after some reasonable time
has passed for our users to upgrade.

In addition to the security fix 2.3.4 contains fixes for the following
issues:

+ Support for HTTP code 505 was added.
+ Router::currentRoute() returns false when there is no current route.
+ Writing to file cache after clearing a group now works as expected.
+ Asset URLS using fullBase are now generated correctly when not using
  URL re-writing.

There are no additional fixes outside the security fix in 2.2.8.

In addition to the security fix 1.3.16 contains fixes for the
following issues:

+ Databases is now singularized correctly.
+ Saving translations with saveAll() now works better.
+ Oracle listSources() no longer reads from the global table
  namespace.
+ The cake console command now works on MacOS properly.
+ Mixing query[contain] and contain() now interact properly.

In addition to the security fix 1.2.12 contains fixes for the
following issues:

+ umask is now set when creating cache files.
+ Boundaries for multipart email messages are now generated correctly.
+ Compatibility with PHP 5.4 has been improved.

We recommend all users of 1.2, 1.3, and 2.x release series upgrade as
soon as possible to the new releases.


Links
~~~~~

+ Download a packaged release
  `https://github.com/cakephp/cakephp/tags`_
+ View the changelogs `https://cakephp.org/changelogs`_




.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _https://cakephp.org/changelogs: https://cakephp.org/changelogs

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

