CakePHP 5.0.2
=============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.0.2. This is a maintenance release for the 5.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.0.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.0.1...5.0.2>`_ for every commit.

* Fixed links between API docs and book.
* ``TranslateBehavior`` now allows using ``_translations.{locale}.field_name``
  style naming for default locale.
* ``LoggedQuery::getContext()`` now includes the query that was emitted.
* Fixed recursion errors when entities have cyclic references and ``getErrors()``
  or ``hasErrors()`` is called.
* ``ControllerFactory`` no longer raises errors when it encounters a type it
  cannot cast into (like unions). Instead the framework relies on PHP to
  validate the parameter types.
* ``Collection::combine()`` now raises an error should a path result in a null
  value for the key.
* Relaxed constraint on ``psr/simple-cache``, ``psr/container`` and
  ``psr/http-message``.
* Invalid enum values are no longer cast to null when an invalid string value is
  marshalled into the PHP value.
* Improved compatibility between enum values and ``FormHelper``.
* Improved compatibility between ``DateTimeWidget`` and ``ChronosTime``.
* Improved SQLite mapping of ``uuid`` abstract type. It now maps to
  ``UUID_TEXT``.
* ``TimeType::getClassName()`` was added. This method was missed in 5.0.0

Contributors to 5.0.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Jèfferson Gonçalves
* Jorge González
* Kevin Pfeifer
* Lars Ebert
* Mark Scherer
* Mark Story
* Mark Watney
* Michael Hoffmann
* othercorey
* salehhashemi1992
* wowDAS Markus Ramšak

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
