Auth – inline authorization the easy way
========================================

I wrote a wrapper class to make inline authorization easier. Often
times you want to check on certain roles inside an action or view and
depending on the result display specific content or execute specific
code. As an example we only want to display the "admin infos" box on
the home screen for an admin. All other users should not see this box.

::

    Auth.User.Role (with Role being an array of role ids)

3 We would need to check the session manually against the roles we
want to grant access to. This can get pretty hairy with more than one
role allowed (if admins and moderators are allowed to see this box for
example).

Preparations
~~~~~~~~~~~~
We first need to make the class usable by putting this in our
`/Config/bootstrap.php`:

::

    // these IDs match the role_ids in the DB
    define('ROLE_SUPERADMIN', '1');
    define('ROLE_ADMIN', '2');
    define('ROLE_MOD', '3');
    define('ROLE_USER', '4');

    // enable the Auth class
    App::uses('Auth', 'Tools.Lib');

I like to use constants as they are shorter than
`Configure::read('admin')` etc. But Configure would work just as fine.

Then we need to decide whether we use single role (cake default) or
multi role Authorization. I usually always use multi-roles. Therefore
the default case for the Auth class is exactly this. The session then
contains:
B0x1A1
If you use single roles, you're Session array should look like this:

::

    Auth.User.role_id (with role_id being the single role we want to check against)

In this case you should set the following constant manually in your
bootstrap:

::

    define('USER_ROLE_KEY', 'role_id');



"Former" usage
~~~~~~~~~~~~~~
For comparison I will outline the manual and "outdated" way of
authorization first:

::

    // we want to make sure that piece is only visible to admins and moderators
    if ($this->Session->read('Auth.User.role_id') == ROLE_ADMIN || $this->Session->read('Auth.User.role_id') == ROLE_MOD) {}

    // or with multi-role
    if (in_array(ROLE_ADMIN, (array)$this->Session->read('Auth.User.Role')) || in_array(ROLE_MOD, (array)$this->Session->read('Auth.User.Role'))) {}

Quite a lot to write...

Note: This also only works in controller/component and view/helper
scope. You would have to use the static CakeSession::read() in order
to make this work in the model/behavior one etc.


Usage
~~~~~
Now the fun part. The wrapper class can be found in the [Tools
Plugin](https://github.com/dereuromark/tools/blob/2.0/Lib/Auth.php).

::

    // Same thing as above
    if (Auth::hasRoles(array(ROLE_ADMIN, ROLE_MOD)) {}

Now isn't that nicer to write and read?

The default case is that if one of the roles is matched it will return
true right away. If you want to connect them with AND instead of OR,
you need to make the second param `false`:

::

    // This only passed if the user has both roles!
    if (Auth::hasRoles(array(ROLE_ADMIN, ROLE_MOD), false) {}

If we only want to check against a single role we could also use the
shorthand:

::

    if (Auth::hasRole(ROLE_MOD) {}



Advanced usage
~~~~~~~~~~~~~~
You can also pass in the roles you want to check against. This can be
useful if you want to check somebody else's roles (and not your
session roles). This can come in handy in CLI (command line / shell)
environment and also in the admin backend.

::

    if (Auth::hasRole(ROLE_MOD, $rolesOfThisUser) {}

And

::

    if (Auth::hasRoles(array(ROLE_MOD, ROLE_USER), true, $rolesOfThisUser) {}



And there is more
~~~~~~~~~~~~~~~~~
There are also some convenience methods available.
Instead of `$uid = $this->Session->read('Auth.User.id')` you can just
write

::

    $uid = Auth::id(); // anywhere in your application

The roles can be fetched like this:

::

    $myRoles = Auth::roles(); // string in single-role and array in multi-role context

Last but not least the user data:

::

    $user = Auth::user(); // complete user array
    $username = Auth::user('username'); // string: current username
    ...



Details
~~~~~~~
[Read the full article here][article].
[article]: `http://www.dereuromark.de/2012/04/07/auth-inline-authorization-the-easy-way/`_


.. _http://www.dereuromark.de/2012/04/07/auth-inline-authorization-the-easy-way/: http://www.dereuromark.de/2012/04/07/auth-inline-authorization-the-easy-way/

.. author:: euromark
.. categories:: articles, snippets
.. tags:: authorization,Snippets

