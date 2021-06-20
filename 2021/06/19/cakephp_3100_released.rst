CakePHP 3.10.0 Released
=======================

The CakePHP core team is happy to announce the availability of CakePHP
3.10.0. This is release is a backwards compatible upgrade for 3.x and adds
several new features and backports from the 4.x branch. These backports aim to
ease the upgrade path from 3.x to 4.x.

Extending the 3.x Timeline
--------------------------

Previously 3.9 was the last planned feature release for 3.x and bug fix releases
were planned to stop after *June 15 2021*. Because of continued interest and
usage of 3.x we've decided to extend the 3.x maintenance timeline and release
3.10. The new timelines are:

* 3.10 will continue to receive bug fixes until December 15 2021.
* 3.10 will continue to receive security fixes until December 15 of 2022.

Updating to the RC
------------------

You can use composer to upgrade to the beta version of CakePHP 3.10.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:^3.10.0"

What's new in 3.10.0?
---------------------

The shortlist of features included in 3.10 is as follows:

* Improved API documentation.
* Backported improvements to ``Validation::time()`` from 4.x.
* ``EmailTrait::assertMailSentFrom()`` now accepts an array with an address
  & alias.

Contributors to 3.10.0
----------------------

Thank you to all the contributors that helped make this release happen:

* bancer
* David Yell
* gregs
* Jorge
* Mark Story
* ndm2
* othercorey
* tanden
* Tobse

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
