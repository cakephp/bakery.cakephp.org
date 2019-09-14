CakePHP 3.8.4 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.4. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.3...3.8.4>`_ for every commit.

* ``RedisEngine`` now uses the ``nx`` parameter to atomically set keys and
  expiration times.
* Dependent association deletions now correctly remove alias prefixes from unary
  and identifier expressions used in the conditions.
* Improved API documentation.
* SQLite schema reflection now preserves decimal column precision and length.
* CakePHP is now using github-actions to manage stale issues.

Contributors to 3.8.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Alex
* Ethan Pooley
* Mark Scherer
* Mark Story
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
