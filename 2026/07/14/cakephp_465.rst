CakePHP 4.6.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.6.5. This is a maintenance release for the 4.6 branch that fixes community
reported issues and two security issues. Advisories will be published for the
issues over the next week as vulnerability reviews are completed. Thank
you to ``@unknownhand`` and Rotem Reiss for reporting these issues via our
security process. The security fixes have been backported and released as
4.5.12 as well.

Bugfixes
--------

You can expect the following changes in 4.6.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.6.4...4.6.5>`_ for every commit.

* Normalized handling of ``%2f`` in route paths to always be treated as an
  encoded value.
* Improved parameter handling and escaping in ``FunctionsBuilder``.
* ``SmtpTransport`` now strips CRLF from email header values.

Contributors to 4.6.5
----------------------

Thank you to all the contributors that submitted a pull request:

* Mark Story

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
