CakePHP 4.2.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.4. This is a maintenance release for the 4.2 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.2.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.2.3...4.2.4>`_ for every commit.

* Fix ``bin/cake routes check`` not handling redirect routes correctly.
* Removed a connection flag from the SQLServer driver that is incompatible with
  pdo_sqlsrv 5.9+.
* Improved API documentation.
* Console ``TableHelper`` now accepts integers and floats as cell values.
* Updated documentation for ``ServerRequest::is()`` to allow ``mixed``.
* Improved PHP8 compatibility for silenced errors.
* Aligned ``Entity::isEmpty()`` and ``Entity::hasValue()`` to treat ``'0'`` as
  a non-empty value. This aligns the behavior with documentation and original
  intent.
* DatabaseSession now uses the session table's entity when creating/deleting
  records.
* Fixed path handling in ``FileCache`` to prevent deleting an empty paths.

Contributors to 4.2.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* AdmDevelopment
* Alexander Volle
* Mark Story
* mirko-pagliai
* mtak3
* ndm2
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
