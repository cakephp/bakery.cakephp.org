CakePHP 4.0.10 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.0.10. This release contains security fixes and is a recommended upgrade for
all applications still using 4.0.x.

The security fixes address a vulnerability in the ``CsrfProtectionMiddleware``
that allowed method override parameters to bypass CSRF checks for requests with
no additional POST data. The fixes validate that the HTTP method override is
a valid HTTP method name. We'd like to thank `Xhelal Likaj
<https://github.com/xhlika>`_ for reporting `this issue
<https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-35239>`_ to us via our
security process.

The versions impacted by this issue are >4.0.0, <=4.0.9 and >4.1.0, <=4.1.3.
Releases after 4.1.3 are not vulnerable as they already validated the HTTP
method names.

Bugfixes
--------

You can expect the following changes in 4.0.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.0.9...4.0.10>`_ for every commit.

* Fixed validation of HTTP methods defined in ``_method`` parameters.

Contributors to 4.0.9
----------------------

Thank you to all the contributors that helped make this release happen:

* Mark Story
* Xhelal Likaj

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
