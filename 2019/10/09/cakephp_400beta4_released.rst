CakePHP 4.0.0-beta4 Released
============================

The CakePHP core team is proud to announce the third beta release of CakePHP
4.0.0. Since the previous beta we've completed several tasks:

* The ``requireSsl`` features of ``SecurityComponent`` are available as
  middleware in the ``HttpsEnforcerMiddleware``.
* Migrations has been updated to use Commands instead of Shells.
* 4.x has adopted the PSR-12 formatting standard.
* A new ``Asset`` class has been added to the routing package, making it easier
  to generate static asset URLs across your application.
* The internal request stack in ``Router`` has been removed.
  With ``requestAction()`` removed this feature provided little value.
* Email attachments now support ``UploadedFileInterface`` objects.

New Features
------------

The `migration guide
<https://book.cakephp.org/4.0/en/appendices/4-0-migration-guide.html>`_ has
a complete list of what's new in 4.0.0. We recommend you give that page a read
when upgrading as it notes the various breaking changes present in 4.0.

How you Can Help
----------------

You can help deliver 4.0 by contributing in one of many ways:

#. Check the `documentation <https://book.cakephp.org/4.0/en/>`_ for mistakes,
   outdated, unclear or broken examples. We've been trying to update everything
   but may have not caught everything.
#. Try it out! Give CakePHP 4.0 a test drive in a non-production application.
   We'd love to hear how converting a small application went and what was harder
   than it should have been.
#. File issues for regressions in existing features, or suggest new features.
   While we're not likely to greatly expand the scope of 4.0, we would like
   input on what should be a part of 4.1 and 4.2.
#. Let us know about unclear error messages or silent failures in CakePHP.

Contributors to 4.0.0-beta4
---------------------------

Thank you to all the contributors that have helped since the beta2 release:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Erwane Breton
* Iftekhar Ahmed Eather
* Jason Horvath
* Littley Lv
* Mark Scherer
* Mark Story
* Rachman Chavik
* Val Bancer
* andrii-pukhalevych
* bancer
* detinkin
* kawaguchi masaki
* mirko-pagliai
* saeideng

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
