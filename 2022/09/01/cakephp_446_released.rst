CakePHP 4.4.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.6. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.5...4.4.6>`_ for every commit.

* Chained or nested exceptions are now rendered correctly in integration test
  cases, console and HTML exception rendering.
* ``ConsoleInputArgument`` instances no longer consider each other equal based
  on their option values only.
* Improve typing and psalm error supression.
* ``FormData`` now accepts ``UploadedFileInterface`` as a file.
* Fixed MySQL schema reflection for tables that use conditional indexes. The
  expression part of the index is now ignored.
* Updated links to use https instead of http.
* Improved CI configuration security.

Contributors to 4.4.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Alex
* Arhell
* Corey Taylor
* Mark Story
* Nicos Panayides
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
