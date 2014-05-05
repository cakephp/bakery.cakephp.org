CakePHP 2.0.3 out of the oven
=============================

This new version of CakePHP brings improved stability to the 2.0
branch, full compatibility with PHPUnit 3.6 and support for PHP 5.4

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.0.3 [1]. A lot has happened in the PHP world since our
last release, this new version incorporates all needed changes needed
to adapt to the ever evolving world of PHP frameworks.

One of the big changes out there was PHPUnit 3.6 being marked as
stable and becoming the default version available through the PEAR
installer. This change caught many developers by surprise. They could
not easily run CakePHP's built-in test suite due to the major changes
in PHPUnit. We have made the required changes to make sure 2.0.3 runs
with no issues in both 3.5 and 3.6 versions of PHPUnit.

A big difference people will notice when writing unit tests is that
all output is swallowed by PHPUnit and not presented in either the web
tester page nor in the CLI tester. To overcome this annoyance use the
`--debug` modifier if you are using the CLI interface.

The second bit of good news is the availability of PHP 5.4-rc1. We
have taken the time to test our framework against this PHP version and
fixed many of the few notices and issues that discovered while running
our automated tests. If you are early jumping on the 5.4 bandwagon,
you can consider CakePHP one of the frameworks to be running smoothly
on it.

In total, there were 66 commits and 32 issues have been resolved for
2.0.3. A complete list of the changes can be viewed in the changelogs
page [2], here is a quick summary of changes that made it into 2.0.3:

+ Runs smoothly in php 5.4
+ Easier to test controllers using REST
+ Correct manipulation of boolean values in DboSource::insertMulti()
+ Full compatibility with PHPUnit 3.6
+ Fixed several minor issues with the command line bake utility
+ Fixed Content-Length calculation when there is buffered output that
  will be sent before the response body
+ Various improvements in the UpgradeShell
+ DboSource::lastAffected() now returns correct integer

Thanks for ever-growing interest in CakePHP, we have received many
pull requests for both the code and documentation, we are excited
about the all the buzz we are creating with this new version, without
all your contributions there would not be CakePHP

+ Download a packaged release [1]
+ View the changelog [2]



Links
~~~~~

+ [1] `http://github.com/cakephp/cakephp`_
+ [2] `http://cakephp.org/changelogs/2.0.3`_




.. _http://cakephp.org/changelogs/2.0.3: http://cakephp.org/changelogs/2.0.3
.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp

.. author:: lorenzo
.. categories:: news
.. tags:: News

