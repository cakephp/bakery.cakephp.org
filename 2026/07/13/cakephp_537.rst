CakePHP 5.3.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.3.5. This is a maintenance release for the 5.3 branch that fixes community
reported issues and three security issues. Advisories will be published for the
issues over the next week as vulnerability reviews are completed. Thank
you to ``@unknownhad`` and Rotem Reiss for reporting these issues via our
security process. The security fixes have been backported and released as
5.2.14, 5.1.8 as well.

Bugfixes
--------

You can expect the following changes in 5.3.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.3.6...5.3.7>`_ for every commit.

* Clarify behavior of the ``local`` parameter to ``ServerRequest::referrer()``.
* ``MissingRouteException`` now includes the passed parameters for failed named
  route matches.
* Add ``allowedClasses`` config to ``RedisEngine`` to provide controls on what
  classes can be constructed from serialized data.
* ``Http\Client`` now uses ``curl.cainfo`` from PHP ini when defined.
* ``SmtpTransport`` now strips CRLF from email header values.
* Improved parameter handling and escaping in ``FunctionsBuilder``.
* Fixed potential SQL injection in ``FunctionsBuilder::jsonValue()`` with
  postgres drivers.
* Added default values to ``Debugger::exportMask`` which sanitize common
  credential fields.
* Retain the ``ORDER BY`` clause when loading has many associations with
  a subquery loader strategy.
* Normalized handling of ``%2f`` in route paths to always be treated as an
  encoded value.


Contributors to 5.3.7
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Kevin Pfeifer
* Jorge M. González Martín
* Mark Scherer
* Mark Story
* othercorey
* XananasX

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
