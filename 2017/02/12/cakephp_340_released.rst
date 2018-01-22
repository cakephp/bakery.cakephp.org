CakePHP 3.4.0 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.0. This is a stable release for the 3.4 release branch. 3.4.0 provides
a number of improvements to CakePHP. It also deprecates
several features that will be removed in 4.0.0.

CakePHP 3.1.0 End of Life
-------------------------

With the release of 3.4.0, CakePHP 3.1.x becomes end of life and will no longer
receive security updates. 3.2 will continue to enjoy security fixes until the
release of 3.5.0.

Upgrading to 3.4.0
------------------

You can use composer to upgrade to the new version of CakePHP, and receive
bug fix release as they are created, run the following::

    php composer.phar require "cakephp/cakephp:3.4.*"

Deprecations
------------

3.4.0 deprecates a number of methods as we transition away from combined get/set
methods in favour of separate get/set methods. The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-4-migration-guide.html#deprecations>`__
has the full list of deprecated methods and their replacements. Deprecated
features will continue to exist and behave as they always have until 4.0.0

What's new in 3.4.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-4-migration-guide.html>`_ has
a complete list of what's new in 3.4.0. We recommend you give that page a read
when upgrading.

* The CakePHP Request & Response objects now implement the complete set of PSR-7
  interface methods. This allows you to use one set of methods every where in
  your application and leverage libraries that work on PSR-7 compliant objects.
* Routes now support a ``_host`` option allowing you to match URLs on specific
  domains.
* ``Collection::chunkWithKeys()`` allows you to split a collection into chunks
  and preserve the keys for those chunks.
* Email messages can have their priority set.
* ``FormHelper`` can now read default data out of the query string making GET
  forms simple to build.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 3.4.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
