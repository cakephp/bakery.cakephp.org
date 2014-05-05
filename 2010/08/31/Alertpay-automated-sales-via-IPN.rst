Alertpay automated sales via IPN
================================

I'm going to show you how I implemented a payment module via the
Alertpay payment processor.
Payments through the Alertpay system is pretty much the same as paying
through Paypal. You have a payment button on your website that sends
the user and payment information to the Alertpay website to complete
the payment. After the payment, the user is redirected back to your
website and you get an IPN call with the transaction details so you
can allow the user to access your product automatically.

We must save the transaction data somehow. Here's the database table.

::

    
    CREATE TABLE IF NOT EXISTS `payments` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `product_id` int(11) NOT NULL,
      `product_code` varchar(255) NOT NULL,
      `transaction_service` varchar(25) NOT NULL,
      `transaction_number` varchar(50) NOT NULL,
      `transaction_currency` varchar(3) NOT NULL,
      `transaction_amount` decimal(5,2) NOT NULL,
      `transaction_status` varchar(15) NOT NULL,
      `transaction_date` datetime NOT NULL,
      `buyer_email` varchar(50) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

The product_id field is used for a belongsTo association with a
products table. The rest of the fields are pretty straight forward.

Moving on we get to the model

Model Class:
````````````

::

    <?php 
    class Payment extends AppModel {
    	
    	var $name = 'Payment';
    	var $belongsTo = array(
    		'Product' => array(
    			'className'  => 'Product',
    			'foreignKey' => 'product_id'
    		)
    	);
    }
    ?>

and the controller

Controller Class:
`````````````````

::

    <?php 
    class PaymentsController extends AppController {
    	
    	var $name = 'Payments';
    	var $components = array('PaymentGateway');
    	var $helpers = array('PaymentButtons');
    	
    	function apipn() {
    		$transactionData = $this->PaymentGateway->parseAPData($_REQUEST);
    		if($this->logPayment($transactionData['Payment'])) {
    			// update the status of the order here
    		}
    		$this->render(null);
    	}
    	
    	function logPayment($data = array()) {
        	        if($this->Payment->save($data)) 
        		        return true;
        	        return false;
            }
    }
    ?>

The component does the processing of the data received via IPN from
Alertpay. When you activate the IPN option in Alertpay you will get a
security code that you must use to validate the IPN. I added it to my
core.php file like so

::

    
    /**
     * CakePHP Payments options
     * 
     * AlertPay information
     * 
     * Variables: 
     * 	1: ap_securitycode - generated in the Alertpay IPN settings
     * 	2: ap_merchant - merchant name set in the Alertpay business profile
     */
    	Configure::write('Alertpay.ap_securitycode', 'secretcodefromalertpay');
    	Configure::write('Alertpay.ap_merchant', 'merchant@email.com');


Component Class:
````````````````

::

    <?php 
    class PaymentGatewayComponent extends Object {
    
        var $dbFields = array(
                'item_code',
                'transaction_service',
                'transaction_number',
                'transaction_currency',
                'transaction_amount',
                'transaction_status',
                'transaction_date',
                'buyer_email'
        );
    
        var $alertpayFields = array(
        		'ap_securitycode',
        		'ap_custemailaddress',
        		'ap_referencenumber',
        		'ap_status',
        		'ap_itemcode',
        		'ap_amount',
        		'ap_currency',
        		'ap_test'
        );
    
        function parseAPData($data = null) {
        	foreach ($data as $key => $value) { 
        		if(in_array($key, $this->alertpayFields)) {
        			$this->alertpayFields[$key] = $value;
        		}
        	}
        	if(Configure::read('Alertpay.ap_securitycode') == $this->alertpayFields['ap_securitycode']) {
        		if($this->alertpayFields['ap_status'] == 'Success') {
        			$data = $this->decodeAdData($this->alertpayFields['ap_itemcode']);
        			$this->dbFields['Payment']['transaction_status'] = $this->alertpayFields['ap_status'];
        			$this->dbFields['Payment']['transaction_service'] = 'Alertpay';
        			$this->dbFields['Payment']['product_id'] = $data[2];
        			$this->dbFields['Payment']['item_code'] = $this->alertpayFields['ap_itemcode'];
        			$this->dbFields['Payment']['transaction_number'] = $this->alertpayFields['ap_referencenumber'];
        			$this->dbFields['Payment']['transaction_currency'] = $this->alertpayFields['ap_currency'];
        			$this->dbFields['Payment']['transaction_amount'] = $this->alertpayFields['ap_amount'];
        			$this->dbFields['Payment']['transaction_status'] = $this->alertpayFields['ap_status'];
        			$this->dbFields['Payment']['transaction_date'] = date('Y-m-d H:i:s');
        			$this->dbFields['Payment']['buyer_email'] = $this->alertpayFields['ap_custemailaddress'];
        			$this->dbFields['PaymentOption']['days'] = $data[1];
        			return $this->dbFields;
        		}
        	} else {
        		return $this->alertpayFields['ap_status'];
        	}
        }
    
        // the encoded item_code as the following structure: sitename-days-productid
        function decodeAdData($adData = null) {
        	$rawData = base64_decode($adData);
        	$data = explode('-', $rawData);
        	return $data;
        }
    }
    ?>

The button generation is done via the following helper

Helper Class:
`````````````

