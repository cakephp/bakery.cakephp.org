CakePHP 4.3.3 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.3.3. This is a maintenance release for the 4.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.3.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.3.2...4.3.3>`_ for every commit.

* Improved error handling when OAuth signing encounters SSL errors.
* Fixed regression in ``Router::reverse()`` and how it handles passed arguments.
* Fixed inserting breadcrumbs at the end of the list with ``insertAfter()``.
* Improved API docs.
* Improved error mesages when PDO extensions are missing.

Contributors to 4.3.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Andrii Pukhalevych
* Corey Taylor
* Juan Pablo Ramirez
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
