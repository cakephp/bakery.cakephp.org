CakePHP 3.0.14 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.0.14. This is a maintenance release for the 3.0 branch that fixes bugs and
includes small enhancements. Other than security fixes, this will be the last
scheduled release for 3.0.x as 3.1.0 was released last week.

Bugfixes
--------

You can expect the following changes in 3.0.14. See the `changelog
<https://cakephp.org/changelogs/3.0.14>`_ for every commit.

- I18n shell no longer outputs both merged and separate domain pot files when
  ``--merge`` is used.
- StringTemplates convert 1 dimensional array values into strings. This fixes
  'array to string conversion' errors when arrays are formatted into templates.
- Option groups created by FormHelper can now have integer values.
- Json view selection now reliably works with the Accept header when the json
  extension has not been enabled.
- Postgres adapter correctly reflects schema for ``TIME WITHOUT TIMEZONE`` now.
- FormHelper now correctly sets the required attribute for boolean columns in
  associations.
- The ``BetweenExpression`` now accepts expression objects in each of its
  conditions.
- ``Query::__debugInfo()`` and ``Table::__debugInfo()`` no longer raise fatal
  errors if they are invoked before object construction is complete.

Enhancements
------------

- ``Cache::registry()`` was added. This method is useful for replacing the cache
  backend registry in testing.
- Improved API documentation.
- UUID fields now marshal '' as ``null``.
- TreeBehavior::recover() now supports a ``recoverSort`` option for defining how
  a tree should be sorted before recovery.
- The ``jsonapi`` type had its mime type added to Response.
- MySQL adapter supports ``CURRENT_TIMESTAMP`` default value in datetime
  columns.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
