CakePHP 3.8.11 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.11. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.11. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.10...3.8.11>`_ for every commit.

* Added deprecation notice about ``ResponseEmitter`` to ``Response::send()``.
* Fixed a division by 0 warning when file cache gc probability is set to 0.
* Updated deprecation warning supression for test suites in PHP 7.4.
* Allow usage of unassigned HTTP status codes between 100 and 599.

Contributors to 3.8.11
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Mark Story
* Rachman Chavik

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
