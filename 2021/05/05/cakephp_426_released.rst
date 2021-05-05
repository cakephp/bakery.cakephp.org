CakePHP 4.2.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.6. This is a maintenance release for the 4.2 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.2.6. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.2.5...4.2.6>`_ for every commit.

* Updated API documentation for FrozenDate.
* Improved ``Security.salt`` warning message.
* Improved exception message in ``Collection::groupBy()`` when no key is used.
* ``cake plugin assets`` can now handle symlinks on windows.
* Fixed variadic string argument resolution in ``ControllerFactory``.
* Fixed 'text file busy' errors that can occur when deleting files on virtual machines.
* Fixed ``assertMailSentToAt(0)`` not working correctly.

Contributors to 4.2.6
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Karma Dice
* Mark Scherer
* Mark Story
* gregs
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
