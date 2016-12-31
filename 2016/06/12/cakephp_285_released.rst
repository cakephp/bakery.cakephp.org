CakePHP 2.8.5 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.8.5. This is a maintenance release for the 2.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.8.5. See the `changelog
<https://cakephp.org/changelogs/2.8.5>`_ for every commit.

* Bake now recommends using the ``FlashComponent`` instead of the deprecated
  ``SessionComponent``. (@xhs345)
* RequestHandlerComponent will now automatically parse request data for
  ``PATCH`` requests as it does for ``POST``. (@icyrizard)
* Sqlite now correctly handles ``DEFAULT CURRENT_TIMESTAMP``. (@MarkusBauer)
* ``FormHelper`` now resets the unlocked fields when a form is closed
  (@nojimage)

Minor Features
--------------

* ``ApcEngine`` now supports APCu on PHP7. (@jrbasso)
* ``Folder::read()`` can now sort by modified time. (@steampilot)
* ``FormHelper::radio()`` now supports the ``fieldset`` option for customizing
  the generated fieldset element. (@xhs345)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
