Growl Flash Messages
====================

This article shows how to use the Growl like Flash Messages in
CakePHP.
I have created a new Helper for CakePHP that allows your application
use Growl messages. This helper has been built using JQuery 1.4,
JQuery Purr 0.1.0 and CakePHP 1.3.6.

To use this mechanism you must follow these steps:

1. Copy message.php(Helper class) to views/helper:

::

    
    <?php
    /**
     *
     * Helper para trabalhar com mensagens Flash
     * @author fabiozoroastro
     *
     */
    class MessageHelper extends Helper
    {
    	var $helpers = array('Session');
    	var $msgs = 'msgs';
    	var $warnings = 'warnings';
    	var $errors = 'errors';
    	
    	
    	function displayMessages(){
    		$arr = $this->Session->read($this->msgs);
    		$this->Session->delete($this->msgs);
    		
    		if (isset($arr)){
    			$result = $this->prepareMessage($arr, $this->msgs);
    			echo ($result);
    		}
    	}
    
    	function displayWarnings(){
    		$arr = $this->Session->read($this->warnings);
    		$this->Session->delete($this->warnings);
    
    		if (isset($arr)){
    			$result = $this->prepareMessage($arr, $this->warnings);
    			echo ($result);
    		}
    	}
    
    	function displayErrors(){
    		$arr = $this->Session->read($this->errors);
    		$this->Session->delete($this->errors);
    
    		if (isset($arr)){
    			$result = $this->prepareMessage($arr, $this->errors);
    			echo ($result);
    		}
    	}
    
    	private function prepareMessage($arr, $type){
    		$show = "var notice = '<div class=\\\"notice\\\">";
    
    		$show.= " <div class=\\\"$type\\\">";
    		//$show.= " <h4>Atenção</h4>";
    		foreach ($arr as $msg){
    			$show.= " <p>";
    			$show.= "<img src=\\\"img/bullet_black.png\\\" />";
    			$show.= $msg;
    			$show.= "</p>";
    		}
    			
    		$show.= " </div>";
    		$show.= " <div class=\\\"".$type."_bottom\\\">";
    		$show.= " </div>";
    		$show.= " </div>';";
    		$show.= " $( notice ).purr({removeTimer: 4000, usingTransparentPNG: true});";
    
    
    		$result = "<script>";
    		$result .= "eval(\"$show\")";
    		$result .= "</script>";
    		return $result;
    	}
    }
    
    ?>

2. Copy message.php(Component class) to controllers/component:

::

    
    <?php
    /**
     *
     * Classe de componente de mensagens.
     * @author fabiozoroastro
     *
     */
    class MessageComponent extends Object{
    
    	var $components = array('Session');
    
    	/**
    	 *
    	 * Adiciona mensagem de sucesso
    	 * @param unknown_type $message
    	 */
    	function addMsg($message){
    		$this->addMessage('msgs',$message);
    	}
    
    	/**
    	 *
    	 * Adicona uma mensagem de alerta
    	 * @param $message
    	 */
    	function addWarning($message){
    		$this->addMessage('warnings',$message);
    	}
    
    	/**
    	 * Adiciona uma mensagem de erro
    	 * @param unknown_type $message
    	 */
    	function addError($message){
    		$this->addMessage('errors',$message);
    	}
    
    	private function addMessage($type, $message){
    		$arr = $this->Session->read($type);
    		$arr[] = $message;
    		$this->Session->write($type, $arr);
    	}
    
    }
    ?>

3. Copy message.css(style sheet) to webroot/css:

::

    
    #purr-container {
    	position: fixed;
    	bottom: 0;
    	padding-bottom: 25px;
    	right: 0;
    }
    
    .notice {
    	position: relative;
    	width: 324px;
    }
    
    .notice .close {
    	position: absolute;
    	top: 12px;
    	right: 12px;
    	display: block;
    	width: 18px;
    	height: 17px;
    	text-indent: -9999px;
    	background: url(../img/purrClose.png) no-repeat 0 10px;
    }
    
    .warnings, .errors, .msgs{
    	min-height: 50px;
    	padding: 22px 22px 0 22px;
    	color: #FEFEFE;
    	/*font-weight: bold;*/
    }
    
    .msgs{
    	background: url(../img/purrTop_msgs.png) no-repeat left top;
    }
    .warnings{
    	background: url(../img/purrTop_warnings.png) no-repeat left top;
    }
    .errors{
    	background: url(../img/purrTop_errors.png) no-repeat left top;
    }
    
    .notice-body img {
    	width: 50px;
    	margin: 0 10px 0 0;
    	float: left;
    }
    
    .notice-body h3 {
    	margin: 0;
    	font-size: 1.1em;
    }
    
    .notice-body p {
    	margin: 5px 0 0 60px;
    	font-size: 0.8em;
    	line-height: 1.4em;
    }
    
    .msgs_bottom {
    	height: 22px;
    	background: url(../img/purrBottom_msgs.png) no-repeat left top;
    }
    .warnings_bottom {
    	height: 22px;
    	background: url(../img/purrBottom_warnings.png) no-repeat left top;
    }
    .errors_bottom {
    	height: 22px;
    	background: url(../img/purrBottom_errors.png) no-repeat left top;
    }


4. Copy these files to respective destination:
+ jquery-1.4.4.js to [webroot/js];

+ jquery.pur.js to [webroot/js];

+ all-images to [webroot/img];


5. Put this code in yout template file:

::

    
    <?php echo $html->css('message'); ?>
    <?php echo $html->script('jquery-1.4.4.min'); ?>
    <?php echo $html->script('jquery.purr'); ?>
    
    
    		<?php
               try {
               
    			$message->displayMessages();
    			$message->displayWarnings();
    			$message->displayErrors();
               
               } catch (Exception $e) {
    	           log.error($e);
               }
    		?>
    


6. Tell to your controller to use this component and helper:

::

    
    	var $helpers = array('Message');
    	var $components = array('Message');



To test, you'll download my project project, put on webserver and go
to:
http://localhost/growl_article/hi

Links:
`http://docs.jquery.com/Downloading_jQuery`_
`http://code.google.com/p/jquery-purr/`_

Temporarily, you can download from:
`http://zastrotecnologia.com.br/publico/artigos/growl_article.zip`_

.. _http://docs.jquery.com/Downloading_jQuery: http://docs.jquery.com/Downloading_jQuery
.. _http://zastrotecnologia.com.br/publico/artigos/growl_article.zip: http://zastrotecnologia.com.br/publico/artigos/growl_article.zip
.. _http://code.google.com/p/jquery-purr/: http://code.google.com/p/jquery-purr/

.. author:: fabiozoroastro
.. categories:: articles
.. tags:: growl message messages cakephp,Articles

