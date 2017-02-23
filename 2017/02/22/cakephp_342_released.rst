CakePHP 3.4.2 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.2. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.1...3.4.2>`_ for every commit.

* Improved API documentation.
* The ``association`` option has been restored to the ``Model.beforeMarshal``
  event.
* Fixed missing compatibility aliases to allow compatibility with both PHPUnit
  5.7 and PHPUnit 6.
* Fixed a memory leak in the ORM EagerLoader.
* Restored ``Event::$result`` the magic methods were not fully backwards
  compatible.
* Improved ``EntityTrait::__debugInfo()`` to show fields that are not
  accessible.
* ``ServerRequest::getQuery(null)`` now returns the complete query data.
* Sessions now have an id in CLI environments.
* Controller actions with passed parameters no longer emit errors when route
  keys are converted into passed parameters.

Contributors to 3.4.2
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* David Yell
* José Lorenzo Rodríguez
* Marc Würth
* Mark Scherer
* Mark Story
* Mathew Foscarini
* Michael Hoffmann
* antograssiot
* chinpei215
* saeideng
* sohelrana820

We'd like to welcome `cleptric <https://github.com/cleptric>`_ to the CakePHP
core team. Cleptric hails from Germany and has been a consistent contributor
over the past few months and we're happy to have them on the team as we build
upon the successes of CakePHP 3.x. As always, we would like to thank all the
contributors that opened issues, created pull requests or updated the
documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
