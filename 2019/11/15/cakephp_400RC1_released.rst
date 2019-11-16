CakePHP 4.0.0-RC1 Released
==========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.0-RC1. This is the first release candidate for 4.0.0, and contains all the
major features that are planned for 4.0.0. If no major issues are reported
a stable release will be packaged in a few weeks.

Updating to the RC
------------------

You can use composer to upgrade to the beta version of CakePHP 4.0.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:4.0.0-RC1"

We would greatly appreciate it if you temporarily upgraded your application, and
ran your tests. By opening issues for any regressions in the release candidate,
we can help ensure a smoother release of 4.0.0 before the stable release.

What's new in 4.0.0?
--------------------

The `migration guide
<https://book.cakephp.org/4/en/appendices/4-0-migration-guide.html>`_ has
a complete list of what's new in 4.0.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes since 4.0.0-beta4
-------------------------

* A new compact route ``_path`` format has been added to ``Router::url()``. This
  new format accepts the same ``Controller::action`` format that route
  definition can use.
* The ``http`` and ``console`` libraries have had standalone packages created.
* Development error pages now preserve inline code highlighting and newlines in
  exception messages.
* ``SecurityComponent`` is now deprecated, and replaced by the
  ``FormProtectionComponent``.
* The ``ConsoleErrorHandler`` was moved to the ``Error`` package.
* ``Validation::time()`` now accepts microseconds.
* ``SameSite`` cookie support was added for PHP>7.3.0
* New database types for ``char``, ``datetimefractional`` and
  ``timestampfractional`` were added. The new datetime types allow
  representation of time values including microseconds.
* ``InstanceConfigTrait::getConfigOrFail()`` was added.
* New ``isLinkedTo`` and ``isNotLinkedTo`` rules were added to
  ``ORM\RulesChecker``.
* ``Date`` and ``FrozenDate`` objects now use the default timezone instead of
  UTC. This fixes problems where 'today' would not always be today depending on
  your distance from UTC.
* Controller action dispatching was refactored to make adding a DI container in
  the future easier.
* Routing prefixes are now PascalCased instead of under_scored. This removes
  some inflection and normalizes the representation of prefixes.


Contributors to 4.0.0-RC1
---------------------------

We'd like to welcome `othercorey <https://github.com/othercorey>`__ to the core
team. They have been contributed a number of documentation improvements and
driven multiple improvements around how CakePHP handles microseconds across both
CakePHP and Chronos.

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Jorge González
* Karma Dice
* Mark Scherer
* Mark Story
* dan
* itosho
* ndm2
* othercorey
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
