CakePHP 2.9.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 2.9.7. This is a maintenance release for the 2.9 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 2.9.7. See the `changelog <https://github.com/cakephp/cakephp/compare/2.9.6...2.9.7>`_ for every commit.


* ``Router::reverseToArray()`` was added. This new method allows you to get the
  URL parameters from a request that would let you generate the request's URL
  again with ``Router::url()``.
* CakeSchema no longer adds an additional ``id`` column to tables when
  reflecting schema of tables with non-conventional primary keys, and not using
  the defined model classes.
* The error class used by ``FormHelper::input()`` can be customized with the
  ``errorClass`` option.
* ``Hash::filter()`` no longer removes values of ``0.0``.
* ``AuthComponent::logout()`` now removes the active user data used by stateless
  authenticators.
* Latvian and Hungarian locale names were corrected.

Contributors to 2.9.7
---------------------

Thank you to all the contributors that helped make this release happen:

* Henrik Gemal
* Koji Tanaka
* Mark Story
* Mark van Driel
* Sébastien Barré
* Val Bancer

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
