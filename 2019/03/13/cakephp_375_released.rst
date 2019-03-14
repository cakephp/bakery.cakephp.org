CakePHP 3.7.5 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.7.5. This is a maintenance release for the 3.7 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 3.7.5. See the `changelog <https://github.com/cakephp/cakephp/compare/3.7.4...3.7.5>`_ for every commit.

* Added ``FlashComponent::getSession()`` protected method to make application
  extensions easier to build.
* ``Entity::hasErrors()`` now only returns true when an error array is not
  empty.
* The date, time, and datetime ``allowEmpty*`` methods on ``Validator`` now
  allow ``[]`` as an empty value.
* Improved API documentation.
* ``Database\Expression\Comparison`` now clones its children recursively.
* ``Http\ResponseEmitter`` now calls ``session_write_close()`` in fast-cgi
  servers. This helps ensure that the session has been persisted.
* Greatly improved performance of ``cake i18n extract``.

Contributors to 3.7.5
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Cauan Cabral
* David Yell
* Edgaras Janušauskas
* Mark Scherer
* Mark Story
* Michal
* Robert Pustułka
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
