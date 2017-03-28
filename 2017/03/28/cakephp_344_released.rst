CakePHP 3.4.4 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.4. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.3...3.4.4>`_ for every commit.

* ``Hash::filter()`` no longer removes ``0.0``.
* Error messages now include file and line numbers more often.
* Logging now handles string scopes more consistently.
* The ORM no longer emits errors when an association's alias does not match the
  linked table's alias. This allows you to leverage the ``targetTable`` option
  in associations to make association names that do not need to match the linked
  table.
* ``HtmlHelper::scriptStart()`` not longer emits CDATA blocks by default
  anymore. This makes ``scriptStart()`` consistent with ``script()``.
* ``TranslateBehavior::translationField()`` returns standard table alias for
  default locale.
* Improved API documentation.
* Allow getting configured datetime class for Type class.

Contributors to 3.4.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* José Lorenzo Rodríguez
* Koji Tanaka
* Mark Scherer
* Mark Story
* Robert Pustułka
* Roberto Maldonado
* Sevvlor
* chinpei215
* inoas
* saeid
* saeideng
* ypnos-web

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
