CakePHP 5.3.0-RC2 Released
============================

The CakePHP core team is happy to announce the second release candidate for
CakePHP 5.3.0. Since the previous release candidate, the following changes have
been made:

- Added ``ExistsInNullable`` rule class to make it easier to create exists in
  rules that allow nulls.
- Bugfixes and Improvements to the rate limiter middleware.
- Improved API documentation.
- ``SortField`` treats 'desc' as reverse of the default direction now.
- Fixed ``maxLimit`` restriction on ``PaginatorHelper::limitControl()``.
- Fixed missing type mappings in database schema.
- Missing abstract types no longer raise exceptions. Instead a String type is
  returned.
- Loading plugin classes with the class name of ``Plugin`` is now deprecated.
- Added additional data to cache engine events.
- Fixed deserialization error in ``TableSchema``.
- Added verbose mode output for the ``version`` command.
- Improved error messages when a command is missing.
- Added ``Http\RedirectTrait`` to make it easier to build redirect responses in
  applications and plugins.
- ``Association::__isset()`` now only checks for associations, to be aligned
  with ``__get()``.
- Commands can now implement the ``CommandHiddenInterface`` marker interface to
  hide a command from command listings.

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

Contributors to 5.3.0-RC2
-------------------------

Thank you to all the contributors that have contributed to this release:

* ADmad
* Corey Taylor
* Jasper Smet
* Kevin Pfeifer
* Marcelo Rocha
* Mark Scherer
* Mark Story

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
