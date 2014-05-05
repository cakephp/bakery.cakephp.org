SmartyCooker - A generic way to make Helpers available to Smarty
================================================================

This is based on "How to use SmartyHelpers with SmartyView"
[url]http://bakery.cakephp.org/articles/view/how-to-use-smartyhelpers-
with-smartyview[/url]. I wanted a more generic SmartyHelper, that
would not depend on the Helper it is supposed to make available to
Smarty so I reworked one of the SmartyHelpers (they are all the same,
except for the Helper they instanciate) to work for all Helpers loaded
in the current View.


Modifications
~~~~~~~~~~~~~
The main modification is to make the SmartyHelper (which I called
SmartyCooker) aware of all the Helpers in the View so it can create a
Smarty call back function for them.

The part that accomplish this is:

::

    
    $view = ClassRegistry::getObject('view');
    foreach($view->loaded as $_k => $loaded) {
    	$helper_name = preg_replace('/Helper/', '', Inflector::classify(get_class($loaded)));
    	if(!preg_match('/SmartyCooker.*/', $helper_name)) {
    		$this->$helper_name = $loaded;
    		$this->helpers[] = $helper_name;
    	}
    }

I know some of you will point out that this is a ugly hack because it
doesn't use any built-in Cake API function to retrieve the list of
Helpers for the View, instead it simply finds a reference to the
'view' object in the Registry and copies its helpers.

If anyone knows a better way to accomplish this, feel free to post in
comments.


Installation
~~~~~~~~~~~~

Note: When you have installed and successfully tested this Helper with
your code, you can move all the other smarty_*.php helpers out of the
way since they won't be needed anymore (don't forget to update your
Controllers accordingly).

Simply create /view/helpers/smarty_cooker.php and paste this code:

