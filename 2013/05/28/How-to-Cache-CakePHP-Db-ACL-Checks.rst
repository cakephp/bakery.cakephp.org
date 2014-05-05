How to Cache CakePHP Db ACL Checks
==================================

After enabling SQL query logging to Chrome Console I began noticing
that queries against the ARO table appear running at 300 milliseconds
or higher. This is data that doesn’t change often and is needed on
every request so its a great candidate for caching. Unfortunately I
couldn’t find any mechanism for caching DbAcl checks. Here is my
solution.

CacheDbAcl

This is fairly straight forward. First create a new file at
app/Lib/CacheDbAcl.php and `copy and paste the code in (hyperlink)`_
or see bottom of the article.

Next add the following configurations to app/Config/bootstrap.php:
Configure::write('CacheDbAclConfig','default');
> Configure::write('CacheDbAclAro','User.UserGroup');<br >
> <p>Now add or edit the following in app Config/core.php:
Configure::write('Acl.classname', 'CacheDbAcl');
><br >
Code Explained

The CacheDbAcl library works the exact same as the DbAcl library that
is shipped with CakePHP 2.x. The only changes made are to the check()
method. What it does:

#. CacheDbAcl verifies caching is enabled. If it’s not enabled it just
   resumes normal operation.
#. Reads in the name of the cache config you want to use, see
   CacheDbAclConfig.
#. Checks what portion of the ARO you want to use as your cache key
   (more on this later), see CacheDbAclAro.
#. Checks if an entry for the Aro, Aco, and Action exists in the
   cache. If not it performs its normal operations and then caches the
   results. Otherwise it just reads from the cache.

More on the CacheDbAclAro Setting

Since the ARO array passed into DbAcl::check can be quite different
depending on your database structure and application requirements I
allow you to set exactly which portion of the ARO you want to use as a
unique cache key. If you want a cache created for each user, just
don’t set this setting at all.

If you only want cache entries created for each group then use
something similar to what I posted above. Maybe you have a special
use-case and only want it using a very specific portion of the ARO as
a key, this gives you that flexibility.

I went with User.UserGroup for this applicaton because our permissions
are group based and I wanted to reduce the overall amount of cache
entries created. When a group’s permissions are changed the modified
field in the UserGroups model will naturally be updated so new cache
entries will automatically be created and the old ones will eventually
expire.

`My original blog post`_

