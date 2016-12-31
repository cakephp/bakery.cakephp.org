CakePHP 2.7.7 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 2.7.7. This is a maintenance release for the 2.7 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 2.7.7. See the `changelog
<https://cakephp.org/changelogs/2.7.7>`_ for every commit.

* In a CLI environment, error handlers now default the CLI error handlers during
  application bootstrap. Previously, errors during application startup would
  emit HTML.
* Fix a regression in HttpSocket where SNI validation would fail due to changes
  around SSL option handling.

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

