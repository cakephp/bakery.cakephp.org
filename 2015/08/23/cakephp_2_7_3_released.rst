CakePHP 2.7.3 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.7.3. This is a maintenance release for the 2.7 branch that fixes several
reported issues.

Bugfixes
--------

You can expect the following changes in 2.7.3. See the `changelog
<https://cakephp.org/changelogs/2.7.3>`_ for every commit.

* ``DboSource::isConnected()`` now emits a ``SELECT 1`` query to ensure the
  connection is still active. This is helpful in long running processes like CLI
  tools.
* Missing Flash templates were added. These templates were accidentally omitted
  from earlier 2.7 releases.
* ``Model::exists()`` now always returns false, when a model uses ``useTable
  = false``.
* ``MediaView`` now correctly supports the documented ``extension`` option.
* Forms secured with SecurityComponent no longer blackhole when a hidden input
  is followed by a visible input of the same name.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
