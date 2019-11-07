CakePHP 3.8.6 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.6. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.5...3.8.6>`_ for every commit.

* Microseconds are no longer dropped when creating ``Time`` and ``FrozenTime``
  instances from other datetime objects.
* Improved API documentation and deprecated tags.
* ``Time::__debugInfo()`` has been aligned with the implementation in
  ``chronos``.
* ``Http\Client`` now reads cookies from the correct subdomain when handling
  cross subdomain redirects.
* Dates before 1600 are now accepted by ``Validation::dateTime()``.
* ``FormHelper::dateTime()`` now correctly handles ``empty`` options that are
  incompletely defined arrays.
* ``Validation::compareFields()`` now works with ``null``.

Contributors to 3.8.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Iftekhar Ahmed Eather
* Mark Scherer
* Mark Story
* detinkin
* itosho


As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
