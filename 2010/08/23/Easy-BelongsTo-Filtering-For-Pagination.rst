Easy BelongsTo Filtering For Pagination
=======================================

This component makes it easy to filter data by a belongsTo
association. Allows you to display pagination results narrowed by the
foreignKey used in the association. The foreignKey can persist when
creating new records, and makes it easier to navigate around tables.
The idea behind this component was to make it easier to show paginated
results for a table that has a belongsTo association. Rather then show
all the records in the pagination view the component will append a
condition to the pagination rules filtering the results by the
foreignKey. The value for the foreignKey is taken from a named
parameter on the URL (For example;
`http://www.example.com/menu_items/belongsto:4`_).

The component will also add the foreignKey value to posted data when
creating new records if it finds the named parameter in the URL during
a POST.


Component Class:
````````````````

::

    <?php 
    /**
     * Automates the assignment and filtering of belongsTo associations for a controller. 
     */
    class GemsBelongsToComponent extends Object 
    {
    	var $controller;
    	var $settings;
    	var $default = array(
    		'named'=>'belongsto',	// the named arugment on the URL, example: /controller/index/belongsto:7
    		'model'=>false,			// the default model for the controller
    		'className'=>false,		// the classname of the belongsto
    		'foreignKey'=>false,	// the fieldname of the belongsto
    		'paginate'=>true,		// apply filtering to pagination
    		'post'=>true,			// add foreignKey to posted data
    		'strict'=>false,		// causes a 404 error if belongsto named parameter is missing
    		'ajax'=>true,			// is strict mode respected in ajax calls.
    		'breadcrumb'=>true,		// should a breadcrum be added
    		'ignore'=>array(),		// actions that should be ignored
    	
    		// should the component look up the displayField of the parent belongsTo record
    		'foreignData'=>true
    	);
    	var $foreignData = array();	// holds the data of the foreignKey.
    	
    	/**
    	 * Tries to return an instance of the model class, or returns FALSE.
    	 */
    	function _import_model($className)
    	{
    		$modelName = $className;
    		if(strpos($className,'.') !== false)
    		{
    			$modelName = split('\.',$className);
    			$modelName = $modelName[1];
    		}
    		if(isset($this->controller->{$modelName}))
    		{
    			return $this->controller->{$modelName};
    		}
    		if(App::import('Model',$className))
    		{
    			return new $modelName();
    		}
    		return false;
    	}
    	
    	/**
    	 * Returns the controller's default model, or the one defined in settings.
    	 */
    	function _get_model()
    	{
    		if($this->settings['model'] === false)
    		{
    			if(!empty($this->controller->modelClass))
    			{
    				return $this->controller->{$this->controller->modelClass};
    			}
    		}
    		else
    		{
    			return $this->_import_model($this->settings['model']);
    		}
    		
    		return false;
    	}
    	
    	/**
    	 * Returns the first defined belongsTo model from the default model, or the one defined in settings.
    	 */
    	function _get_belongs_to(&$model)
    	{
    		if($this->settings['className'] === false)
    		{
    			reset($model->belongsTo);
    			if(($first = current($model->belongsTo)) !== false)
    			{
    				if(!empty($first) && isset($first['className']))
    				{
    					$className = $first['className'];
    					if($this->settings['foreignKey'] === false)
    					{
    						$this->settings['foreignKey'] = $first['foreignKey'];
    					}
    					return $this->_import_model($className);
    				}
    			}
    		}
    		else
    		{
    			return $this->_import_model($this->settings['className']);
    		}
    		
    		return false;
    	}
    	
    	/*
    	 * Assigns the components settings
    	 */
    	function initialize(&$controller,$settings=array())
    	{
    		$this->settings = array_merge($this->default,$settings);
    	}
    	
    	/**
    	 * Configures pagination and handles posted data.
    	 */
    	function startup(&$controller)
    	{
    		if(!in_array($controller->params['action'],$this->settings['ignore']))
    		{
    			$this->controller =& $controller;
    			if(isset($this->controller->params['named'][$this->settings['named']]))
    			{
    				$model = $this->_get_model();
    				if($model !== false)
    				{
    					$belongsToModel = $this->_get_belongs_to($model);
    					if($belongsToModel !== false)
    					{
    						$id = $this->controller->params['named'][$this->settings['named']];
    						if($this->settings['paginate'] === true)
    						{
    							$key = $model->alias.'.'.$this->settings['foreignKey'];
    							$this->controller->paginate['conditions'][$key] = $id;
    						}
    						if($this->settings['post'] === true)
    						{
    							if(!empty($this->controller->data) &&
    							   !isset($this->controller->data[$model->alias][$this->settings['foreignKey']]))
    							{
    								$this->controller->data[$model->alias][$this->settings['foreignKey']] = $id;
    							}
    						}
    						if($this->settings['foreignData'] === true || is_array($this->settings['foreignData']))
    						{
    							if($this->settings['foreignData'] === true)
    							{
    								$options = array('recursive'=>0,'fields'=>array($belongsToModel->alias.'.id',$belongsToModel->displayField)); 
    							}
    							else
    							{
    								$options = array_merge(array('conditions'=>array()),$this->settings['foreignData']);
    							}
    							$options['conditions'][] = array($belongsToModel->alias.'.id'=>$id);
    							$record = $belongsToModel->find('first',$options);
    							$this->foreignData = $record[$belongsToModel->alias];
    						}
    						
    						if($this->settings['breadcrumb'] && isset($this->controller->GemsBreadcrumbs))
    						{
    							$title = Inflector::pluralize(Inflector::humanize(Inflector::underscore(preg_replace('/^Gems/','',$belongsToModel->name))));
    							$con_name = Inflector::underscore(Inflector::pluralize(Inflector::humanize($belongsToModel->name)));
    							$this->controller->GemsBreadcrumbs->append(array(
    									'title'=>$title,
    									'url'=>array(
    										'controller'=>$con_name,
    										'action'=>'index',
    										'filter'=>'current'
    							)));
    						}						
    					}
    				}
    			}
    			else
    			{
    				if($controller->RequestHandler->isAjax())
    				{
    					if($this->settings['strict'] === true && $this->settings['ajax'] === true)
    					{
    						// NOTE: You may want to implement your own error handler for this problem.
    						throw new Exception('Named parameter belongsto is missing from ajax url.');
    					}
    				}
    				else
    				{
    					if($this->settings['strict'] === true)
    					{
    						$controller->flash_notice('GemsBelongsTo','Missing belongsto named parameter.');
    						$controller->cakeError('error404');
    					}
    				}
    			}
    		}
    	}
    }
    ?>



