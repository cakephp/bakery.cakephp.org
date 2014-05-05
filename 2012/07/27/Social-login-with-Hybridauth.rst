Social login with Hybridauth
============================

HybridAuth enable developers to easily build social applications to
engage websites vistors and customers on a social level by
implementing social signin, social sharing, users profiles, friends
list, activities stream, status updates and more. HybridAuth goal is
to act as an abstract api between your application and various social
apis and identities providers such as Facebook, Twitter, MySpace and
Google. This article hopefully can improve Hybridauth support for
CakePHP

First of all : Sorry about my English, and this is my first post so
correct this article if I'm doing wrong. :)

> <h1>Social login with Hybridauth< h1> Hybridauth extend our
application to use social provider authentication in our application.
It can combine with Auth component without any problem. The concept is
simple (as far as i know), Hybridauth will authenticate using our
social provider identity (like Facebook, Twitter, Google, etc..) then
return an object to our application which we can use it as we want.
><br >

How to use
~~~~~~~~~~
1. `Download Hybridauth`_ (stable version work with this article is
version 2.0.11)
> 2. Place hybridauth folder into our application webroot folder (app
webroot/hybridauth)
> 3. In Your UsersController add:<br >

::


    session_start();

in top most of your controller.
> Note: maybe You need to place session_start() in top most of your
AppController if you're using auth component<br >
> then create functions: <pre> public function loginwith($provider) {
/ $this->autoRender = false; require_once( WWW_ROOT .
'hybridauth/Hybrid/Auth.php' ); $hybridauth_config = array( "base_url"
=> 'http://' . $_SERVER['HTTP_HOST'] . $this->base . "/hybridauth/",
// set hybridauth path "providers" => array( "Facebook" => array(
"enabled" => true, "keys" => array("id" => "your_fb_api_key", "secret"
=> "fb_api_secret"), "scope" => 'email', ), "Twitter" => array(
"enabled" => true, "keys" => array("key" => "twitter_api_key",
"secret" => "twitter_api_secret") ) // for another provider refer to
hybridauth documentation ) ); try { // create an instance for
Hybridauth with the configuration file path as parameter $hybridauth =
new Hybrid_Auth($hybridauth_config); // try to authenticate the
selected $provider $adapter = $hybridauth->authenticate($provider); //
grab the user profile $user_profile = $adapter->getUserProfile();
//debug($user_profile); //uncomment this to print the object //exit();
//$this->set( 'user_profile', $user_profile ); //login user using auth
component if (!empty($user_profile)) { $user =
$this->_findOrCreateUser($user_profile, $provider); // optional
function if you combine with Auth component unset($user['password']);
$this->request->data['User'] = $user; if
($this->Auth->login($this->request->data['User'])) {
$this->redirect($this->Auth->redirect());
$this->Session->setFlash('You are successfully logged in'); } else {
$this->Session->setFlash('Failed to login'); } } } catch (Exception
$e) { // Display the recived error switch ($e->getCode()) { case 0 :
$error = "Unspecified error."; break; case 1 : $error = "Hybriauth
configuration error."; break; case 2 : $error = "Provider not properly
configured."; break; case 3 : $error = "Unknown or disabled
provider."; break; case 4 : $error = "Missing provider application
credentials."; break; case 5 : $error = "Authentification failed. The
user has canceled the authentication or the provider refused the
connection."; break; case 6 : $error = "User profile request failed.
Most likely the user is not connected to the provider and he should to
authenticate again."; $adapter->logout(); break; case 7 : $error =
"User not connected to the provider."; $adapter->logout(); break; } //
well, basically you should not display this to the end user, just give
him a hint and move on.. $error .= "Original error message: " .
$e->getMessage(); $error .= "Trace: " . $e->getTraceAsString();
$this->set('error', $error); } } // this is optional function to
create user if not already in database. you can do anything with your
hybridauth object private function _findOrCreateUser($user_profile =
array(), $provider=null) { if (!empty($user_profile)) { $user =
$this->User->find('first', array('conditions' => array(
'OR'=>array('User.username' => $user_profile->identifier,
'User.email'=>$user_profile->email)))); if (!$user) {
$this->User->create(); $this->User->set(array( 'group_id' => 2,
'first_name' => $user_profile->firstName, 'last_name' =>
$user_profile->lastName, 'email' => $user_profile->email, 'username'
=> $user_profile->identifier, 'password' =>
AuthComponent::password($user_profile->identifier), //in case you need
to save password to database 'country' => $user_profile->country,
'city' => $user_profile->city, 'address' => $user_profile->address,
//add another fields you want )); if ($this->User->save()) {
$this->User->recursive = -1; $user = $this->User->read(null,
$this->User->getLastInsertId()); return $user['User']; } } else {
return $user['User']; } } } 4. In your view (ex. login.ctp) add:
> <code><span style="color: #000000"> <br ><divclass="login-button-
div">
<ahref="loginwith/facebook"class="zocialfacebook">LoginwithFacebook</a
>
<ahref="loginwith/twitter"class="zocialtwitter">LoginwithTwitter</a>
</div>
that's all.
> Beside this article you can find <a href="http:
/hybridauth.sourceforge.net/download.html#index"> sample cakephp2
application using Hybridauth here. This article is based on the sample
application with very little modification and the credit of this
article is for them who create hybridauth and cakephp sample app using
hybridauth
><br > Happy baking..

.. _Download Hybridauth: http://hybridauth.sourceforge.net/download.html#index

.. author:: thehanx
.. categories:: articles
.. tags:: google,authcomponent,twitter,facebook,social login,linkedin,hybridauth,Articles