::

    
    /**
     *
     * Licensed under The MIT License
     * For full copyright and license information, please see the LICENSE.txt
     * Redistributions of files must retain the above copyright notice.
     *
     * @copyright     Copyright (c) Chris Nizzardini
     * @link          http://cakephp.org CakePHP(tm) Project
     * @package       Cake.Controller.Component.Acl
     * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
     */
    App::uses('AclInterface', 'Controller/Component/Acl');
    App::uses('Hash', 'Utility');
    App::uses('ClassRegistry', 'Utility');
     
    /**
     * CacheDbAcl works the exact sabe as DbAcl expect that it will cache the results to using a cache config of your choosing:
     * - Configurations in bootstrap.php: 
     * App::uses('CacheDbAcl', 'Lib');
     * Configure::write('CacheDbAclConfig','Name_of_Your_Cache_Config')
     * Configure::write('CacheDbAclAro','YourArrayKey.YourArray');
     * 
     * - Configurations in core.php:
     * Configure::write('Acl.classname', 'CacheDbAcl');
     * 
     * @package       Cake.Controller.Component.Acl
     */
    class CacheDbAcl extends Object implements AclInterface {
     
    /**
     * Constructor
     *
     */
    	public function __construct() {
    		parent::__construct();
    		$this->Permission = ClassRegistry::init(array('class' => 'Permission', 'alias' => 'Permission'));
    		$this->Aro = $this->Permission->Aro;
    		$this->Aco = $this->Permission->Aco;
    	}
     
    /**
     * Initializes the containing component and sets the Aro/Aco objects to it.
     *
     * @param AclComponent $component
     * @return void
     */
    	public function initialize(Component $component) {
    		$component->Aro = $this->Aro;
    		$component->Aco = $this->Aco;
    	}
     
    /**
     * Checks if the given $aro has access to action $action in $aco
     *
     * @param string $aro ARO The requesting object identifier.
     * @param string $aco ACO The controlled object identifier.
     * @param string $action Action (defaults to *)
     * @return boolean Success (true if ARO has access to action in ACO, false otherwise)
     * @link http://book.cakephp.org/2.0/en/core-libraries/components/access-control-lists.html#checking-permissions-the-acl-component
     */
    	public function check($aro, $aco, $action = "*") {
            
            // if cache is disabled then default to normal operation
            if(Configure::read('Cache.disable') == true){
                return $this->Permission->check($aro, $aco, $action);
            }        
            
            // read name of cache config for AclCache
            $cacheConfig = Configure::read('CacheDbAclConfig');
            // if not found then use default
            if(!$cacheConfig){
                $cacheConfig = 'default';
            }
            
            // check which portion of $aro to use for key
            $cacheAro = Configure::read('CacheDbAclAro');
            // if not set just serialze $aro
            if(!$cacheAro){
                $cacheKey = 'CacheDbAcl_'.md5(serialize($aro).$aco.$action);
            }
            // use custom portion of $aro
            else{
                $tmp = explode('.', $cacheAro);
                $aroTmp = false;
                foreach($tmp as $i){
                    if($aroTmp == false){
                        $aroTmp = $aro[$i];
                    }
                    else{
                        $aroTmp = $aroTmp[$i];
                    }
                }
                
                if(!isset($aroTmp) || empty($aroTmp)){
                    $cacheKey = 'CacheDbAcl_'.md5(serialize($aro).$aco.$action);
                }
                else{
                    $cacheKey = 'CacheDbAcl_'.md5(serialize($aroTmp).$aco.$action);
                }
            }
            
            // check for cache key in cache
            $check = Cache::read($cacheKey);
            
            // if key exists then return value
            if( $check !== false ){
                return $check;
            }
            // check database and write to cache
            else{
                $check = $this->Permission->check($aro, $aco, $action);
                Cache::write($cacheKey,$check,$cacheConfig);
            }
            
    		return $check;
    	}
     
    /**
     * Allow $aro to have access to action $actions in $aco
     *
     * @param string $aro ARO The requesting object identifier.
     * @param string $aco ACO The controlled object identifier.
     * @param string $actions Action (defaults to *)
     * @param integer $value Value to indicate access type (1 to give access, -1 to deny, 0 to inherit)
     * @return boolean Success
     * @link http://book.cakephp.org/2.0/en/core-libraries/components/access-control-lists.html#assigning-permissions
     */
    	public function allow($aro, $aco, $actions = "*", $value = 1) {
    		return $this->Permission->allow($aro, $aco, $actions, $value);
    	}
     
    /**
     * Deny access for $aro to action $action in $aco
     *
     * @param string $aro ARO The requesting object identifier.
     * @param string $aco ACO The controlled object identifier.
     * @param string $action Action (defaults to *)
     * @return boolean Success
     * @link http://book.cakephp.org/2.0/en/core-libraries/components/access-control-lists.html#assigning-permissions
     */
    	public function deny($aro, $aco, $action = "*") {
    		return $this->allow($aro, $aco, $action, -1);
    	}
     
    /**
     * Let access for $aro to action $action in $aco be inherited
     *
     * @param string $aro ARO The requesting object identifier.
     * @param string $aco ACO The controlled object identifier.
     * @param string $action Action (defaults to *)
     * @return boolean Success
     */
    	public function inherit($aro, $aco, $action = "*") {
    		return $this->allow($aro, $aco, $action, 0);
    	}
     
    /**
     * Allow $aro to have access to action $actions in $aco
     *
     * @param string $aro ARO The requesting object identifier.
     * @param string $aco ACO The controlled object identifier.
     * @param string $action Action (defaults to *)
     * @return boolean Success
     * @see allow()
     */
    	public function grant($aro, $aco, $action = "*") {
    		return $this->allow($aro, $aco, $action);
    	}
     
    /**
     * Deny access for $aro to action $action in $aco
     *
     * @param string $aro ARO The requesting object identifier.
     * @param string $aco ACO The controlled object identifier.
     * @param string $action Action (defaults to *)
     * @return boolean Success
     * @see deny()
     */
    	public function revoke($aro, $aco, $action = "*") {
    		return $this->deny($aro, $aco, $action);
    	}
     
    /**
     * Get an array of access-control links between the given Aro and Aco
     *
     * @param string $aro ARO The requesting object identifier.
     * @param string $aco ACO The controlled object identifier.
     * @return array Indexed array with: 'aro', 'aco' and 'link'
     */
    	public function getAclLink($aro, $aco) {
    		return $this->Permission->getAclLink($aro, $aco);
    	}
     
    /**
     * Get the keys used in an ACO
     *
     * @param array $keys Permission model info
     * @return array ACO keys
     */
    	protected function _getAcoKeys($keys) {
    		return $this->Permission->getAcoKeys($keys);
    	}
     
    }



.. _copy and paste the code in (hyperlink): https://gist.github.com/cnizzdotcom/fd662d399731cc270b5a
.. _My original blog post: http://blog.cnizz.com/2013/05/21/how-to-cache-cakephp-dbacl-aco-and-aro-checks/

.. author:: systematical
.. categories:: articles
.. tags:: acl,aro,aco,cache,DbAcl,Articles

