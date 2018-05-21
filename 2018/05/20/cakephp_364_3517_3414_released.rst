CakePHP 3.6.4, 3.5.17, 3.4.14 Released
======================================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.4. This is a maintenance release for the 3.6 branch that fixes several
community reported issues.

We are also releasing 3.5.17 and 3.4.14 at this time. These releases contain
security related fixes that address a cross-site-scripting (XSS) vulnerability
in the development only 'missing route' and 'duplicate named route' error pages.
Thank you to Nacer for notifying us of this issue via our responsible
disclosure process. We recommend that all users of 3.4 and 3.5 update to these
releases.


Bugfixes in 3.6.4
-----------------

You can expect the following changes in 3.6.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.6.3...3.6.4>`_ for every commit.

* Fixed logging of fatal errors in console environments.
* Fixed empty ``OR`` sub-conditions creating invalid SQL.
* ``ServerRequest::getAttributes()`` now includes the ``here`` attribute.
* ``bin/cake routes`` will now display route defaults sorted.

Contributors to 3.6.4
---------------------

Thank you to all the contributors that helped make this release happen:

* AD7six
* José Lorenzo Rodríguez
* Mark Scherer
* Mark Story
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
