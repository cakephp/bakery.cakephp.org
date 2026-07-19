CakePHP 5.4.0 Released
======================

The CakePHP core team is happy to announce the release of CakePHP 5.4.0. With
the release of 5.4.0, the 5.1 will no longer receive security fixes. 5.2 will
continue to receive security fixes until the release of 5.5.

What's new in 5.4.0
-------------------

Some highlights of the 5.4.0 release include:

- A backwards compatible container implementation has been added to CakePHP.
- New methods on ``Collection`` for working with keys, values, conditional
  method chaining, and imploding to a string.
- New ``Lock`` package for working with distributed locks.
- Commands now have ``$this->io`` and ``$this->args`` as properties.
- ``ConsoleHelpHeaderProviderInterface`` lets commands customize help output
  header messages.
- The ``#[RequestToDto]`` attribute enables automatic mapping of request data to
  Data Transfer Objects.
- Added ``JsonStreamResponse`` for more memory efficient streaming of large JSON
  responses.
- Added several new expression builders for null-safe comparisons, and aggregations.
- Added ``Connection::afterCommit()`` to register callbacks that run after the
  outermost transaction commits.
- Additional postgres index metadata reflection and generation support was
  added.
- ``LoggedQuery::setRedactor()`` was added to scrub sensitive data from query
  logs.
- Added a PSR-13 Link header implementation.
- ``Number::toReadableSizes()`` now defaults binary units (KiB = 1024 bytes)
  with ``setUseIecUnits()``.
- ``I18n::setCacheConfig()`` lets you rename the ``_cake_transalations_`` cache
  profile.
- ``cake i18 extract`` now extracts labels added with the ``#[Label]`` attribute.
- The ``associated`` option in ``newEntity()`` and ``patchEntity()`` supports
  the nested array format used by ``contain()``.
- ``TestCase::mockModel()`` enables mocking of model classes with Mockery.
- Added new ``Utility\Fs`` classes for scanning and pattern based discovery of directory trees.
- ``Security::encrypt()`` now supports longer keys with separate encryption and
  authentication keys.
- ``Text::mask()`` and ``Text::maskValue()`` were added.
- ``FormHelper::enumOptions()`` was added to make generating form inputs from
  enums easier.
- The default eager loading strategy for ``HasMany`` and ``BelongsToMany``
  associations was changed from ``select to subquery``.
- Table methods for patching, saving, deleting and loading entities now check
  entity class types and reject mismatched entities.
- ``FormHelper`` now wraps hidden form blocks used for CSRF and tampering
  prevention with ``hidden`` attributes instead of inline styles.
- ``Application::events()`` and ``Plugin::events()`` are now called consistently
  in both web and CLI contexts, and can use DI container services.

The `migration guide
<https://book.cakephp.org/5/en/appendices/5-4-migration-guide.html>`_ has
a complete list of what's new in 5.4.0. We recommend you give that page a read
when upgrading as it notes the behavior changes present in 5.4.0.

Contributors to 5.4.0
---------------------

Thank you to all the contributors that have contributed to this release:

* Abdul Malik Ikhsan
* ADmad
* celsowm
* gillux
* Graham Watson
* Jamison Bryant
* Jasper Smet
* Joachim Rey
* Kevin Pfeifer
* Mallik Hassan
* Mark Scherer
* Mark Story
* Nicos Panayides
* othercorey

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
