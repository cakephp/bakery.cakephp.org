CakePHP 3.7.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.7.0. This is the first stable release of 3.7.0. 3.7.0 provides a number
improvements both large and small to CakePHP.

This release is the *last planned* feature release for 3.x. Going forward the
core team will be focusing on supporting 3.7 and completing 4.0.0.

Upgrading to 3.7.0
------------------

You can use composer to upgrade to CakePHP 3.7.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.7.*"

Deprecation Warnings
--------------------

3.7.0 adds additional runtime deprecations for features that were missed during
3.6. The new deprecation warnings conclude deprecations in 3.x. By resolving
deprecation warnings in your application now you will have a simpler upgrade
experience when 4.0.0 is ready.

Because fixing all the deprecation warnings in a large application can be
a non-trivial task you will likely want to disable deprecation warnings allowing
you to make incremental progress in fixing them. To disable deprecation warnings
set ``Error.errorLevel`` to ``E_ALL ^ E_USER_DEPRECATED`` in **config/app.php**.

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-7-migration-guide.html#deprecations>`_
has the full list of deprecated methods and their replacements. Deprecated
features will continue to exist and behave as they always have until 4.0.0

What's new in 3.7.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-7-migration-guide.html>`_ has
a complete list of what's new in 3.7.0. We recommend you give that page a read
when upgrading. A few highlights from 3.7.0 are:

* The ``ArrayEngine`` which can help improve test suite performance and
  reliability.
* ``Cake\Http\Client`` will now use ``curl`` if it is available providing better
  performance and proxy features.
* ``ErrorHandlerMiddleware`` will now include previous exceptions in logging.
* New transport factory classes to help simplify ``Email``.
* ``Cake\Validation\Validator`` now provides type-safe allow-empty methods.
* ``FormHelper`` can now set HTML5 custom validation messages.
* New assertions on ``IntegrationTestCase`` to make working with flash messages
  simpler.

Contributors to 3.7.0
---------------------------

Thank you to all the contributors that helped make 3.7 happen:

* ADmad
* AlPri78
* Benjamin Pick
* Brian Porter
* Ceeram
* Daniel Opitz
* Daniel Platt
* David Yell
* Dmitrii Romanov
* Dustin Haggard
* Edgaras
* Edgaras Janušauskas
* Erwane Breton
* Eugene Ritter
* Fernando Herrero
* Gergely Tamás
* Henrik Gemal
* Ian den Hartog
* Iandenh
* Jeremy Harris
* Jorge González
* Jose Diaz-Gonzalez
* Joshua Lückers
* José Lorenzo Rodríguez
* Kazuki_Kamizuru
* Marc Würth
* Mark Scherer
* Mark Story
* Mikkel Bonde
* Mohamed Elbahja
* Philipp Nikolajev
* chinpei215
* inoas
* lganee
* mirko-pagliai
* ndm2
* saeideng

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 3.7.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
