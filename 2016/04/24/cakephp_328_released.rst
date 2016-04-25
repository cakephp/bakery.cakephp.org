CakePHP 3.2.8 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.2.8. This is a maintenance release for the 3.2 branch that fixes several
community reported issues and adds a few minor features.

Bugfixes
--------

You can expect the following changes in 3.2.8. See the `changelog
<http://cakephp.org/changelogs/3.2.8>`_ for every commit.

* The Equifax Secure Certificate Authority root certificate was re-added. This
  fixes several issues with the certificate bundle update in 3.2.7. (@markstory)
* ``Collection::every()`` now returns false on an empty collection (@ADmad).
* ``Security::randomBytes()`` emits a warning when openssl is used and there was
  not a strong source of entropy available. (@markstory)
* ``Text::truncate()`` better handles short words within HTML tags when the ``html`` and
  ``exact`` options are used. (@markstory)
* Dependencies for ``cakephp/orm`` were updated. (@lorenzo)

Minor Enhancements
------------------

* Improved API documentation (@thinkingmedia, @chav170)
* ConsoleOptionParser now sorts options an arguments when displaying help.
  (@thinkingmedia)
* ``Table::saveMany()`` was added. This method allows you to save multiple
  entities in a single method call. (@ADmad)

CakeFest Tickets Available Now
------------------------------

Tickets are now `available for CakeFest 2016 <http://cakefest.org/tickets>`__.
Join us in Amsterdam for 2 days of workshops followed by 2 days of talks.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
