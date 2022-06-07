CakePHP 4.4.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.0. This is the first stable release of 4.4.0. 4.4.0 provides a number
improvements to CakePHP.

Upgrading to 4.4.0
------------------

You can use composer to upgrade to CakePHP 4.4.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:4.4.*"

Deprecation Warnings
--------------------

4.4 introduces a few deprecations. All of these features will continue for the
duration of 4.x but will be removed in 5.0. See the `migration guide
<https://book.cakephp.org/4/en/appendices/4-4-migration-guide.html>`_.

What's new in 4.4.0?
--------------------

The `migration guide
<https://book.cakephp.org/4/en/appendices/4-4-migration-guide.html>`_ has
a complete list of what's new in 4.4.0. We recommend you give that page a read
when upgrading. A few highlights from 4.4.0 are:

* A new Error and Exception handling framework that is easier to extend and
  requires less application code to operate.
* The ``RedisEngine`` now supports fast deletes with ``deleteAsync()``.
* ``bin/cake routes`` now highlights collisions in route templates.
* ``Controller::viewClasses()`` was added. This method enables controllers to
  take control of what content-types they can respond as.
* View classes can define the static method ``contentType()`` to participate in
  content-type negotiation.
* ``Query::expr()`` was added as an alternative to ``Query::newExpr()``.
* The ``QueryExpression::case()`` builder now supports inferring the type
  from expressions passed to ``then()`` and ``else()`` that implement
  ``\Cake\Database\TypedResultInterface``.
* ``BaseApplication::handle()`` now adds the ``$request`` into the service
  container all the time.
* ``HttpsEnforcerMiddleware`` now has an ``hsts`` option that allows you to
  configure the ``Strict-Transport-Security`` header.
* ``TreeBehavior`` now supports triggering ORM callbacks when deleting nodes.


Contributors to 4.4.0
---------------------

Thank you to all the contributors that helped make 4.4 happen:

* ADmad
* Alejandro Ibarra
* Chetan Varshney
* Corey Taylor
* Gerhard Lechner
* itosho
* Jorge González
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* naveen
* saeideng

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 4.4.0 is a large
release and would not have been possible without the community support and
feedback.

What's Next
-----------

With 4.4.0 shipped, the core team's focus will be primarily on CakePHP 5.0.
So far in the ``5.x`` branch, the team has: 

* Bumped the required version of PHP to 8.1.0
* Removed all the behavior that was deprecated in ``4.x``.
* Improved typehinting by using features in PHP 8.1.
* Updated interfaces with ``@method`` annotations.

The roadmap for 5.x is still under development, and if there is a feature you
feel passionate about or a tedious behavior you'd like to see changed, please
open an issue and get the discussion started.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
