Behavior for Model Inheritance: the missing feature
===================================================

After searching all around google and backery, reading the few
articles that I've found, I've wrote my own class to implement model
inheritance in Cakephp. Using Behaviors. I'm going to post only the
code for the behavior with a little explain, cause I'm sorry but I
cannot understand how to use this form to post Articles. I still hope
my code could help someone who's going crazy without this awesome
feature. And I still hope the cakephp team is going to add this
feature in the near feature.
This is a simple behavior who add the flexibility to implement STI
(Single Table Inheritance), MTI (Multiple Table Inheritance) and SMTI,
a mix between STI and MTI.

Single Table Inheritance
This kind of inheritance holds the parent's fields and the child's
fields in the same database table, using a field to distinguish
between children. See for example
`http://www.martinfowler.com/eaaCatalog/singleTableInheritance.html`_
Implementing the above example with my behavior would result in:

::


    <?php

    //base class
    class Player extends AppModel{
    	public $name = 'Player';
    	public $fields = array('id','name');

    	public $validate = array('… globbal validates … ');
    }


    //Fooballer
    App::import('Model','Player');
    class Footballer extends Player{

    	public $name  = 'Footballer';
    	public $useTable = 'players';

    	public $actsAs = array(
    		'Inherit' => array(
    			'fields' => array('club'), //optional
    			'method' => 'STI'
    		)
    	);

    	public $validate = array('… local validates …');
    }

    //other classes

Now you can use Footballer model without warring about the parent
class, just using it as a simple model.

Multiple Table Inheritance

For a full description of this pattern, see
`http://www.martinfowler.com/eaaCatalog/classTableInheritance.html`_.
With my code:

::


    <?php

    //base class
    class Player extends AppModel{
    	public $name = 'Player';

    	public $validate = array('… globbal validates … ');
    }


    //Fooballer
    App::import('Model','Player');
    class Footballer extends Player{

    	public $name  = 'Footballer';

    	public $actsAs = array( 'Inherit' );

    	public $validate = array('… local validates …');
    }

    //other classes



The code
Here is the code for InheritBehavior

