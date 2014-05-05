CakePHP 1.3.14 and 2.0.5 released
=================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.5 [1] and CakePHP 1.3.14 [2].

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.5 [1] and CakePHP 1.3.14 [2].

In total, there were over 90 commits and 40 issues have been resolved
since 2.0.4. A complete list of the changes can be viewed on the
changelogs page [3], but a quick summary of changes that made it into
2.0.5:

+ Return values were corrected in `Cache`. False always indicates
  failure, as documented.
+ Cascading deletes with hasOne associations and no foreignKey work
  correctly now.
+ Cache files for SQLite no longer contain " in the filenames.
+ Themed asset files with spaces in the file names are now served
  correctly through Dispatcher.
+ Double pluralization in ViewTask was corrected.
+ CacheHelper had a number of issues fixed when using the callbacks
  option.
+ TextHelper::excerpt() now works as documented.
+ Models using `$tablePrefix` should now work correctly when lazy-
  loaded.
+ Routing issues with named parameters and query string parameters
  have been fixed.
+ Shell::$plugin was added so more correct help and usage
  documentation can be generated.
+ CakeEmail now correctly handles inline + normal attachments in the
  same email. Inline attachments also work now.

On the 1.3 branch, there were over 35 commits and 25 issues resolved
since 1.3.13. A complete list of the changes can be viewed in the
changelogs page [4]. A quick summary of the changes made to 1.3 are:

+ Asset timestamping now works for image submit buttons.
+ Postgres virtualFields with literal values not work correctly.
+ User defined headers are now reset by EmailComponent::reset()
+ CookieComponent is now able to read cookies created by 2.0.x
  applications.
+ Compatibility with PHP5.4 has been improved.
+ Protocol relative URLs for assets now work correctly.
+ TextHelper::excerpt() now works as documented.

We've been hard at work on the 2.1 branch and its shaping up to be a
great release. 2.1 will be fully backwards compatible with 2.0, and
add a number of useful features. For a list of what is complete, and
what is planned for 2.1, see the roadmap [5] and the in-progress 2.1
migration guide [6]

Thanks once again to the excellent CakePHP community, for all of the
outstanding work. Without your contributions and love there would be
no CakePHP.

+ Download 2.0.5 [1] View the changelog [3]
+ Download 1.3.14 [2] View the changelog [4]



Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp/zipball/2.0.5`_
+ [2] `http://github.com/cakephp/cakephp/zipball/1.3.14`_
+ [3] `http://cakephp.org/changelogs/2.0.5`_
+ [4] `http://cakephp.org/changelogs/1.3.14`_
+ [5] `http://cakephp.lighthouseapp.com/projects/42648/development-roadmap`_
+ [6] `https://github.com/cakephp/docs/blob/2.1/en/appendices/2-1-migration-guide.rst`_




.. _http://github.com/cakephp/cakephp/zipball/2.0.5: http://github.com/cakephp/cakephp/zipball/2.0.5
.. _http://cakephp.org/changelogs/2.0.5: http://cakephp.org/changelogs/2.0.5
.. _http://github.com/cakephp/cakephp/zipball/1.3.14: http://github.com/cakephp/cakephp/zipball/1.3.14
.. _https://github.com/cakephp/docs/blob/2.1/en/appendices/2-1-migration-guide.rst: https://github.com/cakephp/docs/blob/2.1/en/appendices/2-1-migration-guide.rst
.. _http://cakephp.lighthouseapp.com/projects/42648/development-roadmap: http://cakephp.lighthouseapp.com/projects/42648/development-roadmap
.. _http://cakephp.org/changelogs/1.3.14: http://cakephp.org/changelogs/1.3.14

.. author:: markstory
.. categories:: articles
.. tags:: CakePHP,news,releases,Articles

