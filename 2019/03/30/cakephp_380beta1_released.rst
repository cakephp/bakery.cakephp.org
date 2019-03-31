CakePHP 3.8.0-beta1 Released
============================

The CakePHP team is happy to announce the release of 3.8.0-beta1. This is
preview release for what will become 3.8.0. The 3.8 release series is
a backwards compatible release with the rest of 3.x, it introduces new features
and one additional deprecation.

In the 3.7.0 release announcement I mentioned that we were not planning on doing
a 3.8 release. Based on your feedback about the new ``allowEmpty`` APIs
introduced in 3.7 we are doing an additional release to add the missing
``notEmpty*`` methods and to correct a parameter ordering mistake in the
``allowEmpty*`` methods.

Updating to the beta
--------------------

You can use composer to upgrade to the beta version of CakePHP 3.8.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.8.0-beta1"

We would greatly appreciate it if you temporarily upgraded your application,
and ran your tests. By opening issues for any regressions in the beta, we can
help ensure a smoother release of 3.8.0 before the stable release.

What's new in 3.8.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-8-migration-guide.html>`_ has
a complete list of what's new in 3.8.0. We recommend you give that page a read
when upgrading.

Contributors to 3.8.0-beta1
---------------------------

Thank you to all the contributors that helped make 3.8 happen:

* ADmad
* Edgaras Janušauskas
* Jeremy Harris
* Jorge González
* Marc Würth
* Mark Scherer
* Mark Story
* Robert Pustułka
* andrii-pukhalevych

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 3.8.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
