CakePHP 3.8.0-RC2 Released
==========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.0-RC2. This is the release candidate for 3.8.0, and it contains several
new major features. If no major issues are reported a stable release will be
packaged in a few weeks.

3.8 is the **last** planned minor release of CakePHP 3.x before 4.0 is released.
Once 4.0 is released, 2.x will only receive security fixes, and 3.x will only
continue to receive bug & security fix releases. If there is significant
community interest there may be a 3.9 release, but there are no plans at this
point in time.

Updating to the RC
------------------

You can use composer to upgrade to the beta version of CakePHP 3.8.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.8.0-RC2"

We would greatly appreciate it if you temporarily upgraded your application, and
ran your tests. By opening issues for any regressions in the release candidate,
we can help ensure a smoother release of 3.8.0 before the stable release.

What's new in 3.8.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-8-migration-guide.html>`_ has
a complete list of what's new in 3.8.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes since 3.8.0-RC1
-----------------------

* Plural rules for Turkish were corrected.
* Changing the locale partway during a process no longer results in incorrect
  values being generated.
* Improved deprecation warnings.
* Improved API documentation.
* ``CsrfMiddleware`` now supports disabling CSRF checks on a per-request basis
  by setting a ``whitelistCallback``.
* Fixed absolute URL handling in ``IntegrationTestCase``.
* Controller ``afterFilter`` callbacks now has access to the response returned
  by the controller action.
* ``assertExitSuccess()`` and ``assertExitError()`` were added to
  ``ConsoleIntegrationTestTrait``.

Contributors to 3.8.0-RC2
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Mark Scherer
* Mark Story
* andrii-pukhalevych
* 時流

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
