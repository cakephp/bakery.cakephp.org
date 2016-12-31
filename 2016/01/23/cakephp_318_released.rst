CakePHP 3.1.8 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.1.8. This is a maintenance release for the 3.1 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.1.8. See the `changelog <https://cakephp.org/changelogs/3.1.8>`_ for every commit.

* Using ``matching()`` on a BelongsToMany association with conditions no longer emits invalid SQL. (@markstory)
* Generated reciprocal BelongsToMany associations have the original conditions applied to them. (@markstory)
* ``Inflector::camelize()`` now caches results (@ypnos-web)
* ``ConnectionManager::config()`` no longer clones objects passed in. (@lorenzo)
* Postgres schema reflection now only reads constraints in the connection's schema (@lorenzo)
* Memcached can now connect to unix domain sockets. (@tersmitten)
* TreeBehavior now uses expression objects for field updates. This makes it compatible with datasources requiring identifier quoting. (@skiedr, @lorenzo)
* Fixed incorrect behavior of ``TextHelper::autoLink()`` when CRLFs are present.  (@jeremyharris)
* The ``fullDebug`` argument of ``TestCase::assertHtml()`` now works as documented. (@jeremyharris)
* Helpers now allow newlines in javascript confirm messages. (@markstory)
* The ``cakephp-plugins.php`` file can now be located when cakephp/core is used as a standalone component. (@harikt)
* Simulated GET requests (via method overriding) no longer POST data populated.  This prevents GET requests from looking like they are POST requests that may cause unintentional side-effects. (@lorenzo)
* ``SecurityComponent`` now validates data whenever ``$request->data`` is populated.  This allows SecurityComponent to apply to PATCH and DELETE requests.  (@markstory, @chinpei215)
* ``Controller::$name`` is correctly inflected when using the base route class.  (@markstory)

Minor Enhancements
------------------

* Fixtures can now use ``public $import = ['model' => 'Articles']`` to import schema and records from a defined model. (@dereuromark)
* Improved API docs. (@bcrowe, @Mathieu, @Tzaoh, @Sergey, @luke83)
* ``ConnectionManager::config()`` now accepts a callable. This makes it consistent with ``Log::config()``. (@lorenzo)
* ``Query::set()`` now accepts a builder callable. (@lorenzo)
* ``Database\Type`` now allows objects to be injected via set(). (@jadb)
* SQL Query logs now include execution time and rows returned. (@Bernat Arlandis)
* Error logs now include Referring URL if it is available. (@flavius)

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
