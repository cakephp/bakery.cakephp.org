CakePHP 4.2.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.7. This is a maintenance release for the 4.2 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.2.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.2.6...4.2.7>`_ for every commit.

* Improved error messages for form protection failures.
* Fixed tuple comparisons dropping their parameter binding types which improves
  subquery generation and marshalling ``_ids`` with composite primary keys.
* Improved API documentation.
* ``I18n\Number`` no longer emits errors in PHP8 when invalid data is formatted.
* Fixed OAuth1 signature comparison failures when consumer keys contain base64
  encoded data.
* Reduced output from ``debug()`` when objects implement ``__debugInfo()``. Now
  only the data from ``__debugInfo()`` is exported instead of debug data and all
  properties which often led to duplicate output.
* Fixed failing console output assertion when output contained a ``%s``
  placeholder.

Contributors to 4.2.7
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Hache_raw
* Mark Scherer
* Mark Story
* Michael Hoffmann
* Rytis Slatkevičius
* fugaco
* ndm2
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
