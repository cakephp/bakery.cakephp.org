CakePHP 5.3.0-RC1 Released
============================

The CakePHP core team is happy to announce the first release candidate for
CakePHP 5.3.0. The 5.3 release includes several behavior changes to increase
correctness and new features. The highlights of those include:

- Minium PHP version requirement is now PHP 8.2.0.
- The Redis cache engine now supports Redis clusters.
- ``cake plugin assets symlink`` command now supports a ``--relative`` option to
  create relative path symlinks.
- ``cake server`` now supports a ``--frankenphp`` option that will start the
  development server with `FrankenPHP <https://frankenphp.dev/>`__.
- Added ``Configure`` attribute to support injecting ``Configure`` values into
  constructor arguments.
- Added ``Query::optimizerHint()`` which accepts engine-specific optimizer hints.
- Added additional database types for ``year``, ``inet``, ``cidr``, and
  ``macaddr``.
- Added ``Date::getTimestamp()``. This method returns an int of the date's
  timestamp.
- ``Table::patchEntity()``, ``Table::newEntity()``, ``Marshaller::one()`` and
  ``Marshaller::many()`` now accept a ``strictFields`` option that only applies
  validation to the fields listed in the ``fields`` option.
- Added ``TableContainer`` that you can register in your Application::services() to
  add dependency injection for your Tables.
- Added a new fluent interface and value objects for defining sortable fields.
  The ``sortableFields`` option now of ``Paginator`` now accepts a callable that
  receives a ``SortableFieldsBuilder`` instance, allowing you to map friendly
  sort keys to database fields with multi-column sorting and direction control.
- Added ``SortField`` class for defining sort field configurations with
  customizable default directions and locked directions, (e.g.
  ``SortField::desc('created', locked: true)``).
- Added support for combined sorting keys in URLs (e.g., ``?sort=title-asc``)
- ``assertRedirectBack()`` and ``assertRedirectBackToReferer()`` were added to
  improve ergonomics of asserting redirects.
- ``HtmlHelper::scriptStart()`` and ``scriptEnd()`` now allow simple
  wrapping script tags (``<script>...</script>``) around inline JavaScript. This
  enables syntax highlighting in many editors.
- ``StringTemplate::addClassNames()`` was added to provide a more ergonomic way
  to generate class names.
- ``Cake\Http\Middleware\RateLimiterMiddleware`` was added to provide
  rate limiting functionality for applications.

What's new in 5.3.0
-------------------

The `migration guide
<https://book.cakephp.org/5.next/en/appendices/5-3-migration-guide.html>`_ has
a complete list of what's new in 5.3.0. We recommend you give that page a read
when upgrading as it notes the behavior changes present in 5.3.0.

How you Can Help
----------------

You can help deliver 5.3.0 by contributing in one of many ways:

#. Check the `documentation <https://book.cakephp.org/5.next/en/>`_ for mistakes,
   outdated, unclear or broken examples. We've been trying to update the
   documentation as we go, but there are likely examples or sections we've
   missed.
#. Try it out! Give CakePHP 5.3.0 a test drive. Let us know how upgrading
   went and if there were any rough spots.
#. File issues for regressions in existing features, or suggest new features.
   Even if those features don't make it into 5.3.0, we're early in the process
   of planning 5.3 and value community feedback.

Contributors to 5.3.0-RC1
-------------------------

Thank you to all the contributors that have contributed to this release:

- ADmad
- Alberto G. Rodriguez
- Christian
- Corey Taylor
- Jamison Bryant
- Juhani Aronen
- Kevin Pfeifer
- Lauri Tunnela
- Marcelo Rocha
- Mark Scherer
- Mark Story
- Murl080
- Nicos Panayides
- nook24
- Steve
- Umer Salman
- Val Bancer

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
