How to implament One Time Password for forgot-my-password and account-
activation processes
====================

CakeOTP is a secure, table-less and expirable implementation of One
Time Password for CakePHP. It can be used for forgot-my-password and
account-activation processes.
A one-time password (OTP) is a password that is only valid for a
single login session or transaction. It is commonly used in the
internet for registration and password reminder process in which OTPs
are provides to the user in a form of a link that the user uses to
access in order to create/reset his password.

The problem is that most one-time password implementation involve
maintaining additional database tables and batch process that handle
the persistence and expire date of the one time password. This adds
complexity and reduces performance.

CakeOTP is a simple and clean implementation of one time password. It
reduces complexity by removing the redundant SQL calls and DB batch
maintenance while still keeping the one time password secure and
expirable.

CakeOTP provides a OTP component that implements the this One Time
Password algorithm -
`http://spacebug.com/tableless_secure_one_time_password`_
Here is how the OTP component looks like:

::


    class OtpComponent extends Object{
        var $components = array('Auth');

        function createOTP($parameters){
               return  $this->Auth->password(implode("", $parameters));
        }

        function authenticateOTP($otp,$parameters ){
            return $otp== $this->Auth->password(implode("", $parameters));
        }

    }

Here is how we register the user and send the activation code to the
newly create user by email:

::


    class UsersController extends AppController {

        var $name = 'Users';
        var $components = array('Auth','Email','Otp');

     function register() {
            if (!empty($this->data)) {

                $username = $this->data["User"]["username"];
                $user = $this->User->FindByUsername($username);

                    if(!$user){
                        // TODO validate that username is in an EMAIL format

                        // create an non-active user (with random password)
                        $randomPass = $this->Auth->password($this->generatePassword());
                        $user = array(
                                    'User' => array(
                                    'password' => $randomPass,
                                    'username' =>$username,

                                    ),

                                );
                                $this->User->create();
                                $this->User->save($user);

                        // setup the TIME TO LIVE (valid until date) for the next two days
                        $now = microtime(true);
                        $ttl =$now + 48*3600; // the invitation is good for the next two days

                        // create the OTP - TTL = time to live
                        $otp = $this->Otp->createOTP(array('user'=>$username,'password'=>$randomPass,'ttl'=> $ttl) );

                        $link = '<a href="http://' . $_SERVER['SERVER_NAME'] . Dispatcher::baseUrl()."/users/otpregister/".$username."/".$ttl."/".$otp.'"> Registration link</a>';
                         // send mail
                        $this->Email->from    = "admin@somedomain.com";
                        $this->Email->to      = $username;

                        $this->Email->subject = "Website Registration";
                        $this->Email->sendAs = 'html';


                        $body = "Please use the following link to access the website:<br>";
                        $body .= $link;

                        $this->Email->send($body);
                        $this->Session->setFlash("Email send, please check your email for your CakeOTP");
                        $this->redirect("/");
                    }else{
                       $this->Session->setFlash("This user is already in the system, please try another email");

                    }


            }
        }

Here is how we authenticate the activation password once the user
clicks on the link:

::


    // after clicking the link in the registration email the user will be sent here
        function otpregister($email,$ttl,$otp) {
                if($email){
                    $user = $this->User->FindByUsername($email);
                    if($user){
                        $passwordHash = $user["User"]["password"];

                        $now = microtime(true);
                        // check expiration date. the experation date should be greater them now.
                        if($now <  $ttl){
                            // validate OTP
                            if($this->Otp->authenticateOTP($otp,array('user'=>$email,'password'=>$passwordHash,'ttl'=> $ttl)) ){
                                   if($this->data){
                                       // activate the account by setting the password
                                       $password = $this->data["User"]["pass"];
                                       $this->User->id =  $user["User"]["id"];

                                       if(strlen($password)<6){
                                        $this->Session->setFlash("Password Must be at least 6 characters long. Please enter a longer password.");

                                       }else if ($this->Auth->password($this->data["User"]["password"]) != $this->Auth->password($password)) {

                                           $this->Session->setFlash( 'Password and Confirmation password do not match. Please try again.');
                                       }else{

                                         $this->User->saveField('password',   $this->Auth->password($password));
                                          //$this->Session->setFlash( 'Password Changed');
                                         $this->redirect(array('action' => 'success'));
                                       }

                                   }
                                   $this->set('email',$email);
                                   $this->set('ttime',$ttl);
                                   $this->set('hash',$otp);

                            }else{
                                $this->Session->setFlash("Invalid request. Please contact the website administration.");
                                // send to a error view
                                $this->redirect(array('action' => 'message'));

                            }
                        }else{
                            $this->Session->setFlash("Your invitation has expired. Please contact the website administration.");
                            // send to a error view
                           $this->redirect(array('action' => 'message'));
                        }
                    }
                }

    	}

A live demo of the account activation process can be found here -
`http://spacebug.com/cakeotp/demo/`_
You can download and read more about this component in the CakeOTP
project page - `http://spacebug.com/CakeOTP-One_Time_Password_Reference_Implementation_for_CakePHP`_


.. _http://spacebug.com/cakeotp/demo/: http://spacebug.com/cakeotp/demo/
.. _http://spacebug.com/CakeOTP-One_Time_Password_Reference_Implementation_for_CakePHP: http://spacebug.com/CakeOTP-One_Time_Password_Reference_Implementation_for_CakePHP
.. _http://spacebug.com/tableless_secure_one_time_password: http://spacebug.com/tableless_secure_one_time_password

.. author:: ashevat
.. categories:: articles, tutorials
.. tags:: security,password,Components,registration,Tutorials

