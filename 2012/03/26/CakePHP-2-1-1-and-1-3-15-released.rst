CakePHP 2.1.1 and 1.3.15 released
=================================

As usual, the CakePHP team is proud to deliver another
bugfix/maintenance release in a timely fashion!

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.1.1 [1] and 1.3.15 [2]. Both versions are a
bugfix/maintenance releases. This is a short list of changes that can
be expected in both versions:


2.1.1
-----

+ session_cache_limiter() removed when starting a session, also remove
  setting P3P header
+ Updated the .htaccess files, make sure you update them in you apps
  as well.
+ Set::sort() now correctly sorts when using {s}.path
+ Fixed Session.cookieTimeout default behavior
+ Made Validation class more strict when checking values in list.
+ Used urldecode trailing pass arguments in the URL
+ Added missing 'recursive' option to DigestAuthenticate object.



1.3.15
------

+ Fixed an issue with find(count) and translated conditions.
+ Adding iPad and windows phone os as mobile clients.
+ Fixed Number::currency() when using custom formats and numbers
  between -1 and 1.
+ Fix a bug introduced when generating partial compatibility between
  1.3 and 2.0 Cookies, where an empty valued key caused a PHP notice.
  Also, harden tests.
+ Fix header stripping in EmailComponent, it was aggressively
  stripping to: from text.
+ Fix EmailComponent::reset() not resetting `delivery`
+ Fix issues where nested HABTM associations would create duplicate
  content.

If you have not upgraded to 2.1.1 there is no better time than this.
Our newest release is our most stable and feature-rich release yet,
don't miss out on all these yummy enhancements!

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.

Download packaged releases [3]


Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.1.1`_
+ [2] `http://cakephp.org/changelogs/1.3.15`_
+ [3] `https://github.com/cakephp/cakephp/tags`_




.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _http://cakephp.org/changelogs/1.3.15: http://cakephp.org/changelogs/1.3.15
.. _http://cakephp.org/changelogs/2.1.1: http://cakephp.org/changelogs/2.1.1

.. author:: lorenzo
.. categories:: news
.. tags:: 1.3,2.1,News

