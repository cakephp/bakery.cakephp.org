CakePHP 3.9.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.0. This is the first stable release of 3.9.0. 3.9.0 provides a number
improvements both large and small to CakePHP.

This release is the *last planned* feature release for 3.x. Going forward the
core team will be focusing 4.x releases going forward. As per our `release
timelines <https://github.com/cakephp/cakephp/wiki#3x-maintenance-mode>`__ 3.9
will continue to receive bug fixes until June 15 2021.

Upgrading to 3.9.0
------------------

You can use composer to upgrade to CakePHP 3.9.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.9.*"

Deprecation Warnings
--------------------

* ``ConsoleIo::info()``, ``success()``,  ``warning()`` and ``error()`` will no
  longer accept ``null`` values in the ``message`` parameter in 4.0.
* Using a comma separated string for ``$fixtures`` in test cases is deprecated.
  Instead use an array, or implement the new ``getFixtures()`` method on your
  test case classes.
* ``Validator::errors()`` was renamed to ``Validator::validate()``.
* ``FormHelper::create()`` now emits deprecation warnings when the ``$context``
  parameter is a boolean or string. These values trigger fatal errors in 4.0 and
  will need to be updated before upgrading.
* The magic method signature for ``FunctionBuilder::cast([...])`` is deprecated.
  Use ``FunctionBuilder::cast('field', 'type')`` instead.
* Abandoned ``zendframework`` package has been replaced with `laminas <https://github.com/laminas/laminas-diactoros>`_
  which provides backwards-compatible classes.


What's new in 3.9.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-9-migration-guide.html>`_ has
a complete list of what's new in 3.9.0. We recommend you give that page a read
when upgrading. A few highlights from 3.9.0 are:

* Command classes can implement the ``defaultName()`` method to overwrite the
  conventions based CLI name.
* ``Query::orderAsc()`` and ``Query::orderDesc()`` now accept Closure's as their
  field enabling you to use build complex order expressions with the provided
  ``QueryExpression`` object.
* ``Cake\Datasource\SimplePaginator`` was added. This class makes paginating
  very large results more efficient. It skips running the potentially expensive
  ``count()`` query. If you only use 'next' and 'previous' navigation in
  your pagination controls this class can be a good solution.
* ``Cake\Http\Client\Response::isSuccess()`` was backported from 4.0
* ``Cake\Http\Middleware\CspMiddleware`` was backported from 4.0
* ``BaseApplication::addOptionalPlugin()`` was added. This method handles
  loading plugins, and handling errors for plugins that may not exist because
  they are dev dependencies.
* The i18n global functions now only return strings. The changes made to 4.0 to
  remove the null return value when no translation string is provide have been
  backported to 3.9.
* Lenient parsing can be disabled for ``parseDateTime()`` and ``parseDate()``
  using ``disableLenientParsing()``. The default is enabled - the same as
  IntlDateFormatter.
* ``Table::saveManyOrFail()`` method has been added that will throw
  ``PersistenceFailedException`` with the specific entity that failed in case of
  an error. The entities are saved within a transaction.
* ``Table::deleteMany()`` and ``Table::deleteManyOrFail()`` methods have been
  added for removing many entities at once including callbacks. The entities are
  removed within a transaction.
* ``Text::uuid()`` now uses ``random_int()`` with PHP 5.6 insted of ``mt_rand()``.
  This adds a dependency on paragonie/random_compat which implements it for PHP 5.6.


Contributors to 3.9.0
---------------------------

Thank you to all the contributors that helped make 3.9 happen:

* ADmad
* Cauan Cabral
* Corey Taylor
* Edgaras Janušauskas
* Erwane Breton
* Florian Krämer
* Frank de Graaf (Phally)
* Jorge González
* Mark Scherer
* Mark Story
* Robert Pustułka
* Tibor
* Val Bancer
* Victor Eduardo de Assis
* Zuluru
* andrii-pukhalevych
* bancer
* gregs
* mcsknp
* ndm2
* nojimage

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 3.9.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
