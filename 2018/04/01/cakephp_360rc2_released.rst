CakePHP 3.6.0-RC2 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.0-RC2. This is the release candidate for 3.6.0, and if no major issues are
found in the next couple of weeks will become a stable release.

Updating to the beta
--------------------

You can use composer to upgrade to the beta version of CakePHP 3.6.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.6.0-RC2"

We would greatly appreciate it if you temporarily upgraded your application,
and ran your tests. By opening issues for any regressions in the beta, we can
help ensure a smoother release of 3.6.0 before the stable release.

What's new in 3.6.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-6-migration-guide.html>`_ has
a complete list of what's new in 3.6.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes Since 3.6.0-RC1
-------------------------

* ``Cake\Database\Type\DateTimeType::setTimezone()`` was added enabling
  automatic timezone conversion of values before being inserted into the
  database.
* Improved support for UTF8 filenames in ``Cake\Filesystem\File``.
* Added ``BodyParserMiddleware`` to replace content-type parsing features of
  ``RequestHandlerComponent`` with middleware.
* Added ``Collection::append()``, ``prepend()``, ``appendItem()``,
  ``prependItem()``.
* ``PaginatorHelper`` resets the page parameter to 1 each time the sort field is
  changed.
* ``Event`` no longer raises errors for properties defined in subclasses.

Contributors to 3.6.0-RC2
---------------------------

Thank you to all the contributors that helped make this release happen:

* AD7six
* ADmad
* Eugene Ritter
* Florian Krämer
* Mark Scherer
* Mark Story
* Sohel Rana
* saeideng
* sohelrana820

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
