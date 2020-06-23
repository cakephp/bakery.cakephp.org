CakePHP 4.0.9 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.9. This is a maintenance release for the 4.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.0.9. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.0.8...4.0.9>`_ for every commit.

* Added support for ``AUTH PLAIN`` to ``SmtpTransport``.
* Improved API docblocks and type annotations.
* Removed usage of ``ReflectionParameter::getClass()`` as it is deprecated in
  PHP 8.
* Improved performance of ``ServerRequest::is()`` and ``isAll()``.
* Fixed warnings in ``SecurityComponent``, ``FormProtector`` and
  ``CsrfProtectionMiddleware`` when handling invalid non-scalar data.
* Fixed incorrect paths in missing layout error pages.

Contributors to 4.0.9
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Mark Scherer
* Mark Story
* andrii-pukhalevych

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
