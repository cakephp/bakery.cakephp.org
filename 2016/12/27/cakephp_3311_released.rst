CakePHP 3.3.11 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.3.11. This is a maintenance release for the 3.3 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.11. See the `changelog <https://github.com/cakephp/cakephp/compare/3.3.10...3.3.11>`_ for every commit.


* ``Xml::fromArray()`` now serialized ``'0'`` correctly.
* ``Http\Client\Response::getStatusCode()`` now returns integers, instead of strings.
* ``RequestHandler::$ajaxLayout`` is now deprecated. Previously undocumented,
  this property will be removed in 4.0.0

New Features
------------

The 3.3.11 introduces a few new features:

* Improved API documentation.
* ``Validation::(min|max)LengthBytes()`` were added. These methods let you check
  the number of bytes in a value where as ``(min|max)Length()`` let you check
  the number of characters.
* The Form library is now offered as a standalone package.


Contributors to 3.3.11
---------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bryan Crowe
* Ceeram
* Koji Tanaka
* Marc Würth
* Mark Scherer
* Mark Story
* Mirko Pagliai
* Mischa ter Smitten
* gregs

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
