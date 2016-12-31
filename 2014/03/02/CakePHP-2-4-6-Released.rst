CakePHP 2.4.6 Released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.6. 2.4.6 is a bugfix release for the 2.4 release
branch.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.6. 2.4.6 is a bugfix release for the 2.4 release
branch. A short list of the changes you can expect is:

+ Extract task handles quotes inside validation messages correctly.
+ Model::field() now works with fields translated with
  TranslateBehavior.
+ Core tests are no longer part of PEAR packages. This solves issues
  when the pear package is used as a composer dependency, and an
  incorrect classmap was generated.
+ FormHelper::checkbox() can now generate checkboxes for empty values.
+ Postgres can now convert boolean fields to integer when using
  SchemaShell.
+ Changes to how ID's are generated for radio inputs were reverted.
  These changes caused issues in some applications.
+ API documentation has been improved.
+ Reverse routing for prefixed actions was improved.
+ Temporary associations setup with
  TranslateBehavior::bindTranslation() are now correctly unbound &
  restored.
+ Clearing data with MemcacheEngine will now work with greater than
  100 slabs.
+ Validation::decimal() now works with localized floats.
+ Invalid data in datetime pickers is now correctly handled.
+ FormHelper::postLink() and FormHelper::postButton() now handle N
  dimensional data.

You can view the full changelog on cakephp.org[1]. I'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a packaged release on
github[2].


Links
~~~~~

+ [1] `https://cakephp.org/changelogs/2.4.6`_
+ [2] `https://github.com/cakephp/cakephp/releases/2.4.6`_




.. _https://cakephp.org/changelogs/2.4.6: https://cakephp.org/changelogs/2.4.6
.. _https://github.com/cakephp/cakephp/releases/2.4.6: https://github.com/cakephp/cakephp/releases/2.4.6

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

