CakePHP 2.4.7 Released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.7

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.7. 2.4.7 is a bugfix release for the 2.4 release
branch. A short list of the changes you can expect is:

+ Core fixtures are now included in PEAR packages.
+ Limburgish locale was added to L10n.
+ MailTransport now includes the last error in the exception raised
  when mail() fails.
+ HtmlHelper::getCrumbList() supports the escape parameter now.
+ Describing tables in specific SQLserver schemas now works correctly.
+ Improved API docs for several classes.
+ URLs are correctly generated when two routing keys start with the
  same substring.
+ Model::deleteAll() works correctly when using MySQL views.
+ CakeEmail sets theme on helpers now.
+ Hidden inputs generated in radio(), select() and checkbox() have the
  'form' attribute set when provided.
+ Inflection for words ending in 'aves' was improved.
+ CakeTestCase::assertTags() now runs much faster.
+ CakeTestCase::assertTags() requires all attributes to be verified
  now.
+ AclShell::delete now removes all matching records.
+ CakeEmail now correctly renders messages when the template and
  layout are in different plugins.

You can view the full changelog on cakephp.org[1]. I'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a packaged release on
github[2].


Links
~~~~~

+ [1] `https://cakephp.org/changelogs/2.4.7`_
+ [2] `https://github.com/cakephp/cakephp/releases/2.4.7`_




.. _https://cakephp.org/changelogs/2.4.7: https://cakephp.org/changelogs/2.4.7
.. _https://github.com/cakephp/cakephp/releases/2.4.7: https://github.com/cakephp/cakephp/releases/2.4.7

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

