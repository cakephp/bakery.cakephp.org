CakePHP 3.9.7 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.7. This is a maintenance release for the 3.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.9.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.9.6...3.9.7>`_ for every commit.

* ``bin/cake routes check`` no longer fails when redirect routes are used.
* Improved API documentation and method annotations.
* The variable replacement behavior was aligned between the ``sprintf`` and
  ``icu`` message formatters. This change was a backport from 4.x.
* Aligned ``Entity::isEmpty()`` and ``Entity::hasValue()`` to treat ``'0'`` as
  a non-empty value. This aligns the behavior with documentation and original
  intent.
* Fixed path handling in ``FileCache`` to prevent deleting an empty paths.
* ``TableLocator::get()`` now raises an error when a table's ``initialize()``
  method would create an infinite loop.
* ``Email::setReplyTo()`` now takes multiple addresses.

Contributors to 3.9.7
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Marc Würth
* Mark Story
* mtak3
* ndm2
* othercorey
* Waldemar Bartikowski

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
