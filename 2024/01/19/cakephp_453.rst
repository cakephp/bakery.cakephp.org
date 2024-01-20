CakePHP 4.5.3
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.5.3. This is a maintenance release for the 4.4 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.5.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.5.2...4.5.3>`_ for every commit.

* Configuration based path keys are normalized to integer keys now.
* Update requirements to be compatible with ``paragonie/csp-builder:^3``.
* Cookie assertion methods are now compatible with ``RedirectResponse``.
* Fixed dev error page rendering in PHP8.3
* CI matrix now includes PHP8.3
* Improve assertion failure message of ``EventFiredWith`` constraint.

Contributors to 4.5.3
----------------------

Thank you to all the contributors that helped make this release happen:

* Fabian Friedel
* fabian-mcfly
* Ishan Vyas
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
