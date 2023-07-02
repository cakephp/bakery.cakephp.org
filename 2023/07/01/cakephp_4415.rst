CakePHP 4.4.15
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.15. This is a maintenance release for the 4.4 branch that fixes several
community reported issues including a low risk security fix.

Bugfixes
--------

You can expect the following changes in 4.4.15. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.14...4.4.15>`_ for every commit.

* SMTP transport skips authentication header parsing if no credentials are
  passed.
* Fixed unsafe usage of ``unserialize`` in debug output of ``SecurityComponent``
  failure messages. Thanks to Andreas Kellas for reporting this issue via our
  security disclosure policy.

Contributors to 4.4.15
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* DeSerFix-bot
* Mark Story
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
