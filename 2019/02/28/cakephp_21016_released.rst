CakePHP 2.10.16 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.10.16. This is a maintenance release for the 2.10 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.10.16. See the `changelog
<https://github.com/cakephp/cakephp/compare/2.10.15...2.10.16>`_ for every commit.

* ``CakeTime::format()``, ``nice()`` and ``i18nFormat()`` now convert timezones
  more correctly when both the source and destination timezone are not the
  default server timezone.
* ``RedisCache`` no longer attempts to close the connection if the connection
  has not been initialized.
* ``ShellDispatcher`` now uses the ``CONFIG`` constant if it is defined.

Contributors to 2.10.16
-----------------------

Thank you to all the contributors that helped make this release happen:

* Benjamin Stout
* Mark Sch
* Mark Story
* Val Bancer

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
