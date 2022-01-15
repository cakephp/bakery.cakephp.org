CakePHP 4.3.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.3.4. This is a maintenance release for the 4.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.3.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.3.3...4.3.4>`_ for every commit.

* Improved exception logging. If rendering fails during the 'safe' fallback
  error page rendering, a log message is now recorded..
* Added a omitted method for getting a list of tables without views from
  a connection.
* Updated ``Schema\Collection::listTables()`` to omit views from the table
  listing. This will resolve problems with views and the new fixture system.
* Improved MySQL table list query.
* Improved route compiliation performance.

Team Changes
------------

Since our last release post there have been a few changes in the CakePHP core
team. First, we would like to welcome `LordSimal
<https://github.com/LordSimal>`_ who joins us from Leibnitz, Austria. LordSimal
has been actively helping others in the community, improving the documentation
and has contributed pull requests to both CakePHP core, and DebugKit. We would
like to thank `chinpei215 <https://github.com/chinpei215>`_ for his many years
of involvement in CakePHP as he is leaving the team. During his tenure,
``chinpei215`` identified and fixed several security issues and contributed
greatly to i18n functionality in the framework.

Contributors to 4.3.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Mark Story
* othercorey
* rmarsh1ua

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
