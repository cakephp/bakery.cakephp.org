CakePHP 5.0.3
=============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.0.3. This is a maintenance release for the 5.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.0.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.0.2...5.0.3>`_ for every commit.

* Update path to ``plugin_class_error.php``.
* Added deprecation to passing query options as paginator settings. Usage such
  as ``$paginator->paginate($table, [], ['fields' => ['title']]);`` will now
  emit deprecation warnings. This behavior will not be supported in 6.0.
* Expanded enum support to include providing a label. Implementing
  ``Cake\Database\Type\EnumLabelInterface`` in your enum class will allow you to
  provide a user facing label. Labels are used by ``FormHelper`` when generating
  controls.
* Improved validation support for enums.
* Widened type of ``$format`` in ``TimeHelper::format()``.
* Support for PHP 8.3
* Fixed significant performance regression in intl date and datetime formatting. Serializing
  dates and datetimes now cache intl formatters restoring performance to 4.x
  levels.
* Improved support for ``binaryuuid`` type across database platforms.
* Improved readability of missing route pages by collapsing the route list by
  default.
* Improve support for indexes on generated columns in SQLite.
* Improved internal tooling for maintaining consistency in split packages.

Contributors to 5.0.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Kevin Pfeifer
* kolorafa
* Marcelo Rocha
* Mark Scherer
* Mark Story
* Mauro Brandoni
* ndm2
* Oliver Nowak
* othercorey
* Umer Salman
* wowDAS Markus Ramšak

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
