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
towards a time-only class.

The name ``DateTime`` was chosen to better represent what it supports. Although there is an existing
``DateTime`` class in PHP, we don't anticipate much user code using both at the same time.
Finding a name that represents a datetime or timestamp value is difficult without using an
obscure metaphor or reference.

To support these efforts, we will provide a Rector config to rename the classes for both CakePHP 4.4
and CakePHP 5.0 changesets.

Reminder: FrozenDate and FrozenTime are immutable
=================================================

When converting existing CakePHP 4 code that uses `Date`` and ``Time``, keep in mind that
``FrozenDate`` and ``FrozenTime`` are immutable. Immutable classes return a new instance when calling
a function that modifies a value.

In most places, a simple rename will be enough to convert and the Rector script will do that. However,
if code is not assigning the new instance to a variable, the modification is lost. Be sure to review
any conversions for missed variable assignments that assume the classes are mutable.

.. note::
    The CakePHP 5 ``Date`` and ``Time`` classes are also immutable. These are simply a renamed
    ``FrozenDate`` and ``FrozenTime``.

.. author:: corey
.. categories:: news
.. tags:: news
