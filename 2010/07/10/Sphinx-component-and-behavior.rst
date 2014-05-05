Sphinx component and behavior
=============================

I have made a "branch" of the sphinx behavior (
http://bakery.cakephp.org/articles/view/sphinx-behavior ), and make a
component and a behavior that uses this component. I have also add
more features like the geosearch filter. Motivation: i have a many to
many relation, lets imagine that i have a product with a bunch of many
to many relation, example; a product that is of various categories and
have states(used,new,etc) and is for (sell,rent,etc) and could be in
many provinces and could be pay in varios ways (paypal, visa, etc).
And i wanna get the provinces of the products who are for rent and
new, this is a complex and slow query with a lot of inners joins that
could be transform really rapid think using sphinx, for that we need
to work the all the results of the SphinxApi::RunQuery
First of all install sphinx, turn on the searchd demon. Then put the
sphinxapi.php in your vendors path.

Always remember that the component will throw a SphinxException if the
sphinx search demon is not working.

You could get the sphinx results using the component to be able to
work with grouping stuff.
Just do;
$results=SphinxComponent::search($ops=array()));

$ops['filter']=array() example: array('zone_id'=>2,'cat_id'=>43)

$ops['matchMode']= sphinx match mode, example: SPH_MATCH_ALL,
SPH_MATCH_ANY, SPH_MATCH_PHRASE, SPH_MATCH_BOOLEAN, SPH_MATCH_EXTENDED
...

$ops['sortMode']= sphinx sortmode example: SPH_SORT_RELEVANCE,
SPH_SORT_ATTR_DESC, SPH_SORT_ATTR_ASC, SPH_SORT_TIME_SEGMENTS, etc

$ops['fieldWeights']=array() example: array('title'=>10,
'description'=>5)

$ops['rankingMode']= ranking mode, example: SPH_RANK_PROXIMITY_BM25,
SPH_RANK_BM25, SPH_RANK_NONE, SPH_RANK_WORDCOUNT, SPH_RANK_PROXIMITY

$ops['setGeoAnchor']=array(latfield=>latvalue, lngfield=>lngvalue)
example: array('lat'=>-34.432423,'lng'=>-14.434000343)

$ops['groupby']= index name, example: 'zone_id'

$ops['groupdistinct']= index name, example: 'cat_id'

/controllers/components/sphinx.php

Component Class:
````````````````

::

    <?php 
    class SphinxComponent extends Object {
    	/**
    	 * Used for runtime configuration of model
    	 */
    	static $_defaults = array('server' => 'localhost', 'port' => 3312);
    
    	/**
    	 * Spinx client object
    	 *
    	 * @var SphinxClient
    	 */
    	static $sphinx = null;
    
    	function initialize($controller, $config = array()){
    		$settings = array_merge((array)$config,self::$_defaults);
    		
    		App::import('Vendor', 'sphinxapi');
    		
    		self::$sphinx = new SphinxClient();
    		self::$sphinx->SetServer($settings['server'], $settings['port']);
    		
    	}
    
    	function search($query){
    		if(!isset(self::$sphinx)){
    			self::initialize(null);
    		}
    		
    		if (empty($query['limit'])){
    			$query['limit'] = 9999999;
    			$query['page'] = 1;
    		}
    
    		foreach ($query as $key => $setting){
    						
    			switch ($key){
    				case 'filter':
    					foreach ($setting as $key2=>$arg){
    						self::$sphinx->SetFilter($key2, (array)$arg );
    					}
    					break;
    				case 'filterRange':
    					//TODO
    					break;
    				case 'filterFloatRange':
    					$method = 'Set' . $key;
    					foreach ($setting as $arg){
    						$arg[3] = empty($arg[3]) ? false : $arg[3];
    						self::$sphinx->{$method}($arg[0], (array)$arg[1], $arg[2], $arg[3]);
    					}
    					break;
    				case 'matchMode':
    					self::$sphinx->SetMatchMode($setting);
    					break;
    				case 'sortMode':
    					self::$sphinx->SetSortMode(key($setting), reset($setting));
    					break;
    				case 'fieldWeights':
    					self::$sphinx->SetFieldWeights($setting);
    					break;
    				case 'rankingMode':
    					self::$sphinx->SetRankingMode($setting);
    					break;
    				case 'setGeoAnchor':
    					if (!isset($setting['latField'])) $setting['latField']='lat';
    					if (!isset($setting['lngField'])) $setting['lngField']='lng';
    					
    					self::$sphinx->SetGeoAnchor( $setting['latField'], $setting['lngField'],floatval($setting['lat']),floatval($setting['lng']));
    					break;
    				case 'groupby' : 
    					foreach ($setting as $args){
    											
    						if(is_array($args)) {
    							$arg=$args;
    						}else{
    							$arg=array();
    							$arg[0]=$args;
    							$arg[1]="@count desc";
    						}
    						self::$sphinx->SetGroupBy($arg[0], SPH_GROUPBY_ATTR, $arg[1]);
    					}
    					break;
    				case 'groupdistinct':
    					foreach ($setting as $arg){
    						self::$sphinx->SetGroupDistinct ($arg);
    					}
    					break;
    				default:
    					break;
    			}
    		}
    			
    		self::$sphinx->SetLimits(($query['page'] - 1) * $query['limit'],$query['limit']);
    
    		$indexes = !empty($query['index']) ? implode(',' , $query['index']) : '*';
    
    		
    		if(!isset($query['search'])){
    			$result = self::$sphinx->Query('', $indexes);	
    		}else{
    			$result = self::$sphinx->Query($query['search'], $indexes);
    		}
    
    						
    		if ($result === false){
    			
                throw new SphinxException();
    		}
    		
    		return $result;
    	}
    }
    
            
    class SphinxException extends Exception  { }
    ?>


