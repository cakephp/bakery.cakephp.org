CakePHP 2.4.1 released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.1[1]. 2.4.1 is a bugfix release for the 2.4 release
branch.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.4.1[1]. 2.4.1 is a bugfix release for the 2.4 release
branch. A short list of the changes you can expect is:

+ Improved API documentation and links to the book from the API.
+ Notice errors when loading LC_TIME files should no longer happen.
+ TreeBehavior::generateTreeList() now includes the scope defined in
  the model's actsAs property.
+ Support for readline was added to Shell commands. If your
  environment supports readline, arrow keys will no longer output escape
  sequences.
+ FormHelper::input() will now use attributes defined in the label
  key.
+ Inflection support was improved.
+ Performance of CakeTime::timeAgoInWords() was improved.
+ Method signatures of Behavior callbacks was corrected. If you are
  using PHP5.4 you may have to update the method signatures of your
  behaviors to resolve any E_STRICT errors.
+ CROSS JOINs work correctly now.
+ SqlServer::value() now correctly handles NULL values.
+ Cache::clearGroup() with FileEngine and no prefix behaves as
  expected now.
+ CakeEmail now quotes email aliases that contain non-alphanumeric
  characters, that have not already been encoded.
+ Phone number validation was simplified to fix valid area codes being
  detected as invalid.



Security disclosure
~~~~~~~~~~~~~~~~~~~

In 2.3.8 a security issue in AssetDispatcher was fixed. In the spirit
of being open and transparent a more detailed description of the issue
is being provided. By carefully crafting a URL the AssetDispatcher
would allow arbitrary file access. A successful attack required at
least one theme or plugin to be in use. An example url would look
like:

::

    http://example.com/DebugKit/%2e.//%2e.//%2e.//%2e.//%2e.//%2e.//%2e.//%2e.//%2e.//%2e.//%2e.//%2e.//%2e./etc/passwd

AssetDispatcher incorrectly checked for directory traversal before
decoding the URL. We'd like to thank Takeshi Terada of Mitsui Bussan
Secure Directions, Inc for notifying us of the issue.

As always, a big thank you to everyone involved in both contributions
through commits, tickets, documentation edits, and those whom have
otherwise contributed to the framework. Without you there would be no
CakePHP. Download a packaged release [2].


Links
~~~~~

+ [1] `https://cakephp.org/changelogs/2.4.1`_
+ [2] `https://github.com/cakephp/cakephp/releases/2.4.1`_




.. _https://github.com/cakephp/cakephp/releases/2.4.1: https://github.com/cakephp/cakephp/releases/2.4.1
.. _https://cakephp.org/changelogs/2.4.1: https://cakephp.org/changelogs/2.4.1

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

