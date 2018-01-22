CakePHP 3.5.11 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.11. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.11. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.10...3.5.11>`_ for every commit.

* ``Paginator::options('url')`` now allows prefixes to be disabled by setting
  them to ``false``.
* Route parsing results now include ``_name``. This makes it easier to integrate
  named routes in pagination, and other places where you want to build a URL
  based on the current request's URL.
* Nested namespaces are displayed correctly on development error pages.
* Improved API documentation.
* Cache keys used for groups are now hashed. This prevents keys overflowing
  Redis and Memcache key lengths. This will cause previously cached entries to
  be invalid as group keys have changed.
* TreeBehavior no longer triggers notices after ``setConfig('scope', null)``.
* The default database session configuration no longer triggers errors in
  PHP7.2.0+

Contributors to 3.5.11
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras Janušauskas
* Elias De Vos
* Hideki Kinjyo
* Jeremy Harris
* Mark Scherer
* Mark Story
* fortkle
* saeideng


We'd like to welcome `@saeideng <http://github.com/saeideng>`_ to the core team.
Saeideng has been a consistent contributor over the past few months and we're
happy to have them on the team as we complete CakePHP 3.6. and start work on
4.x. As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
