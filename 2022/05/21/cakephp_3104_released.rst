CakePHP 3.10.4 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.10.4. This is a maintenance and security release for the 3.10 branch that
fixes a couple community reported issues, and patches a security vulnerability.

Security Fixes
--------------

The 3.10.4 release fixes an encoding issue with the verified tokens feature
of ``CsrfProtectionMiddleware`` released in 3.10.3. In 3.10.3 verfied tokens
were generated using random bytes and would often fail to match as the bytes
would be incorrectly encoded when rendered in HTML.

Bugfixes
--------

You can expect the following changes in 3.10.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.10.3...3.10.4>`_ for every commit.

* Fixed incorrectly encoded CSRF tokens when using the ``verifyTokenSource``
  option.

Contributors to 3.10.4
----------------------

Thank you to all the contributors that helped make this release happen:

* Marc Würth
* Mark Story

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: security, release, news
.. tags:: security, release, news
