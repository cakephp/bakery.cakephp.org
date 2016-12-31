CakePHP 2.4.4 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.4.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.4. 2.4.4 is a bugfix release for the 2.4 release
branch. A short list of the changes you can expect is:

+ TextHelper::autoLink() now handles email addresses inside URLs
  correctly.
+ Pagination request data is set even when a NotFoundException is
  raised now.
+ Model::deleteAll will only delete distinct records now.
+ Router::mapResources() now ensures that the prefix has both the
  leading and trailing slash.
+ An infinite loop condition in CakeSession was fixed. This could be
  triggered by starting an already invalidated session.
+ Hash::numeric() now works as expected with negative numbers and
  other numeric values.
+ The 'my' and 'ym' formats for Validation::date() have been relaxed
  to allow both 2 and 4 digit year values.
+ FormHelper will not infer types incorrectly when type=checkbox is
  provided.
+ Postgres biginteger primary keys now correctly use the bigserial
  type.
+ FormHelper::dateTime() correctly handles times around 12:00:00 when
  an interval is also used.
+ Hash::combine() now throws exceptions when the key and value paths
  result in arrays of differing lengths.
+ CakeRequest::referer() no longer incorrectly reads the
  HTTP_X_FORWARDED_HOST header.
+ CakeRequest::host() now has a trustProxy parameter that allows
  access to the proxy host value.

You can view the full changelog on cakephp.org[1]. I'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a packaged release on
github[2].


Links
~~~~~

+ [1] `https://cakephp.org/changelogs/2.4.4`_
+ [2] `https://github.com/cakephp/cakephp/releases/2.4.4`_




.. _https://cakephp.org/changelogs/2.4.4: https://cakephp.org/changelogs/2.4.4
.. _https://github.com/cakephp/cakephp/releases/2.4.4: https://github.com/cakephp/cakephp/releases/2.4.4

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

