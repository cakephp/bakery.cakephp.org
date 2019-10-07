CakePHP 3.8.5 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.5. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.4...3.8.5>`_ for every commit.

* ``Router::reverse()`` now removes the CSRF token and ``isAjax`` from generated URLs.
* Improved failure messages for header and cookie assertion methods.
* Removed an additional ``\r\n`` from multipart HTTP client request bodies which
  caused them to be rejected by some servers.
* Removed quotes around multipart message boundary markers. These quotes are not
  necessary and could cause servers with non-compliant HTTP parsers to reject
  the request.
* ``Number::toPercentage()`` now uses the locale data when placing the ``%``
  marker.
* ``MysqlSchema`` now generates schema correctly for decimal and float columns
  that have a length but no precision.
* Fixed schema reflection for ``double unsigned`` type in MySQL.
* Fixed schema reflection for ``varbinary(max)`` type in SqlServer.
* File and line information is now included in log messages from
  ``ErrorHandlerMiddleware``.

Contributors to 3.8.5
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras Janušauskas
* Littley Lv
* Mark Scherer
* Mark Story
* Rachman Chavik
* bancer

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
