CakePHP 3.8.2 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.2. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.1...3.8.2>`_ for every commit.

* Added simplexml to requirements of cakephp/utility.
* ``i18n extract`` now supports the ``-p`` option like other core shells.
* Improved API documentation.
* Fixed incorrect association and ``_locale`` property assignment when using
  ``matching()`` with ``TranslateBehavior``.
* The default value for the ``$when`` parameter of
  ``Validation::notEmptyDateTime()`` was corrected.
* ``RedisEngine`` now calls ``setTimeout()`` instead of ``expire()``.
* ``FormHelper`` now correctly generates Javascript snippets to clear custom
  HTML validation messages.
* Fixed an overflow error if ``RequestHandlerComponent`` was loaded multiple
  times with different configuration.

Contributors to 3.8.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bogdan SOOS
* Brandon Kelly
* Edgaras Janušauskas
* Hideki Kinjyo
* Mark Scherer
* Mark Story
* andrii-pukhalevych
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
