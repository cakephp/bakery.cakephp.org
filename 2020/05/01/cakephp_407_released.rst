CakePHP 4.0.7 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.7. This is a maintenance release for the 4.0 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.0.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.0.6...4.0.7>`_ for every commit.

* Improved CSRF generation to fix upgrade errors introduced in 4.0.6
* MailSentWith assertions now include the contents of the messages that did not
  pass the assertion.
* Fixed ``Debugger::exportVar()`` now handles uninitialized typed properties
  from PHP 7.4
* Improved API docstring types.
* Improved rendering of multiline exception messages and messages with inline
  code formatting.
* Improved defining ISO8601 validation rules.

Contributors to 4.0.7
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras Janušauskas
* Erwane Breton
* Johan Meiring
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
