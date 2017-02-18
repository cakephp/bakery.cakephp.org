CakePHP 3.4.1 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.1. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.0...3.4.1>`_ for every commit.

* ``CounterCacheBehavior`` had an ``ignoreCounterCache`` option added, allowing
  you to disable counter updates on save.
* ``Table::saveOrFail()`` and ``Table::deleteOrFail()`` were added. These
  methods allow you to perform save/delete operations that raise exceptions on
  failure instead of returning false.
* Support for PHPUnit 6 was added. Currently only composer based installation of
  PHPUnit 6 is supported.
* ``Helper::getView()`` was added.
* Urlencoded URLs are once again matched correctly.
* InflectedRoute routes using HTTP method conditions work again.
* Association duplicate alias detection is more relaxed and accepts sub-classes.
* ``Mailer\Email`` no longer waits until the socket timeout when an SMTP server
  disconnects early.
* ``BelongsToMany::foreignKey()`` no longer incorrectly returns ``$this`` when
  modifying the key.
* Strings that contain only whitespace are now correctly output by ``debug()``.

Contributors to 3.4.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Eric Büttner
* Florian Krämer
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Michael
* Michael Hoffmann
* Oxicode
* Paolo Cuffiani
* Robert Pustułka
* Walther Lalk
* antograssiot
* chinpei215
* inoas

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
