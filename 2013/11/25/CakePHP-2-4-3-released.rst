CakePHP 2.4.3 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.3.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.3. 2.4.3 is a bugfix release for the 2.4 release
branch. A short list of the changes you can expect is:

+ API Documentation improvements.
+ Long headers are no longer wrapped with PHP_EOL when sending email
  with MailTransport. This should solve delivery issues with Qmail, and
  other SMTP transport agents.
+ Model::\_clearCache() has improved performance.
+ Model's now work better with schema's containing numeric column
  names.
+ An exception is now raised when a view block is opened while it is
  already open.
+ SchemaShell no longer uses `schema.php` as the filename when a
  custom name parameter is provided.
+ MKV is a supported content type.
+ CookieComponent writes are now more consistent. Previously writing
  multi-key and single writes were handled very differently. Fixing the
  write consistency makes deletion data saner and results in fewer
  cookies being transmitted.
+ Empty array data in cookies is now parsed correctly.
+ CakeTime::dayAsSQL() now correct supports the timezone parameter.
+ COUNT(DISTINCT x) queries work better in SQLServer now.
+ Postgres sequence values now use custom primary keys.
+ HtmlHelper now correctly encodes URLs generated for meta tags.
+ Using FormHelper::postLink() after creating a GET form now works as
  expected.
+ Model::saveAssociated() handles expression objects correctly now.
+ Model::setSource() does not alter the datasource's cacheSources
  property anymore.
+ Non-breaking spaces are now removed by Inflector::slug()

You can view the full changelog on cakephp.org[1]. I'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a packaged release on
github[2].


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.4.3`_
+ [2] `https://github.com/cakephp/cakephp/releases/2.4.3`_




.. _https://github.com/cakephp/cakephp/releases/2.4.3: https://github.com/cakephp/cakephp/releases/2.4.3
.. _http://cakephp.org/changelogs/2.4.3: http://cakephp.org/changelogs/2.4.3

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

