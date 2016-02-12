CakePHP 3.2.2 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.2.2. This is a maintenance release for the 3.2 branch that fixes several community reported issues and adds a few minor features.

Bugfixes
--------

You can expect the following changes in 3.2.2. See the `changelog <http://cakephp.org/changelogs/3.2.2>`_ for every commit.

* TimeHelper now interacts with immutable time objects correctly.
  (@antograssiot)
* ``Query::matching()`` now correctly type-casts hydrated results in the
  ``_matchingData`` property. (@markstory)
* When results are iterated in a result formatter, the ``_translations``
  property is now always present. (@markstory)
* Hydrating records containing date time fields in non-english locales no longer
  fatally errors. (@markstory)
* Cell actions can once again set the template name. (@HavokInspiration)
* Cell template names can now be set with the ``viewBuilder()``
  (@HavokInspiration)
* ``SecurityComponent`` now correctly handles field names ending in ``[]``.
  (@markstory)
* Symlinked configuration files now load correctly. (@tersmitten)
* The ``ProgressShellHelper`` now renders correctly on putty. (@HavokInspiration)
* The test suite no longer fails to rebuild fixtures after fatal errors.
  (@HavokInspiration)
* ``Hash::sort()`` better handles sorting on sparse data. (@markstory)

Minor Enhancements
------------------

* API documentation improvements (@dereuromark, @bcrowe, @saeideng, @gmponos)
* ``cake plugin loaded`` was added. This CLI tool lets you list the loaded
  plugins your application uses. (@dereuromark)
* Exception messages from fixture creation are now clearer. (@burzum)
* Fixtures now allow schema to be predefined and not managed by the fixtures.
  (@HavokInspiration)
* ``cake i18n extract`` now runs faster. (@markstory)
* ``CakeTestCase::assertSameAsFile()`` now allows expected results to be updated
  by setting an environment variable. (@AD7six)
* ``SecurityComponent::requireAuth()`` is now deprecated and will be removed in
  4.x
* ``IntegrationTestCase::assertHeaderContains()`` was added. (@half2me)
* ``FormHelper::text()`` and related functions now accept ``'id' => true``. This
  option enables the same automatic ID generation used in
  ``FormHelper::input()``
* Sub-split repositories now contain license files and status badges (@bravo-kernel)
* ``FormHelper`` will now automatically load application widget classes that
  overload the core ones. (@ADmad)
* HTTP status ``422`` was added to ``Response``. (@jadb)

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
