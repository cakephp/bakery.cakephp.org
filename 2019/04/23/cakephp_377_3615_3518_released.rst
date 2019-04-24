CakePHP 3.7.7, 3.6.15 and 3.5.18 released
=========================================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.7.7, 3.6.15 and 3.5.18. These releases contain a security related fix for
`CVE-2019-11458
<https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-11458>`__. The
vulnerability affects applications that open serialized content from user input.
When doing so the ``SmtpTransport`` can be used to overwrite any file the
webserver has write access to. We'd like to thank Edgaras Janušauskas for
notifying us of this issue and confirming the fix.

Bugfixes
--------

In addition to the security fix, you can expect the following changes in 3.7.7
See the `changelog
<https://github.com/cakephp/cakephp/compare/3.7.6...3.7.7>`_ for every
commit.

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

Contributors to 3.7.7
---------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Edgaras Janušauskas
* Mark Scherer
* Mark Story
* saeideng

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security
