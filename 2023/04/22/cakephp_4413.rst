CakePHP 4.4.13
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.13. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.13. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.12...4.4.13>`_ for every commit.

- Fix DateTimeType::manyToPHP with int.
- Handle numeric keys in cookies being parsed from the server request.
- Catch all exceptions when generating sql for Query::__debugInfo().
- Fix loading of vendor namespaced plugins.

Contributors to 4.4.13
----------------------

Thank you to all the contributors that helped make this release happen:

- ADmad
- Kevin Pfeifer
- Mark Scherer
- Mark Story
- othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