::

    
    <?php
    /**
     * SmartyCooker Helper class for wrapping <Any>Helper methods
     *
     * Requires SmartyView from http://cakeforge.org/snippet/detail.php?type=snippet&id=6
     * also requires php5 for reflection
     *
     * Helpers can be called with {cook helper=<helper_name> func=<func_name> ...}
     *   eg {cook helper=html func=link title='Some link' url='http://www.example.com'}
     *
     * @link		http://bakery.cakephp.org/articles/view/138
     * @author		tclineks,cnancy
     * @version		0.0.2
     * @license		http://www.opensource.org/licenses/mit-license.php The MIT License
     * @package 	cake
     * @subpackage	app.views.helpers
     */
    class SmartyCookerHelper extends Helper {
    
    /**
     * function to register wrappers with Smarty object
     *  - called from SmartyView
     */
    	function _register_smarty_functions(&$smarty) {
    		/**
    		 * Load all the view helpers into this helper (so they can be passed on down to the actual helpers to be called from Smarty
    		 * This code may break in future releases because it depends on a registered object called 'view' to represent the View this
    		 * helper belongs to.
    		 * Warning: Ugly hack ahead!
    		 */
    		$view = ClassRegistry::getObject('view');
    		foreach($view->loaded as $_k => $loaded) {
    			$helper_name = preg_replace('/Helper/', '', Inflector::classify(get_class($loaded)));
    			if(!preg_match('/SmartyCooker.*/', $helper_name)) {
    				$this->$helper_name = $loaded;
    				$this->helpers[] = $helper_name;
    			}
    		}
    		$smarty->register_function('cook', array(&$this, 'cook'));
    	}
    
    /**
     * Smarty wrapper for SelectorHelper
     *
     * @param mixed $params params from Smarty template call
     * @param Smarty $smarty Smarty object
     * @return mixed
     */
    	function cook($params, &$smarty) {
    		// sanity check for php version
    		if (!class_exists('ReflectionClass')) {
    			$smarty->trigger_error("SmartyCooker: Error - requires php 5.0 or above", E_USER_NOTICE);
    			return;
    		}
    
    		$helper_name = Inflector::classify($params['helper']);
    		$function_name = $params['func'];
    		$assign = (isset($params['assign']) ? $params['assign'] : NULL);
    		$show_call = (isset($params['__show_call']) ? $params['__show_call'] : NULL);
    		unset($params['helper']);
    		unset($params['func']);
    		unset($params['assign']);
    		unset($params['__show_call']);
    
    		$parameters = array(); // our final array of function parameters
    
    		if (empty($helper_name)) {
    			$smarty->trigger_error("SmartyCooker: missing 'helper' parameter", E_USER_NOTICE);
    			return;
    		}
    
    		if (empty($function_name)) {
    			$smarty->trigger_error("SmartyCooker: missing 'func' parameter", E_USER_NOTICE);
    			return;
    		}
    
    		// process our params array to look for array representations
    		// based on key names separated by underscores
    		$processedParams = $this->_process_params($params);
    
    		$arrayParams = array();
    
    		$classReflector = new ReflectionClass($this->$helper_name);
    		if ($classReflector == null) {
    			$smarty->trigger_error("SmartyCooker: invalid 'helper' $helper_name", E_USER_NOTICE);
    			return;
    		}
    
    		if ($classReflector->hasMethod($function_name)) { // quick sanity check
    
    			$funcReflector = $classReflector->getMethod($function_name);
    			
    			$funcParams = $funcReflector->getParameters(); // returns an array of parameter names
    			
    			foreach ($funcParams as $param) {
    				$paramName = $param->getName();
    				if (isset($processedParams[$paramName])) {
    					$parameters[$paramName] =  $processedParams[$paramName];
    					unset($processedParams[$paramName]);
    				} else {
    					if ($param->isDefaultValueAvailable()) {
    						$parameters[$paramName] = $param->getDefaultValue();
    						// mark the index of array parameters for potential later population
    						if (is_array($parameters[$paramName])) {
    							$arrayParams[] = $paramName;
    						}
    					} else if (!$param->isOptional()) {
    						$smarty->trigger_error("SmartyCooker: Error $paramName parameter is required for method $helper_name::$function_name", E_USER_NOTICE);
    					} else {
    						$parameters[$paramName] = null;
    					}
    				}
    			}
    
    			// check for unfilled array parameters and populate the first with remaining $params
    			if (count($arrayParams)) {
    				$parameters[$arrayParams[0]] = $processedParams;
    			}
    		
    		} else {
    			$smarty->trigger_error("SmartyCooker: Error $helper_name::$function_name is not defined", E_USER_NOTICE);
    			return;
    		}
    
    		if ($show_call) {
    			echo "<pre>SmartyCooker calling $helper_name->$function_name with these parameters: <br />";
    			var_dump($parameters);
    			echo '</pre>';
    		}
    
    		$result = call_user_func_array(array($this->$helper_name,$function_name),$parameters);
    		
    		if (!empty($assign)) {
    			$smarty->assign($assign, $result);
    		} else {
    			return $result;
    		}
    	}
    
    	/**
    	 * scans an associative array looking for array keys
    	 * that represent nested arrays through the use of the delimiter
    	 * parameter (by default an underscore)
    	 *
    	 * @param array associative array of values
    	 * @param string delimiter
    	 * @return array
    	 */
    	function _process_params($params = array(), $delimiter = '_') {
    		$result = array();
    		foreach ($params as $key => $value) {
    			$a = explode($delimiter,$key);
    			if (count($a) > 1) {
    				$this->_recursively_assign($result,$a,$value);
    			} else {
    				$result[$key] = $value;
    			}
    		}
    		return $result;
    	}
    
    	/**
    	 * recursive method to build nested associative arrays
    	 * from delimited key names.  fancy!
    	 *
    	 * @param array result array, passed by reference
    	 * @param array array of key name components, split by the delimiter in _process_params
    	 * @param string the value to ultimately assign to the nested array
    	 */
    	function _recursively_assign(&$result,$keyArray,$value) {
    		$k = array_shift($keyArray);
    		if (count($keyArray) > 1) {
    			$this->_recursively_assign($result[$k],$keyArray,$value);
    		} else {
    			$kk = $keyArray[0];
    			$result[$k][$kk] = $value;
    		}
    	}
    
    }
    ?>



Usage
~~~~~

In your controller, add a reference to SmartyCooker Helper:

::

    
    $var helpers = array('SmartyCooker', 'SomeOtherHelperYouWantToUseInSmarty');

In your Smarty template (.tpl), use as following:

::

    
    {cook helper=[helper_name] func=[function_name] ...}



Example
```````

To use the Html::link Helper function in your 'index' view:

In controller:

::

    
    $var helpers = array('SmartyCooker', 'Html');

In view.tpl:

::

    
    {cook helper=html func=link title='Some title' url='http://www.example.org'}

Feel free to provide feedback if this breaks in your particular
situation.

Note: This does not address the problem of passing arrays to Smarty
functions. So for example, to pass a URL array to Form::create, you
still need to create the URL array in your controller (ugh!) and then
set it as a View variable to be used in Smarty, eg:

::

    {cook helper=form func=create options=$posturlarray}

.



.. author:: christiannancy
.. categories:: articles, helpers
.. tags:: helpers,smartyview,smarty,Helpers

