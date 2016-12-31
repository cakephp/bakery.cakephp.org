CakePHP 2.7.8 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 2.7.8. This is a maintenance release for the 2.7 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 2.7.8. See the `changelog
<https://cakephp.org/changelogs/2.7.8>`_ for every commit.

* An extract() call was removed from Validation::comparison(). There was some
  concern that it could be used to circumvent validation.
* Fixed issue around incorrect SNI validation when host name contains protocol
  for SmtpTransport.
* Proxy Authentication with SSL no longer forwards proxy credentials in
  HttpSocket.
* SchemaSchell clears the ClassRegistry after applying schema.
* Context is reset when parsing MO files. Previously context could bleed between
  message identifiers.

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

