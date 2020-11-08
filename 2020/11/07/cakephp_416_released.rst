CakePHP 4.1.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.1.6. This is a maintenance release for the 4.1 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.1.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.1.5...4.1.6>`_ for every commit.

* The ``Validator::setStopOnFailure()`` method was added. This method helps
  improve ease of upgrading from 3.x. It allows the ``require*`` methods to stop
  field validation.
* ``Mailer::setReplyTo()`` now accepts multiple email addresses. This change
  aligns ``Reply-To`` with other email fields that accept multiple recipients.
* Warnings emitted by ``AuthComponent`` when using strict mode and a mocked
  request were fixed.
* Fixed incorrect error messages for named routes that failed to match.
* Fixed string condition parsing in ``having`` and ``where`` conditions when the
  string condition contains functions and spaces.
* Improved API documentation.
* OAuth 1.0 signatures no longer include request bodies if the request is not
  urlencoded data.
* Support for UTF8 encodings was added to ``pj()``.
* Entity marshalling now loosely compares objects. Previously strict comparisons
  were used causing all object attributes to considered dirty and updated.
* Improved error messages when ``INSERT`` queries were missing a table name.
* ``BodyParserMiddleware`` now correctly handles scalar value request bodies for
  JSON requests.
* ``ServerCommand`` now honours the ``PHP`` environment variable when starting
  the HTTP server.

Contributors to 4.1.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* chris cnizzardini
* Corey Taylor
* Daniel Opitz
* Juan Basso
* Marc Würth
* Mark Scherer
* Mark Story
* Matthias Wirtz
* othercorey
* Ricardo Turella
* Richard.Strittmatter

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
