CakePHP 3.3.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.4. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.3...3.3.4>`_ for every commit.

* ``__xn``, ``__dx`` and ``__dxn`` support variadic arguments now.
* An incompatibility in ``Response::body(callable)`` & PSR7 stack was fixed.
* Improved API docs resolving warnings in PHPStorm and other IDEs
* Checkbox inputs now support the ``escape`` option.
* Translations that result in '' no longer throws an exception.
* ``EventManager::__debugInfo()`` is more accurate.
* Fix ``notMatching()`` without query builder callback triggering an error.
* Clean primary entity after ``Model.afterSaveCommit`` is triggered. Previously
  primary entity was being cleaned too early and callbacks for
  ``Model.afterSaveCommit`` were useless if one wanted to acccess original
  state.
* The ``ErrorHandlerMiddleware`` now logs errors as ``ErrorHandler`` would.
* Requests with an invalid HTTP protocol version no longer fatally error.
  Instead they return a 400 HTTP status code.
* Redirect Routes now work as expected for applications in subdirectories using
  the PSR7 HTTP stack.
* DispatchFilters now receive events when exceptions are rendered again.
* Session regeration now works as expected with the database adapter, and PHP7+
* Very large decimal values can now be used in database operations withouth
  losing precision now.

New Features
------------

* ``RouteBuilder::nameExists()`` was added. This method allows you to check the
  existence of named routes.
* ``Collection:cartesianProduct()`` was added.
* ``View::element()`` now supports ``plugin = false`` as an option to disable
  automatic plugin element rendering.
* ``imageSize``, ``imageHeight`` and ``imageWidth`` methods were added to
  ``Validation``. These methods let you validate uploaded image file sizes
  without requiring additional extensions.
* Improved API docs.


Contributors to 3.3.4
---------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Alexandros Solanos
* Bryan Crowe
* Cees-Jan Kiewiet
* David Yell
* Florian Krämer
* Jad Bitar
* Jose Diaz-Gonzalez
* José Lorenzo Rodríguez
* Mark Story
* Mirko Pagliai
* Pedro Tanaka
* Thinking Media
* chinpei215
* hashmode
* ndm2

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation. We'd also like to welcome
`thinkingmedia <https://github.com/thinkingmedia>`_ to the CakePHP core team.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
