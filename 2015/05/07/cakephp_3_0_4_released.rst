CakePHP 3.0.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.0.4. This is a maintenance release that contains security fixes and bugfixes.

Security Fixes
--------------

There are two issues that can impact the security of a CakePHP application:

* CsrfComponent fails to invalidate requests that are missing both the CSRF
  token, and CSRF post data.
* When marshalling request data, empty entities could by bypass validation
  methods with carefully created JSON payloads. RulesChecker validations would
  not be bypassed by these empty entities.

We'd like to thank 'Hayato Araki' for contacting us through our `security issue
<http://book.cakephp.org/3.0/en/contributing/tickets.html#reporting-security-issues>`_ 
process about the CsrfComponent issue. We recommend that all users of CakePHP
upgrade to 3.0.4 as soon as possible.

Bugfixes
--------

In addition to the security issues the following defects have been fixed:

* Cascading deletes on associations with custom aliases should no longer fail.
* XmlView now supports ``_xmlOptions``. This matches the behavior of JsonView.
* ``EntityTrait::extractOriginal()`` now behaves consistently with
  ``extract()``. Both methods now include all named properties, instead of just
  the unchanged properties. A new method ``extractOriginalChanged()`` can be
  used to extract only the original values of changed attributes.
* Query string parameters are now correctly supported in
  ``IntegrationTestCase``.
* ``Collection::isEmpty()`` and ``Cake\ORM\Query::isEmpty()`` was added.
* Forms can now be created without the action attribute.
* Accessing entity data is now more efficient. Entities will
  cache the result of custom accessors, and invalidate the cache when
  properties are changed or removed.

CakeFest 2015 Tickets
---------------------

There is still time to get your tickets for `CakeFest 2015
<http://cakefest.org/tickets>`_ if you haven't already. May 28th and CakePHP's
10th anniversary are quickly approaching.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release, security
.. comments::
