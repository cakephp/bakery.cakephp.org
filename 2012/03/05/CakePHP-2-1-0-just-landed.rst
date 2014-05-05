CakePHP 2.1.0 just landed
=========================

Checkout the new version on the popular PHP framework. Cool surprises
included!

The CakePHP core team is very excited to announce the immediate
availability of CakePHP 2.1.0 stable. As noted in the previous
releases, this version is fully backwards compatible with 2.0.6,
making it a breeze to update your apps to start taking advantage of
the many improvements that made into this release. We are not going to
release any new versions for the 2.0.x branch, and any future bug fix
will be done into the 2.1 branch.

In total, there were over 90 commits and a few minor enhancements
added to this final release, since our last candidate. A complete list
of the changes can be viewed in the changelogs page [2]. This is a
quick list of version 2.1 highlights.


Content Type Views
~~~~~~~~~~~~~~~~~~

Two new view classes have been added to CakePHP. The new `JsonView`
and `XmlView` allow you to more easily generate XML and JSON views.


Extending views
~~~~~~~~~~~~~~~

The View class has a new method allowing you to wrap or 'extend' a
view/element/layout with another file.


Plugin.view
~~~~~~~~~~~

All layout/view/element names can now use `Plugin.view` to indicate
that a plugin view should be used. The `plugin` option for
`View::element()` is deprecated.


Improved errors
~~~~~~~~~~~~~~~

The `debug()` function output is now cleaner and more readable. We
have also added interactive stack traces to exception pages.


General purpose event system
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A new, generic event system has been built and it replaces the way
callbacks are dispatched. You can dispatch your own events and attach
callbacks to them at will.


Testing
~~~~~~~

Fixtures can be created in datasources other than `$test`.

A new TestShell has been added. It reduces the typing required to run
unit tests, and offers a file path based UI::

::

    Console/cake test app/Model/Post.php
    Console/cake test app/Controller/PostsController.php



Callback priorities
~~~~~~~~~~~~~~~~~~~

Callbacks for Helpers, Behaviors, and Components now support
priorities, this helps more easily control the order in which
callbacks are fired.


ThemeView is now deprecated
~~~~~~~~~~~~~~~~~~~~~~~~~~~

We've merged all the `ThemeView` functionality into the `View` class.
Easier theme support!


Improved HTTP caching
~~~~~~~~~~~~~~~~~~~~~

Added several new methods in `CakeResponse` class to fine-tune options
for HTTP caching. `RequestHandlerComponent` will now stop the view
rendering process if it detects the client has a cached version of the
resource.


Most helpers converted to utility libs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We have now refactored some helpers into libraries like `CakeTime` and
`CakeNumber`. Importing one of those libs is as easy as
`App::uses('String', 'Utility')` and use it as follows
`String::truncate($text);`


Deep saving
~~~~~~~~~~~

`saveAll` and friends ( `saveMany`, `saveAssociated`,
`validateAssociated` ...) now accept a new `deep` option param. For
instance you can save the Author, Posts and related comments in just
one call. You can also set the `fieldList` option to these methods, to
provide a set of fields that are allowed to be saved.


New ACL engine
~~~~~~~~~~~~~~

In addition to the good old database ACL engine, we have added a new
one based on configuration files. This is a great alternative to the
database solution for those who want to get a speedy permissions
checking system when not requiring a database to dynamically manage
permissions.


HtmlHelper::media()
~~~~~~~~~~~~~~~~~~~

The HtmlHelper gained a new `media()` method to generate HTML5
compatible audio and video tags with support for multiple alternate
sources.


Other improvements and changes
------------------------------

+ Updated minimum PHP version requirement to 5.2.8 due to PHP bugs
  #44251 and #45748
+ Paginator helper now accepts an option to set the default class for
  the "current" page link
+ Extending non-existing views will throw an exception
+ Extending views using an absolute path (relative to the View folder)
  is now possible
+ Most view files in the cake core such as home.ctp and the default
  layout were moved into the app folder.
+ Query params are now shown in database log when using prepared
  statements
+ Transaction commands (BEGIN, COMMIT, ROLLBACK) are now shown in
  database log
+ Added `Set::nest()` and `Set::get()`. The former is used to created
  a nested array out of a plain one using an array key as reference.
  `Set::get()` is used to access any array value using dot notation.
+ Added `Router::defaultRouteClass()` to get/set the default Route
  class. This makes it easy to set a global default, useful for slug
  routes or i18n.
+ `I18n::translate()` now accepts a new $language param. It also now
  exposes methods to read .po files, useful for custom translation
  interfaces.`
+ Authenticate objects can now receive a 'recursive' option to limit
  data returned in queries used for finding users.
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
+ When using Media view setting the `extension` variable is now
  optional. If not provided its extracted from the `id` (aka filename)

One of the cool suprises we were saving for you, is the addition of a
new site to the CakePHP domain. The new plugins repository site [4]
aims to be the single reference and search start point for any
extensions, plugins and applications done using CakePHP. Check it out
at `http://plugins.cakephp.org`_

Additionally we have done a major facelift to the CakePHP homepage [4]
and the online manual [5], which among other cool things, have a fluid
layout that will adapt to smaller screen sizes such as your mobiles
phones or tablets. We are still working hard to get the rest of the
sites done to match our new look.

For those wanting to ease deployment process of your cakephp
applications, we have created our new PEAR channel [6] for the
framework. This will help you keep up-to-date with new security fixes
and latest enhancements. Just go to the website and follow the
instructions!

As always, thanks to the friendly CakePHP community for the patches,
documentation changes and new tickets. Without you there would be no
CakePHP!

+ Download a packaged release [1]
+ View the changelog [2]



Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/2.1.0`_
+ [3] `http://plugins.cakephp.org`_
+ [4] `http://cakephp.org/`_
+ [5] `http://book.cakephp.org/`_
+ [6] `http://pear.cakephp.org/`_




.. _http://plugins.cakephp.org: http://plugins.cakephp.org
.. _http://pear.cakephp.org/: http://pear.cakephp.org/
.. _http://book.cakephp.org/: http://book.cakephp.org/
.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp
.. _http://cakephp.org/changelogs/2.1.0: http://cakephp.org/changelogs/2.1.0
.. _http://cakephp.org/: http://cakephp.org/

.. author:: lorenzo
.. categories:: news
.. tags:: release,2.1.0,News

