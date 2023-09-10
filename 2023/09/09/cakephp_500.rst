CakePHP 5.0.0 Released
======================

The CakePHP team is thrilled to announce the immediate availability of 5.0.0.
This is release begins a new chapter for CakePHP as 5.0 is now stable. 5.0.0 has
been in development for the past two years, adding many new features and
performance improvements. It also contains breaking changes as features and
behavior deprecated in 4.x have been removed.

Key Features
------------

* PHP 8.1 required.
* Improved typehints across the framework. CakePHP now leverages union types
  to formalize the types of many parameters across the framework.
* Upgraded to PHPUnit 10.x
* New enum type mapping support in the ORM enabling more expressive model layers
  with improved type checking.
* Table finders with named parameters, providing more expressive query building
  APIs.
* Added time-only `Time`` type and greatly improved ``Date`` and ``DateTime`` support via chronos 3.x.
* Support for PSR17 HTTP factories was added.

To find out more about what is new and changed in 5.0 refer to the `migration guide
<https://book.cakephp.org/5/en/appendices/5-0-migration-guide.html>`__.


Upgrading to 5.0
----------------

5.0 contains a number of breaking changes. If you have an existing application,
we'll be releasing 4.5.0 in the upcoming weeks. This release will contain many
of the features present in 5.0, and will also contain deprecations for many of
the breaking changes in 5.0 that do not already have deprecations. Once 4.5.0 is
released we recommend that you upgrade to that release first. Then, once you
have addressed all of the deprecations in 4.5.0 you will have a much easier time
upgrading to 5.0.0.

To help with your upgrade from 4.x to 5.x the core team has prepared both
a `migration guide
<https://book.cakephp.org/5/en/appendices/5-0-migration-guide.html>`__ covering
the deprecated, removed and new features. 

Additionally, the core team has also prepared an `upgrade guide
<https://book.cakephp.org/5/en/appendices/5-0-migration-guide.html>`__ which
provides a step-by-step guide and CLI tooling to help you upgrade your
application.

Contributors to 5.0.0
---------------------

CakePHP 5.0 is the result of two years of work and contributions from the
following community members:

* ADmad
* Alejandro Ibarra
* Andrii Pukhalevych
* Brian French
* chris cnizzardini
* Chris Nizzardini
* fabian-mcfly
* Jaro Varga
* J.Brabec
* Jose Daian
* Jozef Grencik
* Kevin Pfeifer
* leon.schaub
* Marcelo Rocha
* Marc Würth
* Mark Scherer
* Mark Story
* Matthias Wirtz
* ndm2
* Oliver Nowak
* othercorey
* Roland Waldner
* saeideng

Thank you for all you've done to make CakePHP 5.0.0 a reality.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
