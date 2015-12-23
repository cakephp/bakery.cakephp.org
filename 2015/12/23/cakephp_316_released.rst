CakePHP 3.1.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.1.6. This is a maintenance release for the 3.1 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.1.6. See the `changelog <http://cakephp.org/changelogs/3.1.6>`_ for every commit.

* The ``Auth.afterIdentify`` event is now triggered for stateless
  authentication.
* ``Query::offset()`` now marks a query as modified.
* Calling ``find()`` on a BelongsToMany association now joins the junction
  table. This allows association conditions to be applied to queries.
* Redis DSN parsing was fixed.
* ``FormContext::errors()`` now handles nested validation errors.
* The ``existsIn()`` rule now uses an association's ``bindingKey`` option.
* ``requestAction()`` now passes cookies to the sub-request as documented.
* ``FormHelper`` now treats string integer values as UTC timestamps. This mirrors how
  it handles integer values.
* ``FormHelper`` now correctly generates name attributes for dot pathed field
  names that end in ``[]``.
* A memory leak in ``ORM\ResultSet`` has been fixed.
* ``DashedRoute`` now correctly handles vendor prefixed plugin names.
* CORS domain handling is more robust and less permissive.
* Postgres index reflection is more robust and can handle complex index
  definitions.
* Postgres schema reflection more accurately defines SERIAL columns.
* Pagination of complex queries using expressions in their ORDER clause no
  longer fail.
* ``File`` can now open ``file://`` paths on windows.
* ``bin/cake i18n init`` now preserves the locale case.

Minor Enhancements
------------------

* Session configuration now better handles environments where runtime
  modification of session configuration is not allowed.
* The ``phpdbg`` SAPI is treated the same as CLI.
* CompletionShell suggests task and shell names based on short forms. It can
  also suggest option names for subcommands and tasks now.
* Compatibility with PHPUnit 5 was improved.
* ``Query::removeJoin()`` was added. This method can be used to remove joins
  from a query by join alias.
* ``View::reset()`` was added. This method lets you reset the contents of a view
  block.

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

