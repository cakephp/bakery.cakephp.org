CakePHP 3.9.0-RC2 Released
==========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.0-RC2. This is the release candidate for 3.9.0, and it contains several
new major features. If no major issues are reported a stable release will be
packaged in a few weeks.

3.9 contains several new features that have been backported from 4.0 and 4.1.
The intent of these new features and backports is to ease upgrading applications
from 3.x to 4.x.

Updating to the RC
------------------

You can use composer to upgrade to the beta version of CakePHP 3.9.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.9.0-RC2"

We would greatly appreciate it if you temporarily upgraded your application, and
ran your tests. By opening issues for any regressions in the release candidate,
we can help ensure a smoother release of 3.9.0 before the stable release.

What's new in 3.9.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-9-migration-guide.html>`_ has
a complete list of what's new in 3.9.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes Since 3.9.0-RC1
-----------------------

* Added ``Cake\Orm\Query::clearResult()``. This method makes it easier to re-use
  a query object to fetch results multiple times.
* The ``__()`` family of functions no longer have ``null`` in their return type.
  Instead they always return a string. This behavior was backported from 4.0
* Improved API documentation.


Contributors to 3.9.0-RC2
---------------------------

Thank you to all the contributors that helped make this release happen:

* Corey Taylor
* Frank de Graaf
* Mark Story
* Val Bancer
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
