CakePHP 3.7.0-RC1 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.7.0-RC1. This is the release candidate for 3.7.0, and it contains several
new major features. If no major issues are reported a stable release will be
packaged in a few weeks.

3.7 is the **last** planned minor release of CakePHP 3.x before 4.0 is released.
Once 4.0 is released, 2.x will only receive security fixes, and 3.x will only
continue to receive bug & security fix releases. If there is significant
community interest there may be a 3.8 release, but there are no plans at this
point in time.

Updating to the RC
------------------

You can use composer to upgrade to the beta version of CakePHP 3.7.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.7.0-RC1"

We would greatly appreciate it if you temporarily upgraded your application, and
ran your tests. By opening issues for any regressions in the release candidate,
we can help ensure a smoother release of 3.7.0 before the stable release.

What's new in 3.7.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-7-migration-guide.html>`_ has
a complete list of what's new in 3.7.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes since 3.7.0-beta1
-------------------------

* Improved binary column reflection for SqlServer.
* Session handlers are no longer changed if the session is active.
* Tests are passing against PHP 7.3
* The bundled CA file has been updated to 2018-10-17 from Mozilla.
* ``ConsoleIo::createFile()`` now behaves correctly with UNC file paths.
* Exception logging now includes each exception in a chained exception.

Contributors to 3.7.0-RC1
---------------------------

* ADmad
* Ceeram
* Dmitriy Romanov
* Edgaras
* Edgaras Janušauskas
* Ian den Hartog
* Mark Story

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
