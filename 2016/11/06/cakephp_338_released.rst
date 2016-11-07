CakePHP 3.3.8 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.8. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.7...3.3.8>`_ for every commit.

* You can now enable callbacks on components used by components by setting the
  ``enabled`` option to true.
* ``formatResults`` callbacks attached to BelongsToMany Associations now fire as
  they should.
* ``ResponseEmitter`` no longer calls a missing method on ``Log``.
* ``TranslateBehavior`` no longer creates translation records for the default
  loacle. This was a regression introduced in 3.3.7.
* Fixed column SQL generation nullable column with default values.
* Options passed to ``Table::validateUnique()`` are now passed to the generated
  rule object.
* Improved API documentation.

Contributors to 3.3.8
---------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Ceeram
* Hugh Downer
* Jeremy Harris
* José Lorenzo Rodríguez
* Marc Würth
* Mark Story
* Mathew Foscarini
* dereuromark

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
