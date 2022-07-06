CakePHP 4.4.2 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.2. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.4.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.1...4.4.2>`_ for every commit.

* Updated constraints on laminas packages.
* Improved ``EntityTrait::_accessible`` type annotation.
* Added the ``encrypt`` and ``trustServerCertificate`` options to
  ``SqlServerDriver``.
* When ``viewClasses()`` based extension driven content-negotiation fails
  a ``NotFoundException`` will now be raised.
* Fixed ``ServerRequest::is('xml')`` from returning true on the default
  ``Accept`` header sent by firefox.
* Added deprecation for the ``Error.errorLogger`` configure option. This was
  missed during the development of the ``ErrorTrap`` sub-system.
* Improved API documentation.

Contributors to 4.4.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Cristian Haunsen
* Mark Story
* Michael Hoffmann
* Nicos Panayides
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
