CakeResque, resque queue systeme for cakephp
============================================

CakeResque is a redis-backed queue systeme based on Resque. It allows
you to send some tasks in the background, and execute them later

CakeResque is a redis-backed queue systeme based on Resque. It allows
you to send some tasks in the background, and execute them later.

By deferring some unessential tasks, we can concentrate on the most
important part of a workflow, and deliver a faster response to the
end-user.

Example : For a site with social feature, like activity feed, and
friends. When adding a comment, the user shouldn't have to wait for
the system * to send an email to all the subscribed user, * to add the
user activity in its activity feed, * and to notify all his friends of
his comment.

These tasks are not essential, and we want to tell the user as fast as
possible if his comments has been submitted.

When adding the comment, instead of executing these tasks, we will
push them in queue, and another process will pop that queue
periodically to execute them.

Such a system need a very fast queue, thus `redis`_. Its an in-memory
database, and use very primitive structure such as set, linked list,
hashed list to store data, allowing it to be very fast. Poping or
Pushing a list takes O(1) time.

`Resque`_ is written, and used by Github to manage their background
jobs. It's written in ruby, but there's a port to PHP.

CakeResque let you have your own queue system in cakephp.

You should first `install redis`_, then install `CakeResque`_

Then, you use the console shell to start a worker cake Resque.resque
start

Use `-h` to get some help. There's a lot of options, and you can start
as many workers as you want.

A job is just a shell. Create a shell MyFirstJobShell in
app/Console/Command

::

    class MyFirstJobShell extends Shell
    {
        public function perform()
        {
            $this->initialize();
            // Put your code here
        }
    }

You can of course run that shell in your console. The workers will
search through all your shell class for the `perform()` method to
decide if this class can be run as a job or not.

Queuing a job is simple, just use Resque::enqueue('default',
'MyFirstJobShell', array('someargs'));

The worker will then try to instantiate the MyFirstJobShell class, and
execute the `perform()` methods. The array('somearg') is available
inside `perform()` via `$this->args`.

Since redis can be shard, you can have the workers only on some server
dedicated to processing background jobs.

More detailed tutorial at `the official documentation`_


.. _Resque: https://github.com/blog/542-introducing-resque
.. _redis: http://redis.io
.. _the official documentation: http://blog.kamisama.me/2011/11/07/cake-resque-a-cakephp-plugin-to-manage-queue-system/
.. _CakeResque: https://github.com/kamisama/Cake-Resqu
.. _install redis: http://redis.io/download

.. author:: kamisama
.. categories:: articles, plugins
.. tags:: plugin,redis,queue system,Plugins

