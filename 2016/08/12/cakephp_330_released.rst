CakePHP 3.3.0 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.0. This is a stable release for the 3.3 release branch. 3.3.0 provides
a number improvements both large and small to CakePHP. It also deprecates
several features that will be removed in 4.0.0.

Upgrading to 3.3.0
----------------------

You can use composer to upgrade to the new version of CakePHP::

    php composer.phar require "cakephp/cakephp:~3.3"

Deprecations
============

* ``Router::mapResources()`` is deprecated. Use routing scopes and
  ``$routes->resources()`` instead.
* ``Router::redirect()`` is deprecated. Use routing scopes and
  ``$routes->redirect()`` instead.
* ``Router::parseNamedParams()`` is deprecated. Named parameter backwards
  compatibility will be removed in 4.0.0
* ``Cake\Http\Response`` has had the following methods deprecated because they
  overlap with PSR7 interface methods:

  * ``statusCode()`` use ``getStatusCode()`` instead.
  * ``encoding()`` use ``getEncoding()`` instead.
  * ``header()`` use ``getHeaderLine()`` instead.
  * ``cookie()`` use ``getCookie()`` instead.
  * ``version()`` use ``getProtocolVersion()`` instead.

* Dispatcher Filters are now deprecated. Use the new HTTP middleware features.
* ``RequestActionTrait`` has been deprecated. Refactor your code to use
  view cells instead.
* ``Cake\\Utility\\Crypto\\Mcrypt`` engine has been deprecated as the ``mcrypt``
  extension is deprecated in PHP 7.1. Use the ``openssl`` driver instead. 

What's new in 3.3.0?
--------------------

The `migration guide
<http://book.cakephp.org/3.0/en/appendices/3-3-migration-guide.html>`_ has
a complete list of what's new in 3.3.0, and what has been deprecated. We
recommend you give that page a read when upgrading. A short list of the new
features in 3.3.0 is:

* PSR7 Middleware support has been added. This is an opt-in feature that allows
  you to leverage the increasing number of PSR7 middleware libraries from the
  broader PHP community in your CakePHP application.
* A new streamlined workflow for TranslateBehavior that makes creating forms for
  multiple translation values easier than before.
* ``Cake\Network\Http\Client`` has been moved to ``Cake\Http\Client``. Its request
  and response objects now implement the
  `PSR7 interfaces <http://www.php-fig.org/psr/psr-7/>`__.
* Additional support has been added for mapping complex data types. This makes
  it easier to work with geo-spatial types, and data that cannot be represented
  by strings in SQL queries.
* A new ``JsonType`` was added. This new type lets you use the native JSON types
  available in MySQL and Postgres. In other database providers the ``json`` type
  will map to ``TEXT`` columns.
* When entities are converted into JSON, the associated objects are no longer
  converted to an array first using ``toArray()``. Instead, the
  ``jsonSerialize()`` method will be invoked on all associated entities. This
  gives you more flexibility and control on which properties are exposed in JSON
  representations of your entities.
* You can now easily paginate multiple queries in a single controller action/view
  template.
* To help you better manage cached data from the CLI environment, a shell command
  has been added that exposes methods for clearing cached data.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 3.3.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
