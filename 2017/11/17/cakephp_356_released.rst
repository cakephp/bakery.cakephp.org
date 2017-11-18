CakePHP 3.5.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.6. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.5...3.5.6>`_ for every commit.

* Iterating subclasses of ``ArrayIterator`` that include ``CollectionTrait``
  retains the original class fixing use of methods defined on the subclass.
* ``Response::__debugInfo()`` includes the response body now.
* ``Http\Client`` creates response objects in a separate method making response
  creation easier to extend.
* SQL expressions no longer include double parenthesis when nesting expressions.
* View subdirectories are no longer doubled when ``RequestHandlerComponent`` and
  view classes using ``subDir`` property are used together.
* Middleware can now be registered in ``RouteBuilder`` using a string classname.
* Protocol relative string URLs are now properly HTML encoded by ``UrlHelper``.


Contributors to 3.5.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Dariusz Ruminski
* Dmitrii Romanov
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Michael Hoffmann
* Raúl Arellano
* Walther Lalk
* saeid
* timalive

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
