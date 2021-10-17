IsUnique Rule Changes Explained
===============================

If you have unique indexes on nullable columns, you've probably noticed some confusing
changes to the ``IsUnique`` application rule in CakePHP 4.

In CakePHP 3, ``IsUnique`` has an option named ``allowMultipleNulls`` that defaults to ``true``.
This option controls whether ``NULL`` values are considered unique. If they are unique then
the rule returns true when any field contains a ``NULL`` value.

When CakePHP 4 was released, the ``allowMultipleNulls`` option was removed due to a miscommuncation.
This caused ``IsUnique`` to fail if a row matched the fields including ``NULL`` values.

However, this issue was caught and the option reintroduced in CakePHP 4.2 with a differnet implementation.
Due to backwards compatible rules for releasese, the default was set to ``false`` because CakePHP 4.0 did
not include it.

Baking ``allowMultipleNulls`` in Application Rules
--------------------------------------------------

Bake 2.6 will automatically add the ``allowMultipleNulls`` option for any unique index that contains
a nullable column. This will be set to ``true`` for all databases except ``SQL Server``. This should be easier
for users to understand the behavior and know where to change the option.

You should see unique rules generated something like this:

..code-block:: php
    $rules->add($rules->isUnique(['field_1', 'field_2'], ['allowMultipleNulls' => true]), ['errorField' => 'field_1']);

There are always edge cases for rules like this. Some users might have nullable columns but maintain unique
null values. Some users might have a solution for SQL Server to consider ``NULL`` unqiue. Our goal is to
provide reasonable and reliable defaults.

..note::
    Bake 2.6 also includes support for baking unique rules with multiple fields.

CakePHP 5 will default ``allowMultipleNulls`` to ``true``
----------------------------------------------------------

We understand there is confusion caused by changing default behavior of options that are hidden,
but we think this needs to be corrected the right way.

CakePHP 5 will default this behavior back to allowing multiple ``NULL`` values.

With the above changes to Bake, this should not be a signifcant change in behavior.

.. author:: corey
.. categories:: news
.. tags:: news
