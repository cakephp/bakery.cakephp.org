CakePHP 5.0.0-RC2 Released
============================

The CakePHP core team is happy to announce the second release candidate for
CakePHP 5.0.0. Since the RC1 release the core team has continued to improve
deprecations, add a few small features, and improved naming. Some of the
highlights of this work include:

* Simplified Paginator and made ``hasNextPage`` more consistent.
* Skip SMTP authentication if no credentials are provided.
* Improved error page frame rendering.
* Added the ``Command.beforeExecute`` and ``Command.afterExecute`` events to
  ``Command``.
* Allowed applications to override default console logging easier.
* Internal event handlers now use ``setResult`` instead of ``return``. We
  recommend this usage in the future.
* Added ``cake.database.queries`` and ``cake.mailer``.


What's new in 5.0
-----------------

The `migration guide
<https://book.cakephp.org/5/en/appendices/5-0-migration-guide.html>`_ has
a complete list of what's new in 5.0.0. We recommend you give that page a read
when upgrading as it notes the various breaking changes present in 5.0.

How you Can Help
----------------

You can help deliver 5.0 by contributing in one of many ways:

#. Check the `documentation <https://book.cakephp.org/5.0/en/>`_ for mistakes,
   outdated, unclear or broken examples. We've been trying to update the
   documentation as we go, but there are likely examples or sections we've
   missed.
#. Try it out! Give CakePHP 5.0 a test drive in a non-production application.
   We'd love to hear how converting a small application went and what was harder
   than it should have been.
#. File issues for regressions in existing features, or suggest new features.
   Even if those features don't make it into 5.0, we would appreciate community
   input on what should be part of 5.1 and 5.2

Contributors to 5.0.0-RC2
-------------------------

Thank you to all the contributors that have helped since the RC1 release:

* ADmad
* Corey Taylor
* DeSerFix-bot
* Jozef Grencik
* Kevin Pfeifer
* Mark Story
* othercorey

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
