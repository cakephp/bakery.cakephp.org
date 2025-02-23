CakePHP 5.1.6
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.1.6. This is a maintenance release for the 5.1 branch that fixes several
community reported issues and regressions. If you are having problems with the framework
breaking your application when you upgrade from 5.0.11 to 5.1, please open an
`issue <https://github.com/cakephp/cakephp/issues/new?template=bug_report.yml>`_.

Bugfixes
--------

You can expect the following changes in 5.1.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.1.5...5.1.6>`_ for every commit.

- Updated ``Session::renew()`` to avoid samesite warnings.
- Errors caused by requests to URLs like ``index.php?<>?`` now have error pages
  rendered instead of empty 500 responses.
- Improved behavior of ``requireFieldPresence`` in entities.
- ``MissingActionException`` raised in plugins now correctly name the
  controller + action in the error message.
- Added IPv6 support to datasource DSN parsing.
- ``Http\Client`` no longer overwrites an explicit content type with
  ``application/x-form-urlencoded`` when an empty request body is provided.
- ``FormHelper::postLink()`` now uses ``HtmlElement.requestSubmit()`` instead of
  ``.submit()``. This allows ``submit`` event handlers to intercept requests
  from ``postLink()`` buttons.

Contributors to 5.1.6
----------------------

Thank you to all the contributors that submitted a pull request:

- ADmad
- Alberto G. Rodriguez
- Kevin Pfeifer
- Mark Scherer
- Mark Story
- Mirko Pagliai
- othercorey
- Markus Ramšak

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
