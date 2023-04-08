CakePHP 3.0.1 Released
======================

The CakePHP core team is proud to announce the immediate availability of CakePHP
3.0.1. 3.0.1 is a bugfix release for the 3.0 release branch. A short list of the
changes you can expect is:

* Reduced chances for timing attacks in HMAC comparisons in Security::decrypt()
  by using more constant time string comparisons.
* FormHelper now supports an ``idPrefix`` option. This option allows you to
  specify the prefix you want prepended to ``id`` attribute of all inputs
  FormHelper generates.
* FormHelper now supports group templates for each input type. For example, the
  ``radioFormGroup`` template will be used for radio button sets.
* Elements included in a prefixed request context now look in prefixed paths.
  When a controller runs in a prefixed route/namespace it will automatically
  append the current prefix to the view paths used to locate elements.
* Schema reflection for Postgres no longer fails when foreign keys rely on
  stored procedures.
* Schema reflection now treats money columns as strings. Due to leading currency
  codes the ORM cannot easily map this type into float values.
* Selectboxes disable and select active options correctly now when complex
  option data is used.
* Selectboxes can now have an empty name attribute.
* URL filters are applied before the existing request context is applied now.
* Cake\I18n\Time now supports short timezone offset formats.
* Query logging now works when the duplicate named parameters are used.
* existsIn rules now correctly set an error message when used with a list of fields.
* RulesChecker methods can now return strings to indicate failure. The returned
  strings will be used as the error message if a field was also defined for the
  rule.
* Primary key values can now be defined when creating entities. This improves
  compatibility with UUID's where ID's are generated outside of your
  application.
* When saving/updating entities, existing HasMany associations can be re-linked
  using a ``_ids`` input similar to BelongsToMany associations.
* Greatly improved performance around hydrating ORM results.
* Improved PHP7 & HHVM compatibility.
* Improved API documentation.

There is still time to get your tickets for `CakeFest 2015
<https://cakefest.org/tickets>`_ if you haven't already. May 28th and CakePHP's
10th anniversary are quickly approaching.

You can view the full `changelog on cakephp.org
<https://cakephp.org/changelogs/3.0.1>`_. I'd like to thank the people who have
contributed to this release. Your bug tickets, documentation edits, and
patches/pull requests are a big part of what keeps CakePHP alive and ticking.
Download a `packaged release on github <https://github.com/cakephp/cakephp/releases/3.0.1>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: CakePHP, release
.. comments::
