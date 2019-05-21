CakePHP 3.8.0-RC1 Released
==========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.8.0-RC1. This is the release candidate for 3.8.0, and it contains several
new major features. If no major issues are reported a stable release will be
packaged in a few weeks.

3.8 is the **last** planned minor release of CakePHP 3.x before 4.0 is released.
Once 4.0 is released, 2.x will only receive security fixes, and 3.x will only
continue to receive bug & security fix releases. If there is significant
community interest there may be a 3.9 release, but there are no plans at this
point in time.

Updating to the RC
------------------

You can use composer to upgrade to the beta version of CakePHP 3.8.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:3.8.0-RC1"

We would greatly appreciate it if you temporarily upgraded your application, and
ran your tests. By opening issues for any regressions in the release candidate,
we can help ensure a smoother release of 3.8.0 before the stable release.

What's new in 3.8.0?
--------------------

The `migration guide
<https://book.cakephp.org/3.next/en/appendices/3-8-migration-guide.html>`_ has
a complete list of what's new in 3.8.0, and what has been deprecated. We
recommend you give that page a read when upgrading.

Changes since 3.8.0-beta1
-------------------------

* ``CollectionTrait`` now uses the ``newCollection()`` method to create new
  instances. This allows implementing classes to ensure that instances of the
  current class are created when new collections are required.
* ``ModelAwareTrait::loadModel()`` now allows fully qualified namespaces as
  a parameter.
* The console table helper now correctly calculates the width of formatted
  cells.
* Improved API doc blocks.
* Commands will now auto-load the model named in their ``modelClass`` property.
* Bundled CA certs were updated to 2019-01-23 release from curl.
* Add ``getName()`` to View. This method was suggested in a deprecation warning
  but did not exist.
* ``Cake\Http\Response::withModified()`` is now compatible with
  ``DateTimeImmutable`` objects.
* Improved API documentation.
* Fixed accidental return type change in ``Cache::deleteMany()``.
* FileEngine no longer emits warnings when cache files are written to during
  shutdown when the previous write is for the same key.
* ``CommandRunner`` now gracefully handles ``StopException`` now.
* Fixed side-effect in ``SmtpTransport`` destructor.
* Requirements for the cache package were fixed.
* Don't emit a charset parameter on the json content type. Chrome has
  started emitting warnings when this parameter is present as it isn't
  compliant with the spec.
* Add ``Command::executeCommand()`` This method enables commands to dispatch
  each other without needing to use the CommandRunner.
* Add ``Response::withCookieCollection()``.
* Generate column SQL for ``CHAR(36)`` in postgres schema correctly.


Contributors to 3.8.0-RC1
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras Janušauskas
* Jeremy Harris
* José Lorenzo Rodríguez
* Kyle Burton
* Marc Wilhelm
* Marc Würth
* Mark Scherer
* Mark Story
* Simone Alers
* TekkCraft
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
