PluginHandler to load configuration and callbacks for plugins
=============================================================

Purpose of this component is to make plugins more powerful by adding a
callbacks from any controller to trigger before or after any
application action for every plugin used in the application. Another
feature is to load plugin configuration files automatically.

Main features of this component

+ Load all plugin configuration files automaticaly
+ Trigger a plugin callback method before any controller action



Changes
~~~~~~~
1.4

+ Removed and explained Routes configuration from autoloading
+ Fixed a bug related to object storing in ClassRegistry
+ Removed a method which was used to make unique setting keys, related
  to bug



Component Class:
````````````````

::

    <?php
    //File: /app/controllers/components/plugin_handler.php

    /**
     * PluginHandler component adds a basic functionality
     * required for the plugin development. Main features
     * are plugin configuration autoloading and callbacks
     * from the controller.
     *
     * @author Sky_l3ppard
     * @version 1.4
     * @license http://www.opensource.org/licenses/mit-license.php The MIT License
     * @category Components
     */
    class PluginHandlerComponent extends Object {
    	/**
    	 * Reference to the controller
    	 *
    	 * @var object
    	 * @access private
    	 */
    	var $__controller = null;

    	/**
    	 * Plugin Settings, available options:
    	 * 		autoload - array of configuration files to be loaded
    	 * 		permanently - true to load configuration files before any action,
    	 * 			false - loaded only for a plugin's controller actions
    	 * Notice: bootstrap is loaded then the component initialize method is
    	 * fired and for the same reason routes will not work. If you want to include
    	 * then from the plugin. Use the app bootstrap to scan plugins for routes
    	 *
    	 * @var array
    	 * @access private
    	 */
    	var $__settings = array(
    		'autoload' => array(
    			'bootstrap',
    			'core',
    			'inflections'
    		),
    		'permanently' => true
    	);

    	/**
    	 * Initializes component by loading all configuration files from
    	 * all plugins found in application. Configuration files should be
    	 * placed in \app\plugins\your_plugin\config\ directory. Be careful,
    	 * it will overwrite all settings loaded from \app\config if the
    	 * setting name matches.
    	 * At the end it will execute an 'initialize' callback method loaded
    	 * from \plugins\your_plugin\{your_plugin}_auto_loader.php file
    	 *
    	 * @param object $controller - reference to the controller
    	 * @param array $settings - component settings, list of autoload files
    	 * @return void
    	 * @access public
    	 */
    	function initialize(&$controller, $settings = array()) {
    		$this->__controller = $controller;
    		$this->__settings = array_merge_recursive($this->__settings, (array)$settings);

    		foreach (App::objects('plugin') as $plugin) {
    			$is_parent_class = strpos(get_parent_class($controller), Inflector::classify($plugin)) !== false;
    			if ($this->__settings['permanently'] || (!$this->__settings['permanently'] && $is_parent_class)) {
    				foreach ($this->__settings['autoload'] as $type) {
    					App::import(
    						'Plugin',
    						Inflector::classify("{$plugin}_{$type}"),
    						array('file' => Inflector::underscore($plugin).DS.'config'.DS.$type.'.php')
    					);
    				}
    			}
    		}

    		$this->loaderExecute('initialize');
    	}

    	/**
    	 * Executes a 'beforeFilter' callback method loaded
    	 * from \plugins\your_plugin\{your_plugin}_auto_loader.php file
    	 *
    	 * @param object $controller - reference to the controller
    	 * @return void
    	 * @access public
    	 */
    	function startup(&$controller) {
    		$this->loaderExecute('beforeFilter');
    	}

    	/**
    	 * Executes a 'beforeRender' callback method loaded
    	 * from \plugins\your_plugin\{your_plugin}_auto_loader.php file
    	 *
    	 * @param object $controller - reference to the controller
    	 * @return void
    	 * @access public
    	 */
    	function beforeRender(&$controller) {
    		$this->loaderExecute('beforeRender');
    	}

    	/**
    	 * Initializes \plugins\your_plugin\{your_plugin}_auto_loader.php file
    	 * and executes specified callback $method from AutoLoader class for
    	 * all plugins found in application.
    	 *
    	 * @param string $method - name of the method to execute
    	 * @return void
    	 * @access public
    	 */
    	function loaderExecute($method) {
    		foreach (App::objects('plugin') as $plugin) {
    			$loader_file = Inflector::underscore($plugin).'_auto_loader';
    			$loader_class = Inflector::classify($loader_file);
    			$loader_instance = null;

    			if (!ClassRegistry::isKeySet($loader_class)) {
    				App::import('Plugin', $loader_class, Inflector::underscore($plugin).DS.$loader_file.'.php');
    				if (class_exists($loader_class)) {
    					ClassRegistry::addObject($loader_class, new $loader_class());
    				}
    			} else {
    				$loader_instance =& ClassRegistry::getObject($loader_class);
    			}

    			if (!empty($loader_instance) && in_array($method, get_class_methods($loader_class))) {
    				$loader_instance->{$method}($this->__controller);
    			}
    		}
    	}
    }
    ?>


Here is a `tutorial`_ on how to use this component


Using PluginHandler component settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are cases then you need some additional options like plugin
priority, additional configuration file or to set this component to
execute after another one. Here is the usage example:

::

    <?php
    var $components = array(
    	'PluginHandler' => array(
    		'autoload' => array('conf_file', 'another'),
    		'priority' => array('MyPlugin', 'AnotherPlugin', 'Third'),
    		'primary' => true,
    		'permanently' => true
    	)
    );
    ?>


autoload is the list of configuration files to be scanned then
initializing this component. Default are: bootstrap, core,
inflections. These plugin configuration files must be located in
/app/plugins/your_plugin/config directory and in all cases they are
executed after app config files so be careful, you can easily override
default setting values

Notice: routes cannot be loaded from this component, because they must
be invoked before Dispatcher is called. And these configurations are
loaded on component initialize method


A tip on how you can include your routes from plugins
`````````````````````````````````````````````````````

To do that you should scan all plugins in your main application
bootstrap.php file and import them as usual.


priority is the list of plugins which will setup the execution order
for these plugins, ones what were not included automatically will be
added at the end of the list. This is advantage if some plugin
callbacks must be executed after or before another, same as
configuration files

primary if this option is set to true the first time this component is
called it will set it`s priority to be executed before all other
(e.g.: Auth, Session) components

permanently if this setting is set to true PluginHandler component
will load configuration settings before any controller action no
matter if it belongs to this plugin or not. In the other case, it will
load configuration files only for the plugin which action is currently
called.

Here is a directory tree for the example used:

::

    /app
    	/plugins
    		/my_plugin
    			/config
    				bootstrap.php
    				conf_file.php
    				another.php
    			/controllers
    			/models
    			...
    			my_plugin_auto_loader.php
    			my_plugin_app_controller.php
    			...
    		/another_plugin
    			/config
    				conf_file.php
    			...
    		/third
    			...


Any improvements and ideas are very welcome, enjoy.


.. _tutorial: http://bakery.cakephp.org/articles/view/plugin-development-tips-and-tricks

.. author:: sky_l3ppard
.. categories:: articles, components
.. tags:: plugins,plugin config,sky leppard,hooks,callbacks,plugin component,Components

