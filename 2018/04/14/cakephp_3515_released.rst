CakePHP 3.5.15 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.15. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.15. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.14...3.5.15>`_ for every commit.

* Improved API documentation.
* ``RequestHandlerComponent`` no longer expands recursive inline XML entities
  when processing request data.
* PO file context messages can now be multi-line strings.
* ``File::name()`` now handles unicode filenames.
* Improved errors when route classes are missing.
* ExistsIn rule now works as documented when used with ``saveMany()``.
* Postgres schema reflection now handles null default values with casting.
* Swapping the session engine now changes the handler in PHP.

Contributors to 3.5.15
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Florian Krämer
* Ivan Vorsin
* Joep Roebroek
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* Sohel Rana
* Wouter van Os
* saeideng
* sohelrana820

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

