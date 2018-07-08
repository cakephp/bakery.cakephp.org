CakePHP 3.6.7 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.7. This is a maintenance release for the 3.6 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.6.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.6.6...3.6.7>`_ for every commit.

* Improved deprecation messages.
* Http\Client now ignores invalid cookie expiration dates.
* Http\Client now drops invalid/empty ``Set-Cookie`` header values.
* Data read from ``cakephp-plugins.php`` is reloaded as neccessary in test
  suites. Fixing unknown plugin errors.
* ``Email::setAttachments()`` no longer emits an error when ``data`` key is used
  without a ``mimetype``.
* Redirect routes no longer apply the application subdirectory twice.
* Multiple checkbox form widgets now use ``checkboxWrapper`` instead of
  ``radioWrapper`` for their wrapping template.
* ``Debugger::printVar()`` now forces its content to be ltr, improving
  readability in rtl documents.
* Routing key sub-pattern checks in reverser routing now use unicode regular
  expressions.
* An exception is now raised when libicu is missing a requested timezone.
* Console subcommand help now displays the subcommand description when no
  subcommand parser has been defined.
* Missing Plugin error pages now recommend the use of ``addPlugin()``.


Contributors to 3.6.7
----------------------

Thank you to all the contributors that helped make this release happen:

* Albert Scherman
* Dmitriy Romanov
* Marc Würth
* Mark Scherer
* Mark Story
* chinpei215
* saeideng
* vladimir.reznichenko

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
