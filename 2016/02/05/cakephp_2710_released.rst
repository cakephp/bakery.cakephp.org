CakePHP 2.7.10 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.7.10. This is a maintenance release for the 2.7 branch that fixes several
community reported issues.

Outside of security releases, this will be the final release for 2.7. We
recommend you upgrade to 2.8.x to continue receiving bugfixes.

Bugfixes
--------

You can expect the following changes in 2.7.10. See the `changelog
<https://cakephp.org/changelogs/2.7.10>`_ for every commit.

* Improved API docs. (@ndm2)
* The ``IN`` operator now works in conditions when only one element is to be
  matched. (@pedrofs)
* Support for ``NOT IN`` added for ``Model::find()`` conditions. This makes 2.x
  finders more compatible with 3.x (@pedrofs)
* ``cake i18n extract`` now behaves better when CakePHP is installed with
  composer. (@garas)
* ``Configure::load()`` can now read symlinked configuration files (@tersmitten)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
