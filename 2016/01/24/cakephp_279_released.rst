CakePHP 2.7.9 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.7.9. This is a maintenance release for the 2.7 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.7.9. See the `changelog
<http://cakephp.org/changelogs/2.7.9>`_ for every commit.

* ``file://`` paths are now handled correctly by ``File`` on windows.
  (@markstory)
* PaginatorHelper::numbers() now treats string integers as strings in the
  first/last option. This allows the use of page numbers in the first/last buttons.
  (@markstory)
* XmlView now works when ``return => domdocument`` is used. (@markstory)
* Memcached can now connect to unix domain sockets. (@tersmitten)
* Simulated GET requests (via method overriding) no longer POST data populated.
  This prevents GET requests from looking like they are POST requests that may
  cause unintentional side-effects. (@lorenzo)
* ``SecurityComponent`` now validates data whenever ``$request->data`` is
  populated.  This allows SecurityComponent to apply to PATCH and DELETE
  requests.  (@markstory, @chinpei215)
* ``Shell::CODE_ERROR`` was backported from 3.x. This constant serves as
  a default value for the exit code in shell tasks. (@dereuromark)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
