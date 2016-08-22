CakePHP 3.3.2 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.3.2. This is a maintenance release for the 3.3 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.3.2. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.3.1...3.3.2>`_ for every commit.

* Session cookies are now only sent by the PSR7 stack when the session is active.
* Content-Type headers emitted from the PSR7 stack now include the charset.

Contributors to 3.3.2
---------------------

Thank you to all the contributors that helped make this release happen:

* Mark Story

As always, we would like to thank all the contributers that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
