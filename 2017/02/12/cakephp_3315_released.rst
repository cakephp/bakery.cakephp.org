CakePHP 3.3.15 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.15. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

This will be the last bugfix release for 3.3, as 3.4.0 is to be released later
today. After this release, 3.3 will only receive security fixes.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.3.15. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.14...3.3.15>`_ for every commit.

* Improved API documentation types.
* QueryLogger no longer strips ``$`` and ``\`` when re-creating SQL queries.
* Custom attributes can be passed down to checkboxes and radio buttons now.
* Added ``labelOptions`` for multi-checkbox/radio widgets, enabling these widgets
  to have additional attributes defined on the label elements through the
  ``labelOptions`` key.
* Whitespace before text inside HTML tags no longer causes ``assertHtml()`` to
  fail.

Contributors to 3.3.15
----------------------

Thank you to all the contributors that helped make this release happen:

* Bryan Crowe
* Edgaras Janušauskas
* José Lorenzo Rodríguez
* Marc Würth
* Mark Scherer
* Mark Story
* lilHermit

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
