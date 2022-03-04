CakePHP 4.3.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.3.6. This is a maintenance release for the 4.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.3.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.3.5...4.3.6>`_ for every commit.

* Fixed typing errors when routes converted passed parameters into objects.
* Improved API documentation.
* Fixed a memory leak in ``TranslatorRegistry`` when many translations were
  loaded from cache.
* Improved handling of empty
  ``array`` typed controller action parameters.
* Fixed required options blocking ``--help`` output in console commands.
* ``CacheEngine::deleteMultiple()`` now attempts to delete all keys instead of
  stopping at the first failure.
* Fixed regression in belong to many associations that use a junction table and
  finder that applies ``contain()`` to the query.

Contributors to 4.3.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Mark Story
* Val Bancer
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
