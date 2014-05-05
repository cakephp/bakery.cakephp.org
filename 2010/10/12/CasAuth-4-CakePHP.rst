CasAuth 4 CakePHP
=================

Imagine you want to provide your application with CAS (Central
Authentication Service) support. Consider enhancing wonderful CakePHP
Auth component as explained in the following 6 cake slices.
Basic knowledge of CakePHP AuthComponent is required.

1) Add your CAS server coordinates to / path / to / your / application
/app/config/ **core.php**.

Configuration
`````````````

::

    
    /**
     * CAS server coordinates
     */
    	Configure::write('CAS.hostname', 'ip'); //CAS server IP address
    	Configure::write('CAS.port', 443); //CAS server listening port
    	Configure::write('CAS.uri', 'service'); //CAS server service
    

2) Download `Jasig phpCAS client`_ and extract it in / path / to /
your / application /vendors/ so that the layout of your global vendor
folder will look like this:

/ path / to / your / application /vendors/ **CAS- X.X.X /**

/ path / to / your / application /vendors/ **CAS- X.X.X /package.xml**

/ path / to / your / application /vendors/ **CAS- X.X.X /CAS- X.X.X
/**

/ path / to / your / application /vendors/ **CAS- X.X.X /CAS- X.X.X
/CAS.php**

/ path / to / your / application /vendors/ **CAS- X.X.X /CAS- X.X.X
/CAS/**

/ path / to / your / application /vendors/ **CAS- X.X.X /CAS- X.X.X
/docs/**

3) Copy Component Class in / path / to / your / application
/app/controllers/components/ **cas_auth.php**.

Component Class:
````````````````

::

    <?php 
    
    App::import('Vendor', 'cas', array('file' => 'CAS-X.X.X'.DS.'CAS-X.X.X'.DS.'CAS.php'));
    App::import('Component', 'Auth');
    
    /**
     * CasAuthComponent by Pietro Brignola.
     *
     * Extend CakePHP AuthComponent providing authentication against CAS service.
     *
     * PHP versions 4 and 5
     *
     * Comments and bug reports welcome at pietro.brignola AT unipa DOT it
     *
     * Licensed under The MIT License
     *
     * @writtenby      Pietro Brignola
     * @lastmodified   Date: October 12, 2010
     * @license        http://www.opensource.org/licenses/mit-license.php The MIT License
     */ 
    class CasAuthComponent extends AuthComponent {
    	
    	/**
    	 * Main execution method.  Initializes CAS client and force authentication if required before passing user to parent startup method.
    	 *
    	 * @param object $controller A reference to the instantiating controller object
    	 * @return boolean
    	 * @access public
    	 */
    	function startup(&$controller) {
    		// CAS authentication required if user is not logged in 
    		if (!$this->user()) {
    			// Set debug mode
    			phpCAS::setDebug(false);
    			//Initialize phpCAS
    			phpCAS::client(CAS_VERSION_2_0, Configure::read('CAS.hostname'), Configure::read('CAS.port'), Configure::read('CAS.uri'), true);
    			// No SSL validation for the CAS server
    			phpCAS::setNoCasServerValidation();
    			// Force CAS authentication if required
    			phpCAS::forceAuthentication();
    			$model =& $this->getModel();
    			$controller->data[$model->alias][$this->fields['username']] = phpCAS::getUser();
    			$controller->data[$model->alias][$this->fields['password']] = '';
    		}
    		return parent::startup($controller);
    	}
    	
    	/**
    	 * Logout execution method.  Initializes CAS client and force logout if required before returning to parent logout method.
    	 *
    	 * @param mixed $url Optional URL to redirect the user to after logout
    	 * @return string AuthComponent::$loginAction
    	 * @see AuthComponent::$loginAction
    	 * @access public
    	 */
    	function logout() {
    		// Set debug mode
    		phpCAS::setDebug(false);
    		//Initialize phpCAS
    		phpCAS::client(CAS_VERSION_2_0, Configure::read('CAS.hostname'), Configure::read('CAS.port'), Configure::read('CAS.uri'), true);
    		// No SSL validation for the CAS server
    		phpCAS::setNoCasServerValidation();
    		// Force CAS logout if required
    		if (phpCAS::isAuthenticated()) {
    			phpCAS::logout(array('url' => 'http://www.cakephp.org')); // Provide login url for your application
    		}
    		return parent::logout();
    	}
    	
    }
    
    ?>


4) Setup your Controller.

Controller Class:
`````````````````

::

    <?php 
    
    class AppController extends Controller {
    	...
    	var $uses = array(..., 'CasAuth');
    	...
    }
    
    ?>

5) Copy View Template in / path / to / your / application
/app/views/users/ **login.ctp** (assuming you are using standard User
model).

Indeed note that application users could be a subset of CAS
authenticated users, so the following view is displayed if CAS
authentication succeeded but user entry is missing for the
application.

View Template:
``````````````

::

    <?php
    
    <p>CAS authentication succeeded, but user entry must explicitly registered by the application administrator</p>
    
    ?>

6) Use CasAuthComponent as you would do with standard AuthComponent.

Note that CasAuthComponent authenticates every user against CAS
service so, in case of success, dummy blank password is presented to
AuthComponent startup method in order to preserve parent's original
design.

**So be sure to provide the same blank hashed password (according to
your Security.Salt ) for all the entries in your user table.**


enjoy ;-)
~~~~~~~~~



.. _Jasig phpCAS client: https://wiki.jasig.org/display/CASC/phpCAS

.. author:: pietro.brignola
.. categories:: articles
.. tags:: CAS SSO authentication,Articles

