LogUtil Component
=================

LogUtil is a useful component for having logs in your application.By
this component you could saved your application logs in database so
that you could design an interface for users and administrator could
track users activity.

Before we starting this tutorial ,we should note about That you can
find all steps in attachment.I put all your prerequisite in my weblog.
you could download them from
`https://sites.google.com/site/miladjafary/cake-php-modules/`_

I packed app folder of cakePHP which I run it before and attached it
as zip file,so that you can `download`_ it and see the result.

Let's Go:

1)You need to the table which could saved log of your application.You
have to create log table from this script or download it `from here`_:


::


    --
    -- Table structure for table `logs`
    --

    CREATE TABLE IF NOT EXISTS `logs` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `controller` varchar(90) COLLATE utf8_persian_ci NOT NULL,
      `action` varchar(90) COLLATE utf8_persian_ci NOT NULL,
      `params` varchar(100) COLLATE utf8_persian_ci NOT NULL,
      `url` text COLLATE utf8_persian_ci NOT NULL,
      `description` text COLLATE utf8_persian_ci NOT NULL,
      `type` int(11) NOT NULL,
      `created` datetime NOT NULL,
      `modified` datetime NOT NULL,
      `user_id` int(11) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=0;

2)Create log model.You can copy and paste this code or download it
from `here`_:

::


    <?php
    class Log extends AppModel {
        var $name = 'Log';
        var $belongsTo = array(
    		'User' => array(
    			'className' => 'User',
    			'foreignKey' => 'user_id',
    			'conditions' => '',
    			'fields' => '',
    			'order' => ''
    		)
    	);
    }
    ?>

3)Create LogUtilComponent. You should create log_util.php which is a
component and put it to component package also you could download it
from `here.`_

::


    <?php
    class LogUtilComponent extends Object {
     const LOG_TYPE_INFO=0;
     const LOG_TYPE_WARRING=1;
     const LOG_TYPE_ERROR=2;

     var $components = array('Auth');
     /**
      * The name of the model that represents log datasource. Defaults to 'User'.
      *
      * @var string
      * @access public
      */
     var $logModel = 'Log';

     /**
      * Parameter data from Auth::$user
      *
      * @var array
      * @access public
      */
     var $user = array();

     /**
      * Parameter data from Controller::$params
      *
      * @var array
      * @access public
      */
     var $params = array();

     function startup(&$controller){
      $this->params = $controller->params;
      $this->user=$this->Auth->user('id');

     }

     /**
      * get parameters from <code>$this->params['pass']</code>
      *
      * @return string, parameter which pass from url.
      */
     function __getParameters(){
      $parameters='';
      if (!empty($this->params['pass'])){
       foreach ($this->params['pass'] as $param){
        $parameters.=$param.'/';
       }
      }
      return $parameters;
     }
     /**
      * Add one log to the log table.
      * parameters in <code>$options</code> can be:
      * <ul>
      *   <li>description: the value of this key insert instedof description field</li>
      *   <li>type: Determine type of log which could be info ,warring or error.They show by one number</li>
      *   <li>params: The value of this key insert instedof params field.By default it's user parameters</li>
      * </ul>
      *
      * @param array $options.
      * @param string $action
      * @param string $controller
      */
     function log($options=array(),$action=null,$controller=null){
      $params=$this->__getParameters();
      $action = (!empty($action)) ? $action : $this->params['action'];
      $controller = (!empty($controller)) ? $controller : $this->params['controller'];

      $options=array_merge(array('description'=>'','type'=>LogUtilComponent::LOG_TYPE_INFO,'params'=>$params),$options);

      $data['Log']['controller']=$controller;
      $data['Log']['action']=$action;
      $data['Log']['params']=$options['params'];
      $data['Log']['description']=$options['description'];
      $data['Log']['type']=$options['type'];
      $data['Log']['url']=$this->params['url']['url'];
      $data['Log']['user_id']=(!empty($this->user) ? $this->user : 0);

      $logModel= & $this->__getModel();
      $logModel->create();
      $logModel->save($data);
     }

     /**
      * Returns a reference to the model object specified, and attempts
      * to load it if it is not found.
      *
      * @param string $name Model name (defaults to LogUtilComponent::$logModel)
      * @return object A reference to a model object
      * @access public
      */
     private function &__getModel($name = null) {
      $model = null;
      if (!$name) {
       $name = $this->logModel;
      }

      if (PHP5) {
       $model = ClassRegistry::init($name);
      } else {
       $model =& ClassRegistry::init($name);
      }

      if (empty($model)) {
       trigger_error(__('Log::getModel() - Model is not set or could not be found', true), E_USER_WARNING);
       return null;
      }

      return $model;
     }
    }
    ?>

4)Use the LogUtil in your controller method :

::


    <?php
    class UsersController extends AppController {

     var $name = 'Users';
     var $components = array('LogUtil');

     function login(){
      $this->LogUtil->log();
     }

     function welcome(){
      //you could pass option to log method.
      $options=array(
       'description'=>'Login is successful.'
      );
      $this->LogUtil->log($options);
     }
    }
    ?>

As you can see when *log* method call, it save this information in
log table:

-  Controller: name off controller which user call it for doing an
   action.
-  action : action of controller which call by user.
-  params: If action get parameter from * get *, they spilt from url
   and save in this field. ( e.g : /user/edit/12 , params became : 12 ).
   *You could send this value by $option['params'] in log method.*
-  user_id: if user authenticated in your application , LogUtil
   component get user_id automatically and save it to this field.
-  url: get url from $controller->params['url']['ulr'].
-  description : you could save description for each log. * You could
   send this value by $option['description'] * *in log method* *.*
-  type : you could assign type to your logs. the defualt vale is
   info. * You could send this value by $option['type'] * *in log method*
   *.*


contact me
----------

I hope that * LogUtil * Component become resusable for each
application .I will happy if you can improve this component and also
find bugs of it ,if so , please annonce me.

If you had any problem about using *LogUtil* , you could contact me.

Email Address: `milad.jafary@gmail.com`


.. _here: https://sites.google.com/site/miladjafary/cake-php-modules/log.php?attredirects=0&d=1
.. _here.: https://sites.google.com/site/miladjafary/cake-php-modules/log_util.php?attredirects=0&d=1
.. _download : https://sites.google.com/site/miladjafary/cake-php-modules/app-sample.rar?attredirects=0&d=1
.. _from here: https://sites.google.com/site/miladjafary/cake-php-modules/logs-table.sql?attredirects=0&d=1
.. _https://sites.google.com/site/miladjafary/cake-php-modules/: https://sites.google.com/site/miladjafary/cake-php-modules/

.. author:: milad.jafary
.. categories:: articles, components
.. tags:: CakePHP,component,log,Components

