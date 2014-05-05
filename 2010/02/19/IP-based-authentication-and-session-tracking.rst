IP based authentication and session tracking.
=============================================

This is my approach in IP based authentication and Session tracking
for cake. My goal was to leave cake untouched.
Create a database table to store the session id and IP address
association:

::

    
    CREATE TABLE IF NOT EXISTS `ip_sessions` (
      `ip` varchar(39) collate utf8_unicode_ci NOT NULL,
      `session_id` varchar(64) collate utf8_unicode_ci NOT NULL,
      `expires` datetime NOT NULL,
      PRIMARY KEY  (`ip`),
      KEY `mac` (`session_id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

Then create a model for it:

Model Class:
````````````

::

    <?php 
    // app/models/ip_session.php
    
    class IpSession extends AppModel {
    
            var $name = 'IpSession';
            var $primaryKey = 'ip';
    
    }
    ?>


You now need to alter your users table to have an additional 'type'
field (unsigned INT(1)). Set the default value to 1 which means that
the user can only login using normal authentication. Set it to 2 for
users that can only login via the IP based authentication scheme. Set
it to 3 to allow both (very insecure). For the IP based authentication
the username can be anything but the password must be the IP address
of the user in plaintext
Now on to the real task. I have extended RequestHandler to do this but
for a different reason (to create a custom layout):

Component Class:
````````````````

::

    <?php 
    // app/controllers/components/custom_request_handler.php
    
    App::import(array('RequestHandler'));
    
    class CustomRequestHandlerComponent extends RequestHandlerComponent {
    
       var $name = 'CustomRequestHandler';
       var $components = array('Cookie','Session');
    
       function initialize(&$controller) {
    
          // Snom phone handling
          $this->setContent('snom',array('application/xml', 'text/xml'));
    
          if(preg_match('/snom/i', env('HTTP_USER_AGENT')) != 0) {
             $controller->params['url']['ext'] = 'snom';
          }
    
          if(isset($controller->params['url']['ext']) && $controller->params['url']['ext'] == 'snom')
             Configure::write('debug',1);
    
          $this->ip = $this->getClientIP();
    
          // IP Session restoration
          $this->cookieCheck  = $this->Cookie->read('Roeften.cookie.check');
    
          if($this->cookieCheck == null) {
             $session =  ClassRegistry::init('IpSession');
             // avoid the process for cookie aware clients
             $this->Cookie->write('Roeften.cookie.check','1',false,'+10 years');
    
             $session->ip = $this->ip;
             $s = $session->find();
    
             if($s) {
                // check session expiration
                if(time() < strtotime($s['IpSession']['expires'])) {
                   session_id($s['IpSession']['session_id']);
                } else {
                   $session =  ClassRegistry::init('IpSession');
                   $session->delete($this->ip);
                }
    
             }
          } else if($this->cookieCheck == 1) {
             $session = ClassRegistry::init('IpSession');
             $session->delete($this->ip);
             $this->cookieCheck = 2;
             $this->Cookie->write('Roeften.cookie.check','2', '+10 years');
          }
    
          // IP based authentication
          if(isset($controller->Auth)) {
             $this->Auth = $controller->Auth;
    
             if($this->Auth->user() == null) {
                $users = $this->Auth->getModel();
                $u = $users->field("ClassRegistry::init('IpSession');.{$this->Auth->fields['username']}",
                                    array("{$this->Auth->userModel}.{$this->Auth->fields['password']}" => $this->ip));
                if($u) {
                   $auth = $this->Auth->authenticate;
                   $this->Auth->authenticate = $this;
                   $this->Auth->userScope = array("{$this->Auth->userModel}.type & 2)" => 2);
                   // let it silently fail
                   $this->Auth->login(array("{$this->Auth->userModel}.{$this->Auth->fields['username']}" => $u,
                                                   "{$this->Auth->userModel}.{$this->Auth->fields['password']}" => $this->ip));
                   $this->Auth->authenticate = $auth;
                }
             }
             // restore scope
             $this->Auth->userScope = array("({$this->Auth->userModel}.type & 1)" => 1);
          }
    
          return parent::initialize($controller);
       }
    
      function isSnom() {
          return $this->prefers('snom');
       }
    
       function hashPasswords($data) {
          return $data;
       }
    }
    ?>


Now override the AppController:

Controller Class:
`````````````````

::

    <?php 
    // app/controllers/app_controller.php
    
    class AppController extends Controller {
    
       var $components = array('CustomRequestHandler','Cookie','Session');
    
    
       function afterFilter() {
          if($this->CustomRequestHandler->cookieCheck != 2) {
    
             $expires = time() + Configure::read('IpSession.timeout');
             $this->loadModel('IpSession');
             $db =& ConnectionManager::getDataSource($this->IpSession->useDbConfig);
             $default = array('formatter' => 'date', 'format' => 'Y-m-d H:i:s');
             $colType = array_merge($default, $db->columns[$this->IpSession->getColumnType('expires')]);
             $expires = $colType['formatter']($colType['format'],$expires);
             $this->IpSession->save(array('IpSession'=>array(   'ip' =>  $this->CustomRequestHandler->ip,
                                                                'session_id' => session_id(),
                                                                'expires' => $expires)));
          }
          return parent::afterFilter();
       }
    }
    ?>


A final touch is to set the variable IpSession.timeout in
app/config/core.php into the amount of seconds for the expiration of
the record mapping in IpSession. This value can be used to clean up
the records in the database not the session expiration. If you set it
earlier than the expiration time (depends on settings) of the session
then the record will be deleted (and the session lost). If the value
represents a later time then the session will expire and you will have
to clean up the record via an external script or manually.

To explain a bit, I am using the component's initialize method because
it runs before Auth->startup (the code will not work in a Component's
beforeFilter method). And then I am using the AppController's
afterFilter to ensure that I get the right session id (this can be
moved in the component as long as the session is started before it so
that when security is high we can still get the correct session id).

There is also some code in the CustomRequestHandler for detecting a
snom phone and having a separate layout for it. To use that you need
to create a helper and a default layout:


Helper Class:
`````````````

::

    <?php 
    // app/views/helpers/snom.php
    
    App::import('Helper', 'Xml');
    class SnomHelper extends XmlHelper {
    }
    ?>



View Template:
``````````````

::

    
    echo $snom->header();
    echo "\n";
    echo $content_for_layout;
    <!-- app/views/layouts/snom/default.ctp -->


Then you simply create a view for each action in
app/views/controller_name/snom/action_name.ctp



.. author:: roeften
.. categories:: articles, tutorials
.. tags:: Auth,session,ip,snom,Tutorials

