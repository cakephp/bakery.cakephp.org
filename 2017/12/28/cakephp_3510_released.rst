CakePHP 3.5.10 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.10. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.10. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.9...3.5.10>`_ for every commit.

* Fixed a regression in 3.5.9 where PHPUnit compatibility aliases caused errors
  in PHP 5.6.
* ``Text::truncate()`` no longer counts the contents of ``<script>`` and
  ``<style>`` tags towards the truncated length.
* Non-interactive shell commands no longer default to overwriting files if they
  exist.

Contributors to 3.5.10
----------------------

Thank you to all the contributors that helped make this release happen:

* LifeOrYou
* Mark Scherer
* Mark Story
* nojimage

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
