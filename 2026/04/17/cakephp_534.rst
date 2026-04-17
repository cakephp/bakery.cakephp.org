CakePHP 5.3.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.3.4. This is a maintenance release for the 5.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.3.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.3.3...5.3.4>`_ for every commit.

* Added database connection context to errors logged for ``QueryException``.
* Improved phpstan type inference, and table entity generics.
* Fixed pagination sort condition merging with alias prefixed fields. Fields are
  now normalized before resolving sort direction.

Contributors to 5.3.4
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Application-drop-up
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* Masatoshi Ogiwara

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
