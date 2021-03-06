CakePHP 3.8.0-RC3 Released
==========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.0-RC3. This is the release candidate for 3.8.0, and it contains several
new major features.

3.8 is the **last** planned minor release of CakePHP 3.x before 4.0 is released.
Once 4.0 is released, 2.x will only receive security fixes, and 3.x will only
continue to receive bug & security fix releases. If there is significant
community interest there may be a 3.9 release, but there are no plans at this
point in time.

Updating to the RC
------------------

You can use composer to upgrade to the beta version of CakePHP 3.8.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.8.0-RC3"

We would greatly appreciate it if you temporarily upgraded your application, and
ran your tests. By opening issues for any regressions in the release candidate,
we can help ensure a smoother release of 3.8.0 before the stable release.

What's new in 3.8.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-8-migration-guide.html>`_ has
a complete list of what's new in 3.8.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes since 3.8.0-RC2
-----------------------

* ``FormContext::error()`` now returns array keys for errors.
* Improved API documentation.
* Improved error messages when associations are missing and association
  properties are accessed.
* Iterating ``PluginCollection`` during application hook methods no longer skips
  hooks anymore.
* Cleaned up ``ConsoleOutput`` constructor.
* ``EntityContext`` can now read validation errors from nested validators.
* Mimetype validation now compares values in a case-insensitive way.
* ``EntityTrait::getVisibleProperties()`` is now deprecated. Use
  ``getVisible()`` instead.

Contributors to 3.8.0-RC3
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Andrej Griniuk
* Corey Taylor
* Mark Scherer
* Mark Story
* Robert Pustułka
* othercorey
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
