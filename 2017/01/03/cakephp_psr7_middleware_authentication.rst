CakePHP PSR7 Middleware Authentication Released
===============================================

Introduction and background
---------------------------

Let’s start with some background story on this topic. One of the parts of the
CakePHP framework I like the less is the authentication and authorization.
There are a few reasons why. For example the authentication and authorization.
Firstly both authentication and authorization have been married through the
AuthComponent, secondly the component is a monolith that is coupled to the
controller layer of the MVC pattern.

While CakePHP 3 is an awesome framework it carries some of the older parts of
the framework along to ensure backward compatibility which is, in my personal
opinion, good. Software development should be an evolution and not a revolution.
Also a soft migration path should be provided if possible. So the requirement
for a new implementation was to stay backward compatible to some degree.

The new implementation
----------------------

https://github.com/cakephp/authentication

Some late nights were spent to finish a new authentication
system for the CakePHP 3 framework based on a PSR7 conform middleware. Which is
the place where authentication should happen in my opinion. The request object
should carry all information you need to identify an user. Also you want to
identify an user or a service early in the stack.

The authentication has been completely refactored and was moved into a new
namespace/authentication and the code‘s folder structure was reorganised as
well. But the biggest change is probably the better split of the logic, a more
fancy term is separation of concerns, of the authentication code. The code has
been split into authenticators and identifiers. Basically the authenticator just
looks for the credentials in the request and passes them to a collection of
identifiers that will use the credentials to identify the identity against
different sources. So for example you can check the same credentials against
an users table using the CakePHP ORM and LDAP at the same time.

The configuration stays almost the same as it was before just that you have to
split it for the authenticators and identifiers. Also hooking the authentication
in your app is now happening in the middleware, no longer the controller. But
these two things are the most dramatic changes on the surface you’ll be
confronted with.

New features
------------

Besides keeping the existing authenticators, HTTP Digest, HTTP Basic and Form
there is now Token and Session as well. Token is a high level implementation
that allows you to use a token from the requests query parameters or a HTTP
header. Extending this to use JWT should be trivial.

Current status and roadmap
--------------------------

The current status of the plugin is that it is ready to be used – technically.
What we would like you, the community, to do is to provide us ideas for
improvements and additions and also report bugs. Despite the good unit test
coverage of more than 92% there will be always bugs and edge cases as usual.

The roadmap for the plugin is to release 1.0.0 along with the official release
of CakePHP 3.4, maybe a little later depending on the progress of 3.4 and how
many issues or changes we'll make to the authentication plugin until then.

The plugin itself is right now in alpha and will make it’s path
to a final release depending on your feedback. The long term plan is that the
plugin will be integrated into the framework itself. The goal is to get it into
CakePHP 3.5 early to mid next year.

Where is the code? How do I install it?
---------------------------------------

Check `the official repository<https://github.com/cakephp/authentication>`_ of
the plugin and install it via composer as usual.

  ``composer require cakephp/authentication``

Pay attention to the version constraints! Until CakePHP 3.4 is released it will
require the 3.next branch!

The readme.md of the project contains some basic information on how to get
started with the new implementation and provides information on how to migrate
from the AuthComponent as well.

---

.. author:: Florian Krämer
.. categories:: release, news
.. tags:: release, news, authentication
