CakePHP 2.7.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.7.4. This is a maintenance release for the 2.7 branch that fixes several
reported issues.

Bugfixes
--------

You can expect the following changes in 2.7.4. See the `changelog
<https://cakephp.org/changelogs/2.7.4>`_ for every commit.

* When saving, models will always correctly set the 'updated' and 'created'
  fields. Even when a 'fieldList' is used, and those fields are not in the
  fieldList.
* SessionHelper and FlashHelper are now more compatible with messages set
  through either the SessionComponent or FlashComponent.
* Bake generates fixtures with only 1 record by default now.
* The default value of CURRENT_TIMESTAMP is now supported for MySQL datetime
  columns.
* Datasources no longer fatally error if isConnected() is called after
  disconnect().
* Improved API documentation.
* Email configuration defaults are now correctly loaded even when the
  configuration class has not been loaded.
* Virus is now pluralized to viruses.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

