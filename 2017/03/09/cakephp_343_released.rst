CakePHP 3.4.3 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.3. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.2...3.4.3>`_ for every commit.

* ``Query::rowCountAndClose()`` was added enabling you to get a rowcount and
  close a statement in a single method. This is intended to be used with delete
  and update queries.
* ``ServerRequest`` now correctly handles ``$_FILES`` when the keys are out of
  order.
* Newlines in the confirm messages created by FormHelper are now preserved.
* The ``$showHtml`` argument of ``dd()`` is now used.
* CLI commands can now return integers to indicate errors.
* ``Response::withStringBody()`` was added making it easier to create responses
  with simple string bodies.
* The ``lib-ICU`` version requirement was removed. It was causing installation
  issues for many users on windows.
* The elipsis in ``PaginatorHelper::numbers()`` always replaces more than one
  page now. Previously it would sometimes replace only a single page.
* ``cake routes generate`` now parses boolean arguments.
* Incorrect attributes in the XML help for CLI commands have been fixed.
* ``HtmlHelper::meta()`` now accepts the ``block`` option in the custom meta tag
  array data.
* In a nested transaction when a rollback is followed by a commit, an exception
  is now raised as the entire transaction must be aborted when save points are
  not being used. The previous behavior could result in operations following the
  first rollback to succeed as they ran in a standalone transaction.
* Error handling now always includes the file name and line number.
* ``Entity::setVirtual()`` and ``Entity::setHidden()`` now merge non-associative
  array arguments when called multiple times with the merge parameter.
* ``TranslateBehavior``'s ``allowEmptyTranslations`` option no longer creates
  orphaned records when translated text is empty.
* ``Text::highlight()`` now has a ``limit`` option.
* ``TableSchema::removeColumn()`` was added.

Contributors to 3.4.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Brady Pacha
* David Yell
* Dmitrii Romanov
* Edgaras Janušauskas
* José Lorenzo Rodríguez
* Koji Tanaka
* Manuel1948
* Mark Scherer
* Mark Story
* Mathew Foscarini
* Michael Hoffmann
* antograssiot
* chinpei215
* inoas
* macnie
* saeid

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
