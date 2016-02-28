CakePHP 2.8.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.8.1. This is a maintenance release for the 2.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.8.1. See the `changelog
<http://cakephp.org/changelogs/2.8.1>`_ for every commit.

* API documentation improvements. (@garas, @bcrowe, @dereuromark, @ravage84)
* ``Validation::uploadedFile()`` no longer cares about key order. (@markstory)
* ``CakeRequest`` now reads the request content-type in a way that is compatible
  with the built-in PHP webserver. (@challgren)
* DbAcl inherited permissions for '*' now take into account explicit
  allow/inherit in leaf nodes. (@markstory)
* ``HttpSocket`` now correctly parses empty headers. (@markstory)
* Negative numbers can now be read from RedisCacheEngine. (@markstory)

Minor Features
--------------

* Postgres now supports a ``uuid`` type. This uses the native ``uuid`` type in
  Postgres. (@skie)
* ``SecurityComponent::requireAuth()`` is now deprecated. It was already removed
  from 3.x. This makes the deprecation in 2.x official. (@ravage84)
* ``Security::randomBytes()`` was added. This method replaces ``Text::uuid()``
  as the seed value for CSRF token generation. The new method emits a warning if
  an insecure source of random data is used. This warning indicates that your
  CSRF tokens could be susceptible to timing attacks. (@markstory)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
