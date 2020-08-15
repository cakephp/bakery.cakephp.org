CakePHP 4.1.3 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.1.3. This is a maintenance release for the 4.1 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.1.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.1.2...4.1.3>`_ for every commit.

* The changes made to not reload plugin configuration was reverted as it caused
  regressions in community plugins.
* XML entity loading code was de-duplicated and made compatible with PHP8.
* The ``SqlServer`` driver now raises an exception when more than 2100
  parameters are provided as that is the maximum that SQLServer supports.
* The ``SqlServer`` driver will now retry connection creation up to 5 times.
  This increases compatibility with cloud hosted SQLServer instances.
* View now closes all open output buffers when an element or view fails during
  rendering. This resolves open buffer warnings in test cases.
* ``DateType`` now ensures that time components are wiped for PHP provided
  classes as well.

Contributors to 4.1.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Mark Scherer
* Mark Story
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
