CakePHP 2.5.9, 2.6.11 & 2.7.2 Released
======================================

The CakePHP core team is ready to announce the immediate availability of CakePHP
2.5.9, 2.6.11, and 2.7.2. These releases contain important security updates for
applications using prefix routing.

Security Issues
---------------

There are two issues that can impact the security of a CakePHP application:

* Unconventional URL paths would allow direct access to prefixed actions without
  setting the correct request parameters. If your authorization depends on the
  presence of the ``prefix`` routing key you should upgrade as soon as possible.
* ``Validation::compare()`` and ``Validation::range()`` would allow specifically
  crafted data past certain criteria.

We'd like to thank 'Kurita Takashi' for contacting us through our `security issue
<http://book.cakephp.org/3.0/en/contributing/tickets.html#reporting-security-issues>`_
process about the CsrfComponent issue. We recommend that all users of CakePHP
upgrade to one of these releases as soon as possible. CakePHP 3.x is unaffected
by the prefix routing issue.

Other Issues Fixed in 2.7.2
---------------------------

* Uses of self were replaced with static to improve ability to subclass core
  classes.
* ``HttpSocket`` now allows ``SNI_enabled`` to be disabled.
* ``HttpSocket`` will continue to read data if it encounters a standalone '0'.
* ``ObjectCollection`` classes now consistently handle plugin prefixes in
  ``attached()``, ``unload()``, and ``disable()``.
* Configure now bootstraps after the multibyte shims have been loaded. This
  solves dependency issue in environments without mbstring.
* Translation context is now correctly parsed out of mo files.
* EmailComponent no longer fatally errors when sending messages with a null
  subject.

For a deeper insight of what changed, have a look at the
`release notes <http://cakephp.org/changelogs/2.7.2>`_.

.. author:: markstory
.. categories:: security, release, news
.. tags:: security, release, news
