CakePHP 3.6.2 & 3.5.16 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.2. This is a maintenance release for the 3.6 branch that fixes several
community reported issues. The 3.5.16 release contains only one change to
address the potential timing side channel in CSRF tokens.


Bugfixes & New Features
-----------------------

You can expect the following changes in 3.6.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.6.1...3.6.2>`_ for every commit.

* Fixed a potential side channel timing issue in CSRF token validation. Tokens
  are now checked with constant time equality operations. Thank you to Felix
  Wiedemann and Nils Rokita for notifying us of this issue.
* Improved deprecation warnings for ``request->here``.
* ``Cake\Form\Form::validator()`` only emits deprecation warnings now if it is
  implemented by a subclass.
* Additional deprecation warnings that were missed in previous releases were
  added to ``Cake\Mailer\Email``, ``Cake\Database\Type``, and
  ``Cake\View\ViewBuilder``.
* ``HtmlHelper::para()`` now correctly handles ``escape => false`` as an option.
* ``Cake\Http\Client`` no longer treats values starting with ``@`` as file
  paths. This feature has been deprecated since 3.1 and frequently causes issues
  for other users.
* Typehints added to ``TranslateBehavior`` were removed as they caused strict
  errors with userspace sub-classes.
* Improved error reporting when XML content cannot be parsed.


Contributors to 3.6.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Flavius
* Ilie Pandia
* José Lorenzo Rodríguez
* Mark Story

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

