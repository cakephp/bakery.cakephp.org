CakePHP 2.9.0-RC1 Released
==========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.9.0-RC1. This release is the first release candidate for the 2.9 branch which
adds several new features to the 2.x series. We would appreciate any feedback
you might have on the new features before their API definitions become stable.

Deprecations
------------

* The ``Object`` class has been deprecated due to upcoming PHP7 collisions. It
  has been renamed to ``CakeObject`` to avoid collisions with new PHP reserved
  words.

New Features
------------

* ``AuthComponent::user()`` now makes the user data available when using
  stateless authentication adapters.
* ``DboSource::flushQueryCache()`` was added to allow more fine-grained control
  of query result caching when enabled.
* The log messages created by ``ErrorHandler`` can now be more easily customized
  in subclasses.
* Additional mime-types for 'jsonapi', and 'psd' were added.
* Time & Datetime inputs no longer set a ``maxlength`` attribute when rendered
  as 'text' input types.

Contributors to 2.9.0-RC1
-------------------------

Thank you to all the contributors that helped make this release happen:

* Gareth Ellis
* Jorge González
* José Lorenzo Rodríguez
* Kenya Yamaguchi
* Marc Würth
* Mark Story
* Mark van Driel
* Sebastien Barre
* chinpei215
* mark_story
* mscherer
* ndm2
* nojimage
* schrolli

As always, we would like to thank all the contributors that opened issues,
opened pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
