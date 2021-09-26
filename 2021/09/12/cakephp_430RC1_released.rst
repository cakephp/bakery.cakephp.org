CakePHP 4.3.0-RC1 Released
==========================

The CakePHP core team is proud to announce the first release candidate of
CakePHP 4.3.0. The 4.3.0 release will introduce several new features and
a handful of deprecations. 

New Features
------------

The `migration guide
<https://book.cakephp.org/4.next/en/appendices/4-3-migration-guide.html>`_ has
a complete list of what's new in 4.3.0. We recommend you give that page a read
when upgrading as it outlines the deprecations present in 4.3.

New Feature Highlights
----------------------

- ``Controller::middleware()`` was added which allows you to define middleware
  for a single controller only.
- ``Http\Client::addMockResponse()`` was added making integration tests easier
  to write without using complex to define mocks.
- A JSON based logger was added.
- ``FormHelper`` generates aria attributes improving out-of-the box
  accessibility.
- A new fixture subsystem leverages your migrations or SQL dumps to generate
  test database schema was added.

How you Can Help
----------------

You can help by trying out the RC in your application. Please open issues for
any new test failures or regressions the new version creates in your
application.

Contributors to 4.3.0-RC1
---------------------------

Thank you to all the contributors that have helped with 4.3.0:

* ADmad
* Breton Erwane
* Chris Nizzardini
* Erwane Breton
* J.Brabec
* Jan Brabec
* Juan Pablo Ramirez
* Mark Scherer
* Mark Story
* Rob Rikken
* andrii-pukhalevych
* captain-redbeard
* chris cnizzardini
* fabsn182
* jpramirez
* ndm2
* othercorey

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
