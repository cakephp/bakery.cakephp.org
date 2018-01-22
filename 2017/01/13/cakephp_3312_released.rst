CakePHP 3.3.12 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.12. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.12. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.11...3.3.12>`_ for every commit.

* HasMany Associations and a replace save strategy and conditions work more often
  now as table aliases are stripped from generated conditions.
* ``TextHelper::autoLinkUrls()`` now links more URLs correctly.
* Postgres schema reflection now extracts precision and scale from ``NUMERIC``
  and ``DECIMAL`` columns.
* Headers set with ``setHeader()`` now overwrite those in ``$_SERVER`` when
  requests are transformed into CakePHP requests.
* Table output in CLI tools now correctly handles empty strings when calculating
  widths.
* ``Hash::maxDimensions()`` correctly calculates dimensions when the first
  element is ``false``.
* A plural message was used with ``__()`` an array would be returned which
  is never right.
* When an unknown context is used the ``__x()`` method fails.
* Datetime validation no longer emits errors when non-datetime objects are
  passed in.

New Features
------------

The 3.3.12 introduces a few new features:

* CLI commands can now accept an argument multiple times by setting the
  ``multiple`` option on an argument.
* The ``ignoreDirty`` option was added to ``CounterCacheBehavior`` which enables
  ignoring counter cache fields from being updated.
* Add ``dd()`` as quick alternative for ``debug(); die();``.

Contributors to 3.3.12
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Christian Winther
* DaVinciEngineer
* José Lorenzo Rodríguez
* Koen Brouwer
* Mark Scherer
* Mark Story
* Mathew Foscarini
* Michael Hoffmann
* Michael Underwood
* Robert Pustułka
* Yves P
* ndm2
* yutmr

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

