CakePHP 3.6.5 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.5. This is a maintenance release for the 3.6 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.6.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.6.4...3.6.5>`_ for every commit.

* Improved deprecation warning text.
* ``Plugin::load()`` now uses concrete plugin classes if a plugin has adopted
  new style plugins.
* The mimetype for ``.bmp`` was added to ``Response``.
* ``Plugin::routes()`` had a deprecation warning added. This method is no longer
  necessary when using an ``Application`` class.
* Missing deprecation warnings were added to ``Response``.
* ``IntegrationTestCase`` once again accepts array URLs when generating
  requests.
* Email messages no correctly word-wrap multi-byte characters.
* ``Http\Client`` restores the error handler after a socket error.
* ``AppShell`` is now included in the list of auto-discovered shells.
* ``ConsoleIntegrationTestCase`` now catches ``StopException`` and sets the test
  case exitCode property accordingly.
* ``Cell::__debugInfo()`` no longer emits a notice error.
* Pagination metadata now includes the start & end record numbers.
* The ``Model.afterSaveCommit`` event always recieves an ``ArrayObject`` for
  ``$options`` now.


Contributors to 3.6.5
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras
* Glen Sawyer
* Hideki Kinjyo
* Jeremy Harris
* Joep Roebroek
* Mark Scherer
* Mark Story
* Neon1024
* Walther Lalk
* saeideng
* seto
* smap9

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
