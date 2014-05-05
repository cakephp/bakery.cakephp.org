CakePHP 2.4.2 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.2.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.2[1]. 2.4.2 is a bugfix release for the 2.4 release
branch. A short list of the changes you can expect is:

+ Sqlite::truncate() will verify that the sqlite_sequence table exists
  before modifying it.
+ Label elements now have their for attributes generated correctly for
  radio inputs.
+ Improved API documentation for a number of classes and methods.
+ TreeBehavior::recover() now correctly uses the scope conditions.
+ Hash::contains() can now look for needle values containing nulls.
+ Disabled radio buttons are now generated correctly when integer and
  string keys are used.
+ International domains are now accepted by Validation::url()
+ Inflector now handles 'quota' and 'curves' correctly.
+ jQueryEngineHelper now treats the 'xhr' option as a callback
  argument.
+ Bake now adds the numeric validator for float fields.
+ DboSource::renderStatement() now trims whitespace from generated
  queries.

As always, a big thank you to everyone involved in both contributions
through commits, tickets, documentation edits, and those whom have
otherwise contributed to the framework. Without you there would be no
CakePHP. Download a packaged release [2].


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.4.2`_
+ [2] `http://github.com/cakephp/cakephp/releases/2.4.2`_




.. _http://github.com/cakephp/cakephp/releases/2.4.2: http://github.com/cakephp/cakephp/releases/2.4.2
.. _http://cakephp.org/changelogs/2.4.2: http://cakephp.org/changelogs/2.4.2

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

