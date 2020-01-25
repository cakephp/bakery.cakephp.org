CakePHP 3.8.9 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.9. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.9. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.8...3.8.9>`_ for every commit.

* Error/Notice messages now have the correct context and code snippets when
  DebugKit is enabled.
* When a joined association uses formatResults the parent entity is no longer
  marked dirty if the result formatter modifieds the association entity.
* Fixed ``contain()`` on BelongsToMany association restricting fields with
  ``fields`` option.
* Fix element cache key generation when elements were in subdirectories.
* Improved API documentation.
* ``i18n extract`` now skips writing files if no strings have changed.
* Fixed password hashing being skipped when password field was null. This
  prevents a potential timing sidechannel should an application store users with
  ``null`` passwords.
* Fixed a notice error ``UrlHelper::assetUrl()`` when ``$path`` is null.

Contributors to 3.8.9
----------------------

Thank you to all the contributors that helped make this release happen:

* Edgaras Janušauskas
* Marc Würth
* Mark Scherer
* Mark Story
* gregs
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
