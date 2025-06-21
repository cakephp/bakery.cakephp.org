CakePHP 5.2.5
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.5. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 5.2.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.4...5.2.5>`_ for every commit.

* Fixed `routes generate` not working with names containing ``:``.
* Improved API documentation.
* Fixed ``LoggedQuery`` from applying undefined attributes and emitting
  warnings.
* If ``Session.timeout`` is not defined, PHP defined ``session.gc_maxlifetime``
  will be used as the lifetime of the session. This better aligns timeouts with
  simpler settings.
* Improved data provider usage in test cases.
* Fixed session assertions when ``enableRetaionFlashMessages()`` has been used.
* Events that are triggered with a null subject do not emit deprecation
  warnings.
* Fixed chained ``find()`` calls with overlapping parameters getting incorrect
  values.
* Improve ``toDateTime()`` to not return null when passed ``Date``.
* Fixed invalid stream constructor when ``RunInSeparateProcess`` is used.
* Update plural rules for French, Italian, Spanish and Portuguese based on CLDR
  v47. These languages have support for additional plural forms.

Contributors to 5.2.5
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Corey Taylor
* Erik Nagelkerke
* Ishan Vyas
* Jeremy Harris
* Kevin Pfeifer
* k-pon-jp
* Mark Scherer
* Mark Story
* Nicos Panayides
* othercorey

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
