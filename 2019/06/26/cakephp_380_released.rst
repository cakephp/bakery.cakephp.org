CakePHP 3.8.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.0. This is the first stable release of 3.8.0. 3.8.0 provides a number
improvements both large and small to CakePHP.

This release is the *last planned* feature release for 3.x. Going forward the
core team will be focusing on supporting 3.8 and completing 4.0.0. We may do
a 3.9 release, if there is significant community interest once 4.0 has been
released.

Upgrading to 3.8.0
------------------

You can use composer to upgrade to CakePHP 3.8.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.8.*"

Deprecation Warnings
--------------------

3.8.0 adds two new runtime deprecations. The most noticible deprecation will be
in ``Validator``. The parameter order for the new ``allowEmpty*`` methods added in 3.7
has been normalized to match the order used in the ``notEmpty*`` methods. While
annoying we thought it was best to add warnings now and have consistent methods
for 4.0 rather than have to carry deprecation warnings through several 4.x
releases.

Because fixing eprecation warnings in a large application can be
a non-trivial task you will likely want to disable deprecation warnings allowing
you to make incremental progress in fixing them. To disable deprecation warnings
set ``Error.errorLevel`` to ``E_ALL ^ E_USER_DEPRECATED`` in **config/app.php**.

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-8-migration-guide.html#deprecations>`_
has more details on the deprecation in 3.8 and their replacements. Deprecated
features will continue to exist and behave as they always have until 4.0.0

What's new in 3.8.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.0/en/appendices/3-8-migration-guide.html>`_ has
a complete list of what's new in 3.8.0. We recommend you give that page a read
when upgrading. A few highlights from 3.8.0 are:


* ``CollectionTrait`` now uses the ``newCollection`` method to create clones.
  This allows sub-classes to have collection methods create instances of
  themselves instead of using ``Collection``.
* ``Command::executeCommand()`` was added. This method makes it simple to call
  another command from the current one.
* ``Validator::notEmptyString()``, ``notEmptyArray()``,
  ``notEmptyFile()``, ``notEmptyDate()``, ``notEmptyTime()``, and
  ``notEmptyDateTime()`` were added. They act as compliments to the
  ``allowEmpty*`` methods added in 3.7.
* ``Validation::mimeType()`` now compares checks mime-types in a case
  insensitive manner.
* ``Validation::dateTime()`` now supports the ``iso8601`` format.
* Radio buttons can now customize the generated label by using the ``label`` key
  inside a complex option definition. This key will be used instead of the
  ``label`` key defined at the top level options.

Contributors to 3.8.0
---------------------------

Thank you to all the contributors that helped make 3.8 happen:

* ADmad
* Andrej Griniuk
* Cedric Alfonsi
* Edgaras Janušauskas
* Jeremy Harris
* Jorge González
* Lars Ebert
* Marc Würth
* Mark Scherer
* Mark Story
* Nicolas
* Robert Pustułka
* Simone Alers
* andrii-pukhalevych
* chinpei215
* madbbb

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 3.8.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
