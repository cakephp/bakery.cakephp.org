CakePHP 2.8.0-RC1 Released
==========================

  The CakePHP core team is happy to announce the immediate availability of CakePHP 2.8.0-RC1. This release is the first release candidate for the 2.8 branch which adds several new features to the 2.x series. We would appreciate any feedback you might have on the new features before their API definitions become stable.

Deprecations
------------

* The ``action`` option in ``FormHelper::create()`` has been deprecated, as it was in 3.x. Note that this now makes the ``action`` key of an array URL consistently respected for the generation of the DOM ID.  If you used the deprecated key you will want to compare the generated ID for the forms before and after your upgrade.

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


3.x Backports
=============

- Shell Helpers have been backported from 3.x.
- ``Validation::uploadedFile()`` was backported from 3.x.
- ``'url' => false`` is now supported for ``FormHelper::create()`` to allow form tags to be created without HTML ``action`` attribute.

Unless there are major issues with the 2.8.0-RC1 release, we will have a stable release packaged in the next 4-5 weeks. The documentation for 2.8.0 is now available in the `book <http://book.cakephp.org/2.0/en>`_ and the `API
<http://api.cakephp.org/2.8>`_.

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
