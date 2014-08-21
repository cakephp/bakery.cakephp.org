CakePHP 2.5.0 Released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.0.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.0. There have been a few changes to 2.5.0 since the RC2
release:

+ FormHelper::postLink() fixes from 2.4.9 have been merged in.
+ Numerous API documentation improvements.
+ TextHelper::tail() was fixed.
+ SQLServer::describe() was failing no longer fails when used with
  fixtures.
+ Authentication adapters can be aliased allowing you to use the same
  adapter multiple times with different password hashing strategies.
+ The redis cache engine now supports `unix_socket`.
+ PaginatorComponent will no longer do a find('count') for the first
  page when there are fewer records than the current page limit.

You can view the detailed `changelogs`_ as well.


New feature highlights
~~~~~~~~~~~~~~~~~~~~~~


Cache::remember()
`````````````````

This method allows you to implement read-through cache operations. For
the passed cached key, it will first look for any cached data that is
still valid. If not found, a callback method will be executed and its
return value stored under the cache key.

You will find this useful for reducing the amount of repetitive code
around checking for cache misses.


Improved Memcached support
``````````````````````````

A new Cache engine has been added to provide support for the php
extension ext/memcached, which is the faster and better supported
extension for utilizing this popular key-value database. In
introducing this new adapter, we have deprecated the old Memcache
engine and plan for its removal in 3.0.


CompletionShell
```````````````

For shell environments that support command completion such as bash
and zsh, we have provided a cake shell that will help you get command
and options completion for your cake shells by hitting the tab key. If
you have ever wondered what shells are available, or what options they
can take, this might be for you. Make sure to check the documentation
for more information on how to set this up.


Security::encrypt() and AES encrypted cookies
`````````````````````````````````````````````

If for any reason you are storing data in cookies that should not be
changed by the user, you can now use AES encrypted cookies. This
utilizes the new AES-256 encryption offered by the Security class to
prevent various classes of attacks, such as cookie tampering.


Consistent priorities in global and local events
````````````````````````````````````````````````

One limitation in previous CakePHP versions was that listeners
attached to the global EventManager would always be called before any
other local listeners, despite the priorities. CakePHP 2.5 unifies the
priority queue between global and local event listeners. With a single
unified set of priorities, you can implement more complex and complete
aspect oriented programs.

CakePHP 2.5.0 is now marked as stable. 2.5.x is an API compatible
upgrade for the 2.x release series. Make sure you read the `migration
guide`_ as there are a few deprecations you may want to account for.
Development has already started on 2.6.0, which will be another API
compatible release for the 2.x release series.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. As an entirely community powered project
CakePHP relies on your contributions to continue.



.. _changelogs: http://cakephp.org/changelogs/2.5.0
.. _migration guide: http://book.cakephp.org/2.0/en/appendices/2-5-migration-guide.html

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

