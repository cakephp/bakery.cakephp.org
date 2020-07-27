CakePHP 3.9.1 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.1. This is a maintenance release for the 3.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.9.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.9.0...3.9.1>`_ for every commit.

* ``Connection::transactional()`` will now rollback the transaction on
  a ``Throwable`` instance.
* Fixed encoding issue in MO file parser.
* Improved API documentation.
* Added ``ssl_local_pk`` option to Http\Client.
* ``Collection::shuffle()`` now includes elements with duplicate keys in the
  collection.
* Added deprecation tag to ``NumberHelper::defaultCurrency()``. Use
  ``getDefaultCurrency()`` and ``setDefaultCurrency()`` instead.

Contributors to 3.9.1
----------------------

Thank you to all the contributors that helped make this release happen:

* Corey Taylor
* Edgaras Janušauskas
* Mark Scherer
* Mark Story
* othercorey
* Philo Hamel
* Val Bancer
* Vincent PLANCHER

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
