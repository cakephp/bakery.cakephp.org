CakePHP 2.3.8 & 2.2.9 released
==============================

The CakePHP core team is happy to announce the immediate availability
of 2.3.8[1] and 2.2.9[2]. These releases contain security fixes and
are recommended for all CakePHP developers.

The CakePHP core team is happy to announce the immediate availability
of 2.3.8[1] and 2.2.9[2]. These releases contain security fixes and
are recommended for all CakePHP developers. A short list of changes
you can expect in 2.3.8 are:

+ Improved API documentation.
+ I18nShell now extracts plugin model validation messages correctly.
+ ServerShell now serves static assets with query string parameters.
+ ServerShell correctly uses the document_root parameter.
+ Inflector can now pluralize additional words.
+ File responses using HTTP Range now work correctly.
+ A regression introduced to AuthComponent in 2.3.7 for redirectUrl()
  when an application is running in a subdirectory has been fixed.
+ Pagination sort whitelists are now trusted implicitly. No additional
  validation is done on whitelisted fields. This makes it easier to sort
  on synthetic columns, or columns added through joins in custom finds.

As previously mentioned, a security issue related to the
AssetDispatcher was fixed. This upgrade is important for all
applications serving assets out of themes or plugins using the built-
in AssetDispatcher. A big thank you to Takeshi Terada of Mitsui Bussan
Secure Directions for contacting us about the security issue and
providing steps to reproduce it. We'll disclose more details about the
vulnerability in the future once people have had the chance to
upgrade.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.
Download a packaged release [4].


Links
~~~~~

+ [1] `https://cakephp.org/changelogs/2.3.8`_
+ [2] `https://cakephp.org/changelogs/2.2.9`_
+ [3] `https://github.com/cakephp/cakephp/tags`_




.. _https://cakephp.org/changelogs/2.2.9: https://cakephp.org/changelogs/2.2.9
.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _https://cakephp.org/changelogs/2.3.8: https://cakephp.org/changelogs/2.3.8

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

