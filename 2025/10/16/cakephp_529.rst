CakePHP 5.2.9
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.2.9. This is a maintenance release for the 5.2 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 5.2.9. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.2.8...5.2.9>`_ for every commit.

* Improve PHPUnit usage in tests.
* Fixed DI integration for Components.
* ``TableLocator`` can now fetch table instances by full class name.
* Fixed default value reflection and for SQLite boolean columns.
* Fixed how ``Socket`` detects connection interruptions, by deprecating
  ``$connected`` property, and using ``is_resource()`` instead. This should
  improve behavior of ``SmtpTransport`` in long running processes.
* Improved typehints for ``SelectQuery``.

Contributors to 5.2.9
----------------------

Thank you to all the contributors that submitted a pull request:

* Adam Halfar
* ADmad
* Alberto Pagliarini
* kolorafa
* Mark Scherer
* Mark Story

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
