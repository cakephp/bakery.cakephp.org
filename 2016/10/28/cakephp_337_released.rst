CakePHP 3.3.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.7. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.6...3.3.7>`_ for every commit.

* ``Http\Client`` no longer sets the ``Content-Type`` header on all requests.
  Instead if there is no request data, no ``Content-Type`` header is sent.
* New Entities that contain only translated records now persist correctly.
* ``JsonView`` no longer hard fails on ``INF`` and ``NAN`` values. Instead these
  values are replaced with '0'.
* ``''`` is now an accepted key in both Session and ``Hash::get()`` operations.

New Features
------------

* Time objects can now have their JSON encode format set to
  ``Time::UNIX_TIMESTAMP_FORMAT``.
* ``FormHelper::create()`` now supports the 'enctype' and 'method' options.
* Routing now supports multi-extensions like '.csv.gz'.
* Composer scripts were added to make running tests and linting easier.

Contributors to 3.3.7
---------------------

Thank you to all the contributors that helped make this release happen:

* Andrew LeCody
* Johan Meiring
* Walther Lalk
* inoas
* Mark Story
* Andrej Griniuk
* lilHermit
* José Lorenzo
* thinkingmedia

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
