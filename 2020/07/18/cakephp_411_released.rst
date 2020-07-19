CakePHP 4.1.1 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.1.1. This is a maintenance release for the 4.1 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.1.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.1.0...4.1.1>`_ for every commit.

* ``FlashComponent::set()`` now handles ``Throwable`` in addition to
  ``Exception``.
* ``debug()`` now can output objects like ``SplFixedArray`` that have integer
  property names.
* ``Validation::date()`` no longer accepts values that have ``,`` after the
  month value.
* Assets in vendor prefixed plugins now are correctly timestampped by
  ``HtmlHelper``.
* Routing error pages no longer double encode HTML for route elements and
  options.
* Fix incorrect aliasing for ``Cake\Database\Expression\ComparisonExpression``
  that was causing a regression in application/plugin code.
* Improved compatibility in ``getMockForModel()``.
* The parsed results of DSN strings now cast ``timeout`` to an integer.
* ``CsrfProtectionMiddleware`` not raises an exception when the request already
  contains a ``csrfToken`` attributes as this implies that CSRF has already been
  applied to the request and applying it twice is a configuration error.

Contributors to 4.1.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Cauan Cabral
* Corey Taylor
* Gerd Katzenbeisser
* Mark Scherer
* Mark Story
* mitzzzjp
* Peter Härder

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
