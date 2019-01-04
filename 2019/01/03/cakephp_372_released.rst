CakePHP 3.7.2 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.7.2. This is a maintenance release for the 3.7 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.7.2. See the `changelog <https://github.com/cakephp/cakephp/compare/3.7.1...3.7.2>`_ for every commit.

* Commands added in an Application or plugin ``console()`` hook method can now
  use spaces in the command name.
* Improved typehints in API documentation.
* ``IntegrationTestTrait`` now forwards files defined in ``configRequest()``.
* Error pages for parsed extensions are once again rendering correctly.
* A redundant expiry time check in ``FileEngine`` was removed.
* ``RequestHandlerComponent`` once again handles explicit htm and html
  extensions correctly.
* ``UrlHelper::assetUrl()`` now supports a ``fullBase`` option enabling CDN
  assets to be linked more easily.
* The database package now requires cakephp/log as logging is used to emit
  transactional warnings.
* ``EmailTrait`` and ``ConsoleIntegrationTestTrait`` now uses ``before`` and
  ``after`` annotations to apply its setup/teardown logic.

Contributors to 3.7.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Chris Hallgren
* Jeremy Harris
* Mark Scherer
* Mark Story
* Michael Hoffmann
* Robert Pustułka
* ndm2
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
