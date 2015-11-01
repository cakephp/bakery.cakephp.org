CakePHP 1.3.21 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
1.3.21. This is the **final** release for 1.3.x. CakePHP 1.3.0 was released more
than 5 years ago, and since the release of 3.0, has had ever decreasing use.
There will be no future security updates for this release series, and actively
developed applications using 1.3, should consider upgrading to the 2.x release
series to continue receiving bugfixes and security fixes.

Bugfixes
--------

You can expect the following changes in 1.3.21. See the `changelog
<http://cakephp.org/changelogs/1.3.21>`_ for every commit.

* TimeHelper no longer returns 1969 on invalid dates. Instead '' is returned.
* crc32 hash keys used in DboSource have been replaced with md5 sums. This
  reduces the chance of hash collision significantly.
* MIME-Version is set on emails.
* The ``node_modules`` directory is ignored when looking for PHP files.
* View templates can no longer be located outside of the configured view paths.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
