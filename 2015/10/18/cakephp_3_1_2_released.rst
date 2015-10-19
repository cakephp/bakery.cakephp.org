CakePHP 3.1.2 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.1.2. This is a maintenance release for the 3.1 branch that fixes bugs and
includes small enhancements.

Bugfixes
--------

You can expect the following changes in 3.1.2. See the `changelog
<http://cakephp.org/changelogs/3.1.2>`_ for every commit.

* Contained associations now add column typ data into queries. This means that
  you can use complex datatypes like ``DateTime`` objects in conditions for
  association columns.
* XHR requests with query strings that are converted into requestAction calls by
  ``RequestHandlerComponent`` now work as expected.
* ``Hash::extract()`` compatibility with ArrayAccess objects was improved.
* Case expressions in queries no longer mishandle '0'.
* ``debug()`` no longer elides 'schema' and 'prefix'.
* ``Validation::datetime()`` now accepts ',' between the date and time
  components. This makes validating en_US formatted dates easier.
* Rendering issues in the ProgressHelper have been fixed.
* ``clone`` on Query objects now creates a deep clone as one would expect.
* Corrected API documentation.

Enhancements
------------

* HasMany associations now support a 'replace' save mode. In this mode, existing
  associations not in the entity's current property will be removed. New records
  will also be inserted.
* IntegrationTestCase now provides ``enableCsrfToken()`` and
  ``enableSecurityToken()`` methods to make testing with CsrfComponent and
  SecurityComponent much simpler.
* The CSRF token post field is now removed from request data after being
  validated. This makes 'Post Redirect Get' workflows simpler as the CSRF token
  doesn't need to be manually removed.
* Network\Socket now supports all standard SSL context options via prefixing.
  e.g ``ssl_verify_peer``. These options can also be configured in the
  SmtpTransport.
* Test Fixture constraint management has been greatly improved. You no longer
  need to carefully order fixtures to ensure constraints are applied correctly.
  Instead constraints are created after all tables and records have been
  created.
* When preparing datatypes for SQL statements, exceptions will now be raised on
  invalid values instead of silent failures.


As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
