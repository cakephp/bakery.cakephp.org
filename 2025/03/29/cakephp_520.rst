CakePHP 5.2.0 Released
============================

The CakePHP core team is happy to announce the release of CakePHP 5.2.0.
The 5.2 release includes several behavior changes to increase correctness and
new features. The highlights of those include:

- The ``cake counter_cache`` command was added. This command can be used to
  regenerate counters for models that use ``CounterCacheBehavior``.
- ``ConsoleIntegrationTestTrait::debugOutput()`` makes it easier to debug
  integration tests for console commands.
- Console arguments and options support a ``separator`` option making it
  possible to define parameters like ``--names=foo,bar``
- The ``nativeuuid`` type was added. This type enables ``uuid`` columns to be
  used in Mysql connections with MariaDB. In all other drivers, ``nativeuuid``
  is an alias for ``uuid``.
- A new set of database reflection methods are added. These new methods will be
  used to simplify migrations in future releases.
- ``FormHelper::deleteLink()`` has been added as convenience wrapper for delete
  links in templates using ``DELETE`` method.
- ``HtmlHelper::importmap()`` was added. This method allows you to define
  import maps for your JavaScript files.
- Custom exceptions can have specific error handling logic defined in
  ``ErrorController``.
- ``TestFixture::$strictFields`` was added. Enabling this property will make
  fixtures raise an error if a fixture's record list contains fields that do not
  exist in the schema.

What's new in 5.2.0
-------------------

The `migration guide
<https://book.cakephp.org/5/en/appendices/5-2-migration-guide.html>`_ has
a complete list of what's new in 5.2.0. We recommend you give that page a read
when upgrading as it notes the behavior changes present in 5.2.0.

Contributors to 5.2.0
-------------------------

Thank you to all the contributors that have contributed to this release:

- Adam Halfar
- ADmad
- Erwane Breton
- John Caprez
- Kevin Pfeifer
- kolorafa
- Mark Scherer
- Mark Story
- Masatoshi Ogiwara
- Miguel Enes
- mirko-pagliai
- Nicos Panayides
- othercorey
- RobRikken

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
