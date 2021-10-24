CakePHP 4.3.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.3.0. This is the first stable release of 4.3.0. 4.3.0 provides a number
improvements to CakePHP.

Upgrading to 4.3.0
------------------

You can use composer to upgrade to CakePHP 4.3.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:4.3.*"

Deprecation Warnings
--------------------

4.3 introduces a few deprecations. All of these features will continue for the
duration of 4.x but will be removed in 5.0. See the `migration guide
<https://book.cakephp.org/4/en/appendices/4-3-migration-guide.html>`_.

What's new in 4.3.0?
--------------------

The `migration guide
<https://book.cakephp.org/4/en/appendices/4-3-migration-guide.html>`_ has
a complete list of what's new in 4.3.0. We recommend you give that page a read
when upgrading. A few highlights from 4.3.0 are:

* A new fixture system that allows you to use your existing migrations or SQL
  dump files to define schema was added. Support for cake's migrations and SQL
  dump files is included.
* ``TestSuite\HttpMockTrait`` was added to make mocking HTTP client requests
  easier.
* ``LocatorAwareTrait::fetchTable()`` was added to make the
  ``getTableLocator()->get()`` pattern more ergonomic.
* ``Controller::middleware()`` was added. This method lets you define middleware
  specific to a controller, or the current controller action.
* ``deprecationWarning()`` no longer emits duplicate warnings.
* Logged SQL queries now use boolean literals making them easier to paste into
  a repl.
* The ``cake console`` command was extracted into a new ``cakephp/repl``
  package.
* ``Form`` objects now support multiple validators and leverage a similar
  interface to the ORM to use those validators.
* ``CspMiddleware`` can now transparently add ``nonce-`` based policies.
* ``FormHelper`` will now set additional ARIA attributes automatically.
* The ORM can now marshall date times from the user's timezone into the
  applications timezone transparently.
* CakePHP's dependency on ``league/container`` was bumped to ``^4.1.1``.


Contributors to 4.3.0
---------------------

Thank you to all the contributors that helped make 4.3 happen:

* ADmad
* andrii-pukhalevych
* Breton Erwane
* captain-redbeard
* Chris Nizzardini
* Erwane Breton
* fabsn182
* Jan Brabec
* Juan Pablo Ramirez
* Marc Würth
* Mark Scherer
* Mark Story
* ndm2
* othercorey
* Rafael Mardones
* Rob Rikken
* saeideng

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 4.3.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
