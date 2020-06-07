CakePHP 2.10.22 Released
========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.22. This is a maintenance release for the 2.10 branch that fixes
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.10.22. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.21...2.10.22>`_ for every commit.

* Improve API documentation.
* Fix UUID generation to not include host or IP based information. This aligns
  the implementation with the documented behavior of being a v4 UUID.
* Improved performance of ``Request::is()`` and ``Request::isAll()``

Contributors to 2.10.22
-----------------------

Thank you to all the contributors that helped make this release happen:

* Mark Sch
* Mark Story
* Richard van den
* Val Bancer
* andrii-pukhalevych
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
