CakePHP 3.4.11 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.11. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.11. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.10...3.4.11>`_ for every commit.

* FormHelper will now use the default value for undefined indexes in entity
  fields with array values.
* Fix marshalling time data when locale parsing is enabled and the time format
  looks like a float.
* Fixed a regression in ``ConsoleIo::overwrite()`` introduced in 3.4.10
* Plural messages with '' as their value now fallback to the singular message
  id. This makes plural messages consistent with other translations.

Contributors to 3.4.11
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* David Yell
* Ian den Hartog
* Iandenh
* José Lorenzo Rodríguez
* Mark Story
* Niklas Rother
* Robert Pustułka
* kicaj

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
