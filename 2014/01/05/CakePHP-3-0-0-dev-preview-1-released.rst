CakePHP 3.0.0 dev preview 1 released
====================================

The CakePHP core team is very excited to announce the first
development preview of CakePHP 3.0

The CakePHP core team is very excited to announce the first
development preview of CakePHP 3.0[1]. The team has been hard at work
for the while, and we're very excited and pleased with the progress
we've made so far. Our goal with development preview releases like
this is to gather early feedback about the changes coming in CakePHP
3.0. While a number of things will be changing in CakePHP 3.0, our
focus for this release has been the ORM.

The Model layer in CakePHP has served the community very well for the
past 8 years, but it has started to show its age. One of the goals of
CakePHP 3.0 is to replace the ageing ORM with a more modern object-
orientated implementation. This development preview has the
underpinnings of the new ORM. The ORM has many of the features/methods
you can expect in future 3.0 release, albeit with a few rough spots.

CakePHP 3.0 represents a significant break in backwards compatibility.
One of the largest the project has ever had. We're trying to modify
existing methods and classes only where it's required. However,
modernizing the ORM has caused a significant ripple effect to other
parts of the framework. You can expect fairly significant changes in
everything that touches the ORM/Models as we've started over and built
what we will become a great ORM.


Still a preview
---------------

We'd like to remind you that this is a development preview release.
Many features are incomplete or missing. For example, the
`TreeBehavior` and `TranslateBehavior` do not yet have 3.x versions.
This release is not intended for production use, and should be
considered alpha software. We are hoping that by releasing preview
releases we can get feedback from you - the community - about CakePHP
3.0. The following features are known to be incomplete or broken. We
will not be accepting any bug reports on these features at this time:

+ `Console/cake bake` does not work at this time.
+ FormHelper does not work with the new ORM yet.
+ SchemaShell has been removed.
+ Scaffold has been removed.
+ Many behaviors have been removed or are not working.
+ AclComponent is not working with DbAcl.

In addition to incomplete subsystems, many subsystems have had
breaking API changes made to them. We recommend you checkout the
migration guide[2] for more detail on which methods/classes have been
changed.


Other improvements
~~~~~~~~~~~~~~~~~~

In addition to the ORM we've improved other parts of the framework. A
short list of improvements you an expect are:

+ Reverse routing has almost consistent time complexity now. In
  previous releases reverse routing performance decreased as the number
  of routes increased. Thanks to named routes and some additional
  optimizations routing performance should stay more consistent even
  with large numbers of routes.
+ Routing prefixes now map to controllers in sub-namespaces and not
  prefixed methods.
+ New HTTP client. The HttpSocket class has been entirely re-written.
  It is now simpler, more performant and easier to use.
+ Simplified configuration. While CakePHP does not have much
  configuration required. The configuration it does have is now much
  simpler and more transparent than ever before.
+ Community standards adopted. CakePHP is leveraging PSR-0, PSR-1 and
  composer support.
+ Streamlined events system. The events system is now simpler and more
  efficient than ever before.



Getting started
---------------

On top of the framework changes, we've created a new repository for
the application skeleton[3]. You can install this and the development
preview of CakePHP using composer[4]. After downloading and installing
composer you can use:

::

    $ php composer.phar create-project -s dev cakephp/app

This will generate a new application, so you can start experimenting
with CakePHP 3.0.


Documentation online
--------------------

While this is a preview release, we have been busy building
documentation alongside the code changes. The in-development book[5]
and API[6] are already online. They will be receiving frequent updates
as more documentation and examples are written.


Getting involved
----------------

If you're as excited about CakePHP 3.0 as we are, there are many ways
you can get involved. You could help with the open issues in
github[7], or provide your thoughts on any of the open RFC/Enhancement
tickets. Both of these help us design and build the best framework we
can. If you're reading through the documentation and notice an error,
please let us know, either by opening an issue or sending a pull
request.

I'd like to thank everyone who has contributed thoughts, code,
documentation or feedback to 3.0 so far. It's going to be a major
milestone for the project, and we're just getting started with making
it the best version of CakePHP ever.


Links
~~~~~

+ [1] `https://github.com/cakephp/cakephp/releases/3.0.0-dev1`_
+ [2] `https://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html`_
+ [3] `https://github.com/cakephp/app`_
+ [4] `http://getcomposer.org`_
+ [5] `https://book.cakephp.org/3.0/en/`_
+ [6] `https://api.cakephp.org/3.0/`_
+ [7] `https://github.com/cakephp/cakephp/issues?milestone=7&state=open`_




.. _http://getcomposer.org: http://getcomposer.org
.. _https://github.com/cakephp/cakephp/issues?milestone=7&state=open: https://github.com/cakephp/cakephp/issues?milestone=7&state=open
.. _https://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html: https://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html
.. _https://github.com/cakephp/cakephp/releases/3.0.0-dev1: https://github.com/cakephp/cakephp/releases/3.0.0-dev1
.. _https://book.cakephp.org/3.0/en/: https://book.cakephp.org/3.0/en/
.. _https://api.cakephp.org/3.0/: https://api.cakephp.org/3.0/
.. _https://github.com/cakephp/app: https://github.com/cakephp/app

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

