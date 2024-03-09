CakePHP 5.0.6
=============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.0.6. This is a maintenance release for the 5.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.0.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.0.5...5.0.6>`_ for every commit.

* Fix validation of ``ChronosTime`` instances to be considered valid by the
  ``time`` validation method.
* Allow ``Collection::groupBy()`` to work with ``Enum`` values.
* Improve display of console exceptions in production mode.
* Fix ``Hash::insert()`` with ``{s}`` placeholders and attribute conditions on
  uneven datasets.
* Fix potentially leaking file descriptor in ``StubConsoleInput``.
* Fixed formatting error of datetimes with microseconds.
* Fixed parsing of datetimes of microseconds.

Contributors to 5.0.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* freefri
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
