CakePHP 3.7.8 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.7.8. This is a maintenance release for the 3.7 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.7.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.7.7...3.7.8>`_ for every commit.

* The ``application/json`` content type no longer has a ``charset`` parameter.
  It is not valid and newer versions of Chrome emit warnings when it is present.
* Improved API documentation.
* ``char(36)`` columns are now generated correctly in postgres.
* Fixed plural form rules for Turkish.
* Cache key generation for translators now works when changing locales
  mid-process.
* ``IntegrationTestCase`` now handles absolute URLs correctly.
* ``FormContext::error()`` now returns keys on error messages.
* ``Controller::afterFilter()`` now has access to response objects returned by
  controller actions. Previously it would see an older version of the response.
* Improved error messages when associations are missing.
* Iterating ``PluginCollection`` in nested loops no longer stops iterating
  early.

Contributors to 3.7.8
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Jeremy Harris
* José Lorenzo Rodríguez
* Marc Wilhelm
* Marc Würth
* Mark Scherer
* Mark Story
* Robert Pustułka
* TekkCraft
* 時流

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
