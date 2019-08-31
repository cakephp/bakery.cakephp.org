CakePHP 3.8.3 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.3. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.3. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.2...3.8.3>`_ for every commit.

* Added ``IntegrationTestTrait::setUnlockedFields()`` to make working with
  SecurityComponent in tests simpler.
* Improved forwards compatible annotation for ``EntityInterface::setDirty()``.
* Made return value of ``TestEmailTransport::send()`` match the real
  implementations.
* Fixed double escaping in pagination meta tags.
* Improved API documentation.
* Subqueries passed to ``FunctionExpression`` objects are now wrapped in
  parentheses.
* ``Cake\Network\Socket`` can now connect to unix sockets.
* Console error codes are now constrained to be between 1 and 244.

Contributors to 3.8.3
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras Janušauskas
* Jorge González
* Mark Scherer
* Mark Story
* Mauri Kujala
* Robert Pustułka
* ndm2

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
