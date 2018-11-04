CakePHP 3.6.13 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.6.13. This is a maintenance release for the 3.6 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.6.11. See the `changelog <https://github.com/cakephp/cakephp/compare/3.6.12...3.6.12>`_ for every commit.

* PHP 7.3 was added to the build matrix with all tests passing.
* Extensions are no longer silently ignored when specific extensions are
  enabled. Instead a ``NotFoundException`` wll be raised.
* Join table entities now have their ``source`` source property.
* Improved detection of binary column lengths in SQLServer schema reflection.
* Multiple checkbox input sets without inputs can now be rendered correctly.
* Session handlers are not modified if the session is already active.
* The ``i18n`` shell now uses the locale paths defined by the application.
* The bundled CA file has been updated to 2018-10-17 build from mozilla.
* ``ConsoleIo::createFile()`` now behaves correctly with UNC file paths.
* ``MoParser`` now supports messages without contexts matching the behavior of
  ``PoParser``.

Contributors to 3.6.13
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* David Yell
* Dmitriy Romanov
* Edgaras Janušauskas
* Ian den Hartog
* Mark Scherer
* Mark Story
* nojimage

We'd like to welcome `garas <https://github.com/garas>`_ to the CakePHP core
team. Hailing from Croatia, garas has been helpful with fixing bugs in 3.x and
reviewing/writing pull requests for 3.7.

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
