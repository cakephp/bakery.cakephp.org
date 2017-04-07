CakePHP 3.4.5 & 3.3.16 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.4.5 and 3.3.16. 3.4.5 is a maintenance release for the 3.4 branch that fixes several community reported issues. 3.3.16 contains a fix that resolves an issue created by one of the packages CakePHP relies on.

Bugfixes
--------

You can expect the following changes in 3.4.5. See the `changelog <https://github.com/cakephp/cakephp/compare/3.4.4...3.4.5>`_ for every commit.

* Pagination sort links for multiple result sets now generate correctly for the non-default model.
* Improved error messages for CSRF tokens and missing controllers.
* Fixed a fatal error in ``Http\Client\Request`` caused by Diactoros 1.4.0, which contains an incompatiblily CakePHP's use case.

Contributors to 3.4.5
---------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bryan Crowe
* Florian Krämer
* Marco Ferragina
* Mark Scherer
* Mark Story
* Robert Pustułka

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
