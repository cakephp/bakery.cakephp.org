CakePHP 2.3.6 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.6[1]. 2.3.6 is a bugfix release for the 2.3 release
branch. Since the release of 2.3.5 there have been 64 commits and 17
tickets resolved.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.6[1]. 2.3.6 is a bugfix release for the 2.3 release
branch. Since the release of 2.3.5 there have been 64 commits and 17
tickets resolved. A short list of the changes you can expect is:

+ Datetime comparisons in CakeTime are more accurate now.
+ FormHelper now correctly marks fields with error classes on forms
  that save multiple records.
+ Controller::$modelClass is now set before components are
  initialized.
+ The file reading features of CakeEmail are now available outside the
  class.
+ Email line wrapping compatibility with japanese messages has been
  improved.
+ HtmlHelper::tag() now returns the content when $tag is false.
+ Mocked components are now enabled when using
  ControllerTestCase::testAction().
+ The type attribute can now be set when using HtmlHelper::script()
  and HtmlHelper::scriptBlock().
+ Passing an empty array does not reset SmtpTransport's configuration
  anymore.
+ Xml parse errors with SimpleXmlElement now throw XmlException.
+ FormHelper now disables options in multi-select elements now.
+ TranslateBehavior now always uses $name instead of alias when
  updating/inserting rows.
+ Cookie expiry times in the distant future now work on 32bit systems.
+ FileEngine now clears groups with differing prefixes correctly.



Security disclosure
~~~~~~~~~~~~~~~~~~~

There were 3 recent security releases for CakePHP. With the goal of
being open and transparent, and holding true to our previous
commitments, below are more detailed descriptions of each problem.

Authentication forms

Authentication forms were vulnerable to query manipulation through the
addition of additional POST data. Forms that were not also protected
by SecurityComponent were vulnerable. If in a login form you had:

<input name="data[User][username]" type="text"><br /><input
name="data[User][password]" type="password">

Before submitting the form an attacker could add this HTML to the
form:

<input name="data[User][username][OR][id LIKE]" value="1"
type="hidden"><input name="data[User][username][OR][username LIKE]"
value="%admin%" type="hidden">

When the form was submitted, the $conditions used to log the user in
would have the value of:

::

    "OR" => array(
      "id like" => 1,
      "username like" => "%admin%"
    )

This issue was introduced accidentally when adding support for
blowfish authentication. The issue was resolved by treating any non-
scalar conditions when authenticating users as a failure. This issue
was corrected in `this commit c327bd`_. Thanks to Magnus Andersson for the
report and patch.

Pagination SQL injection

Through manipulation of the model alias used to sort a pagination URL,
arbitrary SQL could be executed. This issue effected the 1.2, 1.3, and
2.x series of releases and was accidentally introduced 5 years ago.
PaginatorComponent only validated the field name, but not the model
alias. This meant that any SQL contained in the alias would be inlined
as SQL. An example exploit URL would look like:

`http://yourtest.com/users/index/sort:id%20LIMIT%2010;delete%20FROM%20%60contacts%60;.id`

The above URL injects a DELETE query into the pagination request which
would be executed without sanitization due to it being a sort key.
This issue was fixed by ignoring the user data and using the known
model alias in `this commit 6017db`_. Thanks to 'Ahmad' for reporting the
issue on lighthouse and helping the CakePHP team find a fix.

Cross site scripting through webroot

By manipulating the URL an attacker could generate an error page that
allowed the execution of arbitrary javascript. The webroot property on
the request object was incorrectly trusted as safe even though it
contained user input. An example exploit could look like:

`http://example.com/index.php/%3E%22%3E%3Cscript%3Ealert%28%27hehe%27%29;%3C/script%3E%3Clink%20href=%22HTTP/1.0%22%3C`

The solution to this issue was to urlencode the user supplied webroot
property when the request object is created. This makes generated
URL's safe to use in all normal contexts. The fix for this was applied
in `this commit db6dd1`_.

I'd like to thank the various people who reported the security issues
and assisted in getting them fixed. I'd also like to thank all of the
contributors who help keep CakePHP cooking. Without you there would be
no CakePHP. Download a packaged release[2].

Links

+ [1] `https://cakephp.org/changelogs/2.3.6`_
+ [2] `https://github.com/cakephp/cakephp/tags`_




.. _this commit c327bd: https://github.com/cakephp/cakephp/commit/c327bdc4bd309ce07fe2c20a2a9123f2165cae76
.. _this commit 6017db: https://github.com/cakephp/cakephp/commit/6017db9dc8eb86354ccf2dc1b94a9764adfee422
.. _this commit db6dd1: https://github.com/cakephp/cakephp/commit/db6dd18f865359fa01e88d2691078dba383b753b
.. _https://cakephp.org/changelogs/2.3.6: https://cakephp.org/changelogs/2.3.6
.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

