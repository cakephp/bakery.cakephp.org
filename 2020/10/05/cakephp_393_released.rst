CakePHP 3.9.3 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.3. This is a maintenance release for the 3.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.9.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.9.2...3.9.3>`_ for every commit.

* Reduce the usage of deprecated features in Http package.
* Fixed HasMany associations not applying ``conditions`` defined within
  a closure during an unlink operation.
* Cookies can have their ``SameSite`` attribute defined in PHP 7.3+.
* Improved API documentation.

Contributors to 3.9.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* itosho
* Mark Story
* Mischa ter Smitten

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
