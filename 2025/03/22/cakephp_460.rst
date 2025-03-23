CakePHP 4.6.0 Released
=========================

The CakePHP core team is pleased to announce the release of CakePHP 4.6.0. The
4.6 release includes features backported from 5.1 and the upcoming 5.2 releases.
4.6.0 is a smaller release, as the core team's focus is on 5.x now. 4.x feature
releases are now driven by primarily by community involvement.
what is new in 4.6 include:

What's new in 4.6.0?
--------------------

The `migration guide
<https://book.cakephp.org/4/en/appendices/4-6-migration-guide.html>`_ has
a complete list of what's new in 4.6.0. We recommend you give that page a read
when upgrading. A summary of what's new is:

- ``RedisEngine`` now supports a ``tls`` option for connecting to redis via
  a TLS connection.
-  ``Number::formatter()`` and ``currency()`` now support a ``roundingMode``
  option to control how rounding is handled.
- Optional ``Command`` arguments can now have a ``default`` value.

Upgrading to 4.6.0
------------------

You can use composer to upgrade to CakePHP 4.6.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:4.6.*"

Contributors to 4.6.0
---------------------

Thank you to all the contributors that helped make 4.5 happen:

* Adam Halfar
* ADmad
* Chris Nizzardini
* Fernando Herrero
* Frank de Graaf (Phally)
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* othercorey

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 4.6.0 would not
have been possible without the community contributions.

What's Next
-----------

Feature and bugfix releases for 4.x will continue until September 2025. Security
fixes will continue for 4.x until September 2026.

The core team's focus is on 5.2 and 6.0. The 5.2.0 release is coming up quickly.
Early work has started on the ``6.x`` branch. This branch will become 6.0.0. If
you're interested in what has been completed so far, or want to know what is
being discussed currently, see the `6.0 milestone in GitHub
<https://github.com/cakephp/cakephp/milestone/305>`__

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
