CakePHP 2.9.6 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP 2.9.6. This is a maintenance release for the 2.9 branch that fixes several community reported issues.

Bugfixes
--------

You can expect the following changes in 2.9.6. See the `changelog <https://github.com/cakephp/cakephp/compare/2.9.5...2.9.6>`_ for every commit.

* Improved API documentation.
* Added ``Validation::minLengthByte()`` and ``Validation::maxLengthBytes()``
* Allow ``false``/``true`` to be read as keys in ``Hash::get()``.
* Exit early when SMTP connections are disconnected on the remote side. This prevents
  the SmtpTransport from waiting until the read timeout is reached.
* Fix FormHelper to work better with numeric optgroup labels.

Contributors to 2.9.6
---------------------

Thank you to all the contributors that helped make this release happen:

* José Lorenzo Rodríguez
* Livia Scapin
* Mark Sch
* Mark Story
* Mischa ter Smitten
* Mponos George
* chinpei215
* kanonji

As always, we would like to thank all the contributors that opened issues, created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
