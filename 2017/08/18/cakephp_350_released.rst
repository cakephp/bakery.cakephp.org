CakePHP 3.5.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.0. This is the first stable release of 3.5.0. 3.5.0 provides a number
improvements both large and small to CakePHP. It also deprecates several
features that will be removed in 4.0.0.

In following with our :doc:`previously announced roadmap
</2017/06/23/upcoming-cakephp-roadmap>` work will now begin on 3.6. This work will
take place in the ``3.next`` branch, while the ``master`` branch now contains
``3.5.x``.

Upgrading to 3.5.0
------------------

You can use composer to upgrade to CakePHP 3.5.0::

    php composer.phar require "cakephp/cakephp:3.5.0"

Deprecations
------------

3.5.0 deprecates a number of methods as we continue to transition away from
combined get/set methods in favour of separate get/set methods. The `migration
guide <https://book.cakephp.org/3.0/en/appendices/3-5-migration-guide.html#deprecations>`__
has the full list of deprecated methods and their replacements. Deprecated
features will continue to exist and behave as they always have until 4.0.0

What's new in 3.5.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-5-migration-guide.html>`_ has
a complete list of what's new in 3.5.0. We recommend you give that page a read
when upgrading.

* Scoped Middleware - Middleware can now be conditionally applied to routes in
  specific URL scopes. This allows you to build specific stacks of middleware
  for different parts of your application without having to write URL checking
  code in your middleware.
* New Middleware - New middleware was added to apply CSRF tokens, and encrypted
  cookies.
* Improved Console Environment - A new console dispatcher has been added,
  integrating the ``Application`` class into the CLI environment. Integration
  testing helpers have been added making testing console commands simpler.
* Helpful Console Errors - Missing options & subcommands now make suggestions
  of valid options instead of just erroring out.
* Cache Engine Fallbacks - Cache engines can now be configured with a fallback
  key that defines a cache configuration to fall back to if the engine is
  misconfigured (or unavailable).
* Cookie Objects - New Cookie & CookieCollection classes have been added. These
  classes allow you to work with cookies in an object-orientated way.
* dotenv Support added to Application Skeleton - The application skeleton now
  features a 'dotenv' integration making it easier to use environment variables
  to configure your application.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 3.5.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
