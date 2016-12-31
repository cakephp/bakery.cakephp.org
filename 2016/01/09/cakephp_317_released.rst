CakePHP 3.1.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.1.7. This is a maintenance release for the 3.1 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.1.7. See the `changelog <https://cakephp.org/changelogs/3.1.7>`_ for every commit.

* ``Paginator::numbers()`` now treats numeric string values in ``first`` and ``last`` as strings.
* Using invalid associations in ExistsIn rules now raises a helpful error.
* BelongsToMany associations can have their fields limited through queryBuilder closures.
* The ``$query->func()->now()`` query function works as expected in where conditions now.
* ``XmlView`` no longer fails when attempting to output XML documents built with DOMDocument.
* BelongsToMany ``_joinData`` is now marshalled consistently by ``Table::patchEntity()``.
* Missing Controller error pages display the correct class name and path for prefixed controllers.

Minor Enhancements
------------------

* ``IntegrationTestCase::cookieEncrypted()`` was added. This helper lets you set the value of encrypted cookies.
* ``IntegrationTestCase::assertCookieEncrypted()`` was added. This assertion lets you compare encrypted cookie values.
* FormHelper now forwards ``templateVars`` to the templates for ``submitContainer`` and ``inputSubmit``.
* ``Collection::chunk()`` was added. This method lets you split a collection into equal sized chunks.
* Exception classes were added for Conflict (409), Gone (410), Not Acceptable (406) and Service Unavailable (506).
* ``Configure::readOrFail()`` was added. This method will read a value from Configure and raise an exception if it does not exist.

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

