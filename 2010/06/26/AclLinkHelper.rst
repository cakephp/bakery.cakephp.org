AclLinkHelper
=============

This helper automatically hides links to controllers/actions not
available to the currently authenticated user.
In order to reduce the Database load this helper will store
information in the Session so any controller/action -pair will only be
requested from the Database the first time.
Links that are not found in the database will always behave as if the
user is allowed to click it.

The additional parameter $returnText will if set to true, cause the
helper to return the name of the link in case the user is not allowed
to access the action.

It is advised not to use this helper for static-links.
Also image-links don't work for the moment.

to use it simply add it to your AppController like so:

app_controller.php:

Controller Class:
`````````````````

::

    <?php 
    var $helpers = array('AclLink');
    ?>

And replace occurences of $html->link() with $aclLink->link()

acl_link.php:

Helper Class:
`````````````

::

    <?php 
    class AclLinkHelper extends AppHelper{
    	var $acos = array();
    	var $helpers = array('Html');
      
    	function __construct(){
    		App::import('Component', 'Acl');
    		App::import('Component', 'Session');
    		App::import('Helper', 'Html');
    		$this->Acl=new AclComponent();
    		$this->Session=new SessionComponent();
    		$this->Html=new HtmlHelper();
    	}
    
    	function link($name, $options=array(), $c=null,$d=null, $returnText=false ){
    		$acoExists=true;
    		$user=$this->Session->read('Auth.User.username');
    		$acos=$this->Session->read('Auth.Acos');
    		if(isset($options['controller'])) $controller=$options['controller'];
    		else $controller=$this->params['controller'];
    		$controller = Inflector::camelize($controller);
    		$action=$options['action'];
    		if(!isset($acos[$controller][$action])){
    			$controllerAco=$this->Acl->Aco->find('first', array('recursive'=>0,'conditions'=>array('alias' => $controller)));
    			if($cid=$controllerAco['Aco']['id']){
    				$actionAco=$this->Acl->Aco->find('count',array('recursive'=>0,'conditions'=>array('parent_id' => $cid, 'alias'=>$action)));
    				if($actionAco<1) $acoExists=false;
    			}else $acoExists=false;
    			if(($acoExists && $this->Acl->check($user,$controller.DS.$action)) || (!$acoExists)){
    				$acos[$controller][$action]=true;
    			}
    			else {
    				$acos[$controller][$action]=false;	
    			}
    			$this->Session->write('Auth.Acos',$acos);
    		}
    		if($acos[$controller][$action]){
    			return($this->Html->link($name,$options,$c,$d));
    		}
    		if($returnText) return $name;
    		else return "";
      }
    }
    ?>



.. author:: joel.stein
.. categories:: articles, helpers
.. tags:: acl,[link],Helpers