Example Setup
~~~~~~~~~~~~~

In this example there will be a "menus" table and "menu_items" table.
If you were to paginate the "menu_items" table you would see all the
items for all the different menus. Unless you apply a filtering
condition to the paginate settings in the controller. Here are the
example models.


Model Class:
````````````

::

    <?php 
    class MenuItem extends AppModel
    {
    	var $name='MenuItem';
    	var $belongsTo=array('Menu');
    }
    ?>



Model Class:
````````````

::

    <?php 
    class Menu extends AppModel
    {
    	var $name='Menu';
    }
    ?>

The GemsBelongsToComponent is designed to do the filtering work for
you. So you just add it to your component and your all done.


Controller Class:
`````````````````

::

    <?php 
    class MenuItemsController extends AppController
    {
    	var $name = "MenuItems";
    	var $uses = array('MenuItem');
    	var $components = array('GemsBelongsTo');
    	var $scaffold;
    }
    ?>

To see the filtering results you use the named arguments in the URL
when calling the controller's action. For example;
`http://www.example.com/menu_items/index/belongsto:4`_ will show a
pagination view of only the menu items that belong to menu #4.

If you include the "belongsto:4" named parameter in the action for
your forms, then the component will also add the key
data['MenuItem']['menu_id'] to the controller's data, and assigned the
value of #4 from the named parameter. You no longer have show a drop
down in the form for user's to select the associated menu.


Controller Class:
`````````````````

::

    <?php 
    class MenuItemsController extends AppController
    {
    	var $name = "MenuItems";
    	var $uses = array('MenuItem');
    	var $components = array('GemsBelongsTo'=>array(
    		'foreignData'=>array(
    			'fields'=>array('title','description','created'),
    			'recursive'=>2
    	)));
    	var $scaffold;
    
    	function beforeRender() {
    		$this->set('foreignTitle',$this->GemsBelongsTo->foreignData['title']);
    		$this->set('foreignDesc',$this->GemsBelongsTo->foreignData['description']);
    		$this->set('foreignDate',$this->GemsBelongsTo->foreignData['created']);
    	}
    }
    ?>

In the above example the component read the foreign data record for
the belongsTo and stored the data in the GemsBelongsTo->foreignData
variable. By default, the component will read the displayField for
foreign data when filtering, and store that data in the variable.

The options for the GemsBelongsTo component are explained below in
more detail.


+ named: Changes the named parameter used in URLs
+ model: The classname of the default model being used by the
  controller. The default is false, which tells the component to use the
  controller's default model.
+ className: The classname of the belongsTo association. The default
  is false, which tells the component to use the one defined in the
  belongsTo for the default mode.
+ foreignKey: The foreignKey of the belongsTo association. The default
  is false, which tells the component to use the one defined in the
  belongsTo for the default mode.
+ paginate: True to enable filtering of pagination views, or False to
  disable.
+ post: True to insert the foreignKey and value into posted data, or
  False to disable.
+ strict: True to cause a 404 page not found error if the named
  parameter is missing.
+ ajax: True to respect strict mode during Ajax calls.
+ breadcrumb: True to add a breadcrumb using the GemsBreadcrumb
  component.
+ ignore: Array of actions that should be ignored.
+ foreignData: If set to True then the component will read the
  displayField from the foreign data record. If set to False, then this
  is disabled. You can also assign an array which will be used to pass
  options to the find call.

UPDATED: June 05, 2010

The source code has been updated to include a few bug fixes, and also
adds additional options for "strict","ajax","breadcrumb" and "ignore".
When using Ajax calls this component will throw an exception if the
named parameter is missing (if configured to be strict). You might
want to change how this rule is handled. The "breadcrumb" feature can
be easily removed as I have not yet released that component.

Source code provided by `http://www.thinkingmedia.ca`_

.. _http://www.example.com/menu_items/index/belongsto:4: http://www.example.com/menu_items/index/belongsto:4
.. _http://www.thinkingmedia.ca: http://www.thinkingmedia.ca/
.. _http://www.example.com/menu_items/belongsto:4: http://www.example.com/menu_items/belongsto:4

.. author:: thinkingmedia
.. categories:: articles, components
.. tags:: paginate,belongsto,filtering,named,Components

