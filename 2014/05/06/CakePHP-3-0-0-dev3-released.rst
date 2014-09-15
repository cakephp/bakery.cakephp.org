CakePHP 3.0.0-dev3 released
===========================

Fresh slices of the new development preview for version 3.0 are hot
and out of the oven!

The CakePHP core team proudly announces the third development preview
of `CakePHP 3.0.0`_. In the couple months between 3.0.0-dev2 and this
release, we've been working really hard at getting the remaining big
parts of the new features we wanted to introduce into the framework.

We have decided to not do a future 3.0.0-dev4 release as everything
that was planned for it was already completed. This means that the
next release will be 'alpha' and the team will focus mostly on
polishing the current features, documentation and porting some of the
2.x plugins. We're really happy with the progress we have made and the
pace at which 3.0 is going.

Additionally the team has spent plenty of time incorporating all the
community feedback into the new ORM and we're humbled by the amount of
people putting some of their time into making it even more
comprehensive and easy to use.

This release also comes with full documentation for the new features
and changes, make sure you check out the new `CakePHP 3.0 book`_ To
read about them in detail.

Below the list of new features and changes that made it into
3.0.0-dev3:


Console improvements
~~~~~~~~~~~~~~~~~~~~

+ New ConsoleIO class added. It is a convenience class containing
  common method for input/output in shells.
+ Console methods will receive passed arguments as function
  parameters, much like controller actions.
+ Adding subcommands for Tasks is now required.
+ Possibility to alias any shell command, for example instead of `
  Console/cakebakemodel` you could do ` Console/cakebmodel`.


View Cells
~~~~~~~~~~

View cells are small classes that offer controller-like functionality
but can be used directly in the view to pull data from any source and
render certain template. `Read more about View Cells`_


New Time Library
~~~~~~~~~~~~~~~~

The Time class was completely re-implemented to internally use
`Carbon`_. Whatever the Carbon library and ` DateTime` can do, the new
Time lib can too. This means that the method in ` Time` are no longer
static, you need and instance of the object to get access to its
methods.

In addition to the new Time class being added, it has been integrated
with the ORM, meaning that any timestamp/datetime columns in your
entities will be able to leverage the power Cake\Utility\Time
provides.

Lastly, the Time lib uses the ` intl` php extension to provide
reliable locale-aware date formatting which is several times superior
to the support that we could offer in the 2.x series.

`Read more about Time`_


Bake
~~~~

Bake is finally working again in CakePHP 3.0, but it also brings a
nice number of great new features:

+ Bake is now pluggable! You can create your own bake tasks and they
  will be automatically discovered. This means that you can now
  implement your own ` Console/cakebakesuper_table`
+ Ability to bake shells, cells, components, behaviors and more

Additionally we added some other changes:

+ Microsoft SQL Server support was added to the new ORM
+ TreeBehavior was re-implemented and offers feature parity with its
  previous version form 2.x
+ Both Behaviors and Components have now a ` config()` method,
  configuration using public properties was removed
+ Multiple bugfixes in the ORM
+ ` Collection::nest()` and ` Collection::listNested()` were added for
  dealing with hirarchical data
+ ` Validator::notEmpty()` was added as a complement to `
  Validator::allowEmpty()`
+ Moved exception files to their corresponding namespaces
+ Simplified View objects construction, they are not dependent on
  controllers anymore
+ ` Request::isMobile` now uses an external library to correctly match
  the ever-growing number of mobile devices


Community plugins
~~~~~~~~~~~~~~~~~

Some have been also very busy catching up with the changes introduced
daily in the 3.0 branch. We'd like to mention the `CRUD plugin`_ which
contains a dynamic scaffolding and automatic Admin generator. It may
be a great way of getting on into CakePHP 3.0 the fast way.

Dereuromark's `Tools plugin`_ seems to be having some interesting
activity with some good behaviors ready to use in CakePHP 3.0.


Up next
-------

Our next release will be marked as alpha and we are going to focus on
the following:

+ Make the session object live inside the Request object. It will not
  be static anymore
+ Implementing the new middleware layer
+ Themes implemented as plugins
+ CookieComponent reworked.
+ Overhaul i18n to use intl and add support for i18n engines

We'd like to thank everyone who has contributed thoughts, code,
documentation or feedback to 3.0 so far. It looks like it is going to
be the single most important and feature rich release when it is
marked stable!


.. _Carbon: https://github.com/briannesbitt/Carbon
.. _CakePHP 3.0 book: http://book.cakephp.org/3.0/en/index.html
.. _Read more about Time: http://book.cakephp.org/3.0/en/core-utility-libraries/time.html
.. _Read more about View Cells: http://book.cakephp.org/3.0/en/views/cells.html
.. _Tools plugin: https://github.com/dereuromark/tools/tree/cake3
.. _CakePHP 3.0.0: https://github.com/cakephp/cakephp/releases/3.0.0-dev3
.. _CRUD plugin: http://blog.friendsofcake.org/2014/05/03/crud-v4-crud-view-and-search-cake-3-0.html

.. author:: lorenzo
.. categories:: news
.. tags:: release,CakePHP,News

