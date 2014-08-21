CakePHP 2.5.3 and 1.3.20 released
=================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.3 and CakePHP 1.3.20.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.3 and CakePHP 1.3.20. CakePHP 2.5.3 is a bugfix release
for the 2.5.x release branch. 1.3.20 is a bugfix release for 1.3.x.
The 1.3.20 release contains an important fix to address a potential
race condition in Model::save() that can cause data loss when records
are deleted during concurrent updates. The same fix is included in
2.5.3.

A short list of the changes you can expect in 2.5.3 are:

+ TextHelper::autoLinkEmail() now links email addresses adjacent to
  HTML elements.
+ 'research' is now pluralized by Inflector properly now.
+ 'stadium' is now pluralized by Inflector properly now.
+ The schema included for the ACL tables now includes indexes to help
  improve performance.
+ APCEngine cache is now compatible with APCu.
+ App::pluginPath() is deprecated. You should use Plugin::path()
  instead.
+ API doc blocks have been improved in many classes.
+ Email validation rules in CakeEmail have been relaxed. Both email
  addresses with UTF-8 characters and IDN domain names are generally
  deliverable but were failing `filter_var()`.
+ CakeResponse::sharable() now sets the public max-age header.
+ Model::getDataSource() now correctly switches the schemaName
  property. This fixes a regression introduced in 2.4.8.
+ Validation::inList() no longer accepts hexadecimal values for
  numeric checks.
+ Multi use CSRF tokens now have their expiration updated on each
  request.
+ h() now performs better.
+ Missing fixture errors have been improved.

If you missed out on the early-bird tickets for for CakeFest 2014,
there are still `tickets available`_ and the `conference schedule`_.

We'd like to thank Kurita Takashi for his on-going help in identifying
possible security issues in CakePHP. You can view the full 2.5.3
changelog and 1.3.20 changelog on cakephp.org. I'd like to thank the
people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking.

You can download packaged releases on `github`_.



.. _github: https://github.com/cakephp/cakephp/tags
.. _conference schedule: http://cakefest.org/schedule
.. _tickets available: http://cakefest.org/tickets

.. author:: markstory
.. categories:: news
.. tags:: ,News

