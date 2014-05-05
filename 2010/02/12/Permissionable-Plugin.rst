Permissionable Plugin
=====================

A CakePHP 1.3 plugin that provides UNIX-like row-level permissions for
model data.
quite awhile ago i released a behavior that provided row-level access
to models, similar to how UNIX filesystems operate. many moons have
come and gone since that original code was released, and gone through
several iterations. a couple of weeks ago i dusted it off to show it
the community in its new form, in the hopes that someone might find it
useful.

i'll not go in to huge detail how it works or the greasy
underpinnings, since that is covered elsewhere, but i'll give you a
summary: the Permissionable plugin provides row-level access control
to model records. this is done transparently via a behavior and
component combination, provided you follow a couple rules. i encourage
you to read the blog posts associated with this incarnation, as well
as the previous version of the code, since they explain the hows and
whys of what Permissionable is all about.


where to go
~~~~~~~~~~~
latest release: `http://jmcneese.wordpress.com/2010/01/28/rmac-is-dead-long-live-rmac/`_
git repo: `http://github.com/jmcneese/permissionable`_
git project page: `http://jmcneese.github.com/permissionable/`_

how to try it out for yourself:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. check out the code from github:

::

    $ cd /path/to/your/app/plugins && git clone git://github.com/jmcneese/permissionable.git

if you already have your project under git you can do this (it's call
sub-tree'ing), or muddle through setting up and using submodules. pick
your poison.

2. create the required db table. you can either do this via the SQL
files included in permissionable/config/schema (there are two, those
who prefer UUID ids, and those who prefer INT), or you can use the
schema shell to do this:

::

    $ cake schema create Permissionable.permission

3. take a look at
permissionable/controllers/components/permissionable.php. you'll need
to include this in the components array for whichever controllers use
your permissioned models, or in AppController.

Controller Class:
`````````````````

::

    <?php public $components = array('Permissionable.Permissionable');?>

also, you'll need to put some code in the initialize method of the
component that sets the id of the logged in user (via AuthComponent or
whatever method you use), as well as the group id(s).

4. next up, you'll need to include the behavior in whatever models you
want to be permission-controlled:

Model Class:
````````````

::

    <?php public $actsAs = array('Permissionable.Permissionable' => array('defaultBits'=>480);?>

note: you need not include the defaultBits option to the behavior,
unless you a) know what you are doing, b) can calculate up the proper
bits and c) really need to. if any of the above apply, feel free. if
you need a refresher course, look here:
`http://jmcneese.wordpress.com/2009/04/19/rmac-ftw-part-1/`_

a common example
~~~~~~~~~~~~~~~~
if you are like most folks, you are using the AuthComponent, have a
model called User and another called Group, with User
hasAndBelongsToMany Group. for permissionable to work optimally, you
should also have a primary group for each user. if you don't already,
add a group_id to your users table, and add a belongsTo association to
Group in the User model. now, open up
app/plugins/permissionable/controllers/components/permissionable.php.
there is some commented code showing you how to set user and group ids
into the static class. assuming you are using the AuthComponent and
that your models are associated as stated above, here's what you'd
need to do:


Component Class:
````````````````

::

    <?php
    $user_id = $controller->Auth->user('id');
    Permissionable::setUserId($user_id);
    $group_id = $controller->Auth->user('group_id');
    Permissionable::setGroupId($group_id);

    // if your User model only belongsTo Group, do this:
    //
    // Permissionable::setGroupIds($group_id);
    //
    // otherwise, do something to get a list of groups that your user is part of.
    // i cannot give an example, because people will try to cut and paste it, and there are far
    // too many ways to go about it.  if you are even attempting to use this plugin
    // i assume you know how to get a list of records associated with a particular record.
    // once you have that list of group_ids, you just set them to the static class, ala:
    //
    // Permissionable::setGroupIds($group_ids);
    ?>



.. _http://github.com/jmcneese/permissionable: http://github.com/jmcneese/permissionable
.. _http://jmcneese.wordpress.com/2009/04/19/rmac-ftw-part-1/: http://jmcneese.wordpress.com/2009/04/19/rmac-ftw-part-1/
.. _http://jmcneese.wordpress.com/2010/01/28/rmac-is-dead-long-live-rmac/: http://jmcneese.wordpress.com/2010/01/28/rmac-is-dead-long-live-rmac/
.. _http://jmcneese.github.com/permissionable/: http://jmcneese.github.com/permissionable/

.. author:: jmcneese
.. categories:: articles, plugins
.. tags:: acl,permissions,access control,rowlevel,posix,unix,Plugins

