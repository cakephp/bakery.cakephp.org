CakePHP 4.2.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.0. This is the first stable release of 4.2.0. 4.2.0 provides a number
improvements both large and small to CakePHP.

Upgrading to 4.2.0
------------------

You can use composer to upgrade to CakePHP 4.2.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:4.2.*"

Deprecation Warnings
--------------------

4.2 introduces a few deprecations. All of these features will continue for the
duration of 4.x but will be removed in 5.0. See the `migration guide
<https://book.cakephp.org/4/en/appendices/4-2-migration-guide.html>`_. 

What's new in 4.2.0?
--------------------

The `migration guide
<https://book.cakephp.org/4/en/appendices/4-2-migration-guide.html>`_ has
a complete list of what's new in 4.2.0. We recommend you give that page a read
when upgrading. A few highlights from 4.2.0 are:

* Full support for PHP8.
* `Experimental support
  <https://book.cakephp.org/4/en/contributing/backwards-compatibility.html#experimental-features>`_
  for a dependency injection container was added. The DI container enables you
  to have application dependencies injected into controller constructors,
  controller actions and command constructors.
* SQLServer driver now uses client-side buffers for results. This improves
  performance greatly.
* ``Cake\Http\Middleware\SessionCsrfProtectionMiddleware`` was added. Instead of
  storing CSRF tokens in a cookie, this middleware stores tokens in the session.
  This makes CSRF tokens user scoped and time based with the session, offering
  enhanced security over cookie based CSRF tokens.
* A new utility class ``Cake\Http\FlashMessage`` was added whose instance is
  available through ``ServerRequest::getFlash()``. The class similar to the
  ``FlashComponent`` allows you to set flash messages from anywhere you have
  a request, making it useful in middleware.
* ``Table::subquery()`` and  ``Query::subquery()`` were added. These methods
  lets you create query objects that don't have automatic aliasing.
* Collations are now supported for string literals and ``IdentifierExpression``.

Contributors to 4.2.0
---------------------------

Thank you to all tbe contributors that helped make 4.2 happen:

* ADmad
* Blaz
* chris cnizzardini
* Edgaras Janušauskas
* Eugene Ritter
* imo-tikuwa
* Juan Basso
* Mario Rothauer
* Mark Scherer
* Mark Story
* ndm2
* othercorey
* Ricardo Turella
* tanden
* tikuwa

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 4.2.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
