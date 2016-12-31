Security fix: CakePHP 2.3.3 available
=====================================

We have found a severe security issue that affects all applications
running CakePHP version 2.3.0 and above that are using user
authentication via forms with the AuthComponent without the Security
component form tampering prevention.

The CakePHP core team pushed a maintenance release for 2.3 branch
earlier than planned for the 2.3 branch of the framework. We have
found a severe security issue that affects all applications running
CakePHP version 2.3.0 and above that are using user authentication via
forms with the AuthComponent without the Security component form
tampering prevention.

If you have a login form and are using the AuthComponent without
SecurityComponent field locking feature, you are strongly encouraged
to upgrade to this version as soon as possible. In the following days
we will offer a full description of the vulnerability and how it can
be exploited, after some reasonable time has passed for our users to
upgrade.

A huge thanks to Magnus Andersson for the report and patch.

CakePHP 2.3.3[1] is a bugfix release for the 2.3 release branch. Since
the release of 2.3.2 there have been 31 commits and 8 tickets
resolved. A short list of the changes you can expect is:

+ Fixed Vendor/bin/cake not working when installing CakePHP with
  composer.
+ Allowing behaviors' beforeSave callback to change the datasource to
  be used for the actual save.
+ Fixing bug in FormHelper where the incorrect meridian would be
  selected for time fields.
+ Solved issues with models not being added when $uses = true.
+ Fixed condition parsing in mysql specific cases.
+ Added support for key => value cookies in HttpSocket.
+ Preventing "maxlength" attribute input element of type "number".
+ Fixed incorrect timestamp values when using CakeTime::fromString()



Links
-----

+ [1] `https://cakephp.org/changelogs/2.3.3`_
+ [2] `https://github.com/cakephp/cakephp/tags`_




.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _https://cakephp.org/changelogs/2.3.3: https://cakephp.org/changelogs/2.3.3

.. author:: lorenzo
.. categories:: news
.. tags:: News

