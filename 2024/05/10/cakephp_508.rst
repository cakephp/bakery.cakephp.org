CakePHP 5.0.8
=============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.0.8. This is a maintenance release for the 5.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 5.0.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.0.7...5.0.8>`_ for every commit.

- Added connection role to logged queries.
- Improved compatibility with 4.x finders. You can now call finder with named
  parameters but have the finder implemented with an ``$options`` array.
- Eagerloaders now propagate connection roles.
- Error logs from fallback failures in ``WebExceptionRenderer`` now include
  stack traces making debugging easier.
- Update documentation for ``SelectQuery``.
- ``cake i18n extract`` now allows ``--path`` and ``--plugin`` to be provided at
  the same time.

Contributors to 5.0.8
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Alejandro Ibarra
* Corey Taylor
* Jonathan Guillot
* Mark Scherer
* Mark Story
* othercorey
* wowDAS Markus Ramšak

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
