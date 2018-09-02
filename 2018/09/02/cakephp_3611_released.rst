CakePHP 3.6.11 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.6.11. This is a maintenance release for the 3.6 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.6.10. See the `changelog <https://github.com/cakephp/cakephp/compare/3.6.10...3.6.11>`_ for every commit.

* Use ``ConsoleIo`` constants internally more consistently.
* Updated the bundled cacert.pem file to the 2018-06-20 release from mozilla.
* Fixed a potential timing side-channel vector in Digest Authentication that
  could be used to enumerate usernames. Thank you to Edgaras Janušauskas for
  raising this issue through our responsible disclosure process.
* Improved API documentation.
* Binary column reflection now returns column length in SQLite and MySQL for
  custom sized binary fields.
* Scoped middleware now only applies the unique set of middleware.

Contributors to 3.6.11
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Curtis Gibby
* Dmitriy Romanov
* Edgaras
* Edgaras Janušauskas
* Hideki Kinjyo
* Ian den Hartog
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Sohel Rana
* inoas
* itosho
* ndm2
* saeideng
* sohelrana820

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
