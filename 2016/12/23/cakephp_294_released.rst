CakePHP 2.9.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 2.9.4. This is a maintenance release for the 2.9 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 2.9.4. See the `changelog <https://github.com/cakephp/cakephp/compare/2.9.3...2.9.4>`_ for every commit.

* The hu-HU and lv-LV locales were added.
* Errors are no longer emitted when operating on corrupted cookie data.
* Fix redirectUrl issue when loginRedirect is empty.
* Fix missing HTML encoding when error messages contain HTML. This can
  happen when user data is used as an offset in an array in an unchecked
  way. Thanks to Teppei Fukuda for reporting this issue via the responsible
  security disclosure process.
* TreeBehavior no longer invokes its own methods indirectly via the Model proxy
  method.
* Xml::fromArray() now correctly serializes ``'0'``.

PHP 7.1 Support
----------------

CakePHP 2.9.4 has all tests are passing in PHP7.1. PHP 7.1 is now an officially
supported version for 2.x.


Contributors to 2.9.4
---------------------

Thank you to all the contributors that helped make this release happen:

* Henrik Gemal
* Mark Story
* chinpei215
* domingues

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
