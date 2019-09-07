CakePHP 4.0.0-beta3 Released
============================

The CakePHP core team is proud to announce the third beta release of CakePHP
4.0.0. Since the previous beta we've completed a few milestones:

* Another pass with psalm and improved type handling throughout
  the database and ORM packages. Type mappers handle empty values and nulls more
  consistently. We've also done refactoring in the
* Mailer package which has resulted in ``Cake\Mailer\Email`` becoming
  a backwards compatible proxy for other classes.
* Uploaded files are now accessed using the PSR7 interface by default.
  A compatibility flag has also been added to preserve the 3.x behavior.
* Work on the cakephp4 `rector configuration <https://getrector.org/>`__
  has been started.

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

Contributors to 4.0.0-beta3
---------------------------

Thank you to all the contributors that have helped since the beta2 release:

* ADmad
* Alex
* Edgaras Janušauskas
* Ethan Pooley
* Jorge González
* Mark Scherer
* Mark Story
* Val Bancer
* ndm2

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
