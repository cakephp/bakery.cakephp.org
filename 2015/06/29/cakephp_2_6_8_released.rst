CakePHP 2.6.8 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.6.8. This is a maintenance release for the 2.6 branch.

Bugfixes
--------

You can expect the following changes in 2.6.8. See the
`changelog <http://cakephp.org/changelogs/2.6.8>`_ for every commit.

* Fix issue with overlapping irregular inflections. When irregular inflections
  overlap we should choose the longest match, not the shortest.
* Fix regression in Inflector::camelize(). The input should not be lowercased
  before camelizing, as this can cause inputs that were previously camelized to
  create incorrect results.
* Fix Validation::multiple() regarding 0 value. Previously 0 could not be
  a valid option.
* FormHelper::radio() now supports complex option definition. This makes it
  easier to define custom attributes on each radio button.
* Element tags had trailing whitespace removed. If you have custom element tags
  with HtmlHelper you might need to update your templates.
* Shells will now never print HTML errors. Previously if you used custom the
  console error handlers you could end up with HTML in your terminal.
* SQL operators in Postgres are now less greedy when fields are quoted.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.
