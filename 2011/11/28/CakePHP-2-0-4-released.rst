CakePHP 2.0.4 released
======================

This new version incorporates an important security fix for the 2.x
branch. People are highly encouraged to upgrade their apps as soon as
possible.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.4 [1]. This release fixes an important security issue
in the AuthComponent. Prior to this version, the AuthComponent will
let non logged-in users into protected action if using a different
case for the action name in the url than declared on the controller.
**People using any version of 2.0.x are highly encouraged to upgrade
their apps to use this new version as soon as possible**. In total,
there were 60 commits and 20 issues have been resolved since 2.0.3. A
complete list of the changes can be viewed in the changelogs page [2],
but this is a quick summary of changes that made it into 2.0.4:

+ Fixing issue where changing the case for an action in the url would
  allow the action in the AuthComponent making it accessible to not-
  logged in users
+ Fix issue with dots in request URLs.
+ Improved API documentation
+ Escape special characters in XML.
+ Moving AppShell inside Console/Command for consistency with file
  location of other App classes. Also making all core shells and tasks
  extends AppShell instead of Shell.
+ Preventing memory leak in PDO when retrieving results from the
  driver
+ Fix protocol relative urls for CSS and JS files.
+ Removing _Token from request data.
+ Fix ambiguous content types in RequestHandler.

The 2.1 branch is progressing at good speed and we hope we can deliver
an early alpha for this branch very soon. Thanks to the ever-growing
CakePHP community for the patches, documentation changes and new
tickets. Without you there would be no CakePHP!

+ Download a packaged release [1]
+ View the changelog [2]



Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/2.0.4`_




.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp
.. _http://cakephp.org/changelogs/2.0.4: http://cakephp.org/changelogs/2.0.4

.. author:: lorenzo
.. categories:: news
.. tags:: release,2.0.4,News

