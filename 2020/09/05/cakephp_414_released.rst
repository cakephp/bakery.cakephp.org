CakePHP 4.1.4 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.1.4. This is a maintenance release for the 4.1 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.1.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.1.3...4.1.4>`_ for every commit.

* ``Route`` now normalizes HTTP method names. This prevents hard to diagnose
  route matching failures when a method was miscased.
* The output of ``debug()`` now includes whitespace in the generated HTML. This
  improves the text output when contents are copy and pasted.
* The HTML output of ``debug()`` now includes a 'copy' button to make copying
  the contents easier.
* Parameter name mismatches between interfaces, and implementations were fixed
  in preparation for PHP8's named parameters.
* Invalid UUID values now emit warnings less often during marshalling.
* ``TableRegistry::get()`` now generates aliases correctly when tables are
  fetched with their full qualified namespace name.

Contributors to 4.1.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Mark Scherer
* Mark Story
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
