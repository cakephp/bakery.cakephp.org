CakePHP 4.0.0-alpha2 Released
=============================

The CakePHP core team is proud to announce the second alpha release of CakePHP
4.0.0. Since the previous alpha we've been hard at work finishing off the
improvements to typehinting and decreasing the number of skipped warnings from
both `psalm <https://getpsalm.org>`__ and `phpstan
<https://github.com/phpstan/phpstan>`__. This may result in some breaking
changes in your application or plugins, but in the long term we feel these
changes will make CakePHP better.

The application skeleton and bake have been refreshed with a new coat of paint.
We've opted to not continue using foundation for the basic CSS, and adopted
`miligram <https://milligram.io/>`__ instead. The smaller footprint of miligram
makes it easier for you to remove or extend if you'd prefer.

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
   but may have not caught everthing.
#. Try it out! Give CakePHP 4.0 a test drive in a non-production application.
   We'd love to hear how converting a small application went and what was harder
   than it should have been.
#. File issues for regreessions in existing features, or suggest new features.
   While we're not likely to greatly expand the scope of 4.0, we would like
   input on what should be a part of 4.1 and 4.2.
#. Let us know about unclear error messages or silent failures in CakePHP.


Contributors to 4.0.0-alpha2
----------------------------

Thank you to all the contributors that have helped since the alpha1 release:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Ian den Hartog
* Jeremy Harris
* José Lorenzo Rodríguez
* Marc Wilhelm
* Marc Würth
* Mark Scherer
* Mark Story
* Michael Hoffmann
* Robert Pustułka
* TekkCraft
* andrii-pukhalevych
* mirko-pagliai
* saeideng
* stickler-ci
* 時流

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
