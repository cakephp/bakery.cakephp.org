CakePHP 5.4.0-RC2 Released
============================

The CakePHP core team is happy to announce the second release candidate for
CakePHP 5.4.0. Since the previous release candidate, the following changes have
been made:

- SameSite cookie default values apply to all session presets.
- FormHelper now uses the HTML ``hidden`` attribute for the containing div
  created by ``hiddenBlock``.  The previous inline styles were incompatible with
  strict Content-Security-Policy rules.
- The cache keys used by ``I18n`` are now configurable either with a string or
  callback that creates a prefix to cahe entries enabling per tenant
  translations.
- ``JsonStreamResponse`` was added. This response class provides better memory
  efficiency for streaming JSON responses compatible with generators and
  ``ResultSets``.
- Improved console error handling and help generation on invalid command names.
- ``ConsoleOutput`` no longer attempts to write to closed streams, which caused
  fatal errors.
- Improved EnumLabel extraction by ``i18n extract`` command.
- ``DateTimeType`` accepts date-only Y-m-d strings, and sets the time to
  midnight instead of marking the data invalid.
- Entities from other tables are now rejected during persistence and
  marshalling. This is a safety improvement that prevents mistakes.
- Added a ``Lock`` component that provides an engine based interface for
  building distributed (or single-machine) locks for preventing race conditions
  around multiple processes accessing shared resources.
- Added ``Connection.afterCommit`` event for outermost-commit hooks operations.
- Improved strictness in template path validation, preventing template path
  escapes.
- Added ``LoggedQuery::setRedactor()`` to enable log scrubbing. Applications
  that want to prevent PII leaking into logs can attach scrubbing logic to
  query logging.
- ``CommandCollection::discoverDirectory()`` was added.
- ``BasePlugin`` and ``BaseApplication`` now have an ``eventListeners()`` hook
  method. This method should return an array of global event listeners for your
  plugin or application.
- Added ``Table::findUnhydrated()`` and ``UnhydratedSelectQuery`` for type-safe
  non-hydrated read queries.
- ``MissingRouteException`` now includes the passed parameters of the routes
  that fail for parameter validation checks, making debugging simpler.
- Improved type-hinting in many classes.
- ``RedisEngine`` and ``MemcacheEngine`` support an ``allowedClasses`` option to
  limit the classes that can data can be unserialized into.
- ``Http\Client`` now respects ``curl.cainfo`` as a default value if defined in ``php.ini``.

What's new in 5.4.0
-------------------

The `migration guide
<https://book.cakephp.org/5.next/en/appendices/5-4-migration-guide.html>`_ has
a complete list of what's new in 5.4.0. We recommend you give that page a read
when upgrading as it notes the behavior changes present in 5.4.0.

How you Can Help
----------------

You can help deliver 5.4.0 by contributing in one of many ways:

#. Check the `documentation <https://book.cakephp.org/5.next/en/>`_ for mistakes,
   outdated, unclear or broken examples. We've been trying to update the
   documentation as we go, but there are likely examples or sections we've
   missed.
#. Try it out! Give CakePHP 5.4.0 a test drive. Let us know how upgrading
   went and if there were any rough spots.
#. File issues for regressions in existing features, or suggest new features.
   Even if those features don't make it into 5.4.0, we're early in the process
   of planning 5.5 and 6.0 and value community feedback.

Contributors to 5.4.0-RC2
-------------------------

Thank you to all the contributors that have contributed to this release:

- Abdul Malik Ikhsan
- ADmad
- gillux
- Jamison Bryant
- Juan Pablo Ramirez
- Kevin Pfeifer
- Mark Scherer
- Mark Story
- Nicos Panayides
- othercorey
- Stuart
- XananasX

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
