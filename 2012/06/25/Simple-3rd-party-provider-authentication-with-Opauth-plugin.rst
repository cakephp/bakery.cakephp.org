Simple 3rd-party provider authentication with Opauth plugin
===========================================================

Opauth is a multi-provider authentication framework for PHP, inspired
by OmniAuth for Ruby. Opauth enables PHP applications to perform user
authentication across different providers with much ease & simplicity.


Implement Opauth easily on CakePHP
==================================


What is Opauth?
---------------

`Opauth`_ is a multi-provider authentication framework for PHP,
inspired by `OmniAuth for Ruby`_.

Opauth enables PHP applications to perform user authentication across
different providers with much ease & simplicity.

Opauth interfaces between authentication providers' API and your PHP
applications through strategies. Strategies available for Opauth
include Facebook, Google, Twitter, OpenID, `and more`_.

Visit `http://opauth.org`_ for a quick demo.

Opauth on GitHub: `uzyn/opauth`_
Opauth as a Composer package: `opauth/opauth`_


Opauth on CakePHP
-----------------

Opauth is made even easier to be implemented on CakePHP applications
through `Opauth CakePHP plugin`_ (`download`_).

Quick table of contents:

+ How to use this plugin *(long and thorough)*
+ A quick sample app *(pre-configured CakePHP app, with screenshots )*


How to use this plugin
~~~~~~~~~~~~~~~~~~~~~~

#. `Download Opauth CakePHP plugin`_ and place it at your CakePHP
   Plugin directory. Or via Git: Assuming ` APP` is the directory where
   your CakePHP app resides, it's usually ` app/` from the base of
   CakePHP::

    cd APP/Plugin
    git clone git://github.com/uzyn/cakephp-opauth.git Opauth

    cd Opauth
    git submodule init
    git submodule update

#. Add this line to the bottom of your app's ` Config/bootstrap.php`::

    <?php
    CakePlugin::load('Opauth', array('routes' => true, 'bootstrap' => true));

   Overwrite any Opauth configurations you want after the above line.

#. Load `strategies`_ onto `Strategy/` directory. Append
   configuration for strategies at your app's ` Config/bootstrap.php` as
   follows::

    <?php
    CakePlugin::load('Opauth', array('routes' => true, 'bootstrap' => true));

    // Using Facebook strategy as an example
    Configure::write('Opauth.Strategy.Facebook', array(
       'app_id' => 'YOUR FACEBOOK APP ID',
       'app_secret' => 'YOUR FACEBOOK APP SECRET'
    ));

#. Go to `http://path_to_your_cake_app/auth/facebook` to authenticate
   with Facebook, and similarly for other strategies that you have
   loaded.

#. After validation, user will be redirected to `Router::url('/opauth-complete')`
   with validated auth response data retrievable
   available at `$this->data`. To route a controller to handle the
   response, at your app's `Config/routes.php`, add a connector, for
   example::

    <?php
    Router::connect(
       '/opauth-complete/*',
       array('controller' => 'users', 'action' => 'opauth_complete')
    );

   You can then work with the authentication data at, say `
   APP/Controller/UsersController.php` as follows::

    <?php // APP/Controller/UsersController.php:
    class UsersController extends AppController {
       public function opauth_complete() {
           debug($this->data);
       }
    }

   Note that this CakePHP Opauth plugin already does auth response
   validation for you with its results available as a boolean value at `$this->data['validated']`.


How about a sample?
~~~~~~~~~~~~~~~~~~~

Sure. Simply `download this CakePHP app`_ and set it up with CakePHP
v2.x library.

Once it is set up, you should see: `(Homepage screenshot)`_

After authentication, this is what you should be getting: `(Callback screenshot)`_

More instructions on the sample app: `https://github.com/uzyn/cakephp-opauth/tree/sample`_


See also
--------

+ `Opauth.org`_ for a quick Opauth demo.
+ `Documentations on Opauth`_
+ `Contribute an Opauth strategy`_


Issues & questions
------------------

+ Discussion group: `Google Groups`_ Feel free to post your questions
  to the discussion group. This is the primary channel for support.
+ Issues: `Github Issues`_
+ Twitter: `@uzyn`_
+ Email me: `chua@uzyn.com`_
+ About me: `U-Zyn Chua`_
+ IRC: #opauth on `Freenode`_



.. _and more: https://github.com/uzyn/opauth/wiki/List-of-strategies
.. _strategies: https://github.com/uzyn/opauth/wiki/list-of-strategies
.. _Opauth.org: http://opauth.org
.. _OmniAuth for Ruby: http://omniauth.org
.. _Google Groups: https://groups.google.com/group/opauth
.. _download this CakePHP app: http://opauth.org/file.php?name=Opauth-CakePHP-sample-app.zip
.. _Github Issues: https://github.com/uzyn/cakephp-opauth/issues
.. _chua@uzyn.com: mailto:chua@uzyn.com
.. _Download Opauth CakePHP plugin: http://opauth.org/file.php?name=Opauth-CakePHP-plugin.zip
.. _U-Zyn Chua: http://uzyn.com
.. _opauth/opauth: http://packagist.org/packages/opauth/opauth
.. _(Callback screenshot): https://github.com/uzyn/cakephp-opauth/raw/sample/webroot/img/demo/callback.png
.. _uzyn/opauth: https://github.com/uzyn/opauth
.. _Documentations on Opauth: https://github.com/uzyn/opauth/wiki
.. _(Homepage screenshot): https://github.com/uzyn/cakephp-opauth/raw/sample/webroot/img/demo/homepage.png
.. _(Callback screenshot): https://github.com/uzyn/cakephp-opauth/raw/sample/webroot/img/demo/callback.png
.. _Opauth CakePHP plugin: https://github.com/uzyn/cakephp-opauth
.. _Contribute an Opauth strategy: https://github.com/uzyn/opauth/wiki/Strategy-Contribution-Guide
.. _https://github.com/uzyn/cakephp-opauth/tree/sample: https://github.com/uzyn/cakephp-opauth/tree/sample
.. _Freenode: http://webchat.freenode.net/?channels=opauth&uio=d4
.. _@uzyn: http://twitter.com/uzyn

.. author:: uzyn
.. categories:: articles, tutorials
.. tags:: google,Auth,login,authentication,plugin,twitter,oauth,openid,facebook,opauth,Tutorials

