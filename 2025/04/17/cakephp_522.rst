CakePHP 5.2.2
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.2. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 5.2.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.1...5.2.2>`_ for every commit.

* Table finder and method maps are cleaned up when behaviors are unloaded.
* Http/Client now uses ``GET`` instead of ``get`` when making ``GET`` requests.
* Reverted a change to ``NumberHelper`` intended for 5.3.
* Improved MySQL column generation features.
* Improved type annotations for ``Table::getBehavior()``
* Logged and displayed errors now always include location information.
* Added implementation of ``columnDefinitionSql`` to postgres and sqlserver.
* Deprecated defining overlapping short options in command line tools.

Contributors to 5.2.2
----------------------

Thank you to all the contributors that submitted a pull request:

* Adam Halfar
* ADmad
* Fiona Wille
* Marcelo Rocha
* Mark Scherer
* Mark Story

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
