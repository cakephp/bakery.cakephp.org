CakePHP 5.0.5
=============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.0.5. This is a maintenance release for the 5.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.0.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.0.4...5.0.5>`_ for every commit.

- Fixed dirty state tracking for entities that use ``TranslateBehavior`` and use
  ``ResultSet`` methods to mutate records.
- Improved marshalling nullable enum values from strings.
- Shifted the logic for getting view variables to serialize into
  ``SerializedView::serializeKeys()`` so it is easier to override.
- Improved session gc time when server side idle timeouts are disabled. PHP
  defaults are now used, and you can configure this with application
  configuration as well.
- ``CollectionTrait::combine()`` is now compatible with enum keys.
- Fixed an array to string warning in ``EventFiredWith`` constraints.
- Improve API documentation.
- Reduce potential for ``empty`` cloaking throrugh refactoring.
- Fixed a regression with converting ``Date`` objects passed into ``datetime``
  columns via the ORM into query parameters.
- Fixed type error in ``IntegrationTestTrait`` when adding tokens to requests.

Contributors to 5.0.4
----------------------

Thank you to all the contributors that helped make this release happen:

* Adam Halfar
* ADmad
* dependabot[bot]
* fabian-mcfly
* Ishan Vyas
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
