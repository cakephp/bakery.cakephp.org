CakePHP 4.4.11 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.11. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.11. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.10...4.4.11>`_ for every commit.

* ``View`` can now iterates templates paths that were defined as an associative
  array.
* The ``i18n extract`` command now checks for directory existence before trying
  to enumerate the files within directories provided as inputs.
* Update SECURITY policy docs to include 3.x end-of-life status.
* Improve API documentation.
* Fix dynamic-property error in PHP8.2 when ``PDOError`` objects are logged.
* Switch to using phive to install static analysis tools.
* Set the request into the routing context *before* processing middleware. This
  ensures that links on error pages always have access to the current request.

Contributors to 4.4.11
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras Janušauskas
* fabsn182
* Kevin Pfeifer
* Marc Würth
* Mark Scherer
* Mark Story
* Mikkel Bonde
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
