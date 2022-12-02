CakePHP 4.4.8 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.8. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.7...4.4.8>`_ for every commit.

* Aligned ``ServerRequest::scheme()`` and ``Uri::getScheme()`` on how they
  handle proxy headers.
* Improve compatibility of old ``PaginatorInterface`` alias.
* Fixed infinite loop when a table class was created without a name or table,
  and ``getAlias()`` is called on it.
* Improve ``assertMailSentWith`` comparisons with array values.
* Fixed ``sortDefault`` and ``directionDefault`` not working with multiple
  pagination.
* Improved typehints and API docs.

Contributors to 4.4.8
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Marc Würth
* Mark Story
* Matthias Wirtz
* othercorey
* TerryKern

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
