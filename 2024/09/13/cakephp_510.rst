CakePHP 5.1.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.1.0. 5.1.0 provides a number improvements to CakePHP. 5.1.0 introduces a small
number of deprecation warnings. Any deprecations introduced now will continue to
have consistent behavior until their removal in 6.0.0. There is no scheduled
date for 6.0.0 at this time.

Upgrading to 5.1.0
------------------

You can use composer to upgrade to CakePHP 5.1.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:5.1.*"

Deprecation Warnings
--------------------

5.1 introduces a few deprecations. All of these features will continue for the
duration of 5.x but will be removed in 6.0. See the `migration guide
<https://book.cakephp.org/4/en/appendices/5-1-migration-guide.html>`_.

What's new in 5.1.0?
--------------------

The `migration guide
<https://book.cakephp.org/4/en/appendices/5-1-migration-guide.html>`_ has
a complete list of what's new in 5.1.0. We recommend you give that page a read
when upgrading. A few highlights from 5.1.0 are:

- ``RedisEngine`` now supports TLS connections.
- ``bin/cake plugin list`` has been added to list plugin metadata.
- Optional ``Command`` arguments can now have a ``default`` value.
- ``BannerHelper`` was added. This command helper can format text as a banner
  with a coloured background and padding.
- Components can now use the DI container to have dependencies resolved and
  provided as constructor parameters just like Controllers and Commands do.
- The ``toString``, ``toInt``, ``toBool``, ``toDate``, and ``toDateTime``
  functions were added. They give you a typesafe way to cast request data or
  other input and return ``null`` when conversion fails.
- ``pathCombine()`` was added to help build paths without worrying about
  duplicate and trailing slashes.
- A new ``events`` hook was added to the ``BaseApplication`` as well as the
  ``BasePlugin`` class.
- Support for ``point``, ``linestring``, ``polygon`` and ``geometry`` types were
  added to the Database package.
- ``SelectQuery::intersect()`` and ``SelectQuery::intersectAll()`` were added.
- ``Client`` now emits ``HttpClient.beforeSend`` and ``HttpClient.afterSend``
  events when requests are sent.
- ``Http\Server`` now emits ``Server.terminate`` event to run logic after the
  response has been sent in fastcgi environments. In other environments the
  ``Server.terminate`` event runs *before* the response has been sent.
- View cells now emit events around their actions ``Cell.beforeAction`` and
  ``Cell.afterAction``.
- ``Validation::enum()``, ``Validator::enum()``, ``Validation::enumOnly()``, and
  ``Validation::enumExcept()`` were added to further simplify validating backed
  enum values.
- ``HtmlHelper`` can now create a meta tag with the CSRF token in it.

Contributors to 5.1.0
---------------------

Thank you to all the contributors that helped make 5.1 happen:

* Adam Halfar
* ADmad
* Alejandro Ibarra
* Fernando Herrero
* Frank de Graaf (Phally)
* Jamison Bryant
* J.Brabec
* Jozef Grencik
* Kevin Pfeifer
* KrzysiekNDS
* Mark Scherer
* Mark Story
* Maximilian Ruta
* ndm2
* Nicos Panayides
* othercorey
* Robert Pustułka

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 5.1.0 is a large
release and would not have been possible without the community support and
feedback.

What's Next
-----------

With 5.1.0 shipped, future feature work will continue on `5.next` and eventually
form 5.2.0. Bugfixes for 5.1 will be done in the `5.x` branch, and 5.0 will
receive security fixes until the release of 5.3.

The roadmap for 5.x is still under development. We're interested in making the
upgrade from 5.0 to 5.1 a smooth one, and would appreciate any feedback you
have on upgrade difficulties. Please open an issue and get the discussion started.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
