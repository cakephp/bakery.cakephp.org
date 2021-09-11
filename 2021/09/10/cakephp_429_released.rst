CakePHP 4.2.9 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.2.9. This is a maintenance release for the 4.2 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 4.2.9. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.2.8...4.2.9>`_ for every commit.

* Fixed radio inputs trimming off leading ``-`` which could result in duplicate
  id attributes.
* Improved API documentation.
* Fixed newline usage in ``MailTransport``. In PHP8 ``mail()`` require headers
  to be separated with ``CRLF`` instead of ``PHP_EOL``.
* Fixture truncation in SQLServer now only regenerates sequences that were used.

Contributors to 4.2.9
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Lars Willighagen
* Mark Story
* othercorey
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
