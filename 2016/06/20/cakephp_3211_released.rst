CakePHP 3.2.11 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.2.11. This is a maintenance release for the 3.2 branch that fixes several
community reported issues and adds a few minor features.

Bugfixes
--------

You can expect the following changes in 3.2.11. See the `changelog
<http://cakephp.org/changelogs/3.2.11>`_ for every commit.

* SQLServer schema correctly handles default values of 'NULL'. (@ADmad)
* Model prefixed data is now merged with un-prefixed by the Marshaller instead
  of being used instead of un-prefixed data. (@markstory)
* Http\Client will now correctly timeout connections from servers that never
  close the connection. (@chinpei215)
* The Marshaller now correctly uses custom primary keys consistently. (@ndm2)
* Invalid ``maxLimit`` values no longer result in a division by zero error.
  (@markstory)
* SQLServer driver can now reflect views. (@tgr0ss)
* A more clear exception is raised when associations define invalid primary
  keys. (@burzum)
* A clearer exception is raised when validator methods don't return
  a ``Validator`` instance. (@dakota)
* Sessions are now garbage collected when they expire, not after a long delay.
  (@hyaza)
* ``RouteBuilder::redirect()`` now lets you use custom route classes. (@burzum)

Minor Enhancements
------------------

* API documentation improvements (@ravage84, @ADmad, @frankfoerster, @ndm2)
* Http\Client OAuth 1 adaptor now supports RSA-SHA1. (@TheFRedFox)
* ``bin/cake --version`` now outputs the installed version of CakePHP. (@alysson-azevedo)
* ``EventManager`` instances can now track the events they dispatch. (@burzum)
* Route matching results now include a ``_matchedRoute`` parameter. This
  provides access to the template of the matched route. (@lorenzo)
* ``Response::mapType()`` is now more efficient for common media types.
  (@jrbasso)
* ``DateTimeType`` objects only create instances as needed now. (@lorenzo)
* ``FormHelper::postButton()`` lets you customize the form element.
  (@TheFredFox)
* ``TestCase::assertEventFired()`` and ``TestCase::assertEventFiredWith()`` were
  added. These methods make it easier to assert that events were triggered.
  (@jeremyharris)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
