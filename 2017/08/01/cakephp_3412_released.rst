CakePHP 3.4.12 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.12. This is a maintenance release for the 3.4 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.4.12. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.4.11...3.4.12>`_ for every commit.

* ``Shell::out()`` and similar methods once again handle array inputs.
* ``Cake\Http\Client`` now raises a 504 HttpException when a timeout occurs.
* Improved deprecation comments in API doc blocks.
* ``Cake\Http\Client`` response bodies can be read with the PSR7 interface once
  again.
* Improved SQLServer 2008 pagination shims to work when results are ordered by
  a computed field.
* ``DefaultPasswordHasher`` now includes the hashCost option as a factor into
  whether or not a password needs to be rehashed.
* ``IntegrationTestCase`` now correctly generates form-tampering prevention
  tokens for requests with query string arguments in the URL string.
* Empty translation messages now return the key for messages with no context.

Contributors to 3.4.12
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Bernat Arlandis
* David Yell
* Jeremy Harris
* Joris Vaesen
* José Lorenzo Rodríguez
* Marc Würth
* Mark Scherer
* Mark Story
* Mike Fellows
* Owen Gerrard
* antograssiot
* saeid

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
