CakePHP 3.5.2 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.2. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.1...3.5.2>`_ for every commit.

* Improved API documentation.
* ``Http\Client`` no longer fails to parse cookies with non-standard properties.
* ``CookieComponent`` configuration is more backwards compatible with previous
  versions.
* PO file parsing now handles po files that have the same message id defined as
  both a singular and a plural when the singular message is defined after the
  plural one.
* ``Helper::addClass()`` no longer emits warnings when class attributes are
  arrays.
* ``View`` setter methods now return ``$this`` instead of ``void``.
* ``RedisEngine`` increment/decrement now work with infinite timeout keys
  again.
* ``HtmlHelper::link()`` now supports the ``fullBase`` option.
* ``Text::uuid()`` will now use ``random_int`` if that function is defined.
* ``Debugger::highlight()`` is no longer off by one line.
* Cookies added via ``Http\Client::addCookie()`` now require a path and domain.

Contributors to 3.5.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Florian Krämer
* Huw Jones
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Robert Pustułka
* batopa
* inoas
* ndm2
* supermanner

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
