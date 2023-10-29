CakePHP 5.0.1
=============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.0.1. This is a maintenance release for the 5.0 branch that fixes several
community reported issues and a minor security related fix.

Bugfixes
--------

You can expect the following changes in 5.0.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.0.0...5.0.1>`_ for every commit.

* Allow ``FormProtection`` component to have its session id source customized in
  subclasses.
* Fixed potential email address manipulation if unvalided address data was set
  into ``Cake\Mailer\Message``. Thank you to Waldemar Bartikowski who reported
  the issue via our security mailing list.
* Fixed errors arising from plugin helpers being loaded within other plugin
  helpers, when the parent helper is loaded without a plugin scope.
* ``PaginatedResultSet`` is now ``JsonSerializable``.
* Replaced usage of ``include_once`` when ``Application`` loads plugin
  configuration.
* Fixed broken links in API documentation links to MDN.
* ``View::getConfig()`` is now public.
* ``ORM\Marshaller::one()`` now uses ``newEmptyEntity()`` improving
  compatibility with subclass implementations.
* Adding methods with ``getMockForModel()`` is deprecated because of changes in
  PHPUnit.
* Fixed ``Cake\Http\Client`` cookie parsing with invalid values that lack both
  a value and ``=`` delimiter.
* ``Collection\SortIterator`` is now compatible with ``Chronos`` types.
* Fixed source line attribution in the ``dd()`` method.
* Fixed ``defaults`` being mutated in ``DashedRoute`` and ``InflectedRoute``
  after ``match()`` is called.


Contributors to 5.0.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Jorge González
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* andrii-pukhalevych
* breno
* othercorey
* wowDAS Markus Ramšak

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
