CakePHP 4.2.10 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.10. This is a maintenance release for the 4.2 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.2.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.2.9...4.2.10>`_ for every commit.

* Fix a ``TypeError`` in ``CsrfProtectionMiddleware`` when invalid data was
  provided.
* Fixed ``MailContains`` constraint from escaping patterns multiple times.
* Improved API documentation.
* Added workaround for breaking change in PHPUnit 9.5.10.
* Fixed incorrect SQL being generated when a HasMany association has a null
  value, and the association has ``cascadeCallbacks``.
* Fix ``DateType`` not clearing time values for ``DateTimeImmutable``. This
  scenario can arise when using the ``cakephp/orm`` package directly.
* Limit clauses are ignored if no order exists when using a subquery strategy
  for HasMany associations.

Contributors to 4.2.10
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Julian Pollmann
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* Rolf Kaiser

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
