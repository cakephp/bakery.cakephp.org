Auth Component of Cakephp Demystified Part-1
============================================

how to setup basic authentication system.
`Complete Toutorial`_ *In today's Internet era most of the web
developers tries to provide a log in/signup based feature for web
clients in their web applications. Mostly this type of feature is
needed only when you want to categories your users a very common
example is Guest users and Registered Users. Guest users can access
less content on web app while registered users enjoys more privileges.
* In cakephp this attribute is implemented mostly with the Auth
component of this framework. Auth component is a very powerful, robust
and can be customized as par the needs of web application. Auth
component allows you to quickly set up secure areas in your app. In
this series we will be building a complex authentication system. As
this is part 1 and starting of this series, in this part we will
implement a very basic but fully working authentication scheme.

Getting ready
~~~~~~~~~~~~~
First of all we need to create a users table in our database to store
username and password (hashed version of user's password). This
hashing is done automatically by Auth component using it's method
hashPasswords() when it finds password in $data.

Run below sql to create users table.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    CREATE TABLE `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` CHAR(40) NOT NULL,
    PRIMARY KEY(`id`)
    );


List of all files we will be creating in this post.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+ AppController.php in /app/ folder
+ UsersController.php in /app/controllers/ folder
+ login.ctp in /app/views/users/ folder
+ signup.ctp in /app/views/users/ folder

> <h3>AppController.php File< h3>
This file mainly contains global data which is used by all controllers
of the application, in our case we have only users controller. This
file will be containing below code.

::

    <?php
    class AppController extends Controller {
           var $components = array('Session','Auth');
           var $helpers=array('Session');

    }
    ?>

*Explanation :*

It has two variables one is $components and other one is $helpers.
$components variable holds all the components utilized by all
controllers, so we specified Auth component. Session component and
Session helper is basically used to set session messages and show
those messages in view respectively.


UsersController.php File
~~~~~~~~~~~~~~~~~~~~~~~~

This is the heart of our logic. It contains functionality of login,
signup and logout. Content of this file is...

::

    <?php
    class UsersController extends AppController {

        function beforeFilter() {
                parent::beforeFilter();
                $this->Auth->allow('signup');
          }
        function login() {}

        function logout()
        {
            $this->Session->setFlash('You are logged out!');
            $this->redirect($this->Auth->logout());
        }

        function signup()
        {

            if (!empty($this->data)) {
                  $this->User->create();
                  if ($this->User->save($this->data)) {
                  $this->Session->setFlash('User saved!');
                  $this->redirect(array('action'=>'login'));
                }
           else {
                   $this->Session->setFlash('User not saved! There were some errors. Please rectify them and retry.');
                 }

                }

              }

    }
    ?>

*Explanation :*

First of all, as it is inheriting from AppController, it will have
Auth component loaded by default which will process all requests of
client. Auth component only allows to access only login function, so
to access signup() for adding new users we need beforeFilter() to give
that instruction to Auth component to allow signup(). The main thing
here to learn is that before Auth component start it's working,
beforeFilter() is invoked . In this we are invoking two beforeFilters
one of users controller and other on of app controller by using `
parent::beforeFilter();`

Second function is login(), which is basically called if you put `
http://www.your_domain_name.com/users/login/` in your URL of browser
or if you try to access a restricted area of application. When you
submit your data by ` login.ctp` file which is view file for this
login function then Auth component starts working. First of all it
hashes the password field of $data and passes this $data variable to
Users Model. Then Model checks and results back to controller. If a
valid user is found then Auth adds it in session and grants access to
all functions to which it is authorized which is checked by
`isAuthorized()`. But if it finds invalid user, it redirects back to `
login()`.

Third function is logout(), in this function we sets a session's flash
message to let user know that he/she has been logged out. On second
line of this function we calling redirect method of controller, which
is taking argument from ` $this->Auth->logout()` which is a string
containing url to login method.

Our last method is signup(), this is created to add new users. In this
we are using create() and save() methods of User Model. Create method
initializes the model for writing a new record, loading the default
values for those fields that are not defined in $data, and clearing
previous validation errors. Especially helpful for saving data in
loops. Save method saves model data (based on white-list, if supplied)
to the database. By default, validation occurs before save.


login.ctp File
~~~~~~~~~~~~~~

It holds presentation code.Code is...

::

    <?php

    echo $this->Form->create(array('action'=>'login));
    echo $this->Form->input('username');
    echo $this->Form->input('password');
    echo $this->Form->end('Login');
    ?>

*Explanation :*

This view file utilizes Form Helper to create form elements.


signup.ctp File
~~~~~~~~~~~~~~~

It also holds presentation code.In this we have a form so user could
submit it with data to create new user...

::

    <?php

    echo $this->Form->create(array('action'=>'signup));
    echo $this->Form->input('username');
    echo $this->Form->input('password');
    echo $this->Form->end('Signup');
    ?>



`Jump to Auth Component of Cakephp Demystified Part-2`_
=======================================================
`Complete Toutorial....`_

.. _Complete Toutorial: http://www.crazylearner.com/auth-component-of-cakephp-demystified-part-1/
.. _Jump to Auth Component of Cakephp Demystified Part-2: http://www.crazylearner.com/auth-component-of-cakephp-demystified-part-2/

.. author:: neil6502
.. categories:: articles
.. tags:: CakePHP,authcomponent,Articles

