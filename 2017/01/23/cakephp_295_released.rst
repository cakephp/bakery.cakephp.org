CakePHP 2.9.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 2.9.5. This is a maintenance release for the 2.9 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 2.9.5. See the `changelog <https://github.com/cakephp/cakephp/compare/2.9.4...2.9.5>`_ for every commit.

* Fix query string parsing on ``requestAction()``. This fixes a long standing
  issue that resulted in query strings being doubled in requestAction() URLs.
* ``FlashHelper::render()`` can now render ``default`` messages created by
  SessionComponent.
* Add support for the parseHuge option in ``Xml::build()``.
* Error messages if PHP's ``mail()`` function fails are now accurate.
* Added support for the 'ru-ru' locale.
* Built-in server now accepts query string parameters for the base path.

Contributors to 2.9.5
---------------------

Thank you to all the contributors that helped make this release happen:

* Bernat Arlandis
* Henrik Gemal
* José Lorenzo Rodríguez
* Mark Story
* Markus Bauer
* chinpei215

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
