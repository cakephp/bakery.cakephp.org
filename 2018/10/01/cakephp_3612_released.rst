CakePHP 3.6.12 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.6.12. This is a maintenance release for the 3.6 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.6.11. See the `changelog <https://github.com/cakephp/cakephp/compare/3.6.11...3.6.12>`_ for every commit.

* Invalid encrypted cookie values no longer cause exceptions to be raised.
  Instead they are treated as empty values.
* ``ServerRequestFactory`` uses the configured ``webroot`` directory instead of
  hardcoded value now.
* Routing scopes that define an action now work correctly.
* Improved API documentation.
* ``EntityRoute`` now correctly handles ``_`` in placeholder names, and handles
  ``{brace}`` style placeholders.
* Schema generation for MySQL binary types has been improved. Arbitrary sized
  columns are now handled correctly.
* Undefined controller properties now emit warnings when accessed. This prevents
  'invalid method call on null' type errors.
* ``Response`` now checks ``disabled_functions`` before trying to set request
  timeout to 0.
* Re-rendering an email message no longer rotates the message-id.

Contributors to 3.6.12
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Dennis Hemeier
* Dmitrii Romanov
* Edgaras Janušauskas
* Hideki Kinjyo
* Ian den Hartog
* Jeremy Harris
* Jose Diaz-Gonzalez
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
