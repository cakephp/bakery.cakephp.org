CakePHP 3.6.0-beta2 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.0-beta2. This is the first beta release for 3.6.0, and it contains several
new major features.

Updating to the beta
--------------------

You can use composer to upgrade to the beta version of CakePHP 3.6.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.6.0-beta2"

We would greatly appreciate it if you temporarily upgraded your application,
and ran your tests. By opening issues for any regressions in the beta, we can
help ensure a smoother release of 3.6.0 before the stable release.

What's new in 3.6.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-6-migration-guide.html>`_ has
a complete list of what's new in 3.6.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes Since 3.6.0-beta1
-------------------------

* ``Cake\Console\CommandFactory`` was added to allow applications to customize
  how command classes are built.
* ``Cake\Database\Type\BatchCastingInterface`` was added. This interface allows
  type classes to optimize casting operations by operating on all columns in
  bulk. This interface can be used in custom types now, and will be used in core
  types in 4.x.
* ``RoutingMiddleware`` can now cache application route collections providing
  significant improvements to application boot times.
* ``Cake\ORM\Query::selectAllExcept()`` was added.
* ``cake plugin unload`` and ``cake plugin load`` have been updated to modify
  the ``Application`` class.
* ``Validator::add()`` now uses the rule name as the method if no method is
  provided.
* ``TimestampBehavior`` no longer emits errors when columns are missing.
* Plugin shells/commands are no longer auto-discovered by the ``Application``.
  Instead plugin commands are discovered/added by the respective plugin class.
* Console helpers can now live in ``App\Command\Helper``.

Contributors to 3.6.0-beta2
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Eugene Ritter
* Gene Ritter
* Jorge González
* José Lorenzo Rodríguez
* Mark Story
* Robert Pustułka

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
