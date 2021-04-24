CakePHP 3.9.9 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.9.9. This is a maintenance release for the 3.9 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.9.9. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.9.8...3.9.9>`_ for every commit.

* The ``assertMailSentFrom()`` method can now compare array emails.
* Improved API documentation.
* Fix ``BufferedIterator`` not yielding full results when partially iterated.
* Fix ``RouteBuilder::plugin()`` not forwarding the ``namePrefix`` option.

Contributors to 3.9.9
----------------------

Thank you to all the contributors that helped make this release happen:

* Corey Taylor
* Jorge
* Marc Würth
* Mark Story
* TerryKern
* Tobse
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
