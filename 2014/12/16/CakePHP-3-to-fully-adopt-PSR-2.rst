CakePHP 3 to fully adopt PSR-2
==============================

As of version 3, the framework will fully adopt PSR-2 as a PHP
community standard

As many in the community know, since the very beginning CakePHP has
maintained and adhered to its own `coding standard`_. Since the
creation of `CakePHP`_ however, other coding standards have arisen
with wider adoption among the PHP community as a whole. To increase
consistency with other PHP projects, the core team has decided to
fully adopt `PSR-2`_, starting with the release of 3.0.0.

This was not a light decision, and involved much internal debate
within the team; we're all individuals with our own personal
preferences, but collectively we agree that the benefits of adopting
PSR-2 outweigh our personal editor preferences. We already have an A+
rating for our existing `coding conventions`_, of which 99% conform to
the same as other major PHP projects.

Why change this now?
--------------------

As noted a few months ago, an `RFC`_ was suggested to bring the
framework more inline with common practices, accepted as a general
consensus by the global PHP community. This spurned a long debate over
the standards used and why, and who prefers what and when. From this
discussion, and seeing the varied points of view, we decided to hold a
core vote on whether to fully adopt PSR-2 as a standard, and therefore
end our history of partial adoption.

Of course, this change does NOT mean that you *have* to write your
application following the PSR-2 standard. You can in fact choose any
coding standard or conventions which align with your style and
approach as a programmer. There are even some variations of the PSR-2
standard, if you prefer. This change is mostly oriented towards the
coding style of the framework's core and extended code base, and if
desirable, that of community plugins as well.

What are the benefits?
----------------------

By adopting PSR-2 we can remove or reduce the code we maintain related
to enforcing coding standards - as there are common tools, used by the
rest of the community, to validate and revise CS issues, without
requiring exceptions.

For new users coming to CakePHP, they will have the warm fuzzy feeling
of seeing code formatted in a way they are familiar with.

It also allows any effort exerted to discussing why we maintain our
own coding standard, which differs from PSR-2, to instead be dedicated
to fixing bugs or adding functionality to CakePHP. And, if you're a
developer who uses various frameworks, you'll no longer have to handle
these in your IDE or deployment system to contemplate the edge cases
CakePHP introduced.

Our decision to make this announcement now, and separately from a
release, is to prepare the community for this change to come, and
allow us to advance the process of adapting our existing code bases
where necessary.


.. _PSR-2: https://www.php-fig.org/psr/psr-2
.. _RFC: https://github.com/cakephp/cakephp/issues/4499
.. _coding standard: https://github.com/cakephp/cakephp-codesniffer
.. _CakePHP: https://cakephp.org
.. _coding conventions: https://squizlabs.github.io/PHP_CodeSniffer/analysis/cakephp/cakephp/

.. author:: jameswatts
.. categories:: news
.. tags:: release,CakePHP,News
