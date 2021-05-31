CakePHP 3.9.10 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.10. This is a maintenance release for the 3.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.9.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.9.9...3.9.10>`_ for every commit.

* Fixed 'text file busy' errors that occur with file caching and virtual
  machines.
* Fixed type information being lost when translating tuple comparisons. The
  surrogate queries did not inherit type map information.
* Fixed types not being used when marshalling ``_ids`` and composite keys.
* Added missing encoding to OAuth1 client when the consumer_key is a base64
  encoded string.

Contributors to 3.9.10
----------------------

Thank you to all the contributors that helped make this release happen:

* othercorey
* Mark Story
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
