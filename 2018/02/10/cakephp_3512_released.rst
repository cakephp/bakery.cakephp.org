CakePHP 3.5.12 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.12. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.12. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.11...3.5.12>`_ for every commit.

* ``Router::url()`` now works correctly when the ``_ssl`` and ``_full`` options
  are combined.
* ``View`` no longer fails to add an extension subdirectory when the current
  controller's name is the same lenght as the extension name.
* ``cake plugin symlink`` now offers an overwrite option.
* ``Folder::isRegisteredStreamWrapper()`` now handles custom stream names.
* Queries using ``leftJoinWith()`` and auto-fields no longer creates invalid
  SQL.
* ``cake server`` now allows the ini file used by the server process to be
  defined via the ``ini_path`` option.
* The bundled CA file was updated to the latest version from mozilla.
* ``FormHelper::control()`` now passes the ``required`` attribute into the
  datetime widget correctly.
* ``ObjectRegistry::normalizeArray()`` no longer corrupts the array structure
  when called multiple times on the same data.

Contributors to 3.5.12
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Daren Sipes
* Eugene Ritter
* Jose Diaz-Gonzalez
* Mark Scherer
* Mark Story
* ericadeefox
* mtak3

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
