CakePHP 3.7.4 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.7.4. This is a maintenance release for the 3.7 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.7.4. See the `changelog <https://github.com/cakephp/cakephp/compare/3.7.3...3.7.4>`_ for every commit.

* Requests made in ``IntergrationTestCase`` can now overwrite ``PHP_SELF``.
* Improved API documentation and IDE typehinting.
* Saving entities with non-scalar primary key values now works as expected.
* Errors when persistence has failed now include more information on which
  validation rules caused the failure.
* The optional dependencies for ``cakephp/core`` are now more clearly
  communicated.

Contributors to 3.7.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* gregs
* mosaxiv

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
