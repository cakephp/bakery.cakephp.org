CakePHP 3.1.0-beta Released
===========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.1.0-beta. This release is the first release for the 3.1 branch which adds
several new features to the 3.x series. We would appreciate any feedback you
might have on the new features before their API definitions become stable.

ORM Enhancements
----------------

A big part of 3.1 was making the ORM even more awesome than it already is.

Lazy Eager Loading
~~~~~~~~~~~~~~~~~~

You can now Lazily Eager Load Associations. This feature allows you to
conditionally load additional associations into a result set, entity or
collection of entities::

    $articles = $this->Articles->find('popular')->all();

    // Later on after some logic has run.
    // We can load additional associations.
    $withAuthors = $this->Articles->loadInto($articles, ['Authors']);

Additional Filtering Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You may have already used ``matching()`` on the query object. In 3.1 you can
also use ``notMatching()`` to create a negated matching query::

    // Find articles with no comments.
    $query = $this->Articles->find('popular')
        ->notMatching('Comments');

You can use the ``leftJoinWith()`` and ``innerJoinWith()`` methods to join
associations without loading columns from those associations. This makes it easy
to do filtering on associations::

    $query = $this->Articles->find()
        ->innerJoinWith('Authors')
        ->where(['Authors.promoted' => true]);

Mailers
-------

Mailers allow you to create reusable emails throughout your application. They
can also be used to contain multiple email configurations in one location. This
helps keep your code DRYer and keeps email configuration noise out of other
areas in your application. See the `Mailer Documentation for more information
<http://book.cakephp.org/3.0/en/core-libraries/email.html#creating-reusable-emails>`_.

Additional Template Variables in Templates
-------------------------------------------

You can now add additional template placeholders in your application templates,
and then populate those placeholders when generating inputs::

    // Add a template with the help placeholder.
    $this->Form->templates([
        'inputContainer' => '<div class="input {{type}}{{required}}">
            {{content}} <span class="help">{{help}}</span></div>'
    ]);

    // Generate an input and populate the help variable
    echo $this->Form->input('password', [
        'templateVars' => ['help' => 'At least 8 characters long.']
    ]);

Shell Helpers
-------------

Shell Helpers let you easily package up complex output generation code. Shell
Helpers can be accessed and used from any shell or task::

    // Output some data as a table.
    $this->helper('table')->output($data);

    // Get a helper from a plugin.
    $this->helper('Plugin.HelperName')->output($data);

You can also get instances of helpers and call any public methods on them::

    // Get and use the Progress Helper.
    $progress = $this->helper('Progress');
    $progress->increment(10);
    $progress->draw();

CakePHP provides a Progress and Table helper that you can use to make your CLI
tools look better.

Important Changes From 3.0
--------------------------

While non of the following changes modified method signatures, the behaviour of
specific methods is slightly different than in the past:

- ``FlashComponent`` now stacks Flash messages when set with the ``set()``
  or ``__call()`` method. This means that the structure in the Session for
  stored Flash messages has changed.
- New config ``storage`` has been added. It contains the storage class name that
  ``AuthComponent`` uses to store user record. By default ``SessionStorage`` is
  used.  If using a stateless authenticator you should configure
  ``AuthComponent`` to use ``MemoryStorage`` instead.
- You can now also configure ``AuthComponent`` to do the auth check before controller's
  ``beforeFilter()`` callback is run using the ``checkAuthIn`` config. This is
  particularly useful when using stateless authenticators.
- ``RequestHandlerComponent`` now switches the layout and template based on
  the parsed extension or ``Accept-Type`` header in the ``beforeRender()``
  callback instead of ``startup()``.
- The default mime type used when sending requests has changed in Http\Client.
  Previously ``multipart/form-data`` would always be used. In 3.1,
  ``multipart/form-data`` is only used when file uploads are present. When there
  are no file uploads, ``application/x-www-form-urlencoded`` is used instead.


Other Enhancements
------------------

- The default route class has been changed to ``DashedRoute`` in the
  ``cakephp/app`` repo. Your current code base is not affected by this, but it
  is recommended to use this route class from now on.
- The ``breakpoint()`` helper function has been added. This function provides
  a snippet of code that can be put into ``eval()`` to trigger an interactive
  console.
- ``Shell::dispatchShell()`` no longer outputs the welcome message from the
  dispatched shell.
- You can now set ``_serialized`` to ``true`` for ``JsonView`` and ``XmlView``
  to serialize all view variables instead of explicitly specifying them.
- ``Time::fromNow()`` has been added. This method makes it easier to calculate
  differences from 'now'.
- ``Time::i18nFormat()`` now supports non-gregorian calendars when formatting
  dates.

Deprecations
------------

As we continue to improve CakePHP, certain features are deprecated as they are
replaced with better solutions. Deprecated features will not be removed until
4.0:

- The ``SessionHelper`` has been deprecated. You can use
  ``$this->request->session()`` directly.

Unless there are major issues with the 3.1.0-beta release, we will have
a release candidate and stable release packaged in the 4-5 weeks. The
documentation for 3.1.0 is now available in the `book
<http://book.cakephp.org/3.0/en>`_ and the `API <http://api.cakephp.org/3.1>`_.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
