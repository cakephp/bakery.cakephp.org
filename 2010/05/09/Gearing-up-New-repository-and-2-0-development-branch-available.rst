Gearing up: New repository and 2.0 development branch available
===============================================================

Since the release of CakePHP 1.3.0[1], the development team has been
working on CakePHP 2.0 as well as the numerous tickets on the 1.2[2]
and 1.3[3] branches. We're pushing a fair amount of effort into
CakePHP 2.0 and making changes that we've been keen to make for some
time (See the 2.0 development roadmap[4]).
Changes to Lighthouse setup include the removal of the old CakePHP 2.x
project, as it has been merged into the old CakePHP 1.x[5] project.
Subsequently, we're renamed the CakePHP 1.x project on Lighthouse to
"CakePHP". This won't impact users that have blogs with links or any
other resources that link to the old name cakephp1x at lighthouse app,
as the awesome guys at entp have anticipated name changes in projects,
and dealt with the urls for us. Links to the previous 2.x lighthouse
project are no longer valid.

In conjunction with the lighthouse app changes, we've merged the
cakephp1x[6] and cakephp2x[7] into a single repository, aptly named
"cakephp"[8]. CakePHP has undergone numerous moves and changes since
we migrated away from Subversion. Each change that we make potentially
impacts thousands of users of the framework, and this change is no
different. However, we have undertaken a synchronisation strategy that
will ensure ongoing support for all those users that are operating on
the current cakephp1x repository. The development team will be
operating and pushing exclusively on the "cakephp" repository.
Automated processes synchronise the existing branches and add new tags
onto the old cakephp1x repository so its constantly maintained up to
date.

New branches as they become available will only be available on the
"cakephp" repository, and we urge developers to switch to this
repository when it its most convenient for them if thye wish to take
advantage of newer code branches.

You can switch your existing clone of the CakePHP repository to the
new github repository with a couple of commands:

::

    git remote rename origin old-origin
    git remote add origin git://github.com/cakephp/cakephp.git

The CakePHP 2.0 development roadmap[9] and the small but expanding
migration guide[10] are available now on Lighthouse. We have a fair
amount of work ahead of us, with numerous changes including: A new
test suite built on PHPUnit, Objectifying Requests, Model and Behavior
overhauls, Removal of all PHP4 hacks, Adoption of SPL and much much
more. If you are interested in developing for the CakePHP project,
we're keen to hear your thoughts and ideas, or see any code
suggestions you have. The Google Group[11] is a great place to start
discussions, as well as RFC tickets[12].

We look forward to this exciting step forward for the CakePHP
framework. You should be excited too!

[1] `http://bakery.cakephp.org/articles/view/announcing-cakephp-1-3-0-stable`_
[2] `http://cakephp.lighthouseapp.com/projects/42648-cakephp-1x/tickets/bins/92789`_
[3] `http://cakephp.lighthouseapp.com/projects/42648-cakephp-1x/tickets/bins/92789`_
[4] `http://cakephp.lighthouseapp.com/projects/42648/2-0-development-roadmap`_
[5] `http://cakephp.lighthouseapp.com/projects/42648-cakephp-1x/overview`_
[6] `http://github.com/cakephp/cakephp1x`_
[7] `http://github.com/cakephp/cakephp2x`_
[8] `http://github.com/cakephp/cakephp`_
[9] `http://cakephp.lighthouseapp.com/projects/42648/2-0-development-roadmap`_
[10] `http://cakephp.lighthouseapp.com/projects/42648/2-0-migration-guide`_
[11] `http://groups.google.com/group/cake-php`_
[12] `http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/bins/90067`_

.. _http://github.com/cakephp/cakephp2x: http://github.com/cakephp/cakephp2x
.. _http://cakephp.lighthouseapp.com/projects/42648/2-0-development-roadmap: http://cakephp.lighthouseapp.com/projects/42648/2-0-development-roadmap
.. _http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/bins/90067: http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/bins/90067
.. _http://github.com/cakephp/cakephp1x: http://github.com/cakephp/cakephp1x
.. _http://cakephp.lighthouseapp.com/projects/42648/2-0-migration-guide: http://cakephp.lighthouseapp.com/projects/42648/2-0-migration-guide
.. _http://bakery.cakephp.org/articles/view/announcing-cakephp-1-3-0-stable: http://bakery.cakephp.org/articles/view/announcing-cakephp-1-3-0-stable
.. _http://cakephp.lighthouseapp.com/projects/42648-cakephp-1x/tickets/bins/92789: http://cakephp.lighthouseapp.com/projects/42648-cakephp-1x/tickets/bins/92789
.. _http://cakephp.lighthouseapp.com/projects/42648-cakephp-1x/overview: http://cakephp.lighthouseapp.com/projects/42648-cakephp-1x/overview
.. _http://groups.google.com/group/cake-php: http://groups.google.com/group/cake-php
.. _http://github.com/cakephp/cakephp: http://github.com/cakephp/cakephp

.. author:: predominant
.. categories:: news
.. tags:: News

