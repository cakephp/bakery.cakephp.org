CakePHP 5.4.4 and 4.6.6 Released
================================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.4.3. This is a maintenance release for the 5.4 branch that fixes security
issues, community reported issues, regressions. The security fixes have also
been released as 5.2.16, 5.3.8, and 4.6.6. Security advisories will be released
in the upcoming days as they are assigned CVE numbers.

Bugfixes
--------

You can expect the following changes in 5.4.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.4.3...5.4.4>`_ for every commit.

* Added PHP 8.6 to the CI matrix.
* Improved test coverage for global functions.
* Improved behavior of ``hasTable()`` with MySQL and missing schema.
* Fix crash when fallback loader is used for missing domain files.
* Improved API documentation.
* Fix ``Hash::extract()`` treating the path ``0`` as empty.
* Fix double identifier quoting on ``DISTINCT`` expressions.
* ``SmtpTransport`` now closes the connection when a send fails.
* ``XmlView`` now serializes an empty array as an empty element.
* Strip newlines from remaining Message headers.
* Add support for JPEG XL, WebP, AVIF image extensions.
* Fix ``Request::$trustProxy`` always being set to true when
  ``setTrustedProxies()`` is called.
* Fix cookie handling for domain names in ``Http\Client``.
* Fix cookie and header handling during redirects in ``Http\Client``.
* Fix potential header injection in ``Http\FormData``.
* Update composer-ca/bundle version for eMudhra certificate revocation.
* Reduced potential SQL injection in database expression objects.
* Preserve connection role in ``SelectQuery::count()`` for complex queries.
* Add range clamps to ``Response::withFile()`` and negative offsets.
* Fix ``Response::isNotModified()`` with weak entity tags.
* ``ServerRequest::domain()`` and ``subdomain()`` now omit the port.

In 4.6.6 you the following changes were made. See the
`changelog<https://github.com/cakephp/cakephp/4.6.5..4.6.6>`_ for every commit.

* Strip newlines from remaining Message headers.
* Fix cookie handling for domain names in ``Http\Client``.
* Fix cookie and header handling during redirects in ``Http\Client``.
* Fix potential header injection in ``Http\FormData``.
* Update composer-ca/bundle version for eMudhra certificate revocation.
* Reduced potential SQL injection in database expression objects.

Contributors to 5.4.4
----------------------

Thank you to all the contributors that submitted a pull request:

* Abdul Malik Ikhsan
* ADmad
* Dylan Pulver
* geoffg-sentry
* Jamison Bryant
* Kevin Pfeifer
* Lay
* Mark Scherer
* Mark Story
* Masaki Kagaya
* Mikkel Bonde Wiuff
* othercorey
* Wleeaf

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
