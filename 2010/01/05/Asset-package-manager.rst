Asset package manager
=====================

Manage asset packages like a Linux package manager


Example usage: Let's install jQuery, jQuery UI and sIFR3
````````````````````````````````````````````````````````


1. Create your package directory
++++++++++++++++++++++++++++++++
I like APP/webroot/packages. It is the default package directory.


2. Save the helper file
+++++++++++++++++++++++
APP/views/helpers/asset_package.php (the code is below)


3. Add "AssetPackage" to your controller's helpers property
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Controller Class:
`````````````````

::

    <?php 
    
    class AppController extends Controller {
       
       var $helpers = array('AssetPackage');
       
       // If you package directory is not APP/webroot/packages, pass it in
       //var $helpers = array('AssetPackage' => 'assets'); // APP/webroot/assets
       
       // ...
       
    }
    
    ?>



4. Unpack your packages to your new package directory
+++++++++++++++++++++++++++++++++++++++++++++++++++++


+ jQuery: APP/webroot/packages/jquery
+ jQuery UI: APP/webroot/packages/jqueryui
+ sIFR3: APP/webroot/packages/sifr3



5. Define the packages in the view or layout
++++++++++++++++++++++++++++++++++++++++++++

View Template:
``````````````

::

    <?php
    
    // Install jQuery
    $assetPackage->install('jquery', array(
       'js' => 'jquery.min.js', // You can use a path relative the package dir.
                                // This loads APP/webroot/packages/jquery/jquery.min.js
       'use' => false, // Load the package only if another depends on it
       ));
       
    // Install jQuery UI
    $assetPackage->install('jqueryui', array(
       'js' => 'jquery-ui.min.js', // Link: /packages/jqueryui/jquery-ui.min.js
       'use' => true, // Load the package and its dependencies (jQuery)
       'dependencies' => 'jquery', // Always load jQuery first 
       ));
       
    // Install sIRF3
    $assetPackage->install('sifr3', array(
       'js' => array( // Use an array for more than one file of the same type
          'js/sifr.js',        // Link: /packages/sifr3/js/sifr.js
          '/js/sifr-config.js' // Link: /js/sifr-config.js
          ),
       'css' => 'css/sifr.css', // You can load package CSS files as well
       'use' => true, // Load the package
       ));
    ?>



6. Add the following to your layout file:
+++++++++++++++++++++++++++++++++++++++++

View Template:
``````````````

::

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
       <head>
          ...
          <?php echo $assetPackage->tags(); ?>
       </head>
       <body>
          ...
       </body>
    </html>

Or, if your the kind of person that likes to define your JavaScript at
the bottom of the HTML:

View Template:
``````````````

::

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
       <head>
          ...
          <?php echo $assetPackage->tags('css'); ?>
       </head>
       <body>
          ...
          <?php echo $assetPackage->tags('js'); ?>
       </body>
    </html>



Here's the helper code
``````````````````````

Helper Class:
`````````````

::

    <?php 
    
    class AssetPackageHelper extends AppHelper {
       
       var $__installed = array();
       var $__loaded = array();
       var $__package_directory = 'packages';
       
       function __construct($options=null) {
          parent::__construct($options);
          if (is_string($options)) {
             $this->__package_directory = $options;
          }
       }
       
       function install($key, $options) {
          
          // Defaults
          if (!isset($options['use'])) {
             $options['use'] = false;
          }
          if (!isset($options['conditional'])) {
             $options['conditional'] = '';
          }
          foreach (array('dependencies', 'css', 'js') as $key_) {
             if (!isset($options[$key_])) {
                $options[$key_] = array();
             }
             $options[$key_] = array_values((array) $options[$key_]);
          }
          
          // Check paths
          foreach (array('css', 'js') as $key_) {
             foreach ($options[$key_] as $key__ => $js) {
                $options[$key_][$key__] = $this->__uri($js, $key);
             }
          }
          
          // Install package
          $this->__installed[$key] = $options;
       }
       
       function toUse($key) {
          if (!$this->isInstalled($key)) {
             trigger_error('Asset package "'.$key.'" not installed');
             return;
          }
          $this->__installed[$key]['use'] = true;
       }
       
       function tags($filter=null) {
          if (!in_array($filter, array('js', 'css'))) {
             $filter = 'both';
          }
          $this->__loadAll();
          $html = "\n";
          foreach ($this->__loaded as $key => $options) {
             $tags = '';
             if (in_array($filter, array('js', 'both'))) {
                foreach ($options['js'] as $js) {
                   $tags .= $this->__line('<script type="text/javascript" src="'.$js.'" ></script>');
                }
             }
             if (in_array($filter, array('css', 'both'))) {
                foreach ($options['css'] as $css) {
                   $tags .= $this->__line('<link rel="stylesheet" type="text/css" href="'.$css.'" />');
                }
             }
             if ($tags === '') {
                continue;
             }
             
             // Add conditionals
             if ($options['conditional'] !== '') {
                $tags = $this->__line('<!--[if '.$options['conditional'].']>')
                   .$tags
                   .$this->__line('<![endif]-->');
             }
             
             // Add header
             if (Configure::read('debug') > 0) {
                $tags = $this->__line('<!-- '.$key.' -->')
                   .$tags
                   .$this->__line('<!-- /'.$key.' -->');
             }
             
             // Append to main var
             $html .= $tags;
          }
          return $html;
       }
       
       function isLoaded($key) {
          return isset($this->__loaded[$key]);
       }
       
       function isInstalled($key) {
          return isset($this->__installed[$key]);
       }
       
       function __loadAll() {
          foreach ($this->__installed as $key => $options) {
             if ($options['use']) {
                $this->__load($key);
             }
          }
       }
       
       function __load($key) {
          if ($this->isLoaded($key)) {
             return;
          }
          if (!$this->isInstalled($key)) {
             trigger_error('Asset package "'.$key.'" not installed');
             return;
          }
          $options = $this->__installed[$key];
          foreach ($options['dependencies'] as $key_) {
             $this->__load($key_);
          }      
          $this->__loaded[$key] = $options;
       }
       
       function __uri($uri, $key) {
          if (strpos($uri, '/') === 0) {
             return $uri;
          } else {
             return '/'.$this->__package_directory.'/'.$key.'/'.$uri;
          }
       }
       
       function __line($html) {
          return "\t\t".$html."\n";
       }
       
    }
    
    ?>



.. author:: mattalexx
.. categories:: articles, helpers
.. tags:: assets,linux,package,Helpers

