CakePHP 4.4.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.1. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.0...4.4.1>`_ for every commit.

* Fixed broken links in API documentation.
* Reverted a deprecation in ``implementedEvents()`` as DebugKit was relying on
  it and we missed identifying this usage earlier.
* Added ``scanCount`` to ``RedisEngine`` to give more control over how keys are
  cleared.
* Improved deprecation warning for ``ResultSetInterface`` proxying.
* Fixed updating belongsToMany association junction records that contain
  composite primary keys that involve a column that is mapped to a non-scalar
  value.
* Fixed ``P1D`` date interval expressions when used as cache TTL values.

Contributors to 4.4.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Alex Mayer
* Corey Taylor
* Erwane
* Mark Story
* Nicos Panayides
* ndm2
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
