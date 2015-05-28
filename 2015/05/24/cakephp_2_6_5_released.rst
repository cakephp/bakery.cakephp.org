CakePHP 2.6.5 Released
======================

The CakePHP core team is proud to announce the immediate availability of CakePHP
2.6.5. 2.6.5 is a bug fix release for the 2.6 release series.

A short list of the changes you can expect in 2.6.5 is:

* Year form fields when created with ``input()`` now work as expected.
* Support for the 429 HTTP status code has been added.
* JsonView now supports a ``_jsonOptions`` view variable to configure the
  serialization options used in ``json_encode()``.
* XmlView now supports a ``_xmlOptions`` view variable to configure the
  serialization options used when generating XML.
* Code coverage in the web runner for non-app files works again.
* SchemaShell no longer mangles file names ending in 'p' or 'h'.
* Multi-word irregular nouns are now inflected properly by Inflector. Previously
  words would contain letters transposed between the first and second word.
* All HTML5 attributes that can be minimized have been added to HtmlHelper.
* Identifier quoting of table aliases in sub-queries, used to create virtual
  fields has been corrected.

I'd like to thank the people who have contributed to these releases. Your
issues, documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking.  Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: CakePHP, release
.. comments::
