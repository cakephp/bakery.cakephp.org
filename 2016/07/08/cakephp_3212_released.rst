CakePHP 3.2.12 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.2.12. This is a maintenance release for the 3.2 branch that fixes several
community reported issues and adds a few minor features.

Bugfixes
--------

You can expect the following changes in 3.2.12. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.2.11...3.2.12>`_ for changes.

* The console ``TableHelper`` more gracefully handles empty data.  (@thinkingmedia)
* Junction table conditions are now reset correctly. (@ulistaerk)
* ExistsIn and IsUnique application rules are no longer invoked twice. (@markstory)
* Generated junction table classes now inherit the connection of the table
  defining the BelongsToMany association. This makes it easier to have plugin
  specific connections. (@markstory)
* URLs with uppercase protocols are now autolinked by ``TextHelper``. (@ADmad)
* Cache groups defined in injected cache engine instances are now registered
  correctly. (@dakota)
* ``Request::header()`` can now read the ``Content-Length`` and ``Content-Type``
  header values. (@markstory)

Minor Enhancements
------------------

* Schema reflection will now include per-column collation data when available.
  (@chinpei215)
* ``TimeHelper`` now supports an ``outputTimezone`` config option. This lets you
  set a global output timezone making it easier to localise formatted
  dates/times. (@markstory)
* ``HtmlHelper::image()`` now supports ``CID:`` URLs. (@markstory)
* ``Table::findOrCreate()`` now supports an ``atomic`` option. (@thinkingmedia)
* Performance optimizations in ``find(list)`` (@dakota)
* ``Folder::inCakePath()`` is now deprecated. Use ``Folder::inPath()`` instead.
  (@markstory)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
