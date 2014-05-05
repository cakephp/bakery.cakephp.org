CakePHP 2.4.5 Released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.5

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.5. 2.4.5 is a bugfix release for the 2.4 release
branch. A short list of the changes you can expect is:

+ Generated DOM ids for radios and checkboxes should now be collision
  free when using non-alphanumeric values.
+ The postgres driver now quotes schema names. This solves issues with
  legacy schemas using special characters.
+ Translate behavior now correctly handles translated values of '0'.
+ Controller baking now provides better feedback when no controllers
  are generated.
+ Datetime inputs will not select year 0 when the selected value is
  '0000-00-00'. This improves compatibility with MySQL.
+ Schema creation with the connection parameter now works as expected.
+ URLs are no longer double URL decoded. This fixes lost data when
  named parameters or path segments contain values that look like URL
  encoded data.
+ Model::updateCounterCache() no longer triggers a notice error when
  $this->data is empty.

You can view the full changelog on cakephp.org[1]. I'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a packaged release on
github[2].


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.4.5`_
+ [2] `https://github.com/cakephp/cakephp/releases/2.4.5`_




.. _http://cakephp.org/changelogs/2.4.5: http://cakephp.org/changelogs/2.4.5
.. _https://github.com/cakephp/cakephp/releases/2.4.5: https://github.com/cakephp/cakephp/releases/2.4.5

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

