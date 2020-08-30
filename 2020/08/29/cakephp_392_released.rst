CakePHP 3.9.2 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.2. This is a maintenance release for the 3.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.9.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.9.1...3.9.2>`_ for every commit.

* The ``Http\Client`` curl adapter now uses ``CURLOPT_NOBODY`` when making HEAD
  requests.
* Fix output buffers not being closed when view templates or blocks are being
  rendered. This fixes tests being marked as risky in PHPUnit.
* ``PaginatorHelper::first()`` and ``last()`` now correctly handle url options.

Contributors to 3.9.2
----------------------

Thank you to all the contributors that helped make this release happen:

* Marc Würth
* Mark Story
* ndm2
* Nicky Gerritsen

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
