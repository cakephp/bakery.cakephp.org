CakePHP 2.7.1 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.7.1.

Bugfixes
--------

You can expect the following changes in 2.7.1. See the
`changelog <http://cakephp.org/changelogs/2.7.1>`_ for every commit.

* ``CakeText::tokenize()`` now works with multibyte separator values.
* AJAX requests that failed authentication when AuthComponent did not have
  a ``loginElement`` configured, are no longer trapped in a redirect loop.
* ``Hash::maxDimensions()`` now correctly calculates the depth when nested
  elements are not in the 0th element of the parent.
* ``Model::saveMany()`` and ``Model::saveAssociated()`` behave correctly when
  saving with ``atomic = false`` and boolean fields set to ``false``.
* ``FormHelper::input()`` now correctly uses the ``value`` option with
  date/time/datetime input types.
* Terminal colours are enabled in windows when using ConEmu.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.
