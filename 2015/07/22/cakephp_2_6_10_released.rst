CakePHP 2.6.10 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.6.10. This release fixes a regression introduced in 2.6.9.

Bugfixes
--------

You can expect the following changes in 2.6.10. See the
`changelog <http://cakephp.org/changelogs/2.6.10>`_ for every commit.

* ``Model::saveMany()`` and ``Model::saveAssociated()`` behave correctly when
  saving with ``atomic = false`` and boolean fields set to ``false``.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.
