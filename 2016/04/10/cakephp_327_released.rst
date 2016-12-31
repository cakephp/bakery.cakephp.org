CakePHP 3.2.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.2.7. This is a maintenance release for the 3.2 branch that fixes several
community reported issues and adds a few minor features.

Bugfixes
--------

You can expect the following changes in 3.2.7. See the `changelog
<https://cakephp.org/changelogs/3.2.7>`_ for every commit.

* Connection drivers now support short classname references. (@ndm2)
* Exception types raised by SecurityComponent have been updated to match the
  documented values. (@justinyost)
* FormHelper postLink elements generated inside an open form now work as
  expected.  (@markstory)
* Schema reflection in MySQL now preserves TEXT & BLOB column lengths.
  (@HavokInspiration)
* The bundled Certificate Authority file was updated using the latest Mozilla
  Certificate bundle. (@markstory)
* Empty JSON values can be read by Http\Client. (@ADmad)


Minor Enhancements
------------------

* ``Text::slug()`` was added. This method leverages the intl extension, and will
  replace ``Inflector::slug()`` which is now deprecated. (@ADmad)
* ``Text::transliterate()`` was added. This method allows unicode strings to be
  transliterated into ASCII using the intl extension. (@ADmad)
* Support for ``TINYTEXT``, ``MEDIUMTEXT`` and ``LONGTEXT`` was added. These
  types are compatible with all core drivers. (@HavokInspiration)
* Support for ``TINYBLOB``, ``MEDIUMBLOG`` and ``LONGBLOB`` was added. These
  types are compatible with all core drivers. (@HavokInspiration)

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
