Start your own bouncely and report mail bounces with a gmail and
cakephp
=======

A few months ago i hire a service to track my mail bounces and clean
the old mails from my subscriptors. The service was good but a bit
expensive for me, so i figure an easy way to replicate this service.
Ingredients:
* 1 gmail account
* install the php5-imap ( `http://php.net/manual/en/book.imap.php`_ )
* add the Return-path header to your outgoing mails with the gmail
mail or use the gmail account for send mails
* 1 gmail filter

Step 1 Add the return path in the sending process:

::

    
    $gmailaccount='mybounces@gmail.com';
    $mailheader ="Content-Type: text/plain;\nReturn-Path: $gmailaccount\n";
    mail($address, $mailsubject, $mailmessage, $mailheader."From: $from_address"); 


Step 2 Add the gmail filter;
put as subject Delivery Status Notification (Failure)
make that never send it to spam
apply the tag Bounces
save the filter

Step 3
Add the bounces to the database.

::

    
    CREATE TABLE IF NOT EXISTS `bounces` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `mail` varchar(400) NOT NULL,
      `type` varchar(100) NOT NULL,
      `created` timestamp NULL DEFAULT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


Step 4
Create the bounce shell.

Put this code vendors/shells/bounces.php

::

    
    <?php
    
    class BouncesShell extends Shell {
    	var $uses=array('Bounce');
    	
    	function main(){
    		$server = '{imap.gmail.com:993/SSL}Bounces';
    		$this->out('Connecting');
    		$this->connection = imap_open($server, 'mybounces@gmail.com', 'password');
    		$this->out('Conectado');
    		
    		$totalMessages=imap_num_msg($this->connection);
    		while($totalMessages>0){
    			for($j=1;$j<=20;$j++){
    				$this->__getErrorBounce($j);
    			}
    			imap_expunge($this->connection);
    			$totalMessages=imap_num_msg($this->connection);
    		}
    	}
    
    
    	function __getErrorBounce($j){
    		$body=imap_body ($this->connection, $j );
    		$detect_error=preg_match("#([4-5]).0.0#",$body,$error);
    		$detect_mail=preg_match('#to <(([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+)>#',$body,$match);
    		if($detect_mail && $detect_error && isset($match[1]) && isset($error[1])){
    			$this->__addBounce($match[1],$error[1]);
    			$this->out("$j=>{$match[1]}");
    		}
    		imap_delete($this->connection, $j);
    	}
    	
    	// error=4 soft bounce
    	// error=5 hard bounce
    	function __addBounce($mail,$error){
    		if($error==5){
    			// add hard bounce
    			$type='hard bounce';
    		}else{
    			// add soft bounce
    			$type='soft bounce';
    		}
    		$Bounce=compact('mail','type');
    		$this->Bounce->create(compact('Bounce'));
    		$this->Bounce->save();
    	}
    	
    }


Step 5 Run the shell and have fun!
cake bounces

Written by Eugenio Fage Contact me: eugenioclrc at gmail dot com

.. _http://php.net/manual/en/book.imap.php: http://php.net/manual/en/book.imap.php

.. author:: eugenioclrc
.. categories:: articles, tutorials
.. tags:: Mail,email,email shell,bounces,bounce,Tutorials

