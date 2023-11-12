CakePHP 4.5.1
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.5.1. This is a maintenance release for the 4.4 branch that fixes several
community reported issues and a minor security related fix.

Bugfixes
--------

You can expect the following changes in 4.5.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.5.0...4.5.1>`_ for every commit.

* ``ControllerFactory`` no longer raises errors on ``union`` typed parameters.
* ``Collection::combine()`` raises an error when keys are ``null``.
* Namespaced core functions are now wrapped in ``function_exists`` calls
  resolving errors if the file containing these functions are imported more than
  once.
* Added schema mapping type to sqlite for ``UUID_TEXT``.
* Reverted deprecated annotation on ``LocatorAwareTrait::$defaultTable`` property.

Contributors to 4.5.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Jorge González
* Kevin Pfeifer
* Mark Scherer
* Mark Story

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
