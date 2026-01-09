CakePHP 5.2.11
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.11. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 5.2.11. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.10...5.2.11>`_ for every commit.

* Fix completion command to exclude plugin-prefixed aliases. By default plugin
  prefixed commands are not included in the ``completion`` command output. Use
  ``-v`` to include all aliases.
* Fixed `setTimezone()`` being called on ``Date`` instances in
  ``RelativeTimeFormatter``.
* Improve return type annotation for ``Validator::validate()``.
* Improved API documentation.
* ``E_COMPILE_ERROR`` errors are not handled as fatal errors in
  ``ExceptionTrap::handleShutdown()``.
* Fix how ``plugin assets`` command handles invalid symlinks.

Contributors to 5.2.11
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Gerson Felipe Schwinn
* Joris Vaesen
* Mark Scherer
* othercorey

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: othercorey
.. categories:: release, news
.. tags:: release, news
