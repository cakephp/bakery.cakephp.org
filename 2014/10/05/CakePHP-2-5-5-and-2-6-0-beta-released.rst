CakePHP 2.5.5 and 2.6.0-beta released
=====================================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.5 and 2.6.0-beta.

The CakePHP core team is proud to announce the immediate availability
of CakePHP `2.5.5`_ and `2.6.0-beta`_. 2.5.5 is a bugfix release for
the 2.5 release series, while 2.6.0-beta is beta release of the
upcoming 2.6.0 release. A list of the changes you can expect in 2.5.5
are:

+ Console applications will not output colours if there is no TTY.
+ Files are not overwritten by `Folder::copy()` when the SKIP flag is
  used.
+ `Hash::insert()` and `Hash::get()` now handle `0` as the first path
  element.
+ Improved API documentation.
+ Fixed a situation where `Hash::remove()` would remove data
  incorrectly.
+ UUID columns are now reflected properly by postgres.
+ `CakeEmail::reset()` now resets the email pattern.
+ `Hash::expand()` and `Hash::merge()` are now much faster.



New features in 2.6
-------------------

Like all the other 2.x releases, 2.6.0 will be backwards compatible
with previous versions of CakePHP 2.x, and include a number of new
enhancements and improvements. Here is what you can expect in 2.6.0:

+ `stackTrace()` has been added as a convenience wrapper function for
  `Debugger::trace()`. It directly echos just as `debug()` does. But
  only if debug level is on.
+ `ConsoleOptionParser::removeSubcommand()` was added.
+ `Shell::overwrite()` has been added to allow generating progress
  bars or to avoid outputting too many lines by replacing text that has
  been already outputted to the screen.
+ When using AclBehavior, The model's `parentNode()` method now gets
  the type (Aro, Aco) passed as first argument: `$model->parentNode($type)`.
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
  as the `once` option for `HtmlHelper::script()`. The default value
  is `false` to maintain backwards compatibility.
+ The `maxlength` attribute will now also be applied to textareas,
  when the corresponding DB field is of type varchar, as per HTML specs.
+ New i18n functions have been added. The new functions allow you to
  include message context which allows you disambiguate possibly
  confusing message strings. For example 'read' can mean multiple things
  in English depending on the context. The new `__x`, `__xn`, `__dx`,
  `__dxn`, `__dxc`, `__dxcn`, and `__xc` functions provide access to
  the new features.

A long standing issue in the Model class has been fixed. Because it
may be construed as API changes, there is a flag to restore the
original behaviour.

+ `Model::afterFind()` now always uses a consistent format for
  afterFind(). When `$primary` is false, the results will always be
  located under `$data[0]['ModelName']`. You can set the
  `useConsistentAfterFind` property to false on your models to restore
  the original behaviour.

In addition to new features, a few features have been deprecated, and
will be removed in CakePHP 3.0.0

+ `Validation::between` has been deprecated, you should use
  `Validation::lengthBetween` instead.
+ `Validation::ssn` has been deprecated and may be provided as
  standalone/plugin solution.
+ The `$confirmMessage` argument of `HtmlHelper::link()` has been
  deprecated. You should instead use key `confirm` in `$options` to
  specify the message.
+ The `$confirmMessage` argument of `FormHelper::postLink()` has
  been deprecated. You should instead use key `confirm` in `$options`
  to specify the message.

If the beta release doesn't have any major issues reported, you can
expect an release candidate in ~1 month, with a stable release shortly
afterwards.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework.


.. _2.5.5: https://github.com/cakephp/cakephp/releases/2.5.5
.. _2.6.0-beta: https://github.com/cakephp/cakephp/releases/2.6.0-beta

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News
