CakePHP 4.4.12 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.12. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.12. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.11...4.4.12>`_ for every commit.

* Fix regression in ``missing_controller`` template where ``class`` was
  undefined.
* Add opt-in exception wrapping for ``PDOError`` that preserves the
  ``queryString`` attribute used in error templates. This is a workaround for
  dynamic properties being deprecated in PHP 8.2.
* Improve how validation rules work on array elements with numeric keys.
* Fix mutation side-effects in ``TestEmailTransport`` caused by ``Mailer``
  instances being delivered within a loop. These mutations would result in test
  assertions having access to incorrect information.
* Fixed cookie expiration when the default server timezone was ahead of UTC.
* Added additional composer package metadata for PSR interface implementations.
* An exception will now be thrown if the session cannot be started due to
  headers being sent. Previously a hard to understand ``TypeError`` would be
  raised when attempting to write to a session that failed to start.
* ``cake plugin load`` now detects and prevents duplicates.


Contributors to 4.4.12
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Andrii Pukhalevych
* Brad McNaughton
* Brian French
* Chris Hallgren
* Erwane Breton
* Jamison Bryant
* Kevin Pfeifer
* Marc Würth
* Mark Scherer
* Mark Story
* mscherer
* Nicos Panayides

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
