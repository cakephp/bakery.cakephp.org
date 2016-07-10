CakePHP 3.3.0-beta Released
===========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.0-beta. This is a beta release for the 3.3 release branch. 3.3 provides
a number improvements both large and small. It also deprecates several features
that will be removed in 4.0.0. We would appreciate any feedback you
might have on the new features before their API definitions become stable. In
particular for the new PSR7 related features, as we see PSR7 as playing a big
part in CakePHP's future.

Behavior Changes
----------------

In minor releases, we release changes that are API compatible, but represent
minor variances in behavior that may effect your application:

* The default JSON encode format for Date and DateTime instances is now
  ISO-8601. This means that the timezone value contains a ``:``.
  For example ``2015-11-06T00:00:00+03:00``
* ``Controller::referer()`` now consistently omits the application base path
  when generating application local URLs. Previously string URLs would have the
  base path prepended to them, while array URLs would not.


Multiple Pagination Support Added
---------------------------------

You can now paginate multiple queries in a single controller action/view
template. By using the ``scope`` option you can use scoped the query string
parameters used in pagination::

    // In a controller action
    $articles = $this->paginate($this->Articles, ['scope' => 'article']);
    $tags = $this->paginate($this->Tags, ['scope' => 'tag']);
    $this->set(compact('articles', 'tags'));

In your views, you can define the model being paginated to use scoped query
string parameters::

    // Create links for the paginated articles.
    $this->Paginator->options(['defaultModel' => 'Articles']);

    // Create links for the paginated tags.
    $this->Paginator->options(['defaultModel' => 'Tags']);

PSR7 Middleware Added
---------------------

In tandem with the deprecation of Dispatcher Filters, support for PSR7
middleware has been added. Middleware is major piece of the new HTTP stack, and
is an opt-in component of CakePHP 3.3.0. By using the new HTTP stack, you can
take advantage of features like:

* Using middleware from plugins, and libraries outside of CakePHP.
* Leverage the same response object methods in both the responses you get from
  ``Http\Client`` and the responses your application generates.
* Be able to augment the response objects emitted by error handling and asset
  delivery.

See the `middleware documentation 
<http://book.cakephp.org/3.0/en/controllers/middleware.html>`_ for more
information on how to use the new HTTP stack.

Http Client is now PSR7 Compatible
----------------------------------

``Cake\Network\Http\Client`` has been moved to ``Cake\Http\Client``. Its request
and response objects now implement the
`PSR7 interfaces <http://www.php-fig.org/psr/psr-7/>`_.

ORM Improvements
----------------

* Additional support has been added for mapping complex data types. This makes
  it easier to work with geo-spatial types, and data that cannot be represented
  by strings in SQL queries.
* A new ``JsonType`` was added. This new type lets you use the native JSON types
  available in MySQL and Postgres. In other database providers the ``json`` type
  will map to ``TEXT`` columns.
* ``Association::unique()`` was added. This method proxies the target table's
  ``unique()`` method, but ensures that association conditions are applied.
* ``isUnique`` rules now apply association conditions.
* When entities are converted into JSON, the associated objects are no longer
  converted to an array first using ``toArray()``. Instead, the
  ``jsonSerialize()`` method will be invoked on all associated entities. This
  gives you more flexibility and control on which properties are exposed in JSON
  representations of your entities.
* ``Table::newEntity()`` and ``Table::patchEntity()`` will now raise an
  exception when an unknown association is in the 'associated' key.
* ``RulesChecker::validCount()`` was added. This new method allows to apply
  rules to the number of associated records an entity has.
* The ``partialNullsPass`` option was added to the ``existsIn`` rule. This
  option allows rules to pass when some columns are null.

Cache Shell Added
=================

To help you better manage cached data from the CLI environment, a shell command
has been added that exposes methods for clearing cached data::

    // Clear one cache config
    bin/cake cache clear <configname>

    // Clear all cache configs
    bin/cake cache clear_all

Other Changes
-------------

There are many other great new things in 3.3.0. Refer to the `migration guide
<http://book.cakephp.org/3.0/en/appendices/3-3-migration-guide.html>`_ for all
the greatness 3.3.0 brings.

Deprecations
------------

3.3.0 will deprecate a number of features. Refer to the `deprecated features
<http://book.cakephp.org/3.0/en/appendices/3-3-migration-guide.html#deprecations>`_
for more details. Deprecated features will not be removed until 4.0.0.

Unless there are major issues with the 3.3.0-beta release, we will have
a release candidate and stable release packaged in the 4-5 weeks. The
documentation for 3.3.0 is now available in the `book <http://book.cakephp.org/3.0/en>`_.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
