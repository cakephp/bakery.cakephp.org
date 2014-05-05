User permissions based on a routing prefix
==========================================

You want to limit users to specific parts of the site, but the using
ACLs seems like overkill. It's pretty simple to limit a few groups to
certain parts of the site based on cake's prefix routing.


Overview
--------
We'll use the Auth component and it's ability to `add extra
authentication checks`_ before allowing entry to a page. This article
assumes that you already have the `Auth component setup`_. We have
three groups of people: public, users, and admins. The public will
have access only to parts of the site that have no `prefix`_, users
will have access to the `user_` `prefix`_ and no `prefix`_, and the
admins will have access to the `admin_` `prefix`_ and no prefix.


Table and core setup
--------------------
We need to add a 'role' field to our users table. I chose to use an
enum field (even though cake doesn't officially support them, call me
old school.) Our possible values are 'admin' and 'user'.

We also need to setup our prefixes to match our privileged roles. In
the config/core.php file, uncomment the
"Configure::write('Routing.prefixes', array('admin'));" line and
modify it to "Configure::write('Routing.prefixes',
array('admin','user'));"


AppController setup
-------------------

Controller Class:
`````````````````

::

    <?php
    class AppController extends Controller {
        var $components = array('Auth');

        function beforeFilter() {
        	//tell Auth to call the isAuthorized function before allowing access
            $this->Auth->authorize = 'controller';

            //allow all non-logged in users access to items without a prefix
            if( !isset($this->params['prefix'])) $this->Auth->allow('*');
        }

        function isAuthorized() {
            //if the prefix is setup, make sure the prefix matches their role
            if( isset($this->params['prefix']))
            	return (strcasecmp($this->params['prefix'],$this->Auth->user('role'))===0);

            //shouldn't get here, better be safe than sorry
            return false;
        }
    }
    ?>



Conclusion
----------
This approach does everything I need it to do and is much lighter and
simpler than using Cake's ACL component. There are many more parts to
a multi-group website: registration, control panels, account settings,
and so much more. Proper authentication is step one, I'll leave the
rest to another day.

.. _prefix: http://book.cakephp.org/view/950/Prefix-Routing
.. _Auth component setup: http://book.cakephp.org/view/1250/Authentication
.. _add extra authentication checks: http://book.cakephp.org/view/1275/authorize

.. author:: watermark86
.. categories:: articles, tutorials
.. tags:: acl,Auth,prefix,routing,permissions,authenticate,Tutorials

