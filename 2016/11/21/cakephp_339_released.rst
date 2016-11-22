CakePHP 3.3.9 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.9. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.9. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.8...3.3.9>`_ for every commit.

* An invalid option was removed from JsonView.
* ShellDispatcher now logs fewer warnings about duplicate shells when debug
  logging is enabled.
* The exception message raised when an ORM update fails due to missing primary
  key values has been improved.
* ``Xml::toArray()`` no longer errors on tag names that match application class
  names.
* Console errors no longer include duplicate tags when invalid options are used.
* Improved API documentation for return & parameter types.
* Router no longer parses extensions in a greedy way.
* Route key elements can now be a single character.

New Features
------------

The 3.3.9 introduces a few new features:

* BreadCrumbsHelper was added. This helper offers and improved API over the
  existing breadcrumb features offered by HtmlHelper.
* ``Cake\Network\Response`` now features a ``__debugInfo()`` method.


Contributors to 3.3.9
---------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* David Yell
* Guillaume "Elektordi" Genty
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Mathew Foscarini
* Walther Lalk
* Yves P
* chinpei215
* luke83

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
