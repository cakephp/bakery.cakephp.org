CakePHP 4.4.18
==============

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.4.18. This is a maintenance release for the 4.4 branch that fixes several
community reported issues and a minor security related fix.

Bugfixes
--------

You can expect the following changes in 4.4.18. See the `changelog
<https://github.com/cakephp/cakephp/compare/4.4.17...4.4.18>`_ for every commit.

* ``RedirectException`` now forwards headers to redirect responses.
* Allow ``ConsoleOutput`` to accept stream resources. This solves 'too many
  streams open' problems when application code creates many instances of
  ``ConsoleIo``.
* Fixed potential email address manipulation if unvalided address data was set
  into ``Cake\Mailer\Message``. Thank you to Waldemar Bartikowski who reported
  the issue via our security mailing list.
* Fixed ``Cake\Http\Client`` cookie parsing with invalid values that lack both
  a value and ``=`` delimiter.

Contributors to 4.4.18
----------------------

Thank you to all the contributors that helped make this release happen:

* Brian French
* Mark Story
* andrii-pukhalevych
* othercorey
* Waldemar Bartikowski

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
