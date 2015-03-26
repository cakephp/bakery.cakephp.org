CakePHP 3.0.0-beta1 released
============================

The CakePHP core team is excited to announce the first beta release of
CakePHP 3.0.0.

The CakePHP core team is excited to announce the first beta release of
CakePHP 3.0.0. In the weeks since 3.0.0-alpha2, we've been hard at
work incorporating community feedback on the new release, and
completing the remaining changes that will break compatibility in a
significant way.


Breaking Changes since 3.0.0-alpha2
===================================

Since the release of 3.0.0-alpha2 there have been several changes that
will break compatibility with existing applications.


I18n has been re-implemented
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Built on top of `ext/intl` and `Aura/Intl` the new localization
subsystem offers more powerful replacement syntax, and retains a
backwards compatible sprintf() based formatter. Consult the `new i18n
documentation`_ for more information. The `L10n` class has been
removed.


NumberHelper uses intl now
~~~~~~~~~~~~~~~~~~~~~~~~~~

The `Number` library and `NumberHelper` now use intl internally for
formatting currencies and values. This makes NumberHelper completely
aware of the application's current locale. The `addFormat()` method
has been removed.


Directory layout changes
~~~~~~~~~~~~~~~~~~~~~~~~

More changes to the directory layout of a CakePHP application have
been made:

+ `src/Config` is now `/config`.
+ `src/bootstrap.php` is now `/config/bootstrap.php`.
+ Log files are now in a top level directory by default. Having them
  mixed in with other actually temporary data sometimes resulted in
  people accidentally deleting their log files.
+ Bake templates should now be put in `src/Template/Bake`.



Vendor Prefixed Plugins Have Changed
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Plugins that use vendor prefixes e.g: (`AcmeCorp\Users`) are no
longer renamed. Instead of using `Users.User`, you must now use
`AcmeCorp/Users.User`. Additionally the vendor prefix will be used as
folder name in the plugins folder, so the plugin will be installed in
`plugins/AcmeCorp/Users` folder.


Methods removed
~~~~~~~~~~~~~~~

+ Many of the infrequently used methods defined in `basics.php` have
  been removed. Functions like `config()` no longer exist.
+ Validation::ssn() has been removed.
+ Support for `CASE` statements has been added to the ORM.
+ Helper::webroot(), Helper::assetUrl(), Helper::assetTimestamp() have
  been moved to a UrlHelper. This allows you to easily replace the URL
  building features in each of your helpers. You will need to add `Url`
  to the `$helpers` list in your helpers.
+ App::objects() has been removed.

We hope to minimize the impact of breaking changes in future beta and
release candidate releases.


New features in 3.0.0-beta1
===========================

+ Improved error pages for plugins.
+ Numerous bugs have been fixed in the ORM and across the framework.
+ Cookie paths are now set to the application's base directory by
  default.
+ Query objects can be json serialized now.
+ Shell::param() was added.
+ Added a new `collection()` global shorthand function to convert
  arrays to collections.
+ Many API documentation blocks and book sections have been improved.
+ Multiple optimizations for performance.

For more details on all the changes in 3.0.0, you can consult the
`migration guide`_. In closing, we'd like to thank all of the people
that have helped so far with the 3.0 release. We've made great
progress and without your help we wouldn't be here today.

Download a `packaged release`_.


.. _new i18n documentation: http://book.cakephp.org/3.0/en/core-libraries/internationalization-and-localization.html
.. _migration guide: http://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html
.. _packaged release: https://github.com/cakephp/cakephp/releases/3.0.0-beta1

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News

