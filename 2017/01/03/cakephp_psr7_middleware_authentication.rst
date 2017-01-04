CakePHP PSR7 Middleware Authentication Released
===============================================

Let’s start with some background story on this topic. One of the parts of
CakePHP I like the least is the authentication and authorization systems.
There are a few reasons why. Firstly, both authentication and authorization have
been married through the ``AuthComponent``. Secondly, the component is a monolith
that is coupled to the controller layer of an application, making authorization
hard to re-use in other layers.

While CakePHP 3 is an awesome framework, it carries some of the older parts
of the framework along to ensure backwards compatibility. Maintaining
compatibility in my personal opinion is good. Software development should be an
evolution and not a revolution. Where possible we should aim to provide soft migration paths.
One of the requirements of a new authentication system for CakePHP was to retain
some semblance of backwards compatibility.

The new implementation
----------------------

https://github.com/cakephp/authentication

Some late nights were spent to finish a new authentication
system for the CakePHP 3 framework based on PSR7 compliant middleware. This is
the place where authentication should happen in our opinion. The request object
should carry all information you need to identify a user. Also you generally want to
identify a user or agent early in the stack.

The authentication has been completely refactored and moved into a new
namespace, and the code‘s folder structure was reorganised as
well. But the biggest change is probably the better separation of logic, a more
eloquent term is 'separation of concerns'. The new implementation separates
authenticators and identifiers. An Authenticator looks for the
credentials in the request and passes them to a collection of identifiers that
use the credentials to identify an identity against a variety of sources.
For example, you can check the credentials against a users table using the
CakePHP ORM and LDAP at the same time.

The configuration stays almost the same as it was before. The largest change is
that you have to split configuration for the authenticators and identifiers. Another
significant change is that authentication is connected to your application as
middleware, and not in the controller.

New features
------------

Besides keeping the existing authenticators: HTTP Digest, HTTP Basic and Form
there is now Token and Session authenticators as well. Token is a high level
implementation that allows you to use a token from the request query parameters
or a HTTP header. Extending this to provide JWT based authentication should be
trivial.

Current status and roadmap
--------------------------

The current status of the plugin is that it is ready to be used – technically.
What we would like you, the community, to do is to provide us ideas for
improvements, additions and report bugs you find. While we have a good base of
unit tests, there are likely scenarios and use cases we've missed.

The roadmap for the plugin is to release 1.0.0 along with the official release
of CakePHP 3.4, maybe a little later depending on the progress of 3.4 and how
many issues or changes are necessary.

The plugin itself is right now in alpha and will make it’s path
to a final release depending on your feedback. The long term plan is that the
plugin will be integrated into the framework itself. The goal is to get it into
CakePHP 3.5 early to mid next year.

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
