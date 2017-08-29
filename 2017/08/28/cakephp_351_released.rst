CakePHP 3.5.1 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.1. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.0...3.5.1>`_ for every commit.

* Warnings are now logged when active connections are destroyed with pending
  transactions.
* ``Hash::remove()`` correctly handles ``0`` in path strings now.
* Improved API documentation.
* ``Query::notMatching()`` now works with BelongsToMany associations that use
  composite primary keys.
* DSN string parsing was restored for SqlLocalDB.
* Fixed compatibility issues between ``Collection`` and ``Traversable``.
* Response headers set in view templates using the immutable methods are now
  output correctly.
* ``Request::clientIp()`` now reads IPs from the end of the IP chain when
  ``trustProxy`` is enabled.
* ``Xml::build()`` now default the ``parseHuge`` option to false. Previously it
  was documented as defaulting to false, but was defaulted to true. Disabling
  this option by default prevents arbitrarily large XML documents from consuming
  too much memory.
* Hash comparisons in Authentication classes now use constant time comparison
  functions.
* ``FormAuthenticate`` hashes passwords even when the user is not found as
  documented. This helps to protect against timing attacks.
* The non-PSR7 Dispatcher can send cookies once again.
* ``AssetDispatcher`` no longer serves files starting with ``.``.
* The bundled root certificates have been updated to the latest bundle from
  mozilla. This removes a few untrusted certificate authorities like StartSSL.
* ``Form::setErrors()`` was added.
* ``ConsoleIntegrationTestCase`` has new methods added for ensuring
  stdout/stderr are empty.
* ``HtmlHelper`` now HTML encodes string URLs for css/javascript/images in case
  user data is supplied to them.

Contributors to 3.5.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Ceeram
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Tadahisa MOTOOKA
* chinpei215
* inoas

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
