CakePHP 3.8.7 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.7. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.7. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.6...3.8.7>`_ for every commit.

* Generated route names are now correct for routes using braced placeholders.
* ``Email::getHeaderCharset()`` now uses the email charset as a fallback if the
  header charset is undefined.
* ``IntegrationTestTrait::assertRedirectEquals()`` was added to make it simpler
  to assert redirect values without additional Router transformations.
* Improved documenation blocks and type annotations.
* Email attachments now encode the filenames in ``Content-Disposition`` headers
  if the filenames contain non-ascii values.
* ``Http\Client`` now accepts a ``protocolVersion`` option in its constructor.
  This option lets you control the HTTP version used. This change makes it
  simpler to make HTTP2 requests.
* Improved error message when ``ConsoleIntegrationTestTrait`` runs out of
  replies to interactive questions.
* ``Http\Client`` can now send request bodies in GET requests.
* Added PHP7.4 to our test matrix.

Contributors to 3.8.7
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Mark Scherer
* Mark Story
* Martin Matthaei
* gregs
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
