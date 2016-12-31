CakePHP 2.3.1 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.1. 2.3.1 is a bugfix release for the 2.3 release
branch.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.1[1]. 2.3.1 is a bugfix release for the 2.3 release
branch. Since the release of 2.3.0 there have been 70 commits and 20
tickets resolved. A short list of the changes you can expect is:

+ The ServerShell now correctly handles plugin and theme assets.
+ FormHelper::inputs() now correctly handles plugin models.
+ Backwards compatibility for HABTM checkboxes has been improved.
+ Schema generation works better with SQLServer now.
+ Baking models better detects has and belongs to many associations.
+ Security::rijndael() now correctly generates random iv values. It
  will continue to decrypt values encrypted with a fixed iv. This
  improves security of encrypted values, by preventing dictionary
  attacks on the key/value.
+ Altering tables with Postgres properly renames fields now.
+ Regular expression operators are better supported in Postgres.
+ Fatal errors now display when gzip encoding is enabled.
+ Model whitelists are restored when a save() fails due to no data,
  when a model has no created/updated fields.
+ Validation::$errors is no longer populated with booleans, this
  prevents memory consumption issues in longer running scripts.

In addition to the release of 2.3.1, the API docs have been updated
and replaced with a system based on `apigen`_. The new API docs fix a
number of issues with the old docs and provides an easy way for you to
create local API docs.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.
Download a packaged release[2].


Links
~~~~~

[1] `https://cakephp.org/changelogs/2.3.1`_

[2] `https://github.com/cakephp/cakephp/tags`_


.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _apigen: http://apigen.org
.. _https://cakephp.org/changelogs/2.3.1: https://cakephp.org/changelogs/2.3.1

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

