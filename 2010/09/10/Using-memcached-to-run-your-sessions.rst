Using memcached to run your sessions
====================================

This tutorial is intended for cakers who intend to make a scalable web
app. Being familiar with php.ini, memcached and sessions is
recommended.
It's been my experience that disk and memory has always been my
bottleneck when scaling a disk backed db app.

Its easy to fix the memory bottlenecks by adding more memory or making
code improvements that consume less memory per-request. Its not so
easy to cut down on disk I/O - and furthermore in today's shift
towards virtual machines (linode, EC2 etc) - even if you don't realize
it, disk i/o is constrained MUCH more then ever before. Throw a disk
backed DB in there and u get in trouble fast.

So anything that you can do to cut down on I/O is huge (IMO of
course).


Use php optcode cache
~~~~~~~~~~~~~~~~~~~~~
I use `http://eaccelerator.net/`_. there are tons out there, but I use
this one primarily cuz its maintained in the ubuntu server package
repo's. If you use an optcode cache that is not maintained in your
package management repo - every time there is an update to php (or
other dependent libs) you have to recompile. May be better ones out
there, but not worth the hassle for the little (if any) improvement.


Use memcached wherever possible
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
If you don't use cake's caching functions - start. When its time to
scale, fronting every database query you can with memcached is very
important. Go turn on caching, and use the memcached one
`http://book.cakephp.org/view/772/Cache-config`_. It is a shame that
view caching cant be backed by memcached (it can in other web
frameworks) - but its still a no-brainer. There is a reason that
facebook is the #1 consumer of memcached. Good read if your
interested: `http://www.facebook.com/note.php?note_id=39391378919`_
anyways, I have been unable to find any good docs on there on how to
use cakes Cache class in a real life app. Things can get complex when
you need to maintain a mapping of what cache entries need to be
cleared when stuff in related (or unrelated) models are changed. If
anyone knows of a nice tutorial on this topic please post in the
comments....


Use the memcached session support built into php5
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Ok so you've put up with my babbling - now some real code. Lets dive
right in, then I'll explain. This is your php.ini:

::


    ~$ cat /etc/php5/apache2/php.ini | grep -i session
    [Session]
    ;session.save_handler = files
    session.save_handler = memcache
    session.save_path = "tcp://127.0.0.1:11211"

    ...

I've omitted lots of the php.ini, but the relevant lines are all here.
Super simple, all we are doing here is telling the default php session
handling to be backed by memcached. Comment out the files backed, and
type up the next 2 lines. Slick/easy aint it?

Before doing this there are a few steps you have to setup first:

+ in /config/core.php: set Configure::write('Session.save', 'php');
  This tells cake to let PHP handle sessions.
+ Setup a unique name for Session.cookie in core.php
+ Change the Security.salt to something unique
+ Install memcached. Use your package manager to install it (apt-get
  or whatever your distro's is)
+ Start memcached (sudo /etc/init.d/memcached start). Note: some
  distros make you edit some memcached config file in /etc to tell it to
  allow it to start - not sure why they do it, but they do...
+ Go make the php.ini changes above, then restart apache.



Things to watch out for
~~~~~~~~~~~~~~~~~~~~~~~
You never get something for nothing, so what are the drawbacks with
memcache backed sessions? The two main ones as I see it are:

#. Data persistence. Memcache is an in memory data store; so if your
   server crashes, the memcache daemon crashes or your memcache pool gets
   cleared all your sessions (and session data) is gone. If you are
   writing a webapp that can't afford to have these scenarios happen,
   stick with DB backed sessions. However, the risk of these happening is
   low IMO. Memcache is a proven product, so chances of it crashing are
   similar to another one of your services (like mysqld) crashing. If
   anyone knows of memcache redundancy techniques, please post in the
   comments.
#. Memcache pools filling up. Memcached is a distributed object cache
   - and its fixed in size (configurable, but ultimately bound by the
   memory pool allocated to your cluster of memcached servers). If
   memcached pool gets filled up, new session data may not fit - or
   current data may be bumped out (depending on your config). This is one
   main reason why I leverage php's memcache session settings. This
   allows me to have separate pools for my session and object data.

Thats it. You are really almost getting something for nothing here.
Everything is on memory, not hitting your db and not sucking up
precious I/O. Plus, if you end up scaling, and have a cluster of
machines serving your web app - you can share this session info across
workhorse nodes (memcached lets you pool up memory over boxes that r
networked together). This comes in handy in sharing other cached data
across nodes - again, too bad cake doesn't store view cache to
memcache - otherwise you could really take advantage of it here (think
of trying to run commands on every node to delete view cache files
when something changes - not fun).

I use all these techniques in my startup
(`http://www.leaguelogix.com`_) so they are proven to work in a
production environment.

Hopefully I did not forget anything here - if you run into problems
leave a comment and i'll try to help you out. Good luck.


.. _http://eaccelerator.net/: http://eaccelerator.net/
.. _http://www.leaguelogix.com: http://www.leaguelogix.com/
.. _http://www.facebook.com/note.php?note_id=39391378919: http://www.facebook.com/note.php?note_id=39391378919
.. _http://book.cakephp.org/view/772/Cache-config: http://book.cakephp.org/view/772/Cache-config

.. author:: rynop
.. categories:: articles, tutorials
.. tags:: memcached,cache,performance,scaling,optcode,sessions,Tutorials

