Integrating Facebook Connect
============================

In this Tutorial I will show you how easily you can integrate the new
Facebook Connect Open Graph API into your CakePHP Application.
In this Tutorial we are using the CakePHP Auth Component. Make sure
that this is working before you starting this tutorial.

First you have to create a (New) Application on the
developers.facebook.com Homepage to get you API, APP, and Secret Vars
for the API. These are required for Facebook to correctly integrate
with external applications.

You need to add a few new properties to you app_controller.php class.
We need this later to interact with the Facebook API


Controller Class:
`````````````````

::

    <?php
    class AppController
    ...
            var $FACEBOOK_APP_ID = '...';
            var $FACEBOOK_API_ID = '...';
            var $FACEBOOK_SECRET = '...';
            var $FACEBOOK_COOKIE = '';

    ?>

In the Next step we will create two new function in the
app_controller.php class.
The function get_facebook_cookie() is to get the Cookie which is set
later by the Connect Script from the Client.

The __checkFBStatus() Function is to Check, Login and Create the User
Account in your System.


Controller Class:
`````````````````

::

    <?php
    class AppController
            ...
            function get_facebook_cookie($app_id, $application_secret) {
              $args = array();
              if (isset($this->Cookie->read('fbs_' . $app_id))) {
                    parse_str(trim($this->Cookie->read('fbs_' . $app_id), '\\"'), $args);
                    ksort($args);
                    $payload = '';
                      foreach ($args as $key => $value) {
                        if ($key != 'sig') {
                          $payload .= $key . '=' . $value;
                        }
                      }
                    if (md5($payload . $application_secret) != $args['sig']) {
                    return null;
                    }
              }
              return $args;
            }


            private function __checkFBStatus(){
                $this->loadModel('User');
                //check to see if a user is not logged in, but a facebook user_id is set
                if(!$this->Auth->User() && $this->FACEBOOK_COOKIE) {
                            //see if this facebook id is in the User database; if not, create the user
                            $user_record = $this->User->find('first', array(
                               'conditions' => array('username' => $this->FACEBOOK_COOKIE['uid']),
                               'fields' => array('User.username', 'User.passwd'),
                               'contain' => array()
                            ));


                    //create new user
                    if(empty($user_record)) {

                        // I need this make no changes to the model
                        $save_options = array( 'validate' => false);
                        // get the User Data from Facebook...
                        $a_user = json_decode(file_get_contents('https://graph.facebook.com/me?access_token='.$this->FACEBOOK_COOKIE['access_token']));

                        $user_record['User']['token'] = sha1($this->FACEBOOK_COOKIE['uid'].'evmgr');
                        $user_record['User']['username'] = $this->FACEBOOK_COOKIE['uid'];
                        $user_record['User']['fbid'] = $this->FACEBOOK_COOKIE['uid'];
                        $user_record['User']['group_id'] = 2;
                        $user_record['User']['active'] = 1;
                        $user_record['User']['name'] = $a_user->first_name;
                        $user_record['User']['lastname'] = $a_user->last_name;
                        $user_record['User']['website'] = $a_user->website;
                        $user_record['User']['birthday'] = date('Y-m-d', strtotime($a_user->birthday));
                        $user_record['User']['facebook_link'] = $a_user->link;
                        $user_record['User']['email'] = $this->FACEBOOK_COOKIE['uid'].'@facebookuser.de';
                        $user_record['User']['new_passwd_hash'] = $this->Auth->password($this->__randomString());
                        $user_record['User']['new_passwd'] = $user_record['User']['new_passwd_hash'];
                        $user_record['User']['confirm_passwd'] =  $user_record['User']['new_passwd_hash'];
                        $user_record['User']['passwd'] = $user_record['User']['new_passwd_hash'];

                        // Create the User
                        if($this->User->save($user_record, $save_options)){
                            // all ok. do nothing...
                        }else{
                            // interact to flush a error msg.
                        }
                    }

                    //change the Auth fields if you need this
                    $this->Auth->fields = array('username' => 'username', 'password' => 'passwd');

                    //log in the user with facebook credentials
                    $this->Auth->login($user_record);

                }
            }
    ?>

Then we need to call the get_facebook_cookie() function in the
constructor to get the Cookie data.
To create or Login the User we need to call the __checkFBStatus() in
the beforeFilter.


Controller Class:
`````````````````

::

    <?php
    class AppController
       ...
       function __construct() {
          parent::__construct();
          // get the Facebook Cookie
          $this->FACEBOOK_COOKIE = $this->get_facebook_cookie($this->FACEBOOK_APP_ID, $this->FACEBOOK_SECRET);

       }

       function beforeFilter() {
            // Check the Login Status
            $this->__checkFBStatus();
            // publish the cookie
            $this->set('FACEBOOK_APP_ID',$this->FACEBOOK_API_ID);
            $this->set('FACEBOOK_COOKIE',$this->FACEBOOK_COOKIE);
       }
    ...
    ?>

Next we need to Integrate the Facebook Javascripts an the FBML
definition into the layout default view.
You need to modify the Tag and add a new Javscript.


View Template:
``````````````

::


    <html  xmlns="http://www.w3.org/1999/xhtml"  xmlns:fb="http://www.facebook.com/2008/fbml">
    ...
    <head>
    ...
    <script src="https://connect.facebook.net/de_DE/all.js"></script>
    </head>
    ...

The last step is to change you login view for example the login.ctp
In this view we add the new Functions to call the Login from the
Facebook Connect.


View Template:
``````````````

::


    ...
       <?php if (isset($FACEBOOK_COOKIE['uid'])) { ?>
                 Your User ID is <?php echo $FACEBOOK_COOKIE['uid']; ?>
       <?php } else {
                 <fb:login-button v="2"><fb:intl>Connect with Facebook</fb:intl></fb:login-button>
       <?php } ?>

       <div id="fb-root"></div>
       <script>
           FB.init({appId: '<?php echo $FACEBOOK_API_ID; ?>', status: true,
                   cookie: true, xfbml: true});
           FB.Event.subscribe('auth.login', function(response) {
                            window.location.reload();
           });
       </script>
    ...

That's it. Feel free to modify and use the code.... you can see the
Code in action on
`http://www.eventmanager-online.com`_ an Online Eventmanager

.. _http://www.eventmanager-online.com: http://www.eventmanager-online.com/

.. author:: fsiebler
.. categories:: articles, tutorials
.. tags:: Auth,login,api,facebook,facebook connect,open graph,Tutorials

