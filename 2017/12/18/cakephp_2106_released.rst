CakePHP 2.10.6 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.6. This is a maintenance release for the 2.10 branch that fixes several
community reported issues. This release contains a security fix for
``Controller::postConditions()`` and we recommend you upgrade quickly if you
rely on this function. We'd like to thank 'ooooooo_q' for notifying us of this
issue through our responsible disclosure process and working with us on a fix.

Bugfixes & New Features
-----------------------

You can expect the following changes in 2.10.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.5...2.10.6>`_ for every commit.

* Improved API documentation.
* Improved web test runner compatibility with new versions of PHPUnit.
* ``CakeSession`` now supports a timeout mode that is forwards compatible with
  CakePHP 3.x. This will help improve session compatibility for applications
  that are straddling both versions.
* The ``order`` option to find() once again supports string expressions.
* ``CakeRequest::referer(true)`` correctly handles protocol relative URLs
  embedded in the path.
* ``Controller::postConditions()`` now raises exceptions when characters outside
  of ``A-Za-z0-9_-`` are found in the model or field names.

Contributors to 2.10.6
----------------------

Thank you to all the contributors that helped make this release happen:

* Koji Tanaka
* Mark Sch
* Mark Story
* Mischa ter Smitten
* Val Bancer
* chinpei215
* db-bogdan

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news, security
