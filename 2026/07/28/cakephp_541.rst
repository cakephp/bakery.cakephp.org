CakePHP 5.4.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.4.1. This is a maintenance release for the 5.4 branch that fixes
community reported issues, regressions and a security issue with
``RateLimitMiddleware``.

Bugfixes
--------

You can expect the following changes in 5.4.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.4.0...5.4.1>`_ for every commit.

* Fixed incorrect alias generation with postgres driver and subqueries.
* Fixed errors related to newly added properties when ``Database\Schema\Column``
  and ``Index`` are deserialized.
* Added missing ``add()`` method to ``Cache\Engine\NullEngine``.
* Changed default ``ipHeader`` in ``RateLimitMiddleware`` from
  ``x-forwarded-for`` to ``remote_addr``.
* Improved API docs for ``FunctionsBuilder``.

Contributors to 5.3.1
----------------------

Thank you to all the contributors that submitted a pull request:

* Alejandro Ibarra
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* othercorey

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
