Permissions Plugin
==================

The Permission plugin is a simple variation of the classic ACL
permissions structure for the CakePHP framework. This allows a simple
flat table lookup to verify if a user has permission to a particular
action with-in a controller based upon their group.
##Setup

1. Download the code

::

    git clone git://github.com/jonbradley/CakePHP-Permissions-Plugin.git

2. Add these to your app/config/routes.php

::

    // Permissions Plugin Routes
    Router::connect('/groups', array('plugin' => 'permission', 'controller' => 'groups', 'action' => 'index'));
    Router::connect('/groups/:action/*', array('plugin' => 'permission', 'controller' => 'groups'));
    Router::connect('/privileges/:action/*', array('plugin' => 'permission', 'controller' => 'privileges'));

3. Import the permission.sql into your database

::

    CREATE TABLE `groups` ( 
       `id` varchar(10) NOT NULL,
       `name` varchar(100) NOT NULL DEFAULT '',
       PRIMARY KEY (`name`),
       UNIQUE KEY `name` (`name`)
    );
    
    CREATE TABLE `privileges` (
       `id` int(10) NOT NULL AUTO_INCREMENT,
       `controller` varchar(100) DEFAULT NULL,
       `action` varchar(100) DEFAULT NULL,
       `group_id` varchar(10) DEFAULT NULL,
       PRIMARY KEY (`id`)
    );

4. Create the following Groups

::

    99 | Admin 
    88 | Moderator
    77 | User
    NULL | Anonymous

Once you have everything done in your application it is recommended
that you just do the following to initialize the permissions to ease
development issues

5. Add the following to your app/app_controller.php

::

    var $components = array('Permission.Permission');

If you wish to autocreate all the possible privileges for every user
group based on your controllers and actions, you can initial the
following from the beforeFilter in your app_controller.php

::

    $this->Permission->setPrivileges();



.. author:: jonbradley
.. categories:: articles, plugins
.. tags:: acl,plugin,permissions,Plugins

