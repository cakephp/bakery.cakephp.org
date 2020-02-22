CakePHP 3.8.10 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.10. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.9...3.8.10>`_ for every commit.

* ``TestCase\EmailTrait::assertMailSentWith()`` now knows how to assert view
  builder properties.
* ``NumberHelper::precision()`` had the ``$options`` parameter added so it can
  better wrap ``Number::precision()``.
* ``Http\Response::withStatus()`` no longer overwrites the content-type header
  with the contents of the ``_contentType`` property.
* ``Http\Response::$_contenType`` was removed as it was often wrong and out of
  sync with the ``getHeader('Content-Type')`` value.
* Updated API documentation and type annotations.
* ``Validation::decimal()`` now handles Polish formatted numbers correctly.
* Logged fatal errors now include the file and line position.

Contributors to 3.8.10
----------------------

Thank you to all the contributors that helped make this release happen:

* Johan Meiring
* Mark Story
* Michal
* Rachman Chavik
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
