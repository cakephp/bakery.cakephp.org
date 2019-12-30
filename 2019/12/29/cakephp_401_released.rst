CakePHP 4.0.1 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.1. This is a maintenance release for the 4.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.0.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.0.0...4.0.1>`_ for every commit.

* The upgrade tool has a smaller install footprint and should have fewer
  conflicts with application code now.
* Removed the typehint on ``Event`` data payload, as it can be any type.
* Removed the empty string default value for console options. This fixes
  ``Argument::hasOption()`` always returning true for optional options.
* CSRF tokens are now set on redirect and basic diactoros response objects.
* URL generation no longer emits a type warning when route elements have a regex
  pattern and parameters are integers.
* Loading joinable associations with ``contain()`` now emit errors when foreign
  keys are not selected. This may cause existing queries to start emitting
  errors, but those queries were previously silently failing to load associated
  data as requested.
* SQLServer fixtures now handle the ``restrict`` foreign key action now.
* The ``datetime`` abstract type once again uses the ``DATETIME`` column type in
  SQLServer. Using ``DATETIME2`` created microsecond overflow issues for some
  users.
* ``TestCase::loadRoutes()`` was added to ease writing unit tests for classes
  like mailers which often need routes loaded.
* ``ConsoleIo::createFile()`` no longer returns false when the created file has
  0 bytes.
* When generating URLs, routes with ``controller`` and ``action`` placeholders
  no longer strip these these keys when they are undefined. Instead routes missing
  the controller and action keys will fail to match.
* Optional routing placeholders now work consistently for both braced
  placeholders and colon placeholders.
* ``FunctionsBuilder`` once again allows mixed types for the ``$expression``
  parameter as many expressions accept objects that implement
  ``__toString()``.
* ``ErrorLogger`` no longer fails to log messages for errors which no file or
  line.
* Improved API doc blocks.

Contributors to 4.0.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Kaliel
* Mark Scherer
* Mark Story
* Matthias Wirtz

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
