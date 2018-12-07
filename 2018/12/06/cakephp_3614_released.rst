CakePHP 3.6.13 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.14. This is a maintenance release for the 3.6 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.6.14. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.6.13...3.6.14>`_ for every commit.

* Improved API documentation.
* ``PaginatorHelper`` no longer always includes the ``direction`` query string
  argument when sorting by an associative array with the default direction.
* ``LocaleSelectorMiddleware`` now support fallback languages allowing Accept
  header values of ``es-ES`` to match the generic ``es`` locale.
* ``NullEngine::write()`` now conforms to the documented return type.
* Fixed incorrect association properties being set when loading joined
  associations with a subset of fields that excludes all fields on the root
  entity.

Contributors to 3.6.14
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Cauan Cabral
* Edgaras
* George Constantinou
* Hideki Kinjyo
* Ian den Hartog
* Mark Scherer
* Mark Story
* Michael Hoffmann
* Val Bancer
* gregs

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
