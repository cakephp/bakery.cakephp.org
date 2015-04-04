CakePHP 2.6.0 Released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.6.0.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.6.0. There have been a few changes to 2.6.0 since the RC1
release:

+ AuthComponent now fires the `Auth.afterIdentify` event after users
  are logged in.
+ HtmlHelper::script() and HtmlHelper::css() no longer share a single
  asset list for the once option.
+ Postgres driver supports sslmode.
+ The test suite can now use PHPUnit's phar file.
+ The RLIKE operator is now supported by the MySQL driver.
+ API documentation improvements
+ PaginatorHelper now merges options used for active links with
  options used for disabled links.



New Feature Highlight
---------------------

+ `stackTrace()` has been added as a convenience wrapper function for
  `Debugger::trace()`. It directly echos just as `debug()` does. But
  only if debug level is on.
+ `ConsoleOptionParser::removeSubcommand()` was added.
+ `Shell::overwrite()` has been added to allow generating progress
  bars or to avoid outputting too many lines by replacing text that has
  been already outputted to the screen.
+ When using AclBehavior, The model's `parentNode()` method now gets
  the type (Aro, Aco) passed as first argument:
  `$model->parentNode($type)`.
+ Schema migrations with MySQL now support an `after` key when adding
  a column. This key allows you to specify which column the new one
  should be added after.
+ `Model::save()` had the `atomic` option back-ported from 3.0.
+ `CakeRequest::param()` can now read values using :ref: `hash-path-syntax`
  like `data()`.
+ `CakeRequest:setInput()` was added.
+ `HttpSocket::head()` was added.
+ You can now use the `protocol` option to override the specific
  protocol to use when making a request.
+ `CakeTime::timeAgoInWords()` now supports `strftime()` compatible
  absolute date formats. This helps make localizing formatted times
  easier.
+ `CakeTime::timeAgoInWords()` now supports a `relativeStringFuture`
  option. This option is a printf compatible string for outputting
  future relative time date formats. This helps make localizing
  formatted times easier.
+ `Hash::get()` now raises an exception when the path argument is
  invalid.
+ `Hash::nest()` now raises an exception when the nesting operation
  results in no data.
+ `HtmlHelper::css()` had the `once` option added. It works the same
  as the `once` option for `HtmlHelper::script()`. The default value is
  `false` to maintain backwards compatibility.
+ The `maxlength` attribute will now also be applied to textareas,
  when the corresponding DB field is of type varchar, as per HTML specs.
+ New i18n functions have been added. The new functions allow you to
  include message context which allows you disambiguate possibly
  confusing message strings. For example 'read' can mean multiple things
  in English depending on the context. The new `__x`, `__xn`, `__dx`,
  `__dxn`, `__dxc`, `__dxcn`, and `__xc` functions provide access to the
  new features.
+ AuthComponent now triggers the `Auth.afterIdentify` event after
  successfully identifying a user.
+ `Model::afterFind()` now always uses a consistent format for
  afterFind(). When `$primary` is false, the results will always be
  located under `$data[0]['ModelName']`. You can set the
  `$this->useConsistentAfterFind = false` to restore the original
  behaviour if your application relies on the old behavior.
+ Configure value `I18n.preferApp` can now be used to control the
  order of translations. If set to true it will prefer the app
  translations over any plugins' ones.



Deprecations
------------

In addition to new features, a few features have been deprecated, and
will be removed in CakePHP 3.0.0

+ `Validation::between` has been deprecated, you should use
  `Validation::lengthBetween` instead.
+ `Validation::ssn` has been deprecated and may be provided as
  standalone/plugin solution.
+ The `$confirmMessage` argument of `HtmlHelper::link()` has been
  deprecated. You should instead use key `confirm` in `$options` to
  specify the message.
+ The `$confirmMessage` argument of `FormHelper::postLink()` has been
  deprecated. You should instead use key `confirm` in `$options` to
  specify the message.



The Future of 2.x
-----------------

With 2.6.0 released, the development branch for 2.7.0 has been
created. This branch will be released in 5-6 months and will be
another 2.x API compatible release. While the core team doesn't have
any large improvements planned for 2.7, there will be some efforts to
backport useful features from 3.0 to help you migrate more easily.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you CakePHP wouldn't be
possible.



.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News
