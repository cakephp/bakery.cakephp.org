Paginating Data with CakePHP, Dojo Data Store and DataGrid
==========================================================

The aim is pull data from your database through JSON and REST-like
services from CakePHP. I have used CakePHP 1.3.2 and Dojo Toolkit
1.4.2.
I have been searching in Internet for a solution to pagination in a
DataGrid widget, but none satisfied me. So, I decided to develop a
solution using Data Store capabilities from Dojo Toolkit.
This solution has permitted to me, isolate pagination details from
Dojo Widgets. Now, I can use CakePHP pagination component and whole
backend framework as always.


Step 1: Define router configuration for JSON
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    
      Router::parseExtensions('json'); //add this line in app/config/routes.php



Step 2: Adapt your controller class
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You should add a beforeFilter function like this:

::

    
      public function beforeFilter() {
        if ($this->RequestHandler->ext === 'json') {
          $this->RequestHandler->setContent('json');
          Configure::write('debug', 0);
        }
        parent::beforeFilter();
      }

In my sample, it looks like this:


Controller Class:
`````````````````

::

    <?php 
    class SitemsController extends AppController {
      // when CakePHP will have full OO support, change visibility to 'protected'.
      public $paginate = array('Sitem' => array('limit' => 10, 'page' => 1));
      
      public function beforeFilter() {
        if ($this->RequestHandler->ext === 'json') {
          $this->RequestHandler->setContent('json');
          Configure::write('debug', 0);
        }
        parent::beforeFilter();
      }
    
      public function index_grid() {
        $sitems = $this->paginate('Sitem');
        $this->set(compact('sitems'));
        if (!$this->RequestHandler->isAjax()) {
          $this->layout = 'default';
        }
      }
    }
    ?>



Model Class:
````````````

::

    <?php 
    class Sitem extends AppModel {
         // it have four fields: (id, name, created, modified).
    }
    ?>



Step 3: Create your views
~~~~~~~~~~~~~~~~~~~~~~~~~

I have created two views:

* One for ajax calls (app/views/sitems/json/index_grid.ctp):


View Template:
``````````````

::

    
     $sitems = Set::extract($sitems, '{n}.Sitem');
     
     echo $javascript->object(array('items' => $sitems, 'identifier' => 'id', 'numRows' => $this->params['paging']['Sitem']['count']));

* Other to simple calls (app/views/sitems/index_grid.ctp):


View Template:
``````````````

::

    
    <div class="sitems">
    <h2><?php __('Sitems');?></h2>
    <div id="gridContainer" style="height:200px;"></div>
    </div>
    <script type="text/javascript">
    <!--
      dojo.require("cake.data.CakeRestStore");
      dojo.require("dojox.grid.DataGrid");
    
      dojo.addOnLoad(function() {
          var layout = [
                        {field:"id", width:"20px", name:"ID"},
                        {field:"name", width:"auto", name:"Name"},
                        {field:"created", width:"auto", name:"Created"},
                        {field:"modified", width:"auto", name:"Updated"}
          ];
          var jsonStore = new cake.data.CakeRestStore({target: "<?php echo $html->url('/sitems/index_grid.json'); ?>"});
          var grid = new dojox.grid.DataGrid({
        	           /*   query: "name: sample query", */
        	           /*   query: {name: "sample query"}, */
                        store: jsonStore,
                        structure: layout,
                        rowsPerPage: 10
          }, "gridContainer");
        });
    //-->
    </script>

You should create layouts of course:


app/views/layouts/default.ctp
`````````````````````````````


View Template:
``````````````

::

    
    <?php echo $html->docType('xhtml11');?>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <title>Sample</title>
    <?php echo $html->charset('utf-8');?>
    <?php echo $html->css('http://ajax.googleapis.com/ajax/libs/dojo/1.4/dojo/resources/dojo.css');?>
    <?php echo $html->css('http://ajax.googleapis.com/ajax/libs/dojo/1.4/dijit/themes/soria/soria.css');?>
    <?php echo $html->css('http://ajax.googleapis.com/ajax/libs/dojo/1.4/dojox/grid/resources/Grid.css');?>
    <?php echo $html->css('http://ajax.googleapis.com/ajax/libs/dojo/1.4/dojox/grid/resources/soriaGrid.css');?>
    <style type="text/css">
    html, body{ width: 100%; height: 100%; padding: 0; border: 0; }
    </style>
    <?php $debugApp = Configure::read('debug'); ?>
    var djConfig = { 
    		parseOnLoad: false, 
    		isDebug: <?php echo ($debugApp ? 'true' : 'false');?>, 
    		locale: 'en-us', 
    		extraLocale: ['es-ar'], 
    		baseUrl: "<?php echo $html->url('/js/lib/');?>"
    		<?php if ($debugApp) {?>
    			,modulePaths: {	"cake":"src/cake"}
    		<?php } ?>
    };
    <script type="text/javascript"
      src="http://ajax.googleapis.com/ajax/libs/dojo/1.4/dojo/dojo.xd.js">
    </script>
    </head>
    <body class="soria">
       <?php echo $content_for_layout;?>
    </body>
    </html>



