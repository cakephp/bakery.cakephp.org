NumberFormating by locale-settings
==================================

loading data form database had no number formatting options for
floating point fields. In detail i mean converting a float like 3.33
to locale/region specific one like 3,33. So this behavior solve this
issue for me.


Solution based on Behavior
~~~~~~~~~~~~~~~~~~~~~~~~~~

On Startup the model schema is scanned up for float types.
After find some data the result is scanned for the fields belong to
the floating types.
On Validating the process is reversed so the models validation takes
correct results.


::

    
    <?php
    /**
     * NumberFormatBehavior
     * Created: 26.03.2010 / 17:24:45
     * 
     * PHP version 5
     * 
     * @category	Model/Behavior
     * @package		biz.lubico.behaviors
     * @version		v1.0.0
     * @since		v1.0.0
     * @author		Sven Assmann <sven.assmann@lubico.biz>
     * @license		http://www.gnu.org/copyleft/gpl.html
     * @link		http://www.lubico.biz
     * @copyright	Copyright 2006-2010, Lubico Business
     * 
     */
     
    class NumberFormatBehavior extends ModelBehavior{
    	
    	var $observedTypes = array('float');
    
    	function setup(&$Model, $settings) {
    		$numberFields = array();
    		foreach($Model->_schema as $key => $values){
    			if(	isset($values['type']) && in_array($values['type'], $this->observedTypes)){
    				array_push($numberFields, $key);
    			}
    		}
    		
    		if (!isset($this->settings[$Model->alias])) {
    			$this->settings[$Model->alias] = $numberFields;
    		}
    		$this->settings[$Model->alias] = array_merge(
    			$this->settings[$Model->alias], (array)$settings);
    	}
    	
    	function afterFind(&$Model, $results, $primary){
    		$loc = localeconv();
    		foreach($results as $n => &$m){
    			if(is_array($m)){
    				foreach($this->settings[$Model->alias] as $field){
    					if(!empty($m[$Model->alias][$field])){
    						$m[$Model->alias][$field] = str_replace('.', '#', $m[$Model->alias][$field]);
    						$m[$Model->alias][$field] = str_replace(',', $loc['thousands_sep'], $m[$Model->alias][$field]);
    						$m[$Model->alias][$field] = str_replace('#', $loc['decimal_point'], $m[$Model->alias][$field]);
    					}
    				}
    			}
    		}
    		return $results;		
    	}
    	
    	function beforeValidate(&$Model){
    		$loc = localeconv();
    		foreach($this->settings[$Model->alias] as $field){
    			if(!empty($Model->data[$Model->alias][$field])){
    				if(strpos($Model->data[$Model->alias][$field], $loc['decimal_point'])){
    					$Model->data[$Model->alias][$field] = str_replace($loc['decimal_point'], "#", $Model->data[$Model->alias][$field]);
    					$Model->data[$Model->alias][$field] = str_replace($loc['thousands_sep'], "", $Model->data[$Model->alias][$field]);
    					$Model->data[$Model->alias][$field] = str_replace("#", ".", $Model->data[$Model->alias][$field]);
    				}
    			}
    		}
    		return true;
    	}
    	
    	
    }
    ?>



.. author:: sassman
.. categories:: articles, behaviors
.. tags:: behavior,in,numberformating,Behaviors

