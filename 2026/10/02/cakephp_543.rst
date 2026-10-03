CakePHP 5.4.3 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.4.3. This is a maintenance release for the 5.4 branch that fixes
community reported issues, regressions.

Bugfixes
--------

You can expect the following changes in 5.4.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.4.2...5.4.3>`_ for every commit.

* Improve API doc blocks for ``SelectQuery``.
* Fix typos in ``QueryCompiler`` doc blocks.
* Improve compatibility of ``subquery`` association loading with MariaDB.
* Fix warnings in postgres driver when disabling constraints.
* ``Mailer\Message`` now allows ``transferEncoding`` to be set in a mailer
  profile.
* Fix mismatched body encoding when using the ``base64`` or ``quoted-printable``
  transfer encodings.
* ``SchemaDialect::columnDefinitionSql()`` now preserves the ``unsigned``
  attribute when operating on unknown abstract column types.
* Fixed a performance regression related to duplicate query expression visitor
  traversals.
* Added periodic docker image builds to streamline getting started with docker.
* Added safety warnings to query builders. Thank you to Feei for reporting these
  documentation gaps through our security mailing list.

Contributors to 5.4.3
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Jefferson Gonçalves
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* Mauro Brandoni
* mdalikadar
* MD Ali Kadar
* Nicos Panayides
* onice
* Tobse

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
