CakePHP 2.10.0 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.0. 2.10.0 is a backwards compatible feature release for the 2.x series. As
:doc:`previously announced </2017/06/23/upcoming-cakephp-roadmap>` 2.10 is the
*last* feature release for 2.x. Going forward, 2.x will only receive bug fixes
and security patches.

What's new in 2.10.0
--------------------

The `migration guide
<https://book.cakephp.org/2.x/en/appendices/2-10-migration-guide.html>`_ has
a complete list of what's new in 2.10.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes from 2.10.0-RC1
-----------------------

You can expect the following changes in 2.10.0. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.0-RC1...2.10.0>`_ for every commit.

* Schema reflection now handles ``CURRENT_TIMESTAMP()`` as a default value from
  MariaDB.
* Pagination with TranslateBehavior and ``NOT`` expressions now works as
  expected.
* The default application includes composer scripts like the application
  skeleton in 3.x does.
* Test stability under MySQL 5.7 has been improved.
* Shell commands now display an error when unknown options are used. This
  feature was backported from 3.x.

Contributors to 2.10.0
----------------------

Thank you to all the contributors that helped make this release happen:

* Koji Tanaka
* Kurre Ståhlberg
* Mark Story
* Val Bancer

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
