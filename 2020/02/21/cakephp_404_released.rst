CakePHP 4.0.4 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.4. This is a maintenance release for the 4.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.0.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.0.3...4.0.4>`_ for every commit.

* ``Http\Response::$_contentType`` was removed as it was often wrong and out of
  sync with the ``getHeader('Content-Type')`` value.
* ``NumberHelper::precision()`` had the ``$options`` parameter added so it can
  better wrap ``Number::precision()``.
* Add ``timestamptimezone`` mapping to ``FormHelper`` and ``DateTimeWidget``.
* ``IntegrationTestCaseTrait`` once again raises exceptions when
  ``disableErrorHandlerMiddleware()`` is used.
* ``datetime-local`` values are rendered with milliseconds by ``DateTimeWidget``
  only when step size is less than 1.
* Improved API documentation.
* Improved missing template exception messages. They now list out the full path
  of every attempted file.
* ``CounterCacheBehavior`` no longer attempts to update values when the foreign
  key is null.
* Loading optional associations with ``leftJoinWith()`` and ``contain()`` no
  longer raises an exception about missing association data.
* ``TextHelper::autoParagraph()`` now accepts ``null``.
* ``HtmlHelper::para()`` now accepts ``null``.
* ``Validation::decimal()`` now handles Polish formatted numbers correctly.
* ``HasMany`` associations now set invalid messages and errors on the parent
  entity when non-atomic saves fail.
* Improved missing database exception message.
* Logged fatal errors now include the file and line position.

Contributors to 4.0.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Justin Slamka
* Mark Scherer
* Mark Story
* Michal
* Rachman Chavik
* Remi Collet
* Victor Eduardo de Assis

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
