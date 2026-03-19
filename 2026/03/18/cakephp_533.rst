CakePHP 5.3.3 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.3.3. This is a maintenance release for the 5.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.3.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.3.2...5.3.3>`_ for every commit.

* Improved type hints for database query results, and ``disableHydration()``.
* ``Query::setMatching()`` without a builder no longer clears the builder
  function. Instead an identity function is used to retain query composition.
* Improved typehinting on ``FactoryLocator``.
* Updated dependencies and CI tooling.
* Enabled strict mode for more ``in_array()`` checks.

Contributors to 5.3.3
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Jasper Smet
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* Nicos Panayides

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
