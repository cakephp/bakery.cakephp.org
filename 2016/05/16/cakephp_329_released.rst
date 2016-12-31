CakePHP 3.2.9 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.2.9. This is a maintenance release for the 3.2 branch that fixes several
community reported issues and adds a few minor features.

Bugfixes
--------

You can expect the following changes in 3.2.9. See the `changelog
<https://cakephp.org/changelogs/3.2.9>`_ for every commit.

* 'chef' is now pluralized correctly. (@ADmad)
* ``Valiation::notBlank()`` now accepts '0'. (@dereuromark)
* CookieComponent now correctly uses the encryption key configured on specific
  top-level keys. (@jorisvaesen)
* SQLite schema generation now handles ``DEFAULT 'NULL'`` correctly. (@chinpei25)
* ``Cache\Engine\FileEngine`` uses less memory when writing cache data. (@psaintjust)
* ``EntityContext`` no longer modifies query objects. (@lorenzo)
* ``Session::renew()`` no longer triggers errors when object destruction fails.
  (@lorenzo)
* The ``ExistsIn`` rule now correctly applies on new entities that don't have
  the required columns set. (@raul338)
* View classes set with ``viewBuilder()`` now take precedence over those defined
  with the deprecated ``viewClass`` property. (@markstory)
* CompletionShell now correctly lists all subcommand names. (@markstory)
* Bound parameters in eagerly loaded associations via the subquery strategy now
  work correctly. (@greew)
* The ``IsUnique`` rule no longer emits ``field = NULL`` when properties are
  null. Instead it emits ``IS NULL``. (@markstory)
* ``Hash::merge()`` no longer emits an error when merging more than 2 arrays,
  containing mixed string/array values. (@markstory)
* ``FormHelper::input()`` now forwards additional options to ``error()``
  allowing you to turn of HTML escaping if you so wish. (@pperejon)

Minor Enhancements
------------------

* ``Cache::clearAll()`` was added. This method lets you clear all data from all
  configured cache engines. (@mirkopagliai)
* The ``ValidCount`` rule was added. This rule lets you ensure associations have
  the required number of associated values more easily. (@burzum)
* ``BaseAuth`` now passes the 'username' to custom finders. (@phillaf)
* ``Validator::hasAtLeast()`` and ``Validator::hasAtMost()`` were added. (@lorenzo)
* ``Folder::read()`` now supports ordering files by modified time, or name. (@Tzaoh)
* New mastercard numbers are now accepted by ``Validation::luhn`` (@psaintjust)
* ``Date::setDefaultLocale()`` and ``Time::setDefaultLocale()`` were added.
  These methods replace direct access to the ``$defaultLocale`` property.
  (@markstory)
* Named route mismatches now have better error messages. (@markstory)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
