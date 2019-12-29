CakePHP 3.8.8 Released
===============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.8. This is a maintenance release for the 3.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 3.8.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.8.7...3.8.8>`_ for every commit.

* Improved API documentation.
* ``Text::slug()`` can now preserve spaces.
* ``FunctionsBuilder::datePart()`` now passes on its type parameters.
* A potential session fixation issue was fixed. To be vulnerable your
  application must also have a cross-site-scripting vulnerability or have strict
  sessions disabled.
* SQLServerSchema dialect now handles the ``restrict`` mode of foreign keys
  correctly.
* Matching routes with integer values is now more typesound.
* Shims were added to ``TestCase`` to enable ``getMock()`` and
  ``getMockBuilder()`` to not emit deprecations in PHP7.4
* A regression in how ``FormHelper::dateTime()`` handles empty values was fixed.
* When generating URLs, routes with ``controller`` and ``action`` placeholders
  no longer strip these these keys when they are undefined. Instead routes missing
  the controller and action keys will fail to match.
* Optional routing placeholders now work consistently for both braced
  placeholders and colon placeholders.

Contributors to 3.8.8
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Corey Taylor
* Edgaras Janušauskas
* Jeremy Harris
* Marc Würth
* Mark Scherer
* Mark Story
* o0h

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
