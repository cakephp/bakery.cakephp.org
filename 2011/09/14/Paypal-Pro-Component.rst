Paypal Pro Component
====================

I was just doing a project where my client ask me to implement Paypal
Pro(To make the payment on the site without redirecting to paypal),
After googling i decided to make a component for Paypal Pro. How to
use:- 1. Define your API details in bootstrap.php
define('API_USERNAME', 'your_api_usrname.gmail.com');
define('API_PASSWORD', 'your_api_password'); define('API_SIGNATURE',
'Paste here your API SIGNATURE'); define('API_ENDPOINT', 'https://api-
3t.sandbox.paypal.com/nvp'); define('SUBJECT','');
define('USE_PROXY',FALSE); define('PROXY_HOST', '127.0.0.1');
define('PROXY_PORT', '808'); define('PAYPAL_URL',
'https://www.sandbox.paypal.com/webscr=_express-checkout=');
define('VERSION', '65.1'); define('ACK_SUCCESS', 'SUCCESS');
define('ACK_SUCCESS_WITH_WARNING', 'SUCCESSWITHWARNING'); 2. Include
Paypal component in your controller var $components=array('Paypal');
3. in your controller function payment() { if(!empty($this->data)):
$resArray=$this->Paypal->doDirectPayment($this->data['User']); // Pass
data without model key $this->Session->write('reshash',$resArray); $th
is->redirect(array('controller'=>'users','action'=>'paymentResponse'))
; endif; } // You can display payment status at payment_response.ctp
function paymentResponse() { // read session
$resArray=$this->Session->read('reshash'); if(!empty($resArray)):
//You Save Payment Status if required $this->loadModel('Payment');
$this->Payment->save(array('Payment'=>
array('status'=>$resArray['ACK'], 'amount'=>$resArray['AMT'],
'payment_detail'=>serialize($resArray),
'transaction_id'=>$resArray['TRANSACTIONID'], )));
if(strtoupper($resArray['ACK'])!='SUCCESS'): // Code for Failed
Payment $this->Session->delete('reshash');
elseif(strtoupper($resArray['ACK'])=='SUCCESS'): // Code for Success
Payment $this->Session->delete('reshash'); endif; }
CakePHP: Paypal Pro Component for Credit Card Payments

::

    
    <?php
    
    //Author: Jagjit Singh Bhari
    //File: /app/controllers/components/paypal.php
    //@Copyright 2011 
    
    class PaypalComponent extends Object
    {
    
    var $API_Endpoint,$version,$API_UserName,$API_Password,$API_Signature,$nvp_Header, $subject, $AUTH_token,$AUTH_signature,$AUTH_timestamp;
    	
    	var $components=array('Session');
    	
    function __construct()
    {
    		if(defined('API_USERNAME'))
    		$this->API_UserName=API_USERNAME;
    		
    		if(defined('API_PASSWORD'))
    		$this->API_Password=API_PASSWORD;
    		
    		if(defined('API_SIGNATURE'))
    		$this->API_Signature=API_SIGNATURE;
    		
    		if(defined('API_ENDPOINT'))
    		$this->API_Endpoint =API_ENDPOINT;
    		
    		$this->version='65.1';	
    		
    		if(defined('SUBJECT'))
    		$this->subject = SUBJECT;
    		// below three are needed if used permissioning
    		if(defined('AUTH_TOKEN'))
    		$this->AUTH_token= AUTH_TOKEN;
    		
    		if(defined('AUTH_SIGNATURE'))
    		$this->AUTH_signature=AUTH_SIGNATURE;
    		
    		if(defined('AUTH_TIMESTAMP'))
    		$this->AUTH_timestamp=AUTH_TIMESTAMP;
    				
    
    }
    function nvpHeader()
    {
    		//global $this->API_Endpoint,$this->version,$this->API_UserName,$this->API_Password,$this->API_Signature,$this->nvp_Header, $this->subject, $this->AUTH_token,$this->AUTH_signature,$this->AUTH_timestamp;
    
    		
    		$nvpHeaderStr = "";
    		
    		if(defined('AUTH_MODE')) {
    			//$AuthMode = "3TOKEN"; //Merchant's API 3-TOKEN Credential is required to make API Call.
    			//$AuthMode = "FIRSTPARTY"; //Only merchant Email is required to make EC Calls.
    			//$AuthMode = "THIRDPARTY";Partner's API Credential and Merchant Email as Subject are required.
    			$AuthMode = "AUTH_MODE"; 
    		} 
    		else {
    			
    			if((!empty($this->API_UserName)) && (!empty($this->API_Password)) && (!empty($this->API_Signature)) && (!empty($this->subject))) {
    				$AuthMode = "THIRDPARTY";
    			}
    			
    			else if((!empty($this->API_UserName)) && (!empty($this->API_Password)) && (!empty($this->API_Signature))) {
    				$AuthMode = "3TOKEN";
    			}
    			
    			elseif (!empty($this->AUTH_token) && !empty($this->AUTH_signature) && !empty($this->AUTH_timestamp)) {
    				$AuthMode = "PERMISSION";
    			}
    			elseif(!empty($this->subject)) {
    				$AuthMode = "FIRSTPARTY";
    			}
    		}
    		
    		
    		switch($AuthMode) {
    			
    			case "3TOKEN" : 
    					$nvpHeaderStr = "&PWD=".urlencode($this->API_Password)."&USER=".urlencode($this->API_UserName)."&SIGNATURE=".urlencode($this->API_Signature);
    					break;
    			case "FIRSTPARTY" :
    					$nvpHeaderStr = "&SUBJECT=".urlencode($this->subject);
    					break;
    			case "THIRDPARTY" :
    					$nvpHeaderStr = "&PWD=".urlencode($this->API_Password)."&USER=".urlencode($this->API_UserName)."&SIGNATURE=".urlencode($this->API_Signature)."&SUBJECT=".urlencode($this->subject);
    					break;		
    			case "PERMISSION" :
    					$nvpHeaderStr = $this->formAutorization($this->AUTH_token,$this->AUTH_signature,$this->AUTH_timestamp);
    					break;
    		}
    			return $nvpHeaderStr;
    }
    
    	 	function doDirectPayment($data=array())
    		{
    						//App::import('vendor','paypal',array('file'=>'paypal'.DS.'CallerService.php'));
    						
    						$paymentType =urlencode($data['paymentType']);
    						$firstName =urlencode( $data['first_name']);
    						$lastName =urlencode( $data['last_name']);
    						$creditCardType =urlencode($data['creditCardType']);
    						$creditCardNumber = urlencode($data['creditCardNumber']);
    						$expDateMonth =urlencode($data['expDateMonth']['month']);
    						
    						// Month must be padded with leading zero
    						$padDateMonth = str_pad($expDateMonth, 2, '0', STR_PAD_LEFT);
    						
    						$expDateYear =urlencode( $data['expDateYear']['year']);
    						$cvv2Number = urlencode($data['cvv2Number']);
    						$address1 = urlencode($data['address1']);
    						$address2 = urlencode($data['address2']);
    						$city = urlencode($data['city']);
    						$state =urlencode( $data['state']);
    						$zip = urlencode($data['zip']);
    						$amount = urlencode($data['amount']);
    						$currencyCode=urlencode($data['currency']);
    						$currencyCode="USD";
    						$paymentType=urlencode($data['paymentType']);
    						
    						/* Construct the request string that will be sent to PayPal.
    						   The variable $nvpstr contains all the variables and is a
    						   name value pair string with & as a delimiter */
    						$nvpstr="&PAYMENTACTION=$paymentType&AMT=$amount&CREDITCARDTYPE=$creditCardType&ACCT=$creditCardNumber&EXPDATE=".$padDateMonth.$expDateYear."&CVV2=$cvv2Number&FIRSTNAME=$firstName&LASTNAME=$lastName&STREET=$address1&CITY=$city&STATE=$state".
    						"&ZIP=$zip&COUNTRYCODE=US&CURRENCYCODE=$currencyCode";
    												
    						/* Make the API call to PayPal, using API signature.
    						   The API response is stored in an associative array called $resArray */
    						$resArray=$this->hash_call("doDirectPayment",$nvpstr);
    						
    						/* Display the API response back to the browser.
    						   If the response from PayPal was a success, display the response parameters'
    						   If the response was an error, display the errors received using APIError.php.
    						   */
    						$ack = strtoupper($resArray["ACK"]);
    						
    						return $resArray;
    						
    						if($ack!="SUCCESS")  {
    							$_SESSION['reshash']=$resArray;
    							$location = "APIError.php";
    								 header("Location: $location");
    						   }
    
    	}
    	
    function hash_call($methodName,$nvpStr)
    {
    	// form header string
    	$nvpheader=$this->nvpHeader();
    	
    
    	//setting the curl parameters.
    	$ch = curl_init();
    	curl_setopt($ch, CURLOPT_URL,$this->API_Endpoint);
    	curl_setopt($ch, CURLOPT_VERBOSE, 1);
    
    	//turning off the server and peer verification(TrustManager Concept).
    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    	curl_setopt($ch, CURLOPT_POST, 1);
    	
    	//in case of permission APIs send headers as HTTPheders
    	if(!empty($this->AUTH_token) && !empty($this->AUTH_signature) && !empty($this->AUTH_timestamp))
    	 {
    		$headers_array[] = "X-PP-AUTHORIZATION: ".$nvpheader;
      
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers_array);
        curl_setopt($ch, CURLOPT_HEADER, false);
    	}
    	else 
    	{
    		$nvpStr=$nvpheader.$nvpStr;
    	}
        //if USE_PROXY constant set to TRUE in Constants.php, then only proxy will be enabled.
       //Set proxy name to PROXY_HOST and port number to PROXY_PORT in constants.php 
    	if(USE_PROXY)
    	curl_setopt ($ch, CURLOPT_PROXY, PROXY_HOST.":".PROXY_PORT); 
    
    	//check if version is included in $nvpStr else include the version.
    	if(strlen(str_replace('VERSION=', '', strtoupper($nvpStr))) == strlen($nvpStr)) {
    		$nvpStr = "&VERSION=" . urlencode(VERSION) . $nvpStr;	
    	}
    	
    	$nvpreq="METHOD=".urlencode($methodName).$nvpStr;
    	
    	//setting the nvpreq as POST FIELD to curl
    	curl_setopt($ch,CURLOPT_POSTFIELDS,$nvpreq);
    
    	//getting response from server
    	$response = curl_exec($ch);
    
    	//convrting NVPResponse to an Associative Array
    	$nvpResArray=$this->deformatNVP($response);
    	$nvpReqArray=$this->deformatNVP($nvpreq);
    	
    	$this->Session->write('nvpReqArray',$nvpReqArray);
    
    	if (curl_errno($ch)) {
    		// moving to display page to display curl errors
    		$nvpResArray['curl_error_no']=curl_errno($ch) ;
    		$nvpResArray['curl_error_msg']=curl_error($ch);
    	}else{
    		 //closing the curl
    		 curl_close($ch);
    	  }
    	return $nvpResArray;
    }
    
    /** This function will take NVPString and convert it to an Associative Array and it will decode the response.
      * It is usefull to search for a particular key and displaying arrays.
      * @nvpstr is NVPString.
      * @nvpArray is Associative Array.
      */
    
    function deformatNVP($nvpstr)
    {
    
    	$intial=0;
     	$nvpArray = array();
    
    
    	while(strlen($nvpstr)){
    		//postion of Key
    		$keypos= strpos($nvpstr,'=');
    		//position of value
    		$valuepos = strpos($nvpstr,'&') ? strpos($nvpstr,'&'): strlen($nvpstr);
    
    		/*getting the Key and Value values and storing in a Associative Array*/
    		$keyval=substr($nvpstr,$intial,$keypos);
    		$valval=substr($nvpstr,$keypos+1,$valuepos-$keypos-1);
    		//decoding the respose
    		$nvpArray[urldecode($keyval)] =urldecode( $valval);
    		$nvpstr=substr($nvpstr,$valuepos+1,strlen($nvpstr));
         }
    	return $nvpArray;
    }
    
    function formAutorization($AUTH_token,$AUTH_signature,$AUTH_timestamp)
    {
    	$authString="token=".$AUTH_token.",signature=".$AUTH_signature.",timestamp=".$AUTH_timestamp ;
    	return $authString;
    }
    
    }
    ?>



.. author:: Jagjit
.. categories:: articles, components
.. tags:: Paypal Pro Component,Components

