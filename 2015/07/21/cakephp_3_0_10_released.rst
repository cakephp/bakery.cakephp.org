CakePHP 3.0.10 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.0.10. This is a maintenance release for the 3.0 branch that fixes a couple
important regressions introduced in 3.0.9

Bugfixes
--------

You can expect the following changes in 3.0.10. See the `changelog
<http://cakephp.org/changelogs/3.0.10>`_ for every commit.

* Fixed issue with getting plugin behaviors by alias
* ``FormHelper`` do not throw warnings anymore when the ``_ids`` property of a field is
  empty
* ``Hash::maxDimensions()`` was fixed to report the actual nesting level of an array
* Made ``Xml`` serialization in responses more resilient
* ``ObjectRegistry`` classes now implement ``EventDispatcherInterface``
* Empty conditions passed to ``where()`` in a query are now ignored

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: lorenzo
.. categories:: release, news
.. tags:: release, news
