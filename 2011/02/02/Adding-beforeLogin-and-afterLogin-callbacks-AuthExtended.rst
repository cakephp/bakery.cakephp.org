Adding beforeLogin and afterLogin callbacks (AuthExtended)
==========================================================

AuthExtendedComponent is a class to add two new callbacks
'beforeLogin' and 'afterLogin' to your app.
Usage The component works exactly as the AuthComponent, so, just add
it as "AuthExtended" like you would normally do and you are ready to
go.

Example:

::

    <?php
    class UsersController extends AppController {
        
        /**
         * beforeLogin callback
         * @param boolean $areValidCredentials If the login and password provided are valid
         * @param array $data The user submited data
         */
        function beforeLogin($areValidCredentials, $data) {
            if($areValidCredentials){
                // do something if the login and password provided are valid
            }else{
                // do something if not
            }
            return $areValidCredentials; // return true/false if the user will login (true) or not (true)
        }
        
        /**
         * afterLogin callback
         * @param boolean $successfully If the user logged successfully
         */
        function afterLogin($successfully){
            if($successfully == true){
                // do something if logged successfully
            }else{
                // do something if not
            }
        }
        
        function logout(){
            $this->redirect($this->AuthExtended->logout());
        }
        
        public function login() {}
    
    }
    ?>

In this example, I added the component to the AppController.

Now the component:

auth_extended.php

::

    <?php
    /**
     * Extended Auth Component
     * This class addeds two callback to controllers called 'beforeLogin' and 'afterLogin'.
     * 
     * - beforeLogin must return TRUE or FALSE to see if the user will login (TRUE) or not (FALSE).
     * - afterLogin is trigged when a login tentative is made
     * 
     * This feature must be used when AuthComponent::$userScope isn't enough
     * @author Lucas Pelegrino <lucas.wxp@gmail.com>
     * @see AuthComponent
     */
    
    App::import('Component', 'Auth');
    
    class AuthExtendedComponent extends AuthComponent {
        
    /**
     * Controller object
     * @var Controller
     */
        var $controller;
        
        
    /**
     * (non-PHPdoc)
     * @see AuthComponent::startup()
     */
        function startup(&$controller){
            $this->controller = $controller;
            return parent::startup($controller);
        }    
        
    /**
     * (non-PHPdoc)
     * @see AuthComponent::login()
     */
        function login($data = null) {
            parent::login($data);
            if (empty($data)) {
                $data = $this->data;
            }
            
            $this->_beforeLogin($data);
            $this->_afterLogin();
            
            return (bool)$this->_loggedIn;
        }
        
    /**
     * beforeLogin trigger
     * @param array $data
     * @return void
     */
        function _beforeLogin($data){
            $method = 'beforeLogin';
            if(method_exists($this->controller, $method)){
                $this->_loggedIn = call_user_func_array(array($this->controller, $method), array($this->_loggedIn, $this->data));
                if($this->_loggedIn == false){
                    $this->logout();
                }
            }
        }
        
    /**
     * afterLogin trigger
     * @return void
     */
        function _afterLogin(){
            $method = 'afterLogin';
            if(method_exists($this->controller, $method)){
                call_user_func_array(array($this->controller, $method), array($this->_loggedIn));
            }
        }
    }

OBS: Sorry for the bad english =p


.. author:: lucaswxp
.. categories:: articles, components
.. tags:: Auth,login,component,auth extended,Components

