CakePHP 5.3.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.3.5. This is a maintenance release for the 5.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.3.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.3.4...5.3.5>`_ for every commit.

* Fixed a regression where the SameSite cookie attributes would only be applied
  to the ``php`` preset.
* ``ConsoleOutput::write()`` now guards against closed file handles.
* Console runner now shows help text instead of an error on invalid command
  names.

Contributors to 5.3.5
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Juan Pablo Ramirez
* Kevin Pfeifer
* Mark Scherer
* Mark Story

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
