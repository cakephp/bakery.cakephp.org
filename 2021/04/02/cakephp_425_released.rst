CakePHP 4.2.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.5. This is a maintenance release for the 4.2 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.2.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.2.4...4.2.5>`_ for every commit.

* Improved time format in response headers. Previously leading 0s were missing.
* Improved API documentation.
* Fixed ``RouteBuilder::plugin()`` not forwarding the ``_namePrefix`` option.
* Improved accuracy of database query log timers.
* Fixed ``BufferedIterator`` not returning all results after being partially
  iterated and then iterated a second time.
* The standalone database package no longer emits a type error when
  ``App.namespace`` is undefined and the connection does not exist.

Contributors to 4.2.5
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Mark Scherer
* Mark Story
* othercorey
* Saleh Souzanchi
* Tobse

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
