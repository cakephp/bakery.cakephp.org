Integrating cakephp with OpenId
===============================

this article tells how to integrate openid with your cake..........


`Click To View Complete Tutorial`_
==================================
*Today everyone is in a rapid hustle. So mostly internet users find
registration process as very time consuming. Sometimes they might
leave your web product if they just want to avoid that annoying
registration process. So a very good alternative to this is using
`OpenId`_. OpenId is a great way to make your authentication system
even more flexible.* To implement this feature we must have a basic
working authentication system.
`Click to know how to build basic authentication system.`_


Prerequisites
~~~~~~~~~~~~~
First of all your PHP must have OpenID Library. You can download it from this
`here`_. When you are done with downloading library then extract the folder
named as Auth into your web application's `/app/vendors/` folder. Note: folder
is `/app/vendors/` not `/vendors/` which is in root of your web app besides
your app folder.
Second you must have OpenId plugin for Cakephp. To download this
plugin follow this `link`_. Now similarly extract this download to
your `/app/plugins/` folder. After extracting you will have openid
folder inside your `/app/plugins/`.

Coding
~~~~~~

+ First of all you need to replace that OpenId's Auth component with
  cakephp's default Auth component. To do that edit your `
  appcontroller.php` file. By implementing below code will extend Auth
  component functionality. One thing that is very important here is that
  you still have power of old Auth Component. You can still use it's
  variables and functions i.e ` $this->Auth->allow("*");`

::

    var $components = array(
          'Openid.OpenAuth'
    );

+ Now you need to edit your ` login.ctp` view file. When below form is
  submitted then Auth component will try to login user with username and
  password field. But if it failed to login with username and password
  then it will check whether OpenId URL is specified or not. If this
  happens then it will attempt to authenticate URL against OpenID
  server. If permission granted then OpenAuth component will add user to
  the session.  `<?php echo$this->Form->create(array('action'=>'login'));
  echo$this->Form->input(array('openid'=>array('label'=>'OpenIDURL')));
  echo$this->Form->input('username');
  echo$this->Form->input('password'); echo$this->Form->end('Login'); ?>`



Final words
~~~~~~~~~~~

This is it, after this all we have working authentication system with
OpenId.


`Click To View Complete Tutorial`_
==================================


.. _Click to know how to build basic authentication system. : http://www.crazylearner.com/auth-component-of-cakephp-demystified-part-1/
.. _OpenId: http://openid.net/
.. _here: https://github.com/openid/php-openid/downloads
.. _link: https://github.com/mariano/openid/downloads
.. _Click To View Complete Tutorial: http://www.crazylearner.com/integrating-cakephp-with-openid/

.. author:: neil6502
.. categories:: articles
.. tags:: CakePHP,authentication,openid,Articles

