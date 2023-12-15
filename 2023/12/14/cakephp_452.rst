CakePHP 4.5.2
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.5.2. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.5.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.5.1...4.5.2>`_ for every commit.

* Fix regression in plugin translation file loading order.
* Marshalling Date values no longer sets a timezone.
* Fix inconsistency between ``Error.beforeRender`` and
  ``Exception.beforeRender``. You can now stop this event to prevent output
  being rendered, or set your own result to bypass the default renderer just
  like error handling.
* Added more deprecation annotations for easier upgrading to 5.x.
* Fix off by one errors in ``dd()``.


Contributors to 4.5.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Jens Mischer
* Kevin Pfeifer
* Marc de Lima Lucio
* Marc Würth
* Mark Scherer
* Mark Story
* othercorey
* Robert Pustułka

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
