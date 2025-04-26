CakePHP 4.6.1
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.6.1. This is a maintenance release for the 4.6 branch that fixes several
community reported issues and regressions.

Bugfixes
--------

You can expect the following changes in 4.6.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.6.0...4.6.1>`_ for every commit.

- ``Cake\Cache\Engine\NullEngine::getMultiple()`` now returns all keys like
  other cache engines.
- ``MemcachedEngine::getMultiple()`` now handles null values correctly.
- Fixed deprecated method usage in ``ReconnectStrategy``.
- Fixed method and finder maps not being populated when
  ``BehaviorRegistry::set()`` is called.

Contributors to 4.6.1
----------------------

Thank you to all the contributors that submitted a pull request:

- ADmad
- Alejandro Ibarra
- Joris Vaesen
- Mark Story
- othercorey
- Val Bancer

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
