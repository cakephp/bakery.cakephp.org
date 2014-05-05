Auth Component of Cakephp Demystified Part-2
============================================

Auth Component Variables Properly explained....


`Click To View Complete Tutorial`_
==================================


`Jump to Auth Component of Cakephp Demystified Part-1`_
=======================================================
*In our previous post, we learned how to implement a very basic but
effective authentication system to make secure areas in our web
application. Here the thing is that you could make complex and better
authentication system, which we will be doing in our next post of this
series. To do that we need to learn basic parts of our Auth component.
In this post we will only cover variables and in next post we will
discuss important functions.*

Variables which are mostly used.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+ string $authError = null  It is of string type and mainly used to provide error messages when a
  user attempts to access an area to which he doesn't have the
  permission to access. You can set this in beforeFilter() or as
  arguments to Auth component. Example :

::

    function beforeFilter()
    {
            $this->Auth->authError="You don't have access to that area. Please login first.";
    }

+ boolean $autoRedirect = true  It determines whether AuthComponent will automatically redirect and
  exit if login is successful. The importance of this variable is that
  if you have custom code (cookies, last login) in your login() action
  which you want to execute then you need to set it to false, so Auth
  doesn't auto redirect. If it is set to true then whatever code you
  have in your login() is not executed. Example :

::

    function beforeFilter()
    {
          $this->Auth->autoRedirect=false;
    }
    
    function login()
    {
    if($this->Auth->user()!=null)
           {
                 $this->User->id=$this->Auth->user('id');
                 $current = date("F j, Y, g:i a");
                 $this->User->saveField('last_login',$current);
                 $this->redirect(array('controller'=>'users','action'=>'profile'));
            }   
    }

+ array $data = array()  This variable holds form data of controller. Example :

::

    
    function login()
    {
    if($this->Auth->data['User']['username']!=null)
             {
                   //your code;
               }   
    }

+ array $fields = array('username' => 'username', 'password' =>
  'password')  It allows us to tell Auth that against which fields of our Model it
  needs to validate users. By default it is username and password. But
  suppose if someone have fields in database table as email and
  secret_word and he wants to use these fields for authentication, then
  we need this variable. Example :

::

    
    function beforeFilter()
    {
     $this->Auth->fields=array('username'=>'email','password'=>'secret_word');
    }

+ mixed $loginAction = null  This variable holds login action URL, by default it is login(). But if
  we have some other function which is handling our login process then
  we need to provide path in this variable. We can set url with the help
  of string or using array(); Example :

::

    
    function beforeFilter()
    {
    //using string
     $this->Auth->loginAction="/users/authenticate";
    //or using array notation
     $this->Auth->loginAction=array('controller'=>'users','action'=>'authenticate');
    }

+ string $loginError = null  Error to display when user login fails. For security purposes, only
  one error is used for all login failures, so as not to expose
  information on why the login failed. But we can also customize it in
  our login system. In views to output it we need to use session helper;
  i.e `<?phpecho$this->Session->flash('Auth');?>` Example :

::

    
    function beforeFilter()
    {
      $this->Auth->loginError="Username or password entered is incorrect. Please try again.";
    }

+ mixed $loginRedirect = null  Normally, if a user is redirected to the $loginAction page, the
  location they were redirected from will be stored in the session so
  that they can be redirected back after a successful login. If this
  session value is not set, the user will be redirected to the page
  specified in $loginRedirect. Example :

::

    
    function beforeFilter()
    {
      $this->Auth->loginRedirect=array('controller'=>'users','action'=>'profile');;
    }

+ mixed $logoutRedirect = null  This holds URL of default action to be invoked as soon as user is
  logged out of the web application. This URL will be returned from
  logout() of AuthComponent. Example :

::

    
    function beforeFilter()
    {
      $this->Auth->logoutRedirect=array('controller'=>'pages','action'=>'home');
    }

+ string $userModel = 'User'  Suppose you have saved your users in a database table named as Clients
  or People, then we need to specify this to Auth component so that it
  can validate accordingly, if we don't give this info it will look for
  users table, so that is wrong. Example :

::

    
    function beforeFilter()
    {
      $this->Auth->userModel="clients";
    }

+ array $userScope = array()  This is one of the most important variable i found to use. So where
  this can be used... basically AuthComponent only uses username and
  password to validate against. But suppose if you have three fields i.e
  usertype, username, password then this variable is very handy to use.
  So let us see how it is used. Below code will only validate admin type
  users. Another use of this could be like checking a user is activated
  or not in same way as below. Just replace ` 'User.usertype'=>"admin"`
  with ` 'User.activated'=>"1"` Example :

::

    
    function beforeFilter()
    {
         $this->Auth->userScope = array(
                                                'User.usertype' => "admin"
                                          ); 
    }



Final words...
~~~~~~~~~~~~~~
  In this post we surfed through different variables (although this is
  not the complete list of variables) which can be used to customize
  behavior of AuthComponent. The next post is about functions of
  AuthComponent.



`Jump to Auth Component of Cakephp Demystified Part-3`_
=======================================================


.. _Jump to Auth Component of Cakephp Demystified Part-1: http://www.crazylearner.com/auth-component-of-cakephp-demystified-part-1/
.. _Click To View Complete Tutorial: http://www.crazylearner.com/auth-component-of-cakephp-demystified-part-2/
.. _Jump to Auth Component of Cakephp Demystified Part-3: http://www.crazylearner.com/auth-component-of-cakephp-demystified-part-3/

.. author:: neil6502
.. categories:: articles
.. tags:: CakePHP,authcomponent,Variables,Articles

