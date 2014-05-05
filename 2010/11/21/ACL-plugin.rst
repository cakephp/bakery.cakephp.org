ACL plugin
==========

The core of CakePHP contains a system to control access rights based
on Access Control List. This mechanism is very useful, but I have to
admit, not very easy to dive in the first time you try to use it.
Moreover, CakePHP doesn't provide out of the box an interface to
configure the rights managed through ACL. Some monthes ago, I wrote a
plugin that aims to be such an interface allowing to manage
permissions in my applications.

The core of CakePHP contains a system to control access rights based
on `Access control list`_. This mechanism is very useful, but I
have to admit, not very easy to dive in the first time you try to use
it. Moreover, CakePHP doesn't provide out of the box an interface to
configure the rights managed through ACL.

Some monthes ago, I wrote a plugin that aims to be such an interface
allowing to manage permissions of your application's users and roles.

Technically, it allows to manage the content of the aros, acos and
aros_acos tables, used by the CakePHP ACL Component. Its interface is
partially inspired by the one you can find in the `Croogo`_ CMS, and a
part of the code comes from the tutorial of the CakePHP
documentation.



Features
--------

+ creation of *acos* for each action of your controllers
+ automatic detection of new controllers and/or actions
+ clear display of roles permissions
+ clear display of users specific permissions
+ easy edition of roles permissions (through AJAX)
+ easy edition of users specific permissions (through AJAX)
+ and more...



Prerequisites
-------------

+ CakePHP 1.3.x
+ A website whose access rights are managed through the `ACL
  Component`_. A good introduction on how to use this Component can be
  found in the CakePHP `documentation`_.
+ a table in your database containing the users (its name can be
  configured)
+ a table in your database containing the roles (its name can be
  configured). The example given in the tutorial above uses for instance
  a table called *groups* and not *roles*.



Demo
----

A `sample application`_ containing the ACL plugin can be found on my
website.


Download
--------

The plugin documentation and download link is available on `this page`_.


.. _documentation: http://book.cakephp.org/view/1543/Simple-Acl-controlled-Application
.. _Croogo: http://www.croogo.org
.. _Access control list: http://fr.wikipedia.org/wiki/Access_Control_List
.. _this page: http://www.alaxos.net/blaxos/pages/view/plugin_acl
.. _sample application: http://demo.alaxos.ch/admin/acl/aros/users
.. _ACL Component: http://book.cakephp.org/view/1242/Access-Control-Lists

.. author:: alaxos
.. categories:: articles, plugins
.. tags:: acl plugin,Plugins

