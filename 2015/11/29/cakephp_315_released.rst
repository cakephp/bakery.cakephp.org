CakePHP 3.1.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.1.5. This is a maintenance release for the 3.1 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.1.5. See the `changelog <https://cakephp.org/changelogs/3.1.5>`_ for every commit.

* ``Collection::toArray()`` now drops the keys when dealing with RecursiveIterator. This makes the collection features easier to reason about as they generally do what people have been expecting.
* Improved API documentation.
* ``ResultSet::isEmpty()`` no longer consumes records on buffered iterators that had not already been iterated.
* The ORM no longer emits invalid queries when eager loading associations using the subquery strategy, and using an ORDER BY clause. Fields used in ORDER BY clauses are also included in the selected fields.
* Error handling is now compatible with PHP7. This removes the last known compatibility error with PHP7.
* BelongsToMany associations use ``bindingKey`` correctly now.
* Integer marshalling correctly accepts negative values now.
* When executing Shell 'main' method the current command name is set to 'main'.
* spellcheck is now a standard attribute. Unlike most HTML5 attributes, spellcheck requires 'true' and 'false' values, which means it cannot be a minimized attribute.
* CSRF validation is applied to all HTTP methods that are not 'GET', 'OPTIONS' or 'HEAD'. This prevents invalid HTTP methods from bypassing CSRF validation.
* ``RouterBuilder::resources()`` correctly inflects the object id when using ``'inflect' => 'dasherize'`` and nested resources.
* ``TimeHelper::format()`` no longer shifts string datetimes to the supplied timezone before formatting.
* ``Shell::createFile()`` no longer converts ``\n`` to ``\r\n`` silently when running on windows.

Minor Enhancements
------------------

* ``RouteBuilder::addExtension()`` was added. This method lets you incrementally add extensions instead of replacing the connected extensions.
* The options passed to ``Table::save()``, and ``HasMany``/``BelongsToMany`` link/unlink/replace methods are being passed through to the internal ``Table::save/delete()`` calls.
* The ``CsrfComponent`` now supports an ``httpOnly`` option. Enabling this option makes the CSRF cookie inaccessible to client side scripting.

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

