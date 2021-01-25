CakePHP 4.2.3 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.3. This is a maintenance release for the 4.2 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.2.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.2.2...4.2.3>`_ for every commit.

* Improve saving of translations when using the shadow table strategy.
* Improved flash message retention. Messages are now merged with the existing
  messages making it compatible with multiple requests in the same test method.
* Fix ``Session::read()`` to return the default value when a session cannot be
  started.
* Improved API documentation.
* ``Validation::custom()`` now accepts integer values.
* The ``sprintf()`` translation formatter now works consistently with the
  ``intl`` based implementation when translating plural values. The ``count``
  parameter is no longer the first placeholder value.
* ``Mailer\Message`` now includes the ``textMessage`` and ``htmlMessage`` in
  serialized data.
* Arguments for stacktraces are now included by default for development error
  pages.

Contributors to 4.2.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Cauan Cabral
* Corey Taylor
* Hache_raw
* Joseph Shanak
* Mark Scherer
* Mark Story
* o0h
* othercorey
* Thx3r
* Waldemar Bartikowski

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
