CakePHP 3.4.10 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.10. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.9...3.4.10>`_ for every commit.

* Sessions now work with trans_sid enabled.
* Inspecting queries with Xdebug no longer causes ``lastInsertId()`` to return
  the incorrect results.
* Validation error messages when Email addresses are invalid are more helpful
  now.
* FormHelper can now read values from entity properties that implement
  ``ArrayAccess``.
* ``ConsoleIo::overwrite()`` can now overwrite long content with shorter content
  correctly.
* Several compatibility issues with PHP 7.2 were fixed.
* Digest Authentication can now compare the digest hash even when the field is
  hidden in the entity.
* Associations contained in ``beforeFind`` events are now retained on cloned
  queries.
* MO file parsing correctly handles ``Plural-Forms: nplurals=1; plural=0;``.
* ``Http\Client`` now handles redirects instead of the Stream adapter handling
  them. This resolves an issue where cookies sent in intermediary responses were
  not being forwarded in subsequent requests.
* The validation package no longer has a hard dependency on cakephp/i18n.

Contributors to 3.4.10
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Cees-Jan Kiewiet
* Clemens Weiß
* Daniel Opitz
* José Lorenzo Rodríguez
* Mark Story
* Michael Hoffmann
* Mike Fellows
* Robert Pustułka
* nojimage

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
