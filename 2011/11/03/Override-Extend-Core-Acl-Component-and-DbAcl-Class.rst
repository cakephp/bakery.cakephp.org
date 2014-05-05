Override/Extend Core Acl Component and DbAcl Class
==================================================

I recently needed to override a core Acl function (in Cake 1.2)
because I added custom audit fields into the aros_acos table, which
broke the Acl component. Searching around I found a few articles
giving advice on how to override core Cake functions so I pieced them
together to come up with a solution. Knowing how little documentation
there is on the inner working of the Acl component, I'm sharing this
experience with you. Hopefully someone will find this useful.

THE PROBLEM

While developing my application I decided to add some custom fields to
my aros_acos permissions table. The extra fields were needed to
provide an audit trail and also were needed by a custom function that
automatically rebuilds the aros, acos and aros_acos tables while
preserving existing permissions. This allowed me to continue to
develop the application after it had been published and used
regularly.

The resulting aros_acos table is as follows:

CREATE TABLE IF NOT EXISTS `aros_acos` ( `id` int(10) unsigned NOT
NULL AUTO_INCREMENT, `aro_id` int(10) unsigned DEFAULT NULL, `aco_id`
int(10) unsigned DEFAULT NULL, `_create` char(2) DEFAULT '0', `_read`
char(2) DEFAULT '0', `_update` char(2) DEFAULT '0', `_delete` char(2)
DEFAULT '0', `updated` tinyint(4) DEFAULT '0', `created` datetime
DEFAULT NULL, `modified` datetime DEFAULT NULL, `users_id` int(3)
unsigned zerofill DEFAULT NULL, PRIMARY KEY ( `id`), KEY `users_id` (
`users_id`) )

The extra fields are updated, created, modified and users_id.

Unfortunately, this broke 2 parts of the Acl component, when set in
‘actions’ mode. Firstly, permissions wouldn’t save properly and
secondly, permissions checking was also broken. This meant that new
permissions couldn’t be saved with the front-end I had built, or using
the Acl component. And more importantly, users were refused access to
all controllers.

THE CAUSE

I tracked down the problem to one method, _getAcoKeys, which is part
of the DbAcl class. The Acl component uses this method to filter an
array of the fields in the aros_acos table. ‘id’, ‘aro_id’ and
‘aco_id’ are filtered, leaving the possible actions that an Aro can
carry out on a specific Aco (normally _create, _read, _update,
_delete). For example, the check() methods of the DbAcl class and Acl
component call _getAcoKeys when checking permissions. The problem in
my app was that the Acl component was treating my extra fields as
action fields and not removing them from the array, resulting in the
problems.

SOLUTION 1

Knowing the problem, I then knew that all I needed to do was change
that one method so it would remove my custom fields from the array. I
tested this by hacking the core file and it worked fine. Obviously
though, hacking the core is never a suitable solution. So what I
needed to do is to override the method so the Acl component used my
custom method every time instead of the core method. I found this
great article on how to override core components:

`http://cakebaker.42dh.com/2009/09/08/extending-cakephps-core-components/`_

However, this didn’t work. I could override the Acl component ok using
David Cournoyer’s tip but I was still getting my custom fields in the
array when the Acl component was checking permissions, resulting in
denied access to all controller actions. Obviously the Acl component
wasn’t using my custom method when checking the permissions. I didn’t
check whether this initial solution had fixed the other problem I was
having with saving permissions, so it may or may not have done so.

I had a closer look into how the Acl component works and found out
that when the Acl component initialises, it reads which class it
should use to check and edit permissions from the core configuration,
which is edited in the application core.php file at this line:

Configure::write('Acl.classname', 'db_acl');

I already knew this from reading the api:

`http://api.cakephp.org/class/acl-component`_

So I assume that for some reason the Acl component was reloading the
original method contained in the DbAcl class and using that instead of
my custom method that should have been overriding the original. I
didn’t check whether this was definitely the case. Instead I came up
with another solution.

SOLUTION 2

I decided that what I needed to do was to create my own DbAcl class
with an overridden _getAcoKeys method, then change the core
configuration key 'Acl.classname' to use this method. That way, the
Acl component would load my class every time it initialised.

So here’s my code.

I added this to my app_controller.php, BEFORE the AppController class
definition:

App::import('Vendor', 'AppAcl');

I call both Acl and Auth components in my app_controller, as normal:

var $components = array('Session', 'Acl', 'Auth', 'RequestHandler',
'Medman', 'Entity');

Here’s my custom class:

app/vendors/app_acl.php<?php App::import('Component','Acl');

class AppDbAcl extends DbAcl {

::

    function _getAcoKeys($keys) {
            $newKeys = array();
            $keys = array_keys($keys);

            $standardKeys = array('id', 'aro_id', 'aco_id');

// specify custom keys $customKeys = array('updated', 'created',
'modified', 'users_id');

::

    // merge custom keys with keys that are removed by the original method
            $skipKeys = array_merge($standardKeys, $customKeys);

        // remove keys
            foreach ($keys as $key) {
                if (!in_array($key, $skipKeys)) {
                        $newKeys[] = $key;
                }
            }

            return $newKeys;
    }

}

And finally the line in app/config/core.php to tell the Acl component
to use my class:

Configure::write('Acl.classname', 'app_db_acl');

That’s all there is to it. In the end a simple solution, but it took
me days to figure it out. Hopefully this will save someone else the
trouble.


.. _http://api.cakephp.org/class/acl-component: http://api.cakephp.org/class/acl-component
.. _http://cakebaker.42dh.com/2009/09/08/extending-cakephps-core-components/: http://cakebaker.42dh.com/2009/09/08/extending-cakephps-core-components/

.. author:: cakemonster
.. categories:: articles, snippets
.. tags:: acl,1.2,extend,core,override,DbAcl,Snippets