::

    <?php 
    class PaymentButtonsHelper extends AppHelper {
    	
    	var $helpers = array('Html', 'Form');
    		
    	function generateApButton($title = null, $options = array()) {
    	    $retval = "<form action='https://www.alertpay.com/PayProcess.aspx' method='post'>";
    	    $retval .= $this->__hiddenNameValue('ap_merchant', Configure::read('Alertpay.ap_merchant'));
    	    $retval .= $this->__hiddenNameValue('ap_purchasetype', 'service');
    	    foreach($options as $name => $value){
    	       $retval .= $this->__hiddenNameValue($name, $value);
    	    }
    	    $retval .= $this->__submitButton($title, '/img/alertpay-button.gif');
    	    return $retval;
    	}
    		
      	function __hiddenNameValue($name, $value){
        	    return '<input type="hidden" name="'.$name.'" value="'.$value.'" />';
      	}
    
      	function __submitButton($text, $image){
        	return $this->Form->end(array('type' => 'image', 'src' => $image, 'title' => $text));
      	}
    }
    ?>

With all of these in place, you can just add in your checkout view the
following code snippet to generate your payment button

View Template:
``````````````

::

    
    $itemcode = base64_encode('sitename-'.$payment['PaymentOption']['days'] .'-'.$product['Product']['id']);
    echo $paymentButtons->generateApButton('Pay with AlertPay', array(
    		    		'ap_custemailaddress' => $client['Client']['email'],
    		    		'ap_amount'           => $payment['PaymentOption']['price'],
    		    		'ap_itemname'         => 'The best product',
    		    		'ap_currency' 	      => 'EUR',
    		    		'ap_quantity' 	      => 1,
    		    		'ap_itemcode' 	      => $itemcode,
    		    		'ap_returnurl' 	      => 'http://www.yourwebsite.com/success-page',
    		    		'ap_cancelurl' 	      => 'http://www.yoursite.com/cancel-page',
    			));

Make sure to point the IPN alert URL in Alertpay to the apipn action
like so `http://www.yoursite.com/payments/apipn`_
Well, that about covers it. I hope you find this code helpful and feel
free to contact me by

+ email: webmaster[at]insanityville[dot]com
+ website: `http://insanityville.com`_

Happy baking.

.. _http://insanityville.com: http://insanityville.com/
.. _http://www.yoursite.com/payments/apipn: http://www.yoursite.com/payments/apipn

.. author:: in-sanity
.. categories:: articles, tutorials
.. tags:: ipn,alertpay,payments,payment gateway,Tutorials

