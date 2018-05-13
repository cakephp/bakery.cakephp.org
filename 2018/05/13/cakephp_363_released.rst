CakePHP 3.6.3 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.3. This is a maintenance release for the 3.6 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.6.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.6.2...3.6.3>`_ for every commit.

* Improved deprecation messages in ``ServerRequest``, ``Response`` and
  ``ViewBuilder``.
* Improved API documentation.
* ``h()`` no longer modifies non-string scalar values.
* Passing a string as the 2nd parameter to ``h()`` is now deprecated.
* The ``Model.afterSaveCommit`` event is now fired for entities created via
  ``findOrCreate()``
* The console environment now uses the ``Application`` class to load routes.
  This fixes ensures routes are loaded for class based applications.
* Fixed missing attribute emulation for ``ServerRequest::$here``.
* ``Security::rijndael()`` now emits deprecation warnings.
* Automatic identifier quoting can now handle column names with spaces better.
* Corrected a parsing mistake with string route targets.
* Integration test cases now set ``$_SERVER['PHP_SELF']`` to ``/`` solving
  cryptic base path issues if more than one action was called per test method.

Contributors to 3.6.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Brian French
* Dominik Schmelz
* Jeremy Harris
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Neon1024
* Tomas Saghy
* Vladimir Reznichenko
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

