Security Fix: CakePHP 2.3.5 released
====================================

After conducting a security audit on our code we have patched a
possible security risk in current CakePHP release.

CakePHP 2.3.5 has just been released to fix a critical issue with how
the webroot property in CakeRequest is handled that could potentially
lead to XSS attacks on certain pages. In the following days we will
offer a full description of the vulnerability and how it can be
exploited, after some reasonable time has passed for our users to
upgrade.

A huge thanks to Florian Krämer for conducting a full security audit
on the CakePHP code and Carl Sutton for report and providing a
candidate patch.

In addition to the security fix 2.3.4 contains fixes for the following
issues:

+ Increasing compatibility with old CentOS servers and the way they
  handle PHP regular expressions
+ Preventing pagiation limit from overflowing the max integer value
+ Making sure form ids generated in FormHelper::postLink() are
  actually unique
+ Fixed a bug in TextHelper auto link utility

We recommend all users of 2.x release series upgrade as soon as
possible to the new release.


Links
~~~~~

+ Download a packaged release
  `https://github.com/cakephp/cakephp/tags`_
+ View the changelogs `https://cakephp.org/changelogs`_




.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _https://cakephp.org/changelogs: https://cakephp.org/changelogs

.. author:: lorenzo
.. categories:: news
.. tags:: release,News

