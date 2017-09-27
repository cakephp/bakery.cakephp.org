CakePHP 3.5.3 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.3. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.2...3.5.3>`_ for every commit.

* ``Http\Client`` now supports protocol relative Location headers.
* Improved API documentation for the Query Builder.
* Shell help messages when commands are missing are no longer displayed in red.
* Dependent deletions in HasMany/HasOne associations now prefixes conditions
  with the table alias.
* Directories created by ``FileCache`` are more atomic.
* The default locale is now correctly set when the current locale is changed.
* ``CommandRunner`` now sorts command listings alphabetically.
* Cookie objects with array values is now sent JSON encoded. This restores
  backwards compatibility with CookieComponent.
* ``Validation::url()`` now accepts URLs that have fragments containing query
  data.
* ``Router::redirect()`` now allows the ``routeClass`` to be defined.
* Email address validation now accepts domain names with ``_`` in them.
* Additional constants for join types have been added.


Contributors to 3.5.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Jeremy Harris
* José Lorenzo Rodríguez
* Littley Lv
* Livia Scapin
* Mark Scherer
* Mark Story
* Patrick Conroy
* Pierre Martin
* Rachman Chavik
* Robert Pustułka
* Steffen Brand

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