Now the behavior;


Behavior Class:
```````````````

::

    <?php 
    /**
     * Behavior for simple usage of Sphinx search engine
     * http://www.sphinxsearch.com
     *
     * @copyright 2008, Vilen Tambovtsev
     * @author  Vilen Tambovtsev
     * @license      http://www.opensource.org/licenses/mit-license.php The MIT License
     *
     * @modifiedby Eugenio Fage (2010)
     */ 
    
    class SphinxBehavior extends ModelBehavior{
        /**
         * Used for runtime configuration of model
         */
        var $runtime = array();
       
        /**
         * Spinx client object
         *
         * @var SphinxClient
         */
        var $sphinx = null;
    
        function setup(&$model, $config = array()) {
    
            App::import('Component', 'Sphinx');
            
            $this->runtime[$model->alias]['sphinx'] = new SphinxComponent();
        }
        
        /**
         * beforeFind Callback
         *
         * @param array $query
         * @return array Modified query
         * @access public
         */
        function beforeFind(&$model, $query)
        {
            if (empty($query['sphinx']) )
                return true;
    
                
            if ($model->findQueryType == 'count'){
                $model->recursive = -1;
                $query['limit'] = 1;
    			$query['page'] = 1;
            } else if (empty($query['limit'])) {
                $query['limit'] = 9999999;
                $query['page'] = 1;
            }
    
            if(!isset($query['search']))$query['search']='';
            
            $s=array_merge($query['sphinx'],array('search'=>$query['search'],'limit'=>$query['limit'],'page'=>$query['page']));
            $result=$this->runtime[$model->alias]['sphinx']->search($s);
    		        
            unset($query['conditions']);
            unset($query['order']);
            unset($query['offset']);
            $query['page'] = 1;
            if ($model->findQueryType == 'count')    {
                $result['total'] = !empty($result['total']) ? $result['total'] : 0;
                $query['fields'] = 'ABS(' . $result['total'] . ') AS count';
            } else  {
            	if (isset($result['matches'])){
                	$ids = array_keys($result['matches']);
                }elseif (is_array($result)){
               		$ids=array();
               		while($r=array_shift($result)){
               			$ids=array_unique(array_merge($ids,array_keys($r['matches'])));
               		}
                }else{
                	$ids = array(0);
                }
                $query['conditions'] = array($model->alias . '.'.$model->primaryKey => $ids);
                $query['order'] = 'FIND_IN_SET('.$model->alias.'.'.$model->primaryKey.', \'' . implode(',', $ids) . '\')';
            }
    
            return $query;
        }
    }
    
    ?>



Behavior usage
~~~~~~~~~~~~~~


Model Class:
````````````

::

    <?php 
    
    class Company extends AppModel{
        var $actsAs = array('Sphinx'); 
    }
    ?>



Lets imagine that in your database you have the companies table;

CREATE TABLE IF NOT EXISTS `companies` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(200) NOT NULL,
`address` varchar(200) NOT NULL,
`phone` varchar(200) NOT NULL,
`lat` float(10,6) DEFAULT NULL,
`lng` float(10,6) DEFAULT NULL,
`zone_id` int(11) DEFAULT NULL,
`cat_id` int(11) DEFAULT NULL,
`more_data` text NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ;

Okey now lets show the companies from a certain lat/lng location;



Controller Class:
`````````````````

::

    <?php 
    class Companies extends AppController{
       var $uses=array("Company");
    
       var $paginate=array(
           'recursive'=>-1,
           'limit' => 10,
           'order' => array('Company.id' => 'asc')
       );
    
    
       function index($lat=null,$lng=null,$query_search=null){
          if((isset(self::$params['named']['lng'])&&isset(self::$params['named']['lat'])){
             $this->paginate['sphinx']=array(
               'setMatchMode'=>SPH_MATCH_EXTENDED,
               'setGeoAnchor'=>array('lat'=>$lat,'lng'=>$lng),
               'sortMode'=>array(SPH_SORT_EXTENDED => '@geodist ASC')
             );
    
             if($query_search){
               $this->paginate['sphinx']['search']=$query_search;
             }
          }
          
          try{
            $this->set('companies',$this->paginate);
          }catch(SphinxException $e){
            //paginate with no search and using db query
            $this->pagination['sphinx']=null;
            $this->Session->setFlash('Our search engine is temporaly offline.','flash_error');        
    
            $this->set('companies',$this->paginate);
          }
       }
    }
    
    ?>

if we wanna set some filters;

::

    
             $this->paginate['sphinx']=array(
               'setMatchMode'=>SPH_MATCH_EXTENDED,
               'setGeoAnchor'=>array('lat'=>$lat,'lng'=>$lng),
               'sortMode'=>array(SPH_SORT_EXTENDED => '@geodist ASC'),
               'filter'=>array(
                 'filtervar1'=> theFilterValue,
                 'filtervar2'=> theFilterValue2,
                 ...........
               );
             );



.. author:: eugenioclrc
.. categories:: articles, components
.. tags:: search,component,sphinx,speed queries,Components

