CakePHP 3.2.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.2.4. This is a maintenance release for the 3.2 branch that fixes several community reported issues and adds a few minor features.

Bugfixes
--------

You can expect the following changes in 3.2.4. See the `changelog <https://cakephp.org/changelogs/3.2.4>`_ for every commit.

* Table names are now quoted in SQLserver schema reflection when reflecting
  indexes. This allows table names in different schemas to be used. (@markstory)
* ``Validation::date()``, ``Validation::dateTime()`` and ``Validation::time()``
  now accept ``DateTimeImmutable``. (@markstory)
* Warning related to PO file parsing when a message exists as both a context
  inclusive and context free message have been fixed. In this situation, the
  first message encountered will be used and the other will not be accessible.
  (@markstory)
* Serialization errors when reading negative numbers from Redis have been fixed.
  (@markstory)
* The ORM will now emit warnings when association properties shadow properties
  in a table. (@ADmad)
* Default string values now work correctly in Postgres. (@chinpei215)
* RelativeTimeFormatter now correctly formats 'about a month ago'/'in about a month'
  (@chinpei215)
* XML and JSON responses no longer contain stack traces. Including stack traces
  could cause fatal errors when unserializable objects were in the stack trace.
  (@markstory)
* Routes don't recompile each time they are used within a single request.
  (@Phillaf)
* Unlinking HasMany associations correctly prefixes conditions, which fixes
  issues when an association finder includes additional associations by default.
  (@greew)
* Unlinking empty HasMany associations no longer emits warnings on null.
  (@lorenzo)
* ``UnaryExpression`` now correctly calls traverse on child expressions. (@greew)
* Time formatting no longer emits errors when using Russian or other languages
  that have more than 2 plural forms. (@lorenzo)
* ``Response::file()`` no longer attempts to clear the output buffering. This
  allows test cases involving files to not be marked as 'risky' by PHPUnit.
  (@lorenzo)


Minor Enhancements
------------------

* Improved API docs (@btaens, @markstory, @antograssiot)
* ``Response::getFile()`` was added. This gives you a way to read the file out
  of a response, which is helpful in testing. (@markstory)
* ``Association::className()`` was added. This lets you read the className
  option out of an association. (@ifunk)
* ``JsonConfig`` now pretty prints dumped files (@markstory)
* Routes can now use the ``multibytePattern`` option to enable multi-byte sub
  patterns in routes. (@markstory)
* ``UrlHelper::css()``, ``UrlHelper::script()`` and ``UrlHelper::image()`` were
  added. (@jadb, @ADmad)
* ``MultipleCheckboxWidget`` now handles grouped options. This makes it more
  consistent with Select boxes. (@markstory)
* ``IntegrationTestCase::assertFileResponse`` was added. This method makes it
  easier to assert file responses. (@lorenzo)

We'd like to welcome `@chinpei215 <https://github.com/chinpei215>`_ to the
CakePHP team. He has been instrumental in finding and fixing a number of
security issues in CakePHP.

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
