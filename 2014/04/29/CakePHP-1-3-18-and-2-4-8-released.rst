CakePHP 1.3.18 and 2.4.8 released
=================================

The CakePHP core team is happy to announce the immediate availability
of 1.3.18 and 2.4.8. These releases contain security fixes and are
recommended for all CakePHP developers using SecurityComponent.

The CakePHP core team is happy to announce the immediate availability
of 1.3.18[1] and 2.4.8[2]. These releases contain security fixes and
are recommended for all CakePHP developers using SecurityComponent. A
short list of changes you can expect in 2.4.8 are:

+ SQLServer now properly appends the schema name when describing
  tables.
+ Hash::extract() can now match boolean attributes.
+ fclose() errors when using shells should no longer happen.
+ CakeResponse::file() now throws an exception when paths contain
  '..'.
+ ShellDispatcher now casts argv to an array. This fixes issues when
  cake console was invoked from a non-cli SAPI.
+ TextHelper::autoLink() now correctly links urls with subdomains
  containing '\_'.
+ SecurityComponent form tampering hashes now include the URL
  including the query string as a hash input.

A short list of changes you can expect in 1.3.18 are:

+ Model conditions containing `:` or `?` are now handled correctly.
  This fixes issues around using casting in conditions
+ SecurityComponent form tampering hashes now include the URL path as
  a hash input.

As previously mentioned, a security issue related to the
SecurityComponent was fixed. These releases are recommended upgrades
for anyone using SecurityComponent. Prior to these relases, forms
secured by SecurityComponent could be submitted to any action without
triggering SecurityComponent's tampering protection. If an application
contains multiple POST forms to manipulate the same models, it could
be vulnerable to mass assignment issues. Thanks to Kurita Takashi for
notifying the CakePHP team of this issue, and suggesting a fix.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/1.3.18`_
+ [2] `http://cakephp.org/changelogs/2.4.8`_




.. _http://cakephp.org/changelogs/1.3.18: http://cakephp.org/changelogs/1.3.18
.. _http://cakephp.org/changelogs/2.4.8: http://cakephp.org/changelogs/2.4.8

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

