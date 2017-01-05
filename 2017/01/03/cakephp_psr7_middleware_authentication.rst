CakePHP PSR7 Middleware Authentication Released
===============================================

The CakePHP team has recently been working hard at improving the authentication and authorization systems. There are a few reasons for this, firstly, both have been historically married through the ``AuthComponent``. Secondly, the component is a monolithic class that is tightly coupled to the controller layer of an application – this can potentially make authorization hard to reuse in other layers.

CakePHP 3 has taken several steps forward to ensuring that the framework keeps up to the latest standards. It also, at the same time, is very important to the team that the framework ensures backwards compatibility and soft migration paths. One of the key requirements of an improved authentication system for CakePHP was to retain some of this backwards compatibility.

The improved implementation
----------------------

https://github.com/cakephp/authentication

Hours of dedication were expended to finish this release of the improved authentication system for the CakePHP 3 framework based on PSR7 compliant middleware. For the core team, it was decided that this is the place where authentication should happen.

Ideally, the request object should carry all information you need to identify a user. While generally, best practice is to identify a user or agent early in the stack. The improvement has meant that the authentication has been completely refactored and moved into a new namespace, as well as the code‘s folder structure being reorganised. But the biggest change was the better separation of logic.

The new implementation separates authenticators and identifiers. An Authenticator looks for the credentials in the request and passes them to a collection of identifiers that use the credentials to identify an identity against a variety of sources. For example, you can check the credentials against a user’s table using the CakePHP ORM and LDAP at the same time. The configuration stays almost the same as it was before. The largest change is that you have to split configuration for the authenticators and identifiers. Another significant change is that authentication is connected to your application as middleware, and not in the controller.

New features
------------

Besides keeping the existing authenticators: HTTP Digest, HTTP Basic and Form there is now Token and Session authenticators as well. Token is a high level implementation that allows you to use a token from the request query parameters or a HTTP header. Extending this to provide JWT based authentication should be trivial.

Current status and roadmap
--------------------------

The current status of the plugin is that, while not production ready, it is usable.". What we would like you, the community, to do is to provide us ideas for improvements, additions and report bugs you find. While we have a good base of unit tests, there may be scenarios and use cases that are not yet accounted for.

The roadmap for the plugin is to release 1.0.0 along with the official release of CakePHP 3.4. The plugin itself is right now in alpha and will make its path to a final release depending on your feedback. The long term plan is that the plugin will be integrated into the framework itself.

Where is the code? How do I install it?
---------------------------------------

Check `the official repository <https://github.com/cakephp/authentication>`_ of
the plugin and install it via composer as usual.

  ``composer require cakephp/authentication``

Pay attention to the version constraints! Until CakePHP 3.4 is released it will
require the 3.next branch!

  ``composer:require cakephp/cakephp:"3.next as 3.4"``

The readme.md of the project contains some basic information on how to get
started with the new implementation and provides information on how to migrate
from the AuthComponent as well.

---

.. author:: Florian Krämer
.. categories:: release, news
.. tags:: release, news, authentication
