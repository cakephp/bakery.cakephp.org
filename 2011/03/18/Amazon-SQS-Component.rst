Amazon SQS Component
====================

I've built a basic component that will use Amazons "Simple Queue
Service" This is a guide on how to use it You can grab it from
https://github.com/mbates/CakePHP-Amazon-SQS-Component
N.B. This is still a work-in-progress. But I thought I'd put the rough
draft out there in case anyone else needs a starting point for an SQS
project.

Grab a copy of the code from Git, then place amazon_sqs in your vendor
folder. This is a copy of the php library you get from Amazon, I had
to modify it though as there were lots of require_once() statements
that wouldn't work, and some that seemed superfluous.

Put the components/amazon_sqs.php in your components folder. Here is
an example on it's use

::

    
    class ExamplesController extends AppController {
    
    	var $components = array( 'AmazonSqs' );
    
    	function beforeFilter()
    	{
    		parent::beforeFilter();
    		$this->AmazonSqs->accessKey = '[your access key]';
    		$this->AmazonSqs->secretKey = '[your secret key]';
    	}
    
    	function test_sqs()
    	{
    		$queueUrl = $this->AmazonSqs->createQueue( 'MyTestQueue' );
    		
    		$message = '<new_message>Testing a message</new_message>';
    
    		$sendMessageResult = $this->AmazonSqs->sendMessage( $queueUrl, $message );
    
    		var_dump( $sendMessageResult );
    
    		$messages = $this->AmazonSqs->receiveMessage( $queueUrl );
    
    		var_dump( $messages );
    
    		foreach( $messages as $message )
    		{
    			if( $this->AmazonSqs->deleteMessage( $queueUrl, $message->ReceiptHandle ) )
    			{
    				echo 'deleted';
    			}
    			else
    			{
    				echo 'failed to deleted';
    			}
    		}
    	}
    
    }




.. author:: mbates
.. categories:: articles
.. tags:: amazon sqs component,Articles

