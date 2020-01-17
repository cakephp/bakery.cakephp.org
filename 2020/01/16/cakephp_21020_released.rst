CakePHP 2.10.20 Released
========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.20. This is a maintenance release for the 2.10 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.10.20. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.19...2.10.20>`_ for every commit.

* The creation of ``ControllerTestDispatcher`` objects has been moved into
  a separate method allowing it to be overriden in application code.
* Requests with empty JSON objects no longer result in ``request->data`` being
  null.
* ShellHelpers located in plugins can now be loaded from outside the plugin by
  using plugin dot notation.
* Headers already sent warnings related to sessions when tests are run by
  ``phpunit.phar`` have been fixed.
* ``session_set_save_handler()`` is no longer called when there is an active
  session.
* ``CakeTestSuiteCommand::run()`` exit logic now matches phpunit's behavior, and
  calls ``doRun()`` with ``false``.

Contributors to 2.10.20
-----------------------

Thank you to all the contributors that helped make this release happen:

* Corey Taylor
* Edgaras Janušauskas
* Gareth Ellis
* Gerson Felipe Schwinn
* Mark Sch
* Mark Story
* Mark van Driel
* Milan van As
* Pascal Woerde
* Val Bancer

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
