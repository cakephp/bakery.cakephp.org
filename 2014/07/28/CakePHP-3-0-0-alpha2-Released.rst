CakePHP 3.0.0-alpha2 Released
=============================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 3.0.0-alpha2.

The CakePHP core team is proud to announce the immediate availability
of `CakePHP 3.0.0-alpha2`_. CakePHP 3.0.0-alpha2 is the second alpha
release for CakePHP 3.0.0. In the month since 3.0.0-alpha1 a few new
features have been merged, and many issues have been fixed.


New Features in 3.0.0-alpha2
----------------------------


Router Refactor and Builder Based APIs.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Router class has been re-factored internally and new methods have
been added to allow your routes file to stay DRYer than ever before.
In addition to improved methods, the performance of parsing incoming
URLs has been greatly improved. Router is stricter about missing
routes, and will notify you (via an exception) when a URL cannot be
parsed or matched with the connected routes.

The default routes provided by CakePHP have been removed. While
helpful in the prototyping stages, these routes created issues with
duplicate content and were often not used in larger applications. In
their place, a smaller subset of routes is provided to help with the
prototype stage of application development. If you have an existing
application using 3.0, you will need to update your `routes.php`_
file.


CacheHelper Removed
~~~~~~~~~~~~~~~~~~~

CacheHelper has been removed from CakePHP. The core team feels that
the functionality this helper provided is best handled by standalone
servers like `Varnish`_. While we explored building a ESI based
replacement for CacheHelper, there were a number of edge cases that
would have complicated the implementation.


ORM Improvements
~~~~~~~~~~~~~~~~

+ Empty associations in BelongsTo and HasOne associations no longer
  hydrate an empty entity. Instead the association property will be `
  null`.
+ Options for all the various ORM operations are now consistent.
+ You can specify a white list of fields when marshaling data out of
  the request and into entities.
+ It is now easier to implement custom column types with the `
  _initializeSchema` table hook method.
+ Query::newExpr() now accepts a SQL expression.
+ Conditions with nullable values are easier to build `
  'fieldIS'=>$val` will generate correct SQL when ` $val` is not `
  NULL`.
+ Conditions with ` IN` clauses work better with empty data.



Other Changes
~~~~~~~~~~~~~

+ HtmlHelper and FormHelper had their ` $confirmMessage` arguments
  removed and replaced with ` confirm` options.
+ Improved errors for Cells.
+ Prefixed controllers can now use prefixed layouts which will be
  checked automatically.
+ Cookies are now read and decrypted lazily.
+ The ` ssl` routing option is now ` _ssl`.
+ The ` [method]` routing option is now ` _method`.
+ Header based route matching has been removed. It was very
  infrequently used.
+ Router::resourceMap() has been removed. New options for
  Router::mapResources() replace the need to have this method.
+ Bcrypt hashing has been removed from ` Security::hash()`

There are still tickets available for CakeFest 2014. You can get `your
tickets now`_ to join us in Madrid for exciting talks and tutorials on
CakePHP and related technologies.

For more details on all the changes in 3.0.0, you can consult the
`migration guide`_. I'd like to thank everyone who has contributed
thoughts, code, documentation or feedback to 3.0 so far. We are very
grateful for all the early adopters and their feedback. Getting issues
found and fixed early is a huge help.


.. _routes.php: https://github.com/cakephp/app/blob/master/src/Config/routes.php
.. _migration guide: http://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html
.. _Varnish: http://varnish-cache.org
.. _your tickets now: http://cakefest.org/tickets
.. _CakePHP 3.0.0-alpha2: https://github.com/cakephp/cakephp/releases/3.0.0-alpha2

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

