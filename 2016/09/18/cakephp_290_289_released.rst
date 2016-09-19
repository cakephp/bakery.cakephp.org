CakePHP 2.9.0 and 2.8.9 Released
================================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.9.0 and 2.8.9. 2.8.9 is the last scheduled bugfix release for 2.8. Going
forward, 2.8 will only receive security fixes. 2.9.0 is a backwards compatible
feature release for the 2.x series, adding several community contributed
improvements.

Deprecations
------------

* The ``Object`` class has been deprecated due to upcoming PHP7 collisions. It
  has been renamed to ``CakeObject`` to avoid collisions with new PHP reserved
  words.

New Features
------------

* ``AuthComponent::user()`` now makes the user data available when using
  stateless authentication adapters.
* ``DboSource::flushQueryCache()`` was added to allow more fine-grained control
  of query result caching when enabled.
* The log messages created by ``ErrorHandler`` can now be more easily customized
  in subclasses.
* Additional mime-types for 'jsonapi', and 'psd' were added.
* Time & Datetime inputs no longer set a ``maxlength`` attribute when rendered
  as 'text' input types.

Bugfixes in 2.8.9
-----------------

You can expect the following changes in 2.8.9. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.8.8...2.8.9>`_ for every commit.

* Minor DocBlock improvements.
* A change to CakeFixtureManager intended to optimize test suite runtimes was
  reverted. This change caused compatibility issues with existing applications.

Contributors to 2.8.9 & 2.9.0
-----------------------------

Since the release of 2.9.0-RC1 there have been no changes or issues reported
for 2.9.0.

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