app/views/layouts/json/default.ctp
``````````````````````````````````


View Template:
``````````````

::

    
    <?php 
    header("Pragma: no-cache");
    header("Cache-Control: no-store, no-cache, max-age=0, must-revalidate");
    header('Content-Type: text/x-json');
    echo $content_for_layout;
    ?>



Step 4: Create a Dojo Data Store
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now, this sample works due to a javascript file
(/js/lib/src/cake/data/CakeRestStore.js):

::

    
    /*
    Copyright (c) 2010 - Mauro Alberto Stepanoski
    
    * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
    * and GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html) licenses.
    */
    dojo.provide("cake.data.CakeRestStore");
    
    dojo.require("dojox.data.JsonRestStore");
    
    dojo.declare("cake.data.CakeRestStore",	dojox.data.JsonRestStore, {
    					"-chains-" : {
    						constructor : "manual"
    					},
    					cakeObjectToQuery : function(/* Object */map) {
    						var enc = encodeURIComponent;
    						var pairs = [];
    						var value = '';
    						var assign = '';
    						for ( var name in map) {
    							value = map[name];
    							assign = name + ":";
    							if (dojo.isArray(value)) {
    								for ( var i = 0; i < value.length; i++) {
    									if (value && isNaN(value[i])) {
    										value[i] = value[i].replace('/', '');
    									}
    									pairs.push(assign + enc(value[i]));
    								}
    							} else {
    								if (value && isNaN(value)) {
    									value = value.replace('/', '');
    								}
    								pairs.push(assign + enc(value));
    							}
    						}
    						return pairs.join("/");
    					},
    					constructor : function(options) {
    						if (typeof options.target == 'string'
    								&& !options.service) {
    							// if exist quit last '/' and json extension.
    							options.target = options.target.replace(/\.json$/g,
    									'').replace(/\/$/g, '');
    						}
    						this.inherited(arguments);
    					},
    					fetch : function(args) {
    						args = args || {};
    						var self = this;
    						function addToQueryStr(obj) {
    							function buildInitialQueryString() {
    								if (args.queryStr == null) {
    									args.queryStr = '';
    								}
    								if (dojo.isObject(args.query)) {
    									args.queryStr = self
    											.cakeObjectToQuery(args.query);
    								} else if (dojo.isString(args.query)) {
    									args.queryStr = encodeURI(args.query
    											.replace('/', ''));
    								}
    							}
    							if (args.queryStr == null) {
    								buildInitialQueryString();
    							}
    							args.queryStr = args.queryStr.replace(/\.json$/g,
    									'')
    									+ '/'
    									+ self.cakeObjectToQuery(obj)
    									+ '.json';
    						}
    						if (args.start || args.count) {
    							// each page must start with a row number multiple
    							// of count.
    							if ((args.start || 0) % args.count) {
    								throw new Error(
    										"The start parameter must be a multiple of the count parameter");
    							}
    							addToQueryStr( {
    								page : ((args.start || 0) / args.count) + 1,
    								show : args.count
    							});
    						}
    						if (args.sort) {
    							var queryObj = {
    								sort : [],
    								direction : []
    							};
    
    							dojo.forEach(args.sort,
    									function(item) {
    										queryObj.sort.push(item.attribute);
    										queryObj.direction
    												.push(item.descending ? 'desc'
    														: 'asc');
    									});
    
    							addToQueryStr(queryObj);
    							delete args.sort;
    						}
    						if (args.queryStr[0] === '/') {
    							args.queryStr = args.queryStr.substr(1);
    						}
    						return this.inherited(arguments);
    					},
    					_processResults : function(results, deferred) {
    						if (results['items']) {
    							var items = results['items'];
    							var count = 0;
    							if (results['numRows']) {
    								count = results['numRows'];
    							} else {
    								count = items.length;
    							}
    							return {
    								totalCount : deferred.fullLength
    										|| (deferred.request.count == count ? (deferred.request.start || 0)
    												+ count * 2
    												: count),
    								items : items
    							};
    						}
    						return this.inherited(arguments);
    					}
    });

I have created this file to provide access to Dojo Widgets.
To make this file, I have taken ideas from dojox.data.RestStore class.

The pagination is made on-demand with Dojo DataGrid. This sample
supports sorting too.

Hope you found this tutorial useful.

Feedback, comments, suggestions welcome.

[i]Note: I donated source code of CakeRestStore class to Dojo
Foundation. So, May be it could be included at dojox.data package.


.. author:: mastepanoski
.. categories:: articles, tutorials
.. tags:: pagination,Dojo,REST,data,json,widget,grid,store,Tutorials

