CakePHP 4.3.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.3.5. This is a maintenance release for the 4.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.3.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.3.4...4.3.5>`_ for every commit.

* ``FormHelper`` now correctly detects of entity collections.
* Improved error messages for fixture insertion errors.
* Widened the accepted range for ``psr/log``.
* FormHelper checkbox and radio control ``hiddenField`` options can now be set
  to `''`.
* ``Http\Client`` auth adapters can now be set without ``App.namespace`` being
  set.
* Fixed errors detected by newer versions of static analyzers.

Contributors to 4.3.5
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Cees-Jan Kiewiet
* Corey Taylor
* Mark Story
* Michael Hoffmann
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
