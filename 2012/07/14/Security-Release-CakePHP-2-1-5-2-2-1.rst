Security Release - CakePHP 2.1.5 & 2.2.1
========================================

CakePHP 2.1.5 and 2.2.1 have just been released. If you are using
CakePHP's `Xml` class, you should upgrade as soon as possible.

The security issue was recently reported by `Paweł Wyleciał`_. When
accepting user provided XML it is possible to read arbitrary files
using external entities. This is particularily dangerous for
applications accepting XML data as part of a webservice. A possible
exploit example would be:

curl -X POST -H 'Content-Type: application/xml' locahost/posts -d
'<!DOCTYPE cakephp [<!ENTITY payload SYSTEM "file:///etc/passwd"
>]><Post><body>&payload;</body></Post>]'

Once the XML has been processed `$this->request->data['Post']['body']`
will contain the contents of `/etc/passwd`. This issue was fixed
and packaged releases for 2.1 and 2.2 have been created. This issue
does not affect the 1.3 or 1.2 release series. If you are unable to
upgrade, you should apply the `patch`_ as soon as possible. This issue
has been assigned CVE-2012-4399 and OSVDB-84042.


Other fixes in 2.2.1
~~~~~~~~~~~~~~~~~~~~

In addition to the security fix 2.2.1 contains fixes for the following
issues:

+ Fixed missing urlencode on nested named parameters.
+ Fixed ANSI codes being output on windows terminals.
+ Fixed HtmlHelper::image() including the base directory twice when
  the fullBase option is used.
+ Console logging now respects the quiet flag for shells.
+ TranslateBehavior now saves records with only some translated fields
  correctly.
+ afterValidate() was made available on behaviors. This was an
  omission in 2.2.0.

View the complete changelog for 2.2.1 and 2.1.5. Download a packaged
release.

CakeFest 2012 is around the corner and we already expect awesome talks
and workshops during the best PHP conference out there. If you haven't
booked `your tickets`_ yet, it's about time you do.

As always, thanks to the friendly CakePHP community for the patches,
documentation changes and new tickets. Without you there would be no
CakePHP!


Links
~~~~~

[1] `http://cakephp.org/changelogs/2.2.1`_

[2] `http://cakephp.org/changelogs/2.1.5`_

[3] `http://github.com/cakephp/cakephp/tags`_

[4] `http://cakefest.org`_



.. _http://cakephp.org/changelogs/2.1.5: http://cakephp.org/changelogs/2.1.5
.. _Paweł Wyleciał: http://h0wl.pl
.. _your tickets: http://cakefest.org/ticket-info
.. _http://cakefest.org: http://cakefest.org
.. _http://cakephp.org/changelogs/2.2.1: http://cakephp.org/changelogs/2.2.1
.. _patch: http://github.com/cakephp/cakephp/commit/6c905411bac66caad5e220a70e3d561b8a648507
.. _http://github.com/cakephp/cakephp/tags: http://github.com/cakephp/cakephp/tags

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

