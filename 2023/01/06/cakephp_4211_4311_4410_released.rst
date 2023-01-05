CakePHP 4.2.11, 4.3.11, and 4.4.10 Released
===========================================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.11, 4.3.11, and 4.4.10. These releases contain a security fix for the
``limit()`` and ``offset()`` methods of ``Cake\Database\Query``. If passed
unfiltered request data, these methods would allow for SQL injection. If your
application does not use CakePHP's Pagination wrappers and directly passes
request data into one of these methods your application is vulnerable. We'd like
to thank 'Tanaka' for reporting this issue.

Additional Bugfixes in 4.4.10
-----------------------------

The 4.4.10 release contains the aforementioned security fix as well as the
following fixes. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.9...4.4.10>`_ for every commit.

* Update association definitions in ORM tests.
* Update build images to Ubuntu 22.04.

Contributors to 4.4.10
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
