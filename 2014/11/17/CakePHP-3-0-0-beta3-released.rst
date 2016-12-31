CakePHP 3.0.0-beta3 released
============================

The CakePHP core team is excited to announce the release of CakePHP
3.0.0-beta3. While we had originally planned on only doing 2 beta
releases, we're not entirely satisfied with the current ORM validation
workflow, and want to do some additional work there. The new plan is
to have at least two RC releases after beta3. The RC releases will be
API frozen and no new features or breaking changes will be added.

The CakePHP core team is excited to announce the release of CakePHP
3.0.0-beta3. While we had originally planned on only doing 2 beta
releases, we're not entirely satisfied with the current ORM validation
workflow, and want to do some additional work there. The new plan is
to have at least two RC releases after beta3. The RC releases will be
API frozen and no new features or breaking changes will be added.

Since 3.0.0-beta2, we've been hard at work incorporating community
feedback, and completing the remaining changes that will break
compatibility in a significant way.


Breaking Changes since 3.0.0-beta2
==================================

+ Bake templates now use a templating mechanism that involves a pre-
  parsing steps of the templates. This was done to improve the
  readability and ease of creating new bake templates. This also means
  that any custom templates that you may have will need to be updated.
+ The default replacement for `Inflector::slug()` is now `-` instead
  of `_`.
+ `LOG_ERROR` and `TESTS` constants were unused and have been removed.
+ `Controller::$actions` was removed and replaced with
  `Controller::isAction()`. The new method makes it easier to customize
  which methods your controllers consider to be routable actions.
+ `Component::initialize()` is now a post-constructor hook like all
  other initialize methods.
+ Component has a new `beforeFilter()` event listener that is fired
  *before* a controllers' `beforeFilter` method is.
+ `CakeSession::read()` returns null in all failure scenarios now.
+ Controller actions invoked with `requestAction()` must return a
  Response object now. All other return values will trigger an error.
+ Database configuration no longer accepts the `'login'` key. You
  *must* use `'username'`. This was changed to resolve inconsistencies
  across the framework.
+ Checkbox and radio inputs are now nested inside their attached label
  elements. This was done to improve compatibility with a few popular
  CSS libraries. If you have customized the templates FormHelper uses,
  you may need to update your templates.
+ `Cake\View\Error\MissingViewException` is now
  `Cake\View\Error\MissingTemplateException` in order to allow
  `MissingView` to be used for missing view classes.
+ Authentication objects that had implemented `logout()` need to be
  updated to use the new `Auth.logout` event.
+ The `App.www_root` configuration value has been renamed to
  `App.wwwRoot` for consistency reasons.



New features since 3.0.0-beta2
==============================

+ `Cake\Cache\EngineFileEngine` now generates directories when debug
  is off.
+ There are several new standalone libraries extracted from CakePHP.
  The `Cache`, `Log`, `Utility` packages are now installable separately
  with composer.
+ The `pj()` (print json) helper method has been added as a
  convenience when working in the interactive console or test cases.
+ The `Model.initialize` event has been added. This event is fired
  right after a table's initialize hook has completed, allowing plugins
  or other listeners to interact with table objects.
+ Database connections, cache engines, loggers and email transports
  can now be configured with a Datasource Name (DSN) using the `url`
  key. This makes it easier to define configuration in environment
  variables which is a recommended approach by many Platform as a
  service providers.
+ `Component::initialize()` and `View::initialize()` were added.
+ Arbitrary meta tags can be created with `HtmlHelper::meta()`.
+ Exceptions are now raised when custom view class cannot be found.
+ Request data marshaled into entities is not forcibly cast now. This
  makes validating entity data a bit easier as entity data more closely
  represents the original request data.
+ The query expression builder now has a `between()` method for
  generating `BETWEEN` clauses.
+ `Cake\ORM\Behavior::initialize()` was added.
+ Stack traces are now displayed on fatal errors if xdebug is
  installed.
+ `Request::is()` now caches results in memory.
+ AuthComponent has two new events. `Auth.afterIdentify` is fired
  after a user is identified or logged in. `Auth.logout` is fired when
  `AuthComponent::logout()` is called.
+ SessionComponent is deprecated. Instead you should be using
  `$this->request->session()` instead.
+ Each hasher in the `FallbackHasher` class can have separate options
  now.

For more details on all the changes in 3.0.0, you can consult the
`migration guide`_. In closing, we'd like to thank all of the people
that have helped so far with the 3.0 release. We've made great
progress and without your help we wouldn't be here today.

Download a `packaged release`_.



.. _migration guide: https://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html
.. _packaged release: https://github.com/cakephp/cakephp/releases/3.0.0-beta3

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News
