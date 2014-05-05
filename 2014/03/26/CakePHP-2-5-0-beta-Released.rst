CakePHP 2.5.0-beta Released
===========================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.0-beta.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.5.0-beta[1]. This is the first beta release for the 2.5
branch. The 2.5.0-beta release contains several new features that
improve CakePHP's performance, security and ease of use. When done,
this new version will replace the 2.4.x branch. A migration guide is
provided in the book [2] and we encourage you to read it if you are
upgrading from an older version.


New features
~~~~~~~~~~~~

While the migration guide[2] contains all the changes in 2.5.0, here
are a few we are excited about.


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

The API docs[3] and cookbook have been updated to reflect the changes
and updates for 2.5.0.

The CakePHP core team would also like to welcome Brian Crowe (bcrowe)
to the team. Brian has been actively improving the cookbook, API docs
and code during the development of 2.5, and 3.0.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework.


Links
~~~~~

+ [1] `https://github.com/cakephp/cakephp/releases/2.5.0-beta`_
+ [2] `http://book.cakephp.org/2.0/en/appendices/2-5-migration-guide.html`_
+ [3] `http://api.cakephp.org/2.5`_




.. _http://api.cakephp.org/2.5: http://api.cakephp.org/2.5
.. _https://github.com/cakephp/cakephp/releases/2.5.0-beta: https://github.com/cakephp/cakephp/releases/2.5.0-beta
.. _http://book.cakephp.org/2.0/en/appendices/2-5-migration-guide.html: http://book.cakephp.org/2.0/en/appendices/2-5-migration-guide.html

.. author:: markstory
.. categories:: news
.. tags:: CakePHP,news,News

