CakePHP 4.1.5 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.1.5. This is a maintenance release for the 4.1 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.1.5. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.1.4...4.1.5>`_ for every commit.

* ``cake plugin load`` will now display an error when an invalid plugin name is
  used.
* Improved compatibility with PHP8.
* Test fixtures now truncate tables that have externally defined schema.
  Previously they would not be truncated or dropped and subsequent tests would
  fail.
* ``MemcachedEngine`` will now raise an exception when persistent connections
  are used with different server lists.
* AuthComponent no longer raises an error when the request has no action
  defined.
* Improved cross browser compatibility of 'Copy' button in debug output.
* Updated parameter names inside Collection in preparation foro PHP8.

Contributors to 4.1.5
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* bancer
* Corey Taylor
* itosho
* Jonathan McAndrew
* Mark Scherer
* Mark Story
* othercorey

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
