CakePHP 5.4.0-RC1 Released
============================

The CakePHP core team is happy to announce the first release candidate for
CakePHP 5.4.0. The 5.4 release includes several behavior changes to increase
correctness and new features. The highlights of those include:


What's new in 5.4.0
-------------------

The `migration guide
<https://book.cakephp.org/5.next/en/appendices/5-4-migration-guide.html>`_ has
a complete list of what's new in 5.4.0. We recommend you give that page a read
when upgrading as it notes the behavior changes present in 5.4.0.

- The default eager loading strategy for ``HasMany`` and ``BelongsToMany`` associations
  has changed from ``select`` to ``subquery``. If you need the previous behavior,
  explicitly set ``'strategy' => 'select'`` when defining associations.
- ``Model.afterSaveCommit`` and ``Model.afterDeleteCommit`` events are now fired
  when ``save()`` or ``delete()`` is called inside an outer transaction.
- ``Collection`` had ``keys()``, ``values()``, ``implode()``, ``when()`` and
  ``unless()`` methods added.
- Commands now have ``$this->io`` and ``$this->args`` set by CakePHP. This will
  become the default in 6.0, and ``execute()`` will no longer receive io & args
  parameters.
- Database queries now support ``notBetween()``, ``inOrNull()``,
  ``notInOrNull()``, ``isDistinctFrom()``, ``isNotDistinctFrom()``,
  ``except()``, ``exceptAll()``, and ``stringAgg()`` operators/functions added.
- Support for ``brin``, ``hash``, ``gin``, and ``spgist`` indexes for postgres
  was added.
- ``TestCase::mockModel()`` has been added to enable mocking of table classes
  using Mockery.
- New filesystem utilities were added for fluent file discovery with pattern
  matching, and cross-platform path manipulation was added.
- ``Security::encrypt()`` can now be configured to use longer keys with separate
  encryption and authentication keys that are derived from the provided key.
- Added ``Text::mask()`` method which masks a portion of a string with
  a repeated character.

How you Can Help
----------------

You can help deliver 5.4.0 by contributing in one of many ways:

#. Check the `documentation <https://book.cakephp.org/5.next/en/>`_ for mistakes,
   outdated, unclear or broken examples. We've been trying to update the
   documentation as we go, but there are likely examples or sections we've
   missed.
#. Try it out! Give CakePHP 5.4.0 a test drive. Let us know how upgrading
   went and if there were any rough spots.
#. File issues for regressions in existing features, or suggest new features.
   Even if those features don't make it into 5.4.0, we're early in the process
   of planning 5.5 and 6.0 and value community feedback.

Contributors to 5.4.0-RC1
-------------------------

Thank you to all the contributors that have contributed to this release:

- ADmad
- Application-drop-up
- celsowm
- Jamison Bryant
- Jasper Smet
- Joachim Rey
- Kevin Pfeifer
- Mallik Hassan
- Mark Scherer
- Mark Story
- Masatoshi Ogiwara
- othercorey

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
