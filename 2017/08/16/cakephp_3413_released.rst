CakePHP 3.4.13 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.13. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.13. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.12...3.4.13>`_ for every commit.

* Empty MO files are no longer ignored by I18n message collections.
* Missing Controller error messages were improved when routing parameters were
  not correctly inflected.
* Improved compatibility with PHP7.2.
* The ``hiddenField`` option for radio buttons now works as documented.
* Nested fields and multi-record forms using the ArrayContext are easier to
  define as default values and schema options fallback root level entities.
* ``Cake\Datasouce\EntityTrait::setDirty()`` now returns ``$this`` as
  documented.
* Improved database URI parsing making it possible to use usernames/passwords
  with ``#`` in them.
* Improved compatibility with Memcached 3.x by removing check for ``use_sasl``
  ini setting.
* Improved API documentation.
* Sqlserver connections now raise an error when the ``persistent`` flag is used.
  This option never worked correctly, and should not be used.
* Connections no longer unset their driver on destruction fixing use after free
  issues.

Contributors to 3.4.13
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bernat Arlandis
* Bryan Crowe
* David Yell
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Michael Hoffmann
* Mike Fellows
* antograssiot
* chinpei215
* inoas
* lilHermit
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
