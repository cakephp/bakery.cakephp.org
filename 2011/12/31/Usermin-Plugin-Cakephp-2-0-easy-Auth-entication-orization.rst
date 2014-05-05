Usermin Plugin: Cakephp 2.0 easy Auth{entication|orization}
===========================================================

Usermin is a Plugin easy to install and easy to understand. It covers
the basics to authenticate, manage and authorize your application with
users, roles and permissions to access plugins, controllers and
actions.
Usermin is a Plugin easy to install and easy to understand. It covers
the basics to authenticate, manage and authorize your application with
users, roles and permissions to access plugins, controllers and
actions.

AuthComponent is one of the hot new features in CakePHP 2.0. Why not
use it to refactor an existing plugin (jedt/spark_plug) and build a
simpler version for 2.0 ?
This was the main motivation to create Usermin.

Installation is done in few steps (covered in the README file):

- Download

cd yourapp/app/Plugin
git clone git://github.com/steinkel/usermin.git Usermin

- Initialize database

yourapp/app/Plugin/Usermin/Config/Schema/dump.sql

// this console shell creates a superadmin user and role if not exist
$ cd yourapp/app
$ Console/cake usermin.usermin init

- Configure the component

Your yourapp/app/Controller/AppController.php should look like this:

...

::

    
    	class AppController extends Controller {
                public $components = array(
                    'Auth' => array(
                        'loginAction' => array('plugin' => 'usermin', 'controller' => 'umusers', 'action' => 'login'),
                        'authorize' => array('Usermin.Role'),
                        'authenticate' => array('Form' => array('userModel' => 'Usermin.Umuser')
                        )
                    )
                );

...

yourapp/app/Config/bootstrap.php should include this line

::

    
            // load Usermin plugin and apply plugin routes. Keep all the other plugins you are using here
            CakePlugin::loadAll(array(
                'Usermin' => array('routes' => true),
            ));

Now you have a few new routes automatically loaded (cool):

yourapp/login --> show the username / password for to login
yourapp/logout --> you should know what is this for
yourapp/dashboard --> shows an admin panel for the superadmin to
create and manage users, roles and permissions

Please don't expect (yet) nice design, only scaffolding and default
cake layout was used.

Authentication and Authorization extend base CakePHP 2.0 classes and
you can integrate it with your existing code.

You are welcome to download and use the code from here

`http://github.com/steinkel/usermin`_
New features will be released soon...


.. _http://github.com/steinkel/usermin: http://github.com/steinkel/usermin

.. author:: steinkel
.. categories:: articles, plugins
.. tags:: Auth,authentication,plugin,Plugins

