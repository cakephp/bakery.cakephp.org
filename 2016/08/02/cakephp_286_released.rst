CakePHP 2.8.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.8.6. This is a maintenance release for the 2.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.8.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.8.5...2.8.6>`_ for every commit.

* ``CakeEmail::deliver()`` now lets subclasses use the static method. (@kolorafa)
* Welcome page now correctly displays PDO related errors. (@chinpei215)
* Query timing metrics are reset on ``BEGIN/COMMIT/ROLLBACK`` statements, giving
  more accurate query timing data. (@Mensler)
* AuthComponent no longer stores redirect URLs for ``JSON`` requests.
  (@gestudio)
* Empty strings are removed from the secured field list in ``FormHelper``.
  (@nojimage)
* Icelandic locale (is-is) support was added. (@alex2690)
* Stateless authentication adapters now store their user data on *all* requests,
  not just those that require authorization. (@biesbjerg)
* Plugin associations defined with the short name as a key now behave
  consistently with other declaration modes. (@psaintjust)
* Shutdown events are now triggered by the default error handling controllers.
  (@biesbjerg)
* ``CakeResponse::header()`` now treats ``null`` values now works like setting
  '' as a value.  (@markstory)
* ``Model::delete()`` no longer performs joins when simple conditions are used.
  (@mvdriel)
* ``CakeSchema`` can now change column lengths to the database vendor's
  defaults. (@andrej-griniuk)
* A memory leak in the ``SmtpTransport`` has been fixed. (@Linnk)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
