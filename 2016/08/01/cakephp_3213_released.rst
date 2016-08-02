CakePHP 3.2.13 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.2.13. This is a maintenance release for the 3.2 branch that fixes several
community reported issues and adds a few minor features.

Bugfixes
--------

You can expect the following changes in 3.2.13. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.2.12...3.2.13>`_ for changes.

* The ``Content-Type`` header works better in controller integration tests.
  (@dakota)
* TreeBehavior no longer allows a node to be its own parent. (@markstory)
* You can now write integration tests for methods that use secured forms with
  query string arguments in the URL. (@dakota)
* ``FormHelper::error()`` now allows message translation by rule name, in
  addition to by error message string. (@oyas)
* ``Table::validateUnique()`` no longer raises an exception when non-scalar
  values are received. (@markstory)
* ``BelongsToMany::replaceLinks()`` no longer returns true when linked records
  fail to save because of application rules. (@markstory)
* An exception will be raised when a ``Model.afterSave`` event handler aborts
  the transaction. (@lorenzo)
* An optimization made to the ``DateTimeType`` has been reverted as it caused
  issues with user-land plugins. (@markstory)
* ``Text::stripLinks()`` now recursively removes HTML. This method is now
  deprecated as stripping HTML with regular expressions is almost never truly
  safe. (@markstory)
* Using associations that do not exist will now fail with an exception when
  marshalling data. (@markstory)
* ``Cell::__toString()`` now displays more useful fatal errors in PHP7.
  (@thinkingmedia)
* The console ``TableHelper`` now correctly handles double-width characters.
  (@slywalker)

Minor Enhancements
------------------

* ``Text::truncateByWidth()`` was added. This method makes it easier to truncate
  text by its visual width instead of its character length. (@chinpei215)
* The ``notExists()`` and ``exists()`` methods were added to
  ``QueryExpression``. (@skie)
* A warning is now logged by ``Cake\Network\Response`` when headers have already
  been sent. (@markstory)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
