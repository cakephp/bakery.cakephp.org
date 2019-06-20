CakePHP 3.7.9 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.7.9. This is a maintenance release for the 3.7 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.7.9. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.7.8...3.7.9>`_ for every commit.

* Fixed ``Type::buildAll()`` not returning custom type objects added with
  ``Type::set()``.
* Improved API documentation examples.
* ``Validation::isInteger()`` no longer accepts boolean values as 1/0.
* Validation methods that operate on strings (minLength, maxLength,
  minLengthBytes, maxLengthBytes) now reject non-scalar values.
* ``requestAction()`` now looks for ``'return'`` in a type-safe way.

Contributors to 3.7.9
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* George Constantinou
* Mark Story
* othercorey
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
