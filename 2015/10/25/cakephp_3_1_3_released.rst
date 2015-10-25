CakePHP 3.1.3 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.1.3. This is a maintenance release for the 3.1 branch that fixes bugs and
includes small enhancements.

Bugfixes
--------

You can expect the following changes in 3.1.3. See the `changelog
<http://cakephp.org/changelogs/3.1.3>`_ for every commit.

* Fixed issues in the SMTP email transport when connecting to gmail.
* Fixed regression in the BooleanType converted in database when using NULL.
* Solved a couple problems when matching routes containing multibyte characters.
* Improving ``Query::count()`` so that it does not execute the query twice when
  calling the method multiple times.
* Avoided some errors when using XDebug in classes having ``__debugInfo``

Enhancements
------------

* HasMany associations now have the ``link``, ``unlink`` and ``replace`` methods
  implemented, like BelongsToMany associations do. This improves the usability
  of append-only associations.
* Made it easier to use the ``IntegrationTestCase`` with controllers having the
  ``SecurityComponent`` enabled.


As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: lorenzo
.. categories:: release, news
.. tags:: release, news
