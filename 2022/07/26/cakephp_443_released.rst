CakePHP 4.4.3 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.3. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.2...4.4.3>`_ for every commit.

* Fixed a potential method call on null in file assertion methods.
* Improved compatibility with PHP 8.2.
* ``TableLocator::get()`` no longer throws an error if a table is configured
  with options and then mocked.
* Updated CI configuration to use windows 2022 image.
* Fixed a regression in ``Folder::create()`` where ``umask`` was not correctly
  set.
* Cache keys used with ``FileEngine`` are now URL encoded. This aligns
  the characters valid in cache keys with other engines. It could cause cache
  misses for applications that were previously using characters outside of
  the alpha-numeric ranges.
* Removed redundant class type checks.
* Fixed ``ResultSet`` indexes being mutated by exceptions thrown within a loop
  while xdebug is enabled.
* ``TableLocator`` now handles getting tables by namespaced class name better.
* Unused properties in ``Database\Query`` were deprecated.

Contributors to 4.4.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Apisathan
* chris cnizzardini
* Edgaras Janušauskas
* Erwane Breton
* Kevin Pfeifer
* Mark Story
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
