TinyAuth ACL - fast and easy
============================

For most simple applications with some user frontend and maybe some
admin backend the core ACL is way too much overhead in most cases. You
would want something simple. Another advantage: It works with multiple
roles per user - out of the box. If it doesn't even have to be
databased you can use a simple ini file to manage all ACL stuff for
you. I called it TinyAuth.

Basic Setup

The ini file `acl.ini` will be in /Config/ and is as easy as it gets:

::

    [Tools.Countries]
    * = superadmin ; this is a comment
     
    [Account]
    edit,change_pw = *
     
    [Activities]
    admin_index,admin_edit,admin_add,admin_delete = admin,superadmin
    index = *
     
    [Users]
    index,search = user
    * = moderator,admin

Most of it is probably self-explanatory.

You don't even have to provide a roles table. If you don't manage your
roles in the database you can just use Configure to store the roles:

::

    $config['Role'] = array(
        'superadmin' => 1,
        'admin' => 2,
        'moderator' => 3,
        'helper' => 4,
        'user' => 5,
    );

This simulates the roles table until you actually want or need it.

Now all you need to do is to include TinyAuth in your beforeFilter()
method of the AppController:

::

    $this->Auth->authorize = array('Tools.Tiny');

Although you don't need the Plugin structure. If you don't want to use
it you can just drop it into your app `/Auth` folder.

Tips

The Authentication module comes with some handy "shortcuts". You can
allow all frontend actions to logged in users by default and only
managing admin (backend) actions.

For details and downloading the code see the `complete tutorial`_.

Please feel free to comment or submit any feedback. And a happy new
year.


.. _complete tutorial: http://www.dereuromark.de/2011/12/18/tinyauth-the-fastest-and-easiest-authorization-for-cake2/

.. author:: euromark
.. categories:: articles, tutorials
.. tags:: Auth,authentication,Tutorials

