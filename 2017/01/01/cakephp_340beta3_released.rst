CakePHP 3.4.0-beta3 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.0-beta3. This is a beta release for 3.4.0, and it contains bugfixes found by
the community.

Updating to 3.4.0-beta3
-----------------------

You can use composer to upgrade to the beta version of CakePHP 3.4.0::

    php composer.phar require "cakephp/cakephp:3.4.0-beta3"

We would greatly appreciate it if you temporarily upgraded your application,
and ran your tests. By opening issues for any regressions in the beta, we can
help ensure a smoother release of 3.4.0 before the stable release.

Bug Fixes
---------

* HasMany Associations and a replace save strategy and conditions work more often
  now as table aliases are stripped from generated conditions.
* ``MailerTrait::getMailer()`` is now protected. This prevents ``getMailer``
  from being used as an action when permissive routes are enabled.
* ``CellTrait::cell()`` is now protected. This prevents ``cell`` from being used
  as an action where permissive routes are enabled.
* ``TextHelper::autoLinkUrls()`` now links more URLs correctly.
* Postgres schema reflection now extracts precision and scale from ``NUMERIC``
  and ``DECIMAL`` columns.
* Cookies created via ``Response::cookie()`` are now emitted correctly.

Additions & Deprecations
------------------------

* ``FormHelper::input()`` is now deprecated, and replaced with
  ``FormHelper::control()`` the old name was opaque and confusing to new users.
* ``Response::getCookies()`` was added.

A full list of the changes in 3.4.0 can be found in the `3.4.0 migration guide
<https://book.cakephp.org/3.next/en/appendices/3-4-migration-guide.html>`_

Contributors to 3.4.0-beta3
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* José Lorenzo Rodríguez
* Mark Story
* Yves P
* antograssiot
* chinpei215
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
