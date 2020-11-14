CakePHP 3.9.4 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.4. This is a maintenance release for the 3.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.9.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.9.3...3.9.4>`_ for every commit.

* The ``pj()`` function now supports UTF-8 data better.
* Fixed warning about SameSite index when upgrading from earlier versions of
  3.x.
* Improved API documentation.
* Added upper PHP version constraint of ``<8.0``. Because 3.x has several
  dependencies that are not compatible with PHP8, we also cannot easily support
  PHP8 without breaking compatibility.

Contributors to 3.9.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Mark Story
* Saleh Souzanchi
* Tadahisa Motooka
* terry.kern

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
