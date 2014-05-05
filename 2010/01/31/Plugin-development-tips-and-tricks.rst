Plugin development tips and tricks
==================================

This tutorial is for users who are already familiar with plugins. The
main objective of it is to show the power of plugins and to make them
more independent from an application itself.

I will start from the most common problems then creating an
independent plugin:

+ Configuration files are configured to be common
+ There is no callback to a plugin AppController like beforeFilter
  from a controller


Plugin configuration and callback methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

I think many developers struggle on handling these operations. In this
tutorial i will build a Language Controller Plugin as an example so
the main functionality will be storing a chosen language in the
session and loading it into configuration before any controller
action.

It is very simple plugin but it needs some adjustments in the
AppController because PluginAppController is accessed only then it`s
controller action is requested and a configuration file like
/app/config/bootstrap.php to set default language. My purpose is to
make none of adjustments in the application. One and only thing is to
display a language switcher in the layout

First you will need a PluginHandler Component which will do all this
magic
`````

Download `PluginHandler component`_ and load with all others in your
/app/app_controller.php like:

Controller Class:
`````````````````

::

    <?php
    //File: /app/app_controller.php

    class AppController extends Controller {
    	var $components = array('PluginHandler', 'Session');
    	var $helpers = array('Html', 'Javascript');
    }
    ?>


Lets bake our plugin with cake console
``````````````````````````````````````

by using command cake bake plugin lcp it will create a lcp plugin in
your /app/plugins directory. If you having problems with it read the
manual about `cake console`_

Now you should have a plugin like this tree structure:

::

    /app
    	/plugins
    		/lcp
    			/controllers
    			/models
    			/views
    			lcp_app_controller.php
    			lcp_app_model.php

Create a folder config in the plugin root like one in app, location
would be /app/plugins/lcp/config and create a bootstrap.php file in
this new folder. PluginHandler component will automatically include
these configuration files from all plugins

Notice: be careful with configuration settings because plugin config
files will override matching app settings, it is better to name
settings with a plugin prefix

We will override or set a default language in our plugin bootstrap.php
configuration file like:

::

    <?php
    //File: /app/plugins/lcp/config/bootstrap.php

    // in this case our PluginHandler will overwrite default language
    // if any was set in one of the app/config/ configuration files
    Configure::write('Config.language', 'en');
    ?>


Now we will need a simple language controller class
```````````````````````````````````````````````````

Create a language controller in your /app/plugins/lcp/controllers
directory:

Controller Class:
`````````````````

::

    <?php
    //File: /app/plugins/lcp/controllers/lcp_languages_controller.php

    class LcpLanguagesController extends LcpAppController {
    	var $name = 'LcpLanguages';
    	var $uses = null;

    	function change($lang) {
    		$this->Session->write('Config.language', $lang);
    		$this->redirect($this->referer(), null, true);
    	}
    }
    ?>


Here comes the most important part - setting the language before any
controller action
`````````````````

We will create a separate file which will hold callback functions
required for our purpose. Create lcp_auto_loader.php file in our
plugin root directory:

::

    <?php
    //File: /app/plugins/lcp/lcp_auto_loader.php

    /**
     * This is a callback class for an app controller to
     * communicate with plugin methods which are required
     * to execute permanently then using this plugin. These
     * callback methods are called from a PluginHandler component
     *
     * @author Sky_l3ppard
     * @version 1.0
     * @license http://www.opensource.org/licenses/mit-license.php The MIT License
     * @category Plugins
     *
     */
    class LcpAutoLoader extends Object {

    	/**
    	 * This callback method is executed right after initialization of
    	 * PluginHandler component. Triggered by PluginHandler component's
    	 * initialize method.
    	 *
    	 * @param Object $controller - reference to the caller
    	 * @return void
    	 */
    	function initialize(&$controller) {
    		if (array_key_exists('Session', $controller->Component->_loaded) && $controller->Component->_loaded['Session']->enabled) {
    			$Session = &$controller->Component->_loaded['Session'];
    			if($Session->check('Config.language')) {
    				Configure::write('Config.language', $Session->read('Config.language'));
    			} else {
    				$Session->write('Config.language', Configure::read('Config.language'));
    			}
    		} else {
    			$this->log('LCP Plugin Loader initialize: Session component required');
    		}
    	}

    	/**
    	 * This callback method is executed right after AppController's
    	 * beforeFilter method. Triggered by PluginHandler component's
    	 * startup method.
    	 *
    	 * @param Object $controller - reference to the caller
    	 * @return void
    	 */
    	function beforeFilter(&$controller) {
    	}

    	/**
    	 * This callback method is executed right after AppController's
    	 * beforeRender method. Triggered by PluginHandler component's
    	 * beforeRender method.
    	 *
    	 * @param Object $controller - reference to the caller
    	 * @return void
    	 */
    	function beforeRender(&$controller) {
    		App::Import('Core', 'Folder');
    		$folder = new Folder(APP.'locale');
    		$content = $folder->read();
    		unset($folder);

    		foreach ($content[0] as $lang) {
    			$record['link'] = Router::url(array(
    				'plugin' => 'lcp',
    				'controller' => 'lcp_languages',
    				'action' => 'change',
    				$lang
    			));
    			$record['title'] = up($lang);
    			$list[] = $record;
    		}
    		$controller->set('languages', $list);
    	}
    }
    ?>

