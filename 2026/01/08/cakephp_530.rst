CakePHP 5.3.0 Released
======================

The CakePHP core team is happy to announce the release of CakePHP 5.3.0. With
the release of 5.3.0, we're ending bugfix support for CakePHP 5.2. Both 5.1 and
5.2 continue to receive security updates until the release of 5.4.0 or 6.0.0.
It is also the end of support for bugfixes for CakePHP 4.x. The core team will
continue to provide security updates for CakePHP throughout 2026.

What's new in 5.3.0
-------------------

Some highlights of the 5.3.0 release include:

- Added Redis Cluster support to ``RedisEngine``. Configure the ``cluster`` option
  with an array of server addresses to enable cluster mode.
- Several :ref:`cache-events` were added to allow monitoring the caching behavior.
- ``cake plugin assets symlink`` command now supports a ``--relative`` option to
  create relative path symlinks. This is useful when creating symlinks within
  containers that use volume mounts.
- ``cake server`` now supports a ``--frankenphp`` option that will start the
  development server with `FrankenPHP <https://frankenphp.dev/>`__.
- Added ``TreeHelper`` which outputs an array as a tree such as an array of
  filesystem directories as array keys and files as lists under each directory.
- Added the ability to group commands in console help output.
- New DI container support for the ``#[Configure]`` attribute have data injected
  from ``Configure``, and the ``TableContainer`` delegate that lets you inject
  ORM Tables into your services.
- Added support for additional column types in MySQL, and Postgres bringing
  CakePHP's database type support close to parity with phinx. Queries can also
  define optimizer hints for engine specific optimizations.
- The new ``RateLimitMiddleware`` provides configurable rate limiting for your
  application to protect against abuse and ensure fair usage of resources. It
  supports multiple identification strategies (IP, user, route, API key),
  different rate limiting algorithms (sliding window, fixed window, token bucket),
  and advanced features like custom identifiers, request costs, and dynamic limits.
- Added ``DateTimePeriod`` which wraps a php ``DatePeriod`` and returns ``DateTime``
  instances when iterating.
- Added ``SelectQuery::projectAs()`` for projecting query results into
  lightweight Data Transfer Objects (DTOs) for read-only data access.
- Added new fluent builders for defining the ``sortableFields`` data of your
  pagination operations. The new builders allow you to define complex sorting
  for both virtual and real fields, with multi-column and pinned sorting
  support.
- Additional assertions for redirect responses in integration tests.

The `migration guide
<https://book.cakephp.org/5/en/appendices/5-3-migration-guide.html>`_ has
a complete list of what's new in 5.3.0. We recommend you give that page a read
when upgrading as it notes the behavior changes present in 5.3.0.

Contributors to 5.3.0
---------------------

Thank you to all the contributors that have contributed to 5.3.0:

* ADmad
* Alberto G. Rodriguez
* Christian
* Corey Taylor
* Gerson Felipe Schwinn
* Jamison Bryant
* Jasper Smet
* Joris Vaesen
* Juhani Aronen
* Kevin Pfeifer
* Lauri Tunnela
* Marcelo Rocha
* Mark Scherer
* Mark Story
* Murl080
* Nicos Panayides
* othercorey
* scribblemaniac
* Steve
* Umer Salman
* Val Bancer

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
