CakePHP 4.0.3 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.3. This is a maintenance release for the 4.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.0.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.0.2...4.0.3>`_ for every commit.

* Fixed password hashing being skipped when password field was null. This
  prevents a potential timing sidechannel should an application store users with
  ``null`` passwords.
* ``i18n extract`` now skips writing files if no strings have changed.
* If identifier quoting is disabled, queries will no longer have column aliases
  quoted. This helps improve performance of the ORM. Postgres still quotes
  aliases to prevent alias casing issues.
* ``FormProtectionComponent`` no longer fails validation when PSR7 file upload
  objects are used.
* Year widgets created with ``FormHelper`` now accept ``DateTime`` instances as
  their value.
* Improved error message copying from exception pages.

Contributors to 4.0.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Ian den Hartog
* José Lorenzo Rodríguez
* Marc Würth
* Mark Scherer
* Mark Story
* Michael Hoffmann

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