If we want to have some languages add few translations to your
/app/locale folder, for example add ENG and LIT locales:

Locale tree structure:

::

    /app
    	/locale
    		/eng
    			/LC_MESSAGES
    				default.po
    		/lit
    			/LC_MESSAGES
    				default.po

eng locale default.po file:

::

    #File: /app/locale/eng/LC_MESSAGES/default.po
    msgid "translation"
    msgstr "An english language Translation"

lit locale default.po file:

::

    #File: /app/locale/lit/LC_MESSAGES/default.po
    msgid "translation"
    msgstr "Some high tech alien language Translation"

To finish your application in your layout template add somewhere:

View Template:
``````````````

::

    <!-- File: /app/views/layouts/default.ctp -->

    <h1><?php __('translation')?></h1>
    <?php
    	if (!empty($languages)) {
    		foreach ($languages as $lang) {
    			echo '  ';
    			echo $html->link($lang['title'], $lang['link']);
    		}
    	}
    ?>



So what the hell happened then we added LcpAutoLoader class?
````````````````````````````````````````````````````````````

Our callback class LcpAutoLoader is called on every PluginHandler
component callback(method) like startup(), afterRender(), initialize()
and these callbacks triggers LcpAutoLoader`s methods. In this case
then initialize method is triggered function checks the session and
writes current language to config. And then beforeRender is triggered
function checks for locales adds languages variable to the caller's
template wars

Notice: LcpAutoLoader class and file name depends on the name of
plugin. And PluginHandler`s position in the component array is also
important if you want to trigger beforeFilter callback before another
component startup method.


A tip on how to use translation files under plugins
```````````````````````````````````````````````````

Localization for plugins is handled well and you can use it simply by
giving a plugin name for your po or mo files. For example your locale
folder in the plugin root directory should look like:

::

    /app
    	/plugins
    		/lcp
    			/locale
    				/eng
    					/LC_MESSAGES
    						lcp.po
    				/lit
    					/LC_MESSAGES
    						lcp.po
    					/LC_MONETARY
    						lcp.po
    			/controllers
    			...

And you should use translation function with possibility to specify
domain for example:

View Template:
``````````````

::

    <h1><?php __d('lcp', 'test')?></h1>


If somehow you are not using mod_rewrite and .htaccess files, you will
not be able to load media files for plugins like /plugin/css/cssfile ,
because htaccess configuration is needed here. This situation can
occur then hosting company is not allowing to have htaccess files and
mod_rewrite for apache. The most convenient way is to override helper
method so lets create a file /app/app_helper.php and copy the
following code:

[b]Helper Class:
````````````````

::

    <?php
    //File: /app/app_helper.php

    App::import('Core', 'Helper');
    /**
     * Overrides webroot method for plugin css js img integration
     *
     */
    class AppHelper extends Helper {

    	/**
    	 * Overrides webroot method, which in case of plugin changes
    	 * css, js or image location. Plugin is identified by /plugin_name/
    	 * slash is important. You can check the manual
    	 *
    	 * @see cake/libs/view/Helper#webroot($file)
    	 * @param String file - media file
    	 *
    	 */
    	function webroot($file) {
    		foreach (Configure::listobjects('plugin') as $plugin) {
    			$plugin = Inflector::underscore($plugin);
    			if (strpos($file, '/'.$plugin.'/') !== false && strpos($file, '/'.$plugin.'/') == 0) {
    				$webPath = substr($this->webroot, 0, strpos($this->webroot, 'webroot'));
    				$webPath .= 'plugins/'.$plugin.'/vendors'.r('/'.$plugin, '', $file);
    				return $webPath;
    			}
    		}

    		return parent::webroot($file);
    	}
    }
    ?>


Now our app_helper will automatically override webroot function which
in case of identified plugin will return a location in plugin folder.
If no plugin was detected it will return usual method implementation.

Here is an example on how to retrieve your plugin media files, for
more information read `manual`_.

[b]View Template:
`````````````````

::

    <?php
    //File: /app/plugins/my_plugin/views/my_plugin_controller/action.ctp
    echo $html->css('/my_plugin/css/main', null, null, false);
    echo $html->css('/my_plugin/css/new');
    echo $javascript->link('/my_plugin/js/my_js');
    ?>
    <div id="my_css_div"><?php $html->image('/my_plugin/img/my_image.png')?></div>

Your plugin media file tree should look like:

::

    /app
    	/plugins
    		/my_plugin
    			/vendors
    				/img
    					my_image.png
    				/css
    					main.css
    					new.css
    				/js
    					my_js.js
    			/...


Any ideas on functionality improvements are very welcome, enjoy


.. _cake console: http://book.cakephp.org/view/108/The-CakePHP-Console
.. _manual: http://book.cakephp.org/view/742/Plugin-Images-CSS-and-Javascript
.. _PluginHandler component: http://bakery.cakephp.org/articles/view/pluginhandler-to-load-configuration-and-callbacks-for-plugins

.. author:: sky_l3ppard
.. categories:: articles, tutorials
.. tags:: tips,tricks,config,plugins,plugin css,sky leppard,trigger,locale,plugin configuration,callback,Tutorials

