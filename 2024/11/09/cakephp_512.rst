CakePHP 5.1.2
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.1.2. This is a maintenance release for the 5.1 branch that fixes several
community reported issues and regressions. If you are having problems with the framework
breaking your application when you upgrade from 5.0.11 to 5.1, please open an
`issue<https://github.com/cakephp/cakephp/issues/new?template=bug_report.yml>`__.

Bugfixes
--------

You can expect the following changes in 5.1.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.1.1...5.1.2>`_ for every commit.

* Fix usage of constants in EavStrategy.
* Clean up constructor logic.
* In console command listings app and cakephp commands are now displayed above
  plugin names.
* Added command descriptions to all framework commands.
* Fixed file descriptor leaks in ``StubConsoleOutput``.
* Added support for using DI in commands executed by other commands.
* Restored ability to disable query logging at runtime.
* Improved performance of count updates in CounterCache.
* Fixed object naming in ``ObjectRegistry``. Plugin class names are reflected more
  correctly now.
* Added IP and URL to active transaction warning.
* Cleanup usage of special view variables to configure the class in
  SerializedView.
* Swapped usage of ``E_USER_ERROR`` to ``E_USER_WARNING`` to improve compatibility
  with PHP 8.4.
* Fixed geospatial types not being defined in TypeFactory.
* Improved API documentation.
* Fixed disabling client side buffering with SqlServer when it is disabled in
  the ``SelectQuery``.
* Fix XML serialization to not break with enums.
* Add cjs/mjs extensions.

Contributors to 5.1.2
----------------------

Thank you to all the contributors that submitted a pull request:

* Adam Halfar
* ADmad
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* Nicolas Roggli
* othercorey

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
