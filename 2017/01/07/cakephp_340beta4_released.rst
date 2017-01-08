CakePHP 3.4.0-beta4 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.0-beta4. This is a beta release for 3.4.0, and it contains bugfixes found by
the community.

Updating to 3.4.0-beta4
-----------------------

You can use composer to upgrade to the beta version of CakePHP 3.4.0::

    php composer.phar require "cakephp/cakephp:3.4.0-beta4"

We would greatly appreciate it if you temporarily upgraded your application,
and ran your tests. By opening issues for any regressions in the beta, we can
help ensure a smoother release of 3.4.0 before the stable release.

Bug Fixes
---------

* Reading request bodies no longer returns null.
* Querystring parameters set in the ``url`` option of a request are now
  propagated to the requesy query data.
* Table output in CLI tools now correctly handles empty strings when calculating
  widths.

Additions & Deprecations
------------------------

* Add ``dd()`` as quick alternative for ``debug(); die();``.
* CLI commands can now accept an argument multiple times by setting the
  ``multiple`` option on an argument.
* Routing scopes can now define the ``routeClass`` and ``extensions`` options.
* A number of methods in the ``Email`` class have been deprecated in favour of
  separate get/set methods.

A full list of the changes in 3.4.0 can be found in the `3.4.0 migration guide
<https://book.cakephp.org/3.next/en/appendices/3-4-migration-guide.html>`_

Contributors to 3.4.0-beta4
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* DaVinciEngineer
* Koen Brouwer
* Mark Scherer
* Mark Story
* Mathew Foscarini
* Ondrej Mirtes
* Yves P
* antograssiot
* yutmr

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
