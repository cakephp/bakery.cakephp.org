CakePHP 5.2.10
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.10. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 5.2.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.9...5.2.10>`_ for every commit.

* Fixed ``Form::getError()`` using dot notation
* Fixed testing ``FormProtector`` with ``IntegrationTestTrait`` in non-debug mode
* Fixed ``Query::bind()`` not setting the query dirty
* Fixed rendering 400 errors with base template from plugins
* Fixed ``ConsoleIntegrationTestTrait::exec()`` exception on multiple calls with input
* Initialized event manager earlier when running commands so all events are supported
* Cleaned up various documentation and annotations
* Fixed Chronos deprecations
* Fixed PHP 8.5 deprecations

Contributors to 5.2.10
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Alberto G. Rodriguez
* Corey Taylor
* Jasper Smet
* Mark Scherer
* Mark Story
* nook24

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
