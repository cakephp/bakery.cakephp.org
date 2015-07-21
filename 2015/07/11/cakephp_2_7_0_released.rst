CakePHP 2.7.0 Released
######################

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.7.0. 2.7.0 is an API compatible feature release for the 2.x release series.
The last 2.6 release will be 2.6.9, which will be released later this week.

2.7.0 should be a drop in replacement for your existing 2.5 or 2.6 libraries.
In 2.7 the following new features are available.

Requirements
------------
As of CakePHP 2.7 the PHP version requirement for 2.x series has been updated to
PHP 5.3.0.

Deprecations
------------

- The class ``String`` has been renamed to ``CakeText``. This resolves some
  conflicts around HHVM compatibility as well as PHP7. The
  ``String`` class is still provided for compatibility reasons.
- ``Validation::notEmpty()`` has been renamed to ``Validation::notBlank()``.
  This aims to avoid confusion around the PHP ``notEmpty()`` function and that
  the validation rule accepts ``0`` as valid input.
- ``SessionComponent::setFlash()`` has been deprecated. You should use
  ``FlashComponent`` instead.
- ``SessionHelper::flash()`` has been deprecated. You should use
  ``FlashHelper`` instead.

Backported Features From 3.0
----------------------------

- Plugin shells that share a name with their plugin can now be called without
  the plugin prefix. For example ``Console/cake MyPlugin.my_plugin`` can now
  be called with ``Console/cake my_plugin``.
- ``Configure::consume()`` has been added to read and delete from
  Configure in a single step.
- ``CakeSession::consume()`` has been added to read and delete from
  session in a single step.
- New setting ``level`` is now available in ``TreeBehavior``. You can use it to
  specify field name in which the depth of tree nodes will be stored.
- New method ``TreeBehavior::getLevel()`` has been added which fetches depth of
  a node.
- ``SessionComponent::consume()`` has been added to read and delete
  from session in a single step.
- ``SessionHelper::consume()`` has been added to read and delete from
  session in a single step.
- ``Shell::param()`` has been added. This method allows you to read CLI options
  without notice errors.
- The ``text/plain`` content type is no longer mapped to the 'csv' response type
  by RequestHandlerComponent. This helps fix issues when applications used
  jQuery and csv responses.

Other Improvements
------------------

- SQL datasources will now cast ``''`` and ``null`` into ``''`` when columns are
  not nullable and rows are being created or updated.
- Argument ``$renew`` has been added to ``CakeSession::clear()`` to allow
  emptying the session without forcing a new id and renewing the session. It
  defaults to ``true``.
- CakeEmail will now use the 'default' config set when creating instances that
  do not specify a configuration set to use. For example ``$email = new
  CakeEmail();`` will now use the 'default' config set.
- ``ControllerTestCase::testAction()`` now supports an array as URL.


As always, a huge thanks to all the community members that helped make this
release happen by reporting issues, writing documentation and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: CakePHP, release
