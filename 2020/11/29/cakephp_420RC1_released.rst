CakePHP 4.2.0-RC1 Released
==========================

The CakePHP core team is proud to announce the first release candidate of
CakePHP 4.2.0. The 4.2.0 release will introduce several new features and
a handful of deprecations. The added features include formal support for PHP8,
experimental support for a dependency injection container, a new session
based CSRF middleware, improved APIs for database subqueries, and a new Flash
Utility.

New Features
------------

The `migration guide
<https://book.cakephp.org/4.next/en/appendices/4-2-migration-guide.html>`_ has
a complete list of what's new in 4.2.0. We recommend you give that page a read
when upgrading as it outlines the deprecations present in 4.2.

Changes Since 4.2.0-beta1
-------------------------

* ``Http\Client::createFromUrl()`` was added.
* Improved errors when ``INSERT`` queries cannot be compiled.
* ``TableHelper::output()`` now has a ``text-right`` tag to right align
  cell content.
* ``TestFixture::isManaged()`` was added to make whether a fixture manages
  schema more explicit.
* ``UrlHelper`` now supports the ``assetUrlClassName`` option, which allows you
  to replace the class used to generate static asset URLs.
* ``TableLocator::allowFallbackClass()`` was added. This method lets you disable
  automatic fallback table class in a locator.
* ``Http\FlashMessage`` was added. This utility class enables flash messages to
  be manipulated from within middleware.
* ``Http\ServerRequest::getFlash()`` was added to expose the new flash utility.
* Fixing binding conflicts in SQLServer queries.
* Added ``Application.buildContainer`` event. This event is triggered when the
  application container is built.
* Integration test traits had the ``mockService()`` method added to enable
  straightforward mocking of services in tests.

How you Can Help
----------------

You can help by trying out the RC in your application. Please open issues for
any new test failures or regressions the new version creates in your
application.

Contributors to 4.2.0-RC1
---------------------------

Thank you to all the contributors that have helped with 4.2.0:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Eugene Ritter
* Ikko Ashimine
* imo-tikuwa
* Juan Basso
* Mark Scherer
* Mark Story
* ndm2
* othercorey
* saeideng
* tikuwa

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
