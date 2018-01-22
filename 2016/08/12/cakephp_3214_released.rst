CakePHP 3.2.14 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.2.14. This is a maintenance release for the 3.2 branch that fixes several
community reported issues.

This is the *last* scheduled bugfix for 3.2. In the future, 3.2 will only
receive security fixes until 3.4.0 is released. In order to continue receiving
regular bugfixes, we recommend that you upgrade to 3.3.0.

Bugfixes
--------

You can expect the following changes in 3.2.14. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.2.13...3.2.14>`_ for every commit.

* The ``ORM\Table::buildValidator()`` hook method was added. Now all events that
  are fired from the table classes have matching hook methods. (@marksotry)
* An interface has been created for ``Database\Type`` subclasses. (@davidyell)
* Fatal errors are now reported more accurately in CLI scripts when using PHP7.
  (@jippi)
* ``BelongsToMany::unlink()`` now returns true when it succeeds. This increases
  consistency with other methods. (@markstory)
* ``Validator::equals()`` now works as you would expect. (@markstory)
* CakePHP now relies on ``~1.0`` of chronos, which is now stable. (@markstory)
* API documentation has been cleaned up of excess whitespace (@ravage84)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
