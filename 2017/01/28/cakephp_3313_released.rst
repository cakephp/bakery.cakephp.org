CakePHP 3.3.13 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.13. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.3.13. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.12...3.3.13>`_ for every commit.

* When sending a Client request through a proxy, the URI is now in an absolute form.
* ``Query::update()`` now raises an error when an invalid parameter is passed.
* Mailers are now reset when sending an email raises an exception.
* Improved error messages when associations are missing primary keys.
* ``Validator::multipleOptions`` no longer ignores the ``caseInsensitive``
  option.
* ``HasMany::link()`` now updates all records in a single transaction.
* The ``nestedInput`` option in ``FormHelper::input()`` no longer appears as an
  attribute.
* ``TestCase::assertHtml()`` accepts whitespace before a closing tag.
* Improved API documentation.
* Added support for the parseHuge option in ``Xml::build()``.

Contributors to 3.3.13
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bernat Arlandis
* Ceeram
* Cory Thompson
* Dmitrii Romanov
* Gareth Ellis
* Henrik Gemal
* José Lorenzo Rodríguez
* Marc Würth
* Mark Story
* Ross Chater
* Yves P
* lilHermit
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
