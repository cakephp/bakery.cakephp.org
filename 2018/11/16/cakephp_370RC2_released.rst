CakePHP 3.7.0-RC2 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.7.0-RC2. This is the release candidate for 3.7.0, and it contains several
new major features. If no major issues are reported a stable release will be
packaged in a few weeks.

3.7 is the **last** planned minor release of CakePHP 3.x before 4.0 is released.
Once 4.0 is released, 2.x will only receive security fixes, and 3.x will only
continue to receive bug & security fix releases. If there is significant
community interest there may be a 3.8 release, but there are no plans at this
point in time.

Updating to the RC
------------------

You can use composer to upgrade to the beta version of CakePHP 3.7.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.7.0-RC2"

We would greatly appreciate it if you temporarily upgraded your application, and
ran your tests. By opening issues for any regressions in the release candidate,
we can help ensure a smoother release of 3.7.0 before the stable release.

What's new in 3.7.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-7-migration-guide.html>`_ has
a complete list of what's new in 3.7.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes since 3.7.0-RC1
-------------------------

* ``Plugin::unload()`` is now deprecated. This mirrors the deprecation for
  ``Plugin::load()``.
* New TestCase methods (``removePlugin()``, ``removePlugins()`` and
  ``clearPlugins()``) have been added to remove plugins at runtime.
* ``LocaleSelectorMiddleware`` will now automatically select a fallback locale
  like ``es`` if a request for ``es-ES`` is made and your application does not
  define an ``es-ES`` locale.
* ``MoParser`` now supports messages without contexts matching the behavior of
  ``PoParser``.
* Backwards incompatible changes in ``ConsoleIntegrationTrait`` were reverted.
* ``Cake\ORM\Query::disableHydration()`` was added.
* ``Cake\View\ViewBuilder::disableAutoLayout()`` was added.
* ``Cake\View\View::disableAutoLayout()`` was added.
* ``Cake\Database\Query::disableBufferedResults()`` was added.
* ``Cake\Database\Driver::disableAutoQuoting()`` was added.
* ``Cake\Database\Query::disableAutoFields()`` was added.
* ``Cake\Datasource\Connection::disableQueryLogging()`` was added.
* ``Cake\Datasource\Connection::disableSavePoints()`` was added.
* Pagination no longer includes the ``direction`` key in generated URLs when
  multiple sort columns are used.
* ``Cake\TestSuite\TestCase::getMockForModel()`` now accepts ``null`` for its
  ``$methods`` parameter.

Contributors to 3.7.0-RC2
---------------------------

* ADmad
* David Yell
* Edgaras Janušauskas
* Ian den Hartog
* Jeremy Harris
* Marc Würth
* Mark Scherer
* Mark Story
* Michael Hoffmann
* Val Bancer
* gregs
* mirko-pagliai
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
