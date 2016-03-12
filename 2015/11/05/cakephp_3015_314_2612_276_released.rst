CakePHP 3.1.4, 3.0.15, 2.7.6 and 2.6.12 released
================================================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.1.4, 3.0.15, 2.7.6, and 2.6.12. These releases contain security fixes. 3.1.4
and 2.7.6 also contain bugfixes.

Security Fixes
--------------

These releases contain fixes for a Remote File Inclusion issue caused by unsafe
view template filenames. There is also a fix to correct how older Validation
methods handle non-scalar data. We recommend that all users of CakePHP
upgrade as soon as they can. More detail on both issues will be provided in
a few weeks once people have the opportunity to upgrade. We'd once again like to
thank *Kurita Takashi* for his help in identifying these issues and verifying
the fixes.

Bugfixes in 2.7.6
-----------------

* Support for self signed certificates was added to the SmtpTransport.
* Form input generation for numeric columns in postgres databases was corrected.
* ``PaginatorHelper::meta()`` correctly generates URLs based on named parameters
  and pagiantion options
* Improved API documentation.
* ``CakeSocket`` supports all of the PHP provided SSL context options. SSL
  options will need an ``ssl_`` prefix.
* Memcached client failures during key clearing is now handled.
* ``FlashComponent::__call()`` now handles the plugin option as documented.
* Scaffold was updated to use FlashComponent.

Bugfixes in 3.1.4
-----------------

* PaginatorHelper always lowercases direction to be consistent.
* Using the ``--debug`` flag in PHPUnit will also enable fixture schema SQL to
  be logged.
* CounterCacheBehavior now uses ``bindingKey()`` resolving issues for
  associations that use custom binding keys.
* The afterSaveCommit and afterDeleteCommit callbacks were added to behaviours.
* The ability to set the default model type for classes using the
  ``ModelAwareTrait`` was added.
* Default type inference in ``ORM\Query`` is now faster.
* BelongsToMany link replacement no longer fails when the association conditions
  include columns from the junction table.
* HasMany replace() now checks the return value of delete operations.
* Nested validators are now aware of the create/update context.
* ``Query::where()`` now throws an exception when empty conditions are added.
  This prevents the addition of ``1 != 1`` clauses.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, security
