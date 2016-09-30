CakePHP 3.3.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.5. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.4...3.3.5>`_ for every commit.

* Using ``debug()`` or ``var_dump()`` in a controller no longer results in
  truncated content in the PSR7 stack.
* Session cookies can now be rotated at the same time as other cookies are set
  in the PSR7 stack.
* ``Response`` now supports all standards defined HTTP status codes.
* ``requestAction()`` works again when you are using the PSR7 stack.

New Features
------------

* ``UrlHelper::buildUrl()`` now supports the ``escape`` option to create
  unescaped URLs. This useful when you need to build links inside other helpers.
* A new ``ResponseEmitter`` was added. The new response emitter fixes a number
  of issues related to sessions and truncated content.
* Fixture classes can be defined using a fully-qualified namespace name.
* ``RequestHandlerComponent`` had the ``enableBeforeRedirect`` configuration
  option added. Disabling this flag will disable RequestHandler from converting
  AJAX redirects into requestAction calls.
* ``RequestHandlerComponent::beforeRedirect()`` is now *deprecated*.

Contributors to 3.3.5
---------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* José Lorenzo Rodríguez
* Marc Würth
* Mark Story
* Yasuo Harada
* mscherer

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
