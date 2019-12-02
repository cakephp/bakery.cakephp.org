CakePHP 4.0.0-RC2 Released
==========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.0-RC2. This is the second and hopefully final release candidate for 4.0.0,
and contains all the major features that are planned for 4.0.0. If no major
issues are reported a stable release will be packaged in two weeks.

Updating to the RC
------------------

You can use composer to upgrade to the beta version of CakePHP 4.0.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:4.0.0-RC2"

We would greatly appreciate it if you temporarily upgraded your application, and
ran your tests. By opening issues for any regressions in the release candidate,
we can help ensure a smoother release of 4.0.0 before the stable release.

What's new in 4.0.0?
--------------------

The `migration guide
<https://book.cakephp.org/4/en/appendices/4-0-migration-guide.html>`_ has
a complete list of what's new in 4.0.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes since 4.0.0-RC1
-------------------------

* ``Validation::compareFields()`` now works with null values.
* Email attachments now URL encode filenames with non-ascii characters.
* Added ``assertRedirectEquals()`` to allow assertions without the base path
  being added.
* Removed ``Http\Server::setRunner()``, as the runner can be provided as
  a constructor argument now.
* Improved error messages from ``QueryExpressions`` when null is used with an
  incompatible operator.
* Added deprecation warnings for ``Validator::allowEmpty()`` and
  ``Validator::notEmpty()``.
* The ``safe`` option was removed from ``HtmlHelper::script()`` and
  ``scriptBlock()``. This option is not needed in an HTML5 context.
* ``HtmlHelper::docType()`` is now deprecated.
* The ``console`` package was more thoroughly tested in isolation and several
  problems were fixed.
* ``FormProtectionComponent`` now works with applications in sub-directories.
* ``Validator::errors()`` was deprecated and is replaced by ``validate()``.


Contributors to 4.0.0-RC2
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Chetan Varshney
* Corey Taylor
* Edgaras Janušauskas
* Mark Scherer
* Mark Story
* Martin Matthaei
* gregs
* othercorey
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
