CakePHP 4.1.2 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.1.2. This is a maintenance release for the 4.1 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.1.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.1.1...4.1.2>`_ for every commit.

* Fixed usage of deprecated classes internally.
* Fixed TypeError in PHP8.
* Improved type checking in ``Validation::custom()`` and ``localizedTime()``.
* Fixed potential collision with placeholders in ``Text::insert()``.
* Enabled autoloading of models when ``modelClass`` is defined with a fully
  qualified namespace name.
* Enable log formats to log milliseconds.
* Fixed incorrect behavior when sending a ``HEAD`` request and the response
  contains a ``Content-Length`` header.
* Whitespace inside strings output via ``debug()`` is now retained in the HTML
  output format.
* Improve database logging to handle ``SELECT`` queries that return no rows.
* Update external entity loading options to work with newer versions of libxml.
* ``Table::getAlias()`` now handles abstract base classes better.

Contributors to 4.1.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Benjamin Gehrels
* Corey Taylor
* Edgaras Janušauskas
* Marc Würth
* Mark Scherer
* Mark Story
* mcsknp
* Nicky Gerritsen
* othercorey


As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
