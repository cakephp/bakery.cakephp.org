CakePHP 3.0.13 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.0.13. This is a maintenance release for the 3.0 branch that fixes bugs and
includes small enhancements.

Bugfixes
--------

You can expect the following changes in 3.0.13. See the `changelog
<https://cakephp.org/changelogs/3.0.13>`_ for every commit.

- ``Query::count()`` no longer fails when there are fields with complex
  expressions in the select.
- If FormHelper is used to create a visible input after a hidden input was
  created, the form is no longer blackholed by SecurityComponent.
- Typehints in the API documentation have been corrected in a number of places.
- When a new entity is saved with a specific UUID, the entity returned from
  save() retains the original id value.
- ``Http\Client`` now correctly sets the proxy context options, allowing proxy
  connections to work.
- Compatibility with PHP 5.x improved.

Enhancements
------------

- ``Shell::quiet()`` and ``Shell::verbose()`` were added. These helper methods
  provide shortcuts to ``$this->_io->quiet()`` and ``$this->_io->verbose()``
  respectively.
- ``I18n\Number`` has an ordinal() method for formatting the ordinal text for
  a given number. The ``ordinal()`` method is also available on
  ``NumberHelper``.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
