CakePHP 4.5.0-RC1 Released
============================

The CakePHP core team is happy to announce the first release candidate for
CakePHP 4.5.0. The 4.5 release includes many new deprecations and is
a recommended upgrade point if you plan on upgrading to 5.0 in the future.
There are also new features in 4.5.0. The highlights of those include:

* ``Cache::write()`` will throw an exception on error now.
* Console commands can now use ``--`` to indicate that all preceding parameters
  are positional arguments.
* The current container instance is now registered as a service. This makes the
  container available as a dependency for application and plugin factories.
* ``ConnectionManager`` now supports read and write connection roles. Roles can
  augment the connection configuration using nested configuration.
* Improved development exception stack trace rendering. 
* ``HttpsEnforcerMiddleware`` now supports the ``trustedProxies`` option which
  lets you define upstream proxies that your application should trust to proxy
  HTTPs traffic.
* Plugins can now define multiple translation domains.


What's new in 4.5.0
-------------------

The `migration guide
<https://book.cakephp.org/4.next/en/appendices/4-5-migration-guide.html>`_ has
a complete list of what's new in 4.5.0. We recommend you give that page a read
when upgrading as it notes the deprecations present in 4.5.0.

How you Can Help
----------------

You can help deliver 4.5.0 by contributing in one of many ways:

#. Check the `documentation <https://book.cakephp.org/4.next/en/>`_ for mistakes,
   outdated, unclear or broken examples. We've been trying to update the
   documentation as we go, but there are likely examples or sections we've
   missed.
#. Try it out! Give CakePHP 4.5.0 a test drive. Let us know how upgrading
   went and if there were any rough spots.
#. File issues for regressions in existing features, or suggest new features.
   Even if those features don't make it into 4.5.0, we're early in the process
   of planning 4.6 and 5.1 and value community feedback.

Contributors to 5.0.0-RC2
-------------------------

Thank you to all the contributors that have helped since with the RC1 release:

* ADmad
* Alejandro Ibarra
* Brian French
* Chris Nizzardini
* Jaro Varga
* Jose Daian
* Jozef Grencik
* Kevin Pfeifer
* Marcelo Rocha
* Mark Scherer
* Mark Story
* Matthias Wirtz
* othercorey
* Roland Waldner

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
