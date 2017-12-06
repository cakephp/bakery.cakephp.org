CakePHP 3.5.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.7. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.6...3.5.7>`_ for every commit.

* Improved internal usage of PHPUnit assertions.
* Improved API documentation.
* Fixed warnings from phpstan level 3.
* Fixed inconsistent hash algorithm usage in Digest Authentication.
* ``Database\Type::map()`` now clears built objects when types are re-mapped.
* CakePHP catches ``Throwable`` in several places improving PHP7 support.
* Fixed schema reflection with MariaDB's ``current_timestamp()`` default
  value.
* Routes now match when ``_method`` is an array which could happen when named
  routes supported multiple HTTP methods.
* ``FormHelper::button()`` now supports the ``confirm`` option.
* ``Response::body()`` will no longer invoke string callables.
* ``ServerRequest::referer(true)`` no longer returns protocol relative URLs that
  are embedded in the path.
* po files that contained the same message string as both a singular
  and a plural form now correctly work with ``__()``.


Contributors to 3.5.7
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Dariusz Ruminski
* David Yell
* Florian Krämer
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Raúl Arellano
* chinpei215
* mosaxiv
* saeid
* timalive

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
