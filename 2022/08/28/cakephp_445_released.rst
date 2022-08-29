CakePHP 4.4.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.5. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.4...4.4.5>`_ for every commit.

* Improved handling of authentication errors in Smtp email transport.
* Re-enabled displaying arguments in stack frames on development error pages.
* Improved API documentation.
* Fixed ``diffForHumans()`` not translating text based on the current locale.
* The ``ValidatableInterface`` is now deprecated.
* Fixed mocking services in tests with ``mockService()`` for services that are
  provided by reflection based container delegates.

Contributors to 4.4.5
----------------------

* ADmad
* celsowm
* Chris Nizzardini
* Iacovos Constantinou
* Marcelo Rocha
* Mark Scherer
* Mark Story
* othercorey

Thank you to all the contributors that helped make this release happen:

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
