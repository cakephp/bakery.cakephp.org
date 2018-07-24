CakePHP 3.6.8 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.6.8. This is a maintenance release for the 3.6 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.6.8. See the `changelog <https://github.com/cakephp/cakephp/compare/3.6.7...3.6.8>`_ for every commit.

* Improved entity class name inflection for multi-word table classes.
* Enabled ``session.use_strict_mode`` by default.
* Improved API documentation for i18n functions.
* Improved deprecation docstrings.
* ``Router::url()`` now ensures that ``App.base`` is applied to URLs generated
  in CLI contexts.

Contributors to 3.6.8
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* AlPri78
* Denys Yaroshenko
* Flavius
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Tomas Saghy
* saeideng

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
