CakePHP 4.3.0-RC4 Released
==========================

The CakePHP core team is proud to announce the first release candidate of
CakePHP 4.3.0. The 4.3.0 release will introduce several new features and
a handful of deprecations. 

New Features
------------

The `migration guide
<https://book.cakephp.org/4.next/en/appendices/4-3-migration-guide.html>`_ has
a complete list of what's new in 4.3.0. We recommend you give that page a read
when upgrading as it outlines the deprecations present in 4.3.

Changes from RC3
----------------

Since the release of 4.3.0-RC3 the following changes have been made:

* A new fluent builder for ``CASE`` expressions was added to
  ``QueryExpression``.
* ``QueryExpression::addCase()`` is now deprecated.
* Associations that load records with the ``subquery`` strategy, no longer
  include a ``LIMIT`` clause if there is no ``ORDER BY`` on the query.
* CakePHP's dependency on ``league/container`` was bumped to ``^4.x`` this may
  cause type errors with ServiceProvider implementations.
* The new fixture system was further refined, both in API and performance. These
  changes may cause incompatibilities with applications using previous release
  candidates.
* Fixed the singular form of 'lenses' to 'lens'.

How you Can Help
----------------

You can help by trying out the RC in your application. Please open issues for
any new test failures or regressions the new version creates in your
application.

Contributors to 4.3.0-RC4
---------------------------

Thank you to all the contributors that have helped with 4.3.0:

* ADmad
* Corey Taylor
* Mark Scherer
* Mark Story
* ndm2

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
