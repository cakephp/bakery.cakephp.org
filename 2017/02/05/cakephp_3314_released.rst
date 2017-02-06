CakePHP 3.3.14 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.14. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.3.14. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.13...3.3.14>`_ for every commit.

* ``ValueBinder::placeholder()`` now works as documented when anonymous
  placeholders are used.
* Caching result sets on PHP 7.1.1 works again. There was an incompatibility due
  to a change in how SplFixedArray was unserialized.
* ``Validation::notBlank()`` now works with float 0.
* ``Collection::transpose()`` with different number of columns and rows now
  works as expected.
* The 'toggle vendor stack frames' links on error pages now work.
* Session destruction now works properly using the cache engine and memcached.
* Email log headers and body are separated by a new line.

Contributors to 3.3.14
----------------------

Thank you to all the contributors that helped make this release happen:

* Cory Thompson
* Edgaras Janušauskas
* Joep Roebroek
* Johan Meiring
* José Lorenzo Rodríguez
* Mark Story
* Mathew Foscarini
* Rodrigo moyle
* antograssiot

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
