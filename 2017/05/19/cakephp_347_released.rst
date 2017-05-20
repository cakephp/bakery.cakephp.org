CakePHP 3.4.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.7. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.6...3.4.7>`_ for every commit.

* Improved API documentation for deprecated methods.
* Translations now return the key name when a message has both a context, and
  a blank translated value.
* Nested request body parameters no longer trigger errors in the Oauth1 client
  authentication adapter.
* ``IntegrationTestCase::enableRetainFlashMessages()`` was added. By using this
  method you can assert flash messages using ``assertSession()``.
* ``Validation::hexColor()`` was added.
* Pagination queries with nested ``matching()`` calls no longer emit invalid
  SQL.

Contributors to 3.4.7
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* David Yell
* Ian den Hartog
* Jeremy Harris
* Mark Scherer
* Mark Story
* Michael Hoffmann
* chinpei215
* mehdi fathi

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
