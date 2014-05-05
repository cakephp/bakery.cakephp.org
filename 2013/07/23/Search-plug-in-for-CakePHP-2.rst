Search plug-in for CakePHP 2
============================

This plug-in allows basic but flawlessl accent-insensitive text search
and result highlighting.

Searching texts in a database and highlighting matches in results
display is a very common functionality on websites. It can be quite
hard and very frustrating to implement when dealing with languages
that use Unicode special characters (mainly accentuated letters),
since no universal and complete method exists to correctly de-
accentuate text. Furthermore, Unicode characters double-byte encoding
makes the standard PHP string functions unreliable since it makes
characters indexes inconsistent between the de-accentuated text and
the original one.

This plug-in takes care of these issues. It consists mainly of a
Behavior that makes a custom 'search' find type available to Models,
with special options for database filtering and result highlighting.
It also contains a Lib class, mainly for use by the Behavior but this
class has a static function to strip the accents from a text that you
can use besides the search functionality.

The functionalities of this plug-in are still very basic, but will be
improved in the future, probably starting with results ordering.


Links
`````
`Search demo`_
`Github repository`_
`More explanations on searching with accents in PHP and MySQL`_

.. _Search demo: http://patisserie.keensoftware.com/en/pages/search/search:cakephp
.. _Github repository: https://github.com/P2Beauchene/Search-Plugin-for-CakePHP
.. _More explanations on searching with accents in PHP and MySQL: http://patisserie.keensoftware.com/en/pages/gerer-les-accents-dans-les-recherches-textes

.. author:: ccadere
.. categories:: articles, plugins
.. tags:: search,plugin,accents,Plugins

