CakePHP 2.8.0 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 2.8.0. This release is the first stable release for the 2.8 branch which adds several new features to the 2.x series.

Deprecations
------------

* The ``action`` option in ``FormHelper::create()`` has been deprecated, as it was in 3.x. Note that this now makes the ``action`` key of an array URL consistently respected for the generation of the DOM ID.  If you used the deprecated key you will want to compare the generated ID for forms before and after your upgrade.

PHP7 Compatibility
------------------

CakePHP 2.8 is compatible with, and tested against PHP7.

New Features
------------

- When handling fatal errors, CakePHP will now adjust the memory limit by 4MB to ensure that the error can be logged correctly. You can disable this behavior by setting ``Error.extraFatalErrorMemory`` to ``0`` in your ``Config/core.php``.
- ``Cache::add()`` has been added. This method lets you add data to a cache if the key did not already exist. This method will work atomically in Memcached, Memcache, APC and Redis. Other cache backends will do non-atomic operations.
- ``CakeTime::listTimezones()`` has been changed to accept array in the last argument. Valid values for the ``$options`` argument are: ``group``, ``abbr``, ``before``, and ``after``.
- A new option ``no-locations`` has been added to ``Console/cake i18n``. When enabled, this option will disable the generation of location references in your POT files.
- ``Hash::sort()`` now supports case-insensitive sorting via the ``ignoreCase`` option.
- Magic finders now support custom finder types. For example if your model implements a ``find('published')`` finder, you can now use ``findPublishedBy`` and ``findPublishedByAuthorId`` functions through the magic method interface.
- The ``Session.cacheLimiter`` configuration option was added. This option lets you define the cache control headers used for the session cookie. The default is ``must-revalidate``.


3.x Backports
=============

- Shell Helpers have been backported from 3.x.
- ``Validation::uploadedFile()`` was backported from 3.x.
- ``'url' => false`` is now supported for ``FormHelper::create()`` to allow form tags to be created without HTML ``action`` attribute.

The documentation for 2.8.0 is already available in the `book <http://book.cakephp.org/2.0/en>`_ and the `API
<http://api.cakephp.org/2.8>`_.

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests. Development will now begin on 2.9.0 with the target of releasing sometime in July of 2016.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

