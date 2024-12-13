CakePHP 5.1.4
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.1.4. This is a maintenance release with a security fix for the 5.1 branch that fixes several
community reported issues and regressions. If you are having problems with the framework
breaking your application when you upgrade from 5.0.11 to 5.1, please open an
`issue <https://github.com/cakephp/cakephp/issues/new?template=bug_report.yml>`_.

Bugfixes
--------

You can expect the following changes in 5.1.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.1.2...5.1.4>`_ for every commit.

- Relaxed typehints to allow ``callable`` where previously typehints were
  ``Closure``.
- ``aria-invalid`` is now be applied to ``select`` elements.
- Relaxed type hints that were ``list`` to be ``array``.
- Improved API documentation.
- Converted 5xx response codes to 4xx for externally invoked bad URLs.
- ``Client\Request`` no longer mangles the ``Content-Type`` header for JSON
  and XML requests with array data.
- ``Paginator`` will now trigger warnings when settings have not been applied.
- Request URIs are now read from ``REQUEST_URI`` instead of ``PATH_INFO``. This
  resolves a potential security issue where paths with ``%2f`` would be
  incorrectly handled as ``/`` by CakePHP.
- Improved CSP compliance in ``FormHelper`` by replacing inline style attributes
  with classnames, and inline JavaScript with script blocks when
  ``CspMiddleware`` is enabled.
- Fixed off-by-one error on stackframe offests in ``ErrorTrap::handleError()``.

Contributors to 5.1.4
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Kevin Pfeifer
* Marc Würth
* Mark Scherer
* Mark Story

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news, security
