CakePHP 2.1-alpha just baked
============================

We are excited to announce the that the next version of CakePHP just
hit alpha state. This version adds several useful features that make
CakePHP one of the easiest and more fun to work with frameworks out
there. Check it out to enjoy content type specific pages, improved
error messages, view blocks and a new callbacks system.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.1.0 alpha [1]. Version 2.1 is fully backwards compatible
with 2.0.x release. This means that if you have an app already working
in 2.0 or plan to upgrade one to it, you can safely start using 2.1
right away and expect no additional work in upgrading. We are very
excited about several enhancements that are part of 2.1 and are
working hard to get the few remaining improvements completed.

In total, there were over 230 commits and over 15 new features or
enhancements added to CakePHP 2.1. A complete list of the changes can
be viewed in the changelogs page [2]. This is a quick list of this
version's main highlights:


Content Type Views
------------------

Two new view classes have been added to CakePHP. The new `JsonView`
and `XmlView` allow you to more easily generate XML and JSON views.

By enabling `RequestHandlerComponent` in your application, and
enabling support for the `xml` and or `json` extensions, you can
automatically leverage the new view classes. There are two ways you
can generate data views. The first is by using the `_serialize` key,
and the second is by creating normal view files.

This makes it super easy to create content-type specific pages and
automatic error responses in the correct mime-types.


Extending views
---------------

The View class has a new method allowing you to wrap or 'extend' a
view/element/layout with another file. This introduces the ideas of
"sub-layouts" making your views more flexible than ever, this was
implemented using ViewBlocks.

View blocks are a flexible way to create slots or blocks in your
views. Blocks replace `$scripts_for_layout` and `$content_for_layout`
with a more robust and flexible API.

For example blocks are ideal for implementing things such as sidebars,
or regions to load assets at the bottom/top of the layout.


Plugin.view
-----------

All layout/view/element names can now use `Plugin.view` to indicate
that a plugin view should be used. The `plugin` option for
`View::element()` is deprecated.


Improved errors
---------------

The `debug()` function output is now cleaner and more readable. We
have also added interactive stack traces to exception pages. You can
click on each point of the trace to take a peek at the variable state
for that point. Also, as mentioned earlier, CakePHP can now respond
with content-type specific error pages.


General purpose event system
----------------------------

A new, generic event system has been built and it replaces the way
callbacks are dispatched. This should not result in any changes to
your code though. You can dispatch your own events and attach
callbacks to them at will. This is useful for inter-plugin
communication and decoupling of your classes through events.


Testing
-------

Fixtures can be created in datasources other than `$test`. Models
loaded using the ClassRegistry and using another datasource will get
their datasource name prepended with `test_` (e.g datasource `master`
will try to use `test_master` in the testsuite)

A new TestShell has been added. It reduces the typing required to run
unit tests, and offers a file path based UI::

::

    Console/cake test app/Model/Post.php
    Console/cake test app/Controller/PostsController.php



Helpers
-------

+ `<!--nocache-->` tags now work inside elements correctly.
+ FormHelper now omits disabled fields from the secured fields hash.
  This makes working with `SecurityComponent` and disabled inputs
  easier.
+ The `between` option when used in conjunction with radio inputs, now
  behaves differently. The `between` value is now placed between the
  legend and first input elements.
+ The `hiddenField` option with checkbox inputs can now be set to a
  specific value such as 'N' rather than just 0.
+ The `for` attribute for date + time inputs now reflects the first
  generated input. This may result in the for attribute changing for
  generated datetime inputs.



Callback priorities
-------------------

Callbacks for Helpers, Behaviors, and Components now support
priorities, this helps more easily control the order in which
callbacks are fired.

We are working towards making the 2.1 book online in the next few
hours and plan to finish the remaining features very soon. Thanks to
the ever-growing CakePHP community for the patches, documentation
changes and new tickets. Without you there would be no CakePHP!

+ Download a packaged release [1]
+ View the changelog [2]



Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/2.1.0-alpha`_




.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp
.. _http://cakephp.org/changelogs/2.1.0-alpha: http://cakephp.org/changelogs/2.1.0-alpha

.. author:: lorenzo
.. categories:: news
.. tags:: release,2.1-alpha,News

