CakePHP 3.1.9 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.1.9. This is a maintenance release for the 3.1 branch that fixes several community reported issues. This is the *last* bugfix release for 3.1. You should upgrade to 3.2.0 to continue receiving bugfix releases. 3.1.x will continue to receive security fixes until the release of 3.4.0.

Bugfixes
--------

You can expect the following changes in 3.1.9. See the `changelog <http://cakephp.org/changelogs/3.1.9>`_ for every commit.

* When merging data containing BelongsToMany associations with specific IDs the ORM now merges request data into the existing entities. This makes it easier to create a new record, link it to an existing associated records and update the existing record and its associations at the same time. (@markstory)
* When using ``contain()`` on a BelongsToMany association, selecting specific fields and calling ``autoFields()``, all fields are selected as expected.  (@markstory)
* ``Time::parseDateTime()`` now works on 1970-01-01 00:00:00. (@ChrisDBrown)
* ``HtmlHelper::meta()`` uses the HTML5 shorthand for charset. (@afilina)
* ``Cake\View\Context\FormContext`` no longer emits errors when an non-array error message is encountered. (@beporter)

Minor Enhancements
------------------

* API documentation improvements in the ORM and helpers (@ndm)

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github <https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
