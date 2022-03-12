Date and Time Mutability and Renaming
=====================================

The upcoming CakePHP 4.4 release includes the first of a series of changes that affect
all users of CakePHP's i18n datetime classes. In the end, CakePHP will support immutable
classes only with more consistent names that allow for time-only variations.

Let's begin with the changes in CakePHP 4.4:

* The mutable class ``Cake\I18n\Date`` is deprecated in favor of ``Cake\I18n\FrozenDate``.
* The mutable class ``Cake\I18n\Time`` is deprecated in favor of ``Cake\I18n\FrozenTime``.

With these deprecations, users are expected to plan for immutable classes only by the time
CakePHP 5 is released. The CakePHP 5 release will contain several breaking changes:

* The deprecated `Cake\I18n\Date` and `Cake\I18n\Time` compatibility aliases will be dropped.
* ``Cake\I18n\FrozenDate`` wlll be renamed to ``Cake\I18n\Date``.
* ``Cake\I18n\FrozenTime`` will be renamed to ``Cake\I18n\DateTime``.

These changes drop the mutable classes entirely. However, instead of just dropping the
previously deprecated classes, this effectively includes a rename. We are making this sligtly
awkward change at the same time to clear up our naming convention as well as provide a path
towards a time-only, i18n class. Having a ``Time`` and ``TimeOnly`` class together would
not be great for users.

The name ``DateTime`` was chosen to line up with PHP's class names as well as better represent
what it supports. Since we are renaming the classes, dropping the awkward ``Frozen`` prefix
made sense. Unfortunately, this could be confusing for users who are jumping from earlier CakePHP 4
releases to CakePHP 5 or a double-effort for users following deprecations with each point release.

To support these efforts, we will provide a Rector config to rename the classes for both CakePHP 4.4
and CakePHP 5.0 changesets.

.. author:: corey
.. categories:: news
.. tags:: news
