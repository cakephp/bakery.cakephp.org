CakePHP 3.2.10 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.2.10. This is a maintenance release for the 3.2 branch that fixes several
community reported issues and adds a few minor features.

Bugfixes
--------

You can expect the following changes in 3.2.10. See the `changelog
<http://cakephp.org/changelogs/3.2.10>`_ for every commit.

* ``Query::insert()`` now resets columns when called multiple times.
  (@markstory)
* The ``ExistsIn`` rule no longer enforces constraints on new entities that have
  no dirty fields. This reverts a problematic change introduced in 3.2.9.
  (@markstory)
* Exceptions for missing mailer transports have been improved. (@graziel)
* Request URLs that contain another embedded URL are now handled correctly.
  (@chinpei215)
* FormHelper now resets the unlocked fields each time ``end()`` is called. This
  prevents fields unlocked in one form from being unlocked in subsequent forms.
  (@nojimage)
* Multi-part mime message boundaries are now generated with
  ``Security::randomBytes()``. This removes the possibility of timing attacks on
  mime-message boundary markers. (@chinpei215)
* ``RequestHandler`` no longer overwrites response content-types when no
  extension has been parsed. (@ADmad)
* The insecure fallback for ``Security::randomBytes()`` behaves more
  consistently with the secure modes now. (@chinpei215)
* The ``IsUnique`` rule once again enforces unique-ness as a SQL constraint
  would. This means that ``NULL`` values will never be equivalent for unique
  checks. This reverts a problematic change introduced in 3.2.9.  (@markstory)
* The ``BelongsToMany::find()`` uses the correct foreign key columns when
  creating queries that involve junction table join conditions. (@TheFRedFox)

Minor Enhancements
------------------

* ``Folder::subdirectories()`` was added (@frankfoerster).
* MissingAction and MissingTemplate error pages are now compatible with errors
  coming out of Mailers. (@markstory)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