::


    <?php
    /**
     * The InheritBehavior allows a model to act as a subclass of another model and
     * allows the implementation of 'ISA' relationships in Entity-Relationship database models.
     * Parameters are passed to this behavior class to define the parent model of the subclass
     * This class was based on and inspired by Matthew Harris's ExtendableBehavior class
     * which can be found at http://bakery.cakephp.org/articles/view/extendablebehavior
     * and Eldon Bite's SubclassBehavior class which can be found at
     * http://bakery.cakephp.org/articles/eldonbite/2008/09/18/subclass-behavior.
     *
     * @author     Giorgio Maria Santini <giosan83@gmail.com>
     * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
     */
    class InheritBehavior extends ModelBehavior{

    	const MTI_METHOD 	= 'MTI';
    	const STI_METHOD 	= 'STI';
    	const SMTI_METHOD 	= 'SMTI';
    	const DEFAULT_METHOD = 'MTI';

    	/**
    	 * Override parent::setup() to setting up the behavior.
    	 * @param Array $config allows user to override the default settings. Available options are:
    	 * 	- plugin, String, defines the plugin name of the parent class. Default 'Public'
    	 * 	- parentClass, String, defines the classname from which the current class is inheriting.
    	 * 	  Default setted by reflaction using get_parent_class
    	 * 	- fullPathParentClass, String, fully qualified name (Plugin+dot+Classname) of the class from which the current class is inheriting.
    	 * 	  Default setted up using plugin and parentClass setted in settings
    	 * 	- inheritanceField, String, defines the inheritance field in STI/SMTI inheriting. Default 'type'
    	 * 	- inheritanceAlias, String, the default value for inheritanceField. Default Inflector::tableize($model->alias)
    	 * 	- fields, Array, the fields belongs to the current model in STI method. See _initFields for further informations. This option is optional
    	 *  - method, String, how the current model in inheriting. Available options:
    	 *  	MTI (Multiple Table Inheritance), STI (Single Table Inheritance), SMTI ( Mix between MTI and STI)
    	 * @see ModelBehavior::setup()
    	 */
    	public function setup(&$model, $config = array()) {

            $this->settings[$model->alias]  =
            	am(array(
            		'plugin' => 'Public',
            		'parentClass' => get_parent_class($model),
            		'fullPathParentClass' => '',
            		'inheritanceField' => 'type',
            		'inheritanceAlias' => Inflector::tableize($model->alias),
            		'fields' => array(),
            		'method' => self::DEFAULT_METHOD
            		), $config);

           	$this->_setMethod($model);
          	$this->_init($model);

        }

        /**
         * Initializes the behavior class and the model class
         * @param unknown_type $model
         */
        private function _init($model){
    		extract($this->settings[$model->alias]);

        	 $this->_initParent($model);

        	 if($method==self::STI_METHOD)
        	 	$this->_initFields($model);
        	 else
        	 	$this->_initBindings($model);
        }

        /**
         * Normalize choosen method for inheritance
         * @param unknown_type $model
         */
        private function _setMethod($model){
        	$availableMethods = array(self::MTI_METHOD,self::STI_METHOD,self::SMTI_METHOD);

        	$this->settings[$model->alias]['method'] = strtoupper($this->settings[$model->alias]['method']);

        	if(!in_array($this->settings[$model->alias]['method'],$availableMethods))
        		$this->settings[$model->alias]['method'] = self::DEFAULT_METHOD;
        }

        /**
         * Initializes the parent reference for the model
         * @param unknown_type $model
         */

    	private function _initParent($model){

    		extract($this->settings[$model->alias]);

    		if(!$fullPathParentClass)
    			$fullPathParentClass = ( $plugin ? $plugin.'.' : '' ).$parentClass;

            $model->parent = ClassRegistry::init($fullPathParentClass);

            $model->parentClass = array('name'=>$parentClass,'path'=>$fullPathParentClass);

            /*
             * Model inherits the parent validate rules
             */
            $model->validate = am($model->validate, $model->parent->validate);
            $model->parent->validate = array(); //avoid duplicated validations

            $this->settings[$model->alias]['fullPathParentClass'] = $fullPathParentClass;

    	}

    	/**
    	 * Removes unnecessary fields from the model schema in STI method.
    	 * If no field is specified in the settings, or no $fields property has been setted in parent,
    	 * no fields will be removed from the schema
    	 * @param unknown_type $model
    	 */

    	private function _initFields($model){
    		extract($this->settings[$model->alias]);

    		if(property_exists($model, 'fields') && $fields && $model->fields){

    			if(!is_array($model->fields))
    				$model->fields = array($model->fields);

    			$model->fields = am($model->fields,$fields);

    			$_schema = array_keys($model->_schema);
    			foreach($_schema as $key){
    				if(!in_array($key,$model->fields) && $key != $inheritanceField)
    					unset($model->_schema[$key]);
    			}
    		}
    	}

    	/**
    	 * Adds bindings for MTI/SMTI methods
    	 * @param unknown_type $model
    	 */

    	private function _initBindings($model){
    		extract($this->settings[$model->alias]);

    		//add binding
            $binding = array(
                "{$model->parent->alias}" => array(
                    'className' => $model->parentClass['path'],
                    'foreignKey' => "{$model->primaryKey}",
            		'type' => 'INNER'
                )
            );

            if(property_exists($model->parent, 'bindings') && $method == self::MTI_METHOD){
            	$binding = am($binding,$model->parent->bindings);
            }

            $model->bindings = $binding;

    	}

    	/**
    	 * Adds $inheritanceAlias to $inheritanceField
    	 * @param unknown_type $model
    	 * @param unknown_type $query
    	 */
    	private function _stiBeforeSave($model,$query){
    		extract($this->settings[$model->alias]);

    		if (isset($model->_schema[$inheritanceField]) ){
    			$model->data[$model->alias][$inheritanceField] = $inheritanceAlias;
    		}

    		return true;
    	}

    	/**
    	 * Adds $inheritanceAlias to $inheritanceField to the query conditions
    	 * @param unknown_type $model
    	 * @param unknown_type $query
    	 */
    	private function _stiBeforeFind($model,$query){
    		extract($this->settings[$model->alias]);

    		 if (isset($model->_schema[$inheritanceField]) ){

    		 	$field = $model->alias.'.'.$inheritanceField;

    			if (!isset($query['conditions'])) {
                    $query['conditions'] = array();
                }

                if (is_string($query['conditions'])) {
                    $query['conditions'] = array($query['conditions']);
                }

                if (is_array($query['conditions'])) {
                    if (!isset($query['conditions'][$field])) {
                        $query['conditions'][$field] = array();
                    }
                    $query['conditions'][$field] = $inheritanceAlias;
                }
    		 }

    		 return $query;
    	}

    	/**
    	 * Adds bindings on fly to join all parents and current model together
    	 * @param unknown_type $model
    	 * @param unknown_type $query
    	 */
    	private function _mtiBeforeFind($model,$query){

    		$model->bindModel(array('belongsTo' => $model->bindings));
    		return $query;
    	}

    	/**
    	 * MTI needs parent to be saved before the current model. Model->primaryKey is then setted up with parent->primaryKey
    	 * @param unknown_type $model
    	 */
    	private function _mtiBeforeSave($model){
    		extract($this->settings[$model->alias]);

    		if($method==self::SMTI_METHOD)
    			$model->data[$model->alias][$inheritanceField] = $inheritanceAlias;

    		$data = $model->data[$model->alias];
    		$model->parent->data = array($model->parent->alias => $data);

    		if(!$model->parent->save($data))
    			return false;

    		$model->id = $model->parent->id;
    		$model->data[$model->alias][$model->primaryKey] = $model->parent->id;
    		return true;
    	}

    	/**
    	 * (non-PHPdoc)
    	 * @see ModelBehavior::beforeFind()
    	 */
    	public function beforeFind(&$model, $query){
    		extract($this->settings[$model->alias]);

    		if($method==self::STI_METHOD)
    			return $this->_stiBeforeFind($model, $query);
    		else
    			return $this->_mtiBeforeFind($model, $query);

    	}

    	/**
    	 * (non-PHPdoc)
    	 * @see ModelBehavior::afterFind()
    	 */
    	public function afterFind(&$model, $results, $primary=false){
    		extract($this->settings[$model->alias]);

    		if($method!=self::STI_METHOD){

    			$binds = array_keys($model->bindings);

    			foreach($results as $i => $result){

    				foreach($binds as $alias){

    					if(isset($result[$alias]) && isset($result[$model->alias])){
    						$results[$i][$model->alias] = am($result[$alias], $results[$i][$model->alias]);
    						unset($results[$i][$alias]);
    					}

    				}

    			}
    		}
            return $results;
    	}

    	/**
    	 * (non-PHPdoc)
    	 * @see ModelBehavior::afterDelete()
    	 */
    	public function afterDelete(&$model){
    		extract($this->settings[$model->alias]);

    		if($method!=self::STI_METHOD)
    			$model->parent->delete($model->id);

    		return true;
    	}

    	/**
    	 * (non-PHPdoc)
    	 * @see ModelBehavior::beforeSave()
    	 */
    	public function beforeSave(&$model){
    		extract($this->settings[$model->alias]);

    		if($method==self::STI_METHOD)
    			return $this->_stiBeforeSave($model);
    		else
    			return $this->_mtiBeforeSave($model);

    	}

    	/**
    	 * (non-PHPdoc)
    	 * @see ModelBehavior::afterSave()
    	 */
    	public function afterSave(&$model, $created){
    		extract($this->settings[$model->alias]);

    		if($method==self::STI_METHOD)
    			return true;
    		else
    			return $model->parent->id == $model->id;
    	}

    }


Every feedbacks are welcome, and please help me to improve this class
for better performances and bugfixing
Thank you for your reading

.. _http://www.martinfowler.com/eaaCatalog/singleTableInheritance.html: http://www.martinfowler.com/eaaCatalog/singleTableInheritance.html
.. _http://www.martinfowler.com/eaaCatalog/classTableInheritance.html: http://www.martinfowler.com/eaaCatalog/classTableInheritance.html

.. author:: santino83
.. categories:: articles, behaviors
.. tags:: model,table,multiple,behavior,ORM,inheritance,sti,Single,MTI,Behaviors

