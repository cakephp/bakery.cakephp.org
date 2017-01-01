CakePHP 3.4.0-beta2 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.0-beta2. This is a beta release for 3.4.0, and it contains bugfixes found by
the community.

Updating to 3.4.0-beta2
-----------------------

You can use composer to upgrade to the beta version of CakePHP 3.4.0::

    php composer.phar require "cakephp/cakephp:3.4.0-beta2"

We would greatly appreciate it if you temporarily upgraded your application,
and ran your tests. By opening issues for any regressions in the beta, we can
help ensure a smoother release of 3.4.0 before the stable release.

Bug Fixes
---------

* Fixed incorrect type warnings for Request/Response.
* Fixed modified response not being retained by ``Controller::redirect()``.
* Fixed incorrect deprecation documentation comments in
  ``Cake\Http\ServerRequest``.

A full list of the changes in 3.4.0 can be found in the [3.4.0 migration guide]
(https://book.cakephp.org/3.next/en/appendices/3-4-migration-guide.html)

Contributors to 3.4.0-beta2
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Mark Story
* antograssiot

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
