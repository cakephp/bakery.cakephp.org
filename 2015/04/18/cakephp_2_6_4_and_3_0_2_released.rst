CakePHP 2.6.4 and 3.0.2 Released
================================

The CakePHP core team is proud to announce the immediate availability of CakePHP
2.6.4 and 3.0.2. Both releases are bug fix releases for their respective branches.

2.6.4
-----

A short list of the changes you can expect in 2.6.4 is:

* When ``json_encode()`` fails in JsonView an exception is raised.
* PaginatorHelper will not emit notice errors when generating links for models
  that were not paginated.
* Memcache cache engine can now connect to domains starting with 'u'.
  Previously, these values were treated as unix sockets.
* The regression around vendor paths introduced in 2.6.3 has been fixed.
* HttpSocket can now connect to HTTPS sites via a HTTP Proxy.
* Sessions are renewed even when the session id is '0'.
* ``Hash::maxDimensions()`` now works with arrays of 1 or 0 dimensions.
* ``Inflector`` now correctly inflects 'sieves'.
* ``DboSource::__destruct()`` now correctly rolls back any open transactions. This
  restores behavior that was unintentionally removed in an earlier 2.x release.
* ``CakeRequest::header()`` now correctly reads headers with a value of '' and
  '0'.
* ``ControllerTestCase`` now works better with actions that use
  ``CakeResponse::file()``. Previously warnings were emitted about
  ob_end_clean() failing.
* API documentation improvements.

3.0.2
-----

A short list of the changes you can expect in 3.0.2 is:

* SessionHelper is deprecated. You should use the FlashHelper, or
  ``$this->request->session()`` instead.
* Saving BelongsToMany associations that contain a mixture of new and existing
  records has been improved.
* ``Validation::notEmpty()`` has been renamed to ``Validation::notBlank()``.
  ``Validation::notEmpty()`` is now deprecated.
* ``Validation::userDefined()`` is now deprecated, you can set callables
  directly in the Validator objects instead.
* SQLite schema reflection now works with older versions of SQLite. Foreign key
  update/delete clauses will not be reflected with older versions of SQLite.
* ``Hash::get()`` no longer raises an exception on a path of ``''`` or ``null``.
* Fatal errors when saving belongsToMany relationships that were not marshaled
  into entities have been fixed.
* Collection now implements ``__debugInfo()``.
* Magic finder methods now correctly alias fields in the where clause.
* Cascading deletes now prioritize associations with cascading callbacks, and
  then apply to associations without callbacks.
* Shells dispatched with ``dispatchShell()`` no longer output the welcome
  message.
* MySQL driver now uses ``SET NAMES`` to fix encoding errors in some
  installations.
* IntegrationTestCase now recursively merges request data into the stubbed
  request.
* Responses in IntegrationTestCase now allow better content-type assertions.
* ``0000-00-00`` is now converted into null by the database type system. This
  prevents issues in how PHP's DateTime handles year 0.
* FormHelper fields that use integers as their name no longer trigger black hole
  errors.

CakeFest 2015 Tickets
---------------------

There is still time to get your tickets for `CakeFest 2015
<https://cakefest.org/tickets>`_ if you haven't already. May 28th and CakePHP's
10th anniversary are quickly approaching.

I'd like to thank the people who have contributed to these releases. Your
issues, documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking.  Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: CakePHP, release
.. comments::
