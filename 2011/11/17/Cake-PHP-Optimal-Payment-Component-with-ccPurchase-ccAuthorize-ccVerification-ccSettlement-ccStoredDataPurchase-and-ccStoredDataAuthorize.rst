Cake PHP Optimal Payment Component with ccPurchase, ccAuthorize,
ccVerification, ccSettlement, ccStoredDataPurchase and
ccStoredDataAuthorize
=====================

I have implemented because, I found the lack of proper PHP codes for
Optimal Payment. Even though the implementation is too power full it
lacks proper documentation and PHP codes. I have implemented same for
cake php 2.0 we have implemented optimal payment web services API for
this Payment implementation. This truly power full as it have all
facilities which PayPal and Authorize.net provides in a bit complex
way are done here much easily.
``_After few days days of testing in live of this the component, I
have decided to publish this component to open source to community. I
have implemented because, I found the lack of proper PHP codes for O
ptimal Payment . Even though the implementation is too power full it
lacks proper documentation and PHP codes. I have implemented same for
cake php 2.0 . But I will release the Core PHP version in the next
post. we have implemented optimal payment web services API for this
Payment implementation. This truly power full as it have all
facilities which PayPal and Authorize.net provides in a bit complex
way are done here much easily. The main features are

#. Purchase with credit card info .
#. Purchase Authorization with credit card info : [for those who not
   aware about Auth:, *This is process of getting a permission to get a
   money(Called Capture ) in future based on users permission gained in
   Approval(Authorization) part*. ]
#. Verify/Validate the credit card Information.
#. Ability to purchase new item/product based on users previous
   purchase data (Doesn't means we are saving an credit card info).



Minimum Requirements
~~~~~~~~~~~~~~~~~~~~

+ Cake PHP 1.3 or later
+ cURL support
+ SimpleXml


Main Modules includes
~~~~~~~~~~~~~~~~~~~~~

+ ccPurchase
+ ccAuthorize
+ ccVerification
+ ccSettlement,
+ ccStoredDataPurchase
+ ccStoredDataAuthorize


Notes
~~~~~
I added the list of UK cities and their standard codes codes. Also it
includes all the cards types supported by Optimal Payment

Component Source
~~~~~~~~~~~~~~~~

::

    /*
        This is Cakecomponent implmention of OptimalPayment with cURL

        Copyright (C) 2011  Subin George P | PHPSaint
        http://subin.me |  http://subingeorge.com | http://phpsaint.com

        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.

        You should have received a copy of the GNU General Public License
        along with this program.  If not, see http://www.gnu.org/licenses

    */

    class OptimalPaymentComponent extends Component
    {
    	var $merchant_info = array();

    	var $web_service_urls =array(
    		'test' => "https://webservices.test.optimalpayments.com/creditcardWS/CreditCardServlet/v1",
    		'live' => "https://webservices.optimalpayments.com/creditcardWS/CreditCardServlet/v1",
    	);
    	var $web_service_url = '';

    	function intiatePayment($merchant_info)
    	{
    	    $this->web_service_url =  ($merchant_info['is_test'])? $this->web_service_urls['test']  : $this->web_service_urls['live'];
    		unset($merchant_info['is_test']);
    		$this->merchant_info = $merchant_info;
    	}

    	public function doPurchase($payment_info)
    	{
    		return $this->_procesPurchase($this->merchant_info,$payment_info,'ccPurchase');
    	}

    	public function doAuthorize($payment_info)
    	{
    		return $this->_procesPurchase($this->merchant_info,$payment_info,'ccAuthorize');
    	}

    	public function doVarify($payment_info)
    	{
    		return $this->_procesPurchase($this->merchant_info,$payment_info,'ccVerification');
    	}
    	// Void Pre Auth Transactions
    	public function doAuthReversal($payment_info)
    	{

    		$xml_array['merchantAccount'] = $this->merchant_info;
    		$xml_array['confirmationNumber'] = $payment_info['confirmation_number'];
    		$xml_array['merchantRefNum'] = $payment_info['user_id'];
    		$xml_array['reversalAmount'] = number_format($payment_info['amount'],2);

    		$xml_string = $this->array2Xml($xml_array,'ccAuthReversalRequestV1');
    		return $this->processCurl('ccAuthorizeReversal',$xml_string);

    	}
    		// Capture Pre Auth Transactions
    	public function doAuthSettlement($payment_info)
    	{

    		$xml_array['merchantAccount'] = $this->merchant_info;
    		$xml_array['merchantRefNum'] = $payment_info['user_id'];
    		$xml_array['confirmationNumber'] = $payment_info['confirmation_number'];
    		$xml_array['amount'] = number_format($payment_info['amount'],2);;
    		//$xml_array['dupeCheck'] =1;	 //This validates that this request is not a duplicate. A request is considered a duplicate if the cardNum, amount, and merchantRefNum are the same

    		$xml_string = $this->array2Xml($xml_array,'ccPostAuthRequestV1');
    		return $this->processCurl('ccSettlement',$xml_string);

    	}
    	public function doStoredDataPurchase($payment_info)
    	{

    		$xml_array['merchantAccount'] = $this->merchant_info;
    		$xml_array['merchantRefNum'] = $payment_info['user_id'];
    		$xml_array['confirmationNumber'] = $payment_info['confirmation_number'];
    		$xml_array['amount'] = number_format($payment_info['amount'],2);

    		//$xml_array['dupeCheck'] =1;	 //This validates that this request is not a duplicate. A request is considered a duplicate if the cardNum, amount, and merchantRefNum are the same

    		$xml_string = $this->array2Xml($xml_array,'ccStoredDataRequestV1');
    		return $this->processCurl('ccStoredDataPurchase',$xml_string);
    	}

    	public function doStoredDataAuthorize($payment_info)
    	{

    		$xml_array['merchantAccount'] = $this->merchant_info;
    		$xml_array['merchantRefNum'] = $payment_info['user_id'];
    		$xml_array['confirmationNumber'] = $payment_info['confirmation_number'];
    		$xml_array['amount'] = number_format($payment_info['amount'],2);
    		//$xml_array['dupeCheck'] =1;	 //This validates that this request is not a duplicate. A request is considered a duplicate if the cardNum, amount, and merchantRefNum are the same

    		$xml_string = $this->array2Xml($xml_array,'ccStoredDataRequestV1');
    		return $this->processCurl('ccStoredDataAuthorize',$xml_string);
    	}
    	private function _procesPurchase($merchant_info,$payment_info,$traction_type = 'ccPurchase')
    	{

    		$payment_info['card_deatils']['cardExpiry'] = "{$payment_info['card_deatils']['cardExpiry']['month']}{$payment_info['card_deatils']['cardExpiry']['year']}";

    		$xml_array['merchantAccount'] = $merchant_info;
    		$xml_array['merchantRefNum'] = $payment_info['user_id'];
    		$xml_array['amount'] = number_format($payment_info['amount'],2);

    		$xml_array['card'] = $payment_info['card_deatils'];
    		$xml_array['billingDetails'] = $payment_info['billing_info'];
    		$xml_string = $this->array2Xml($xml_array,'ccAuthRequestV1');
    		return $this->processCurl($traction_type,$xml_string);
    	}
    	private function array2Xml($xml_array,$xml_header = 'ccAuthRequestV1')
    	{
    		$xml_string_array = array();
    		foreach($xml_array as $key => $data)
    		{
    			if(is_array($data))
    			{
    				$xml_sub_string_array = array();
    				foreach($data as $key1 => $data1)
    					$xml_sub_string_array[] = ''.$data1.'';
    				$xml_string_array[] = ''.implode("\n\t",$xml_sub_string_array).'';

    			}
    			else
    			{
    				$xml_string_array[] = ''.$data.'';
    			}
    		}
    		$xml_string = "\n";
    		$xml_string.= "\n";
    		$xml_string.= implode("\n",$xml_string_array);
    		$xml_string.= "";

    		return $xml_string;
    	}
    	private function processCurl($txnMode,$txnRequest)
    	{
    		$ch = curl_init();
    		curl_setopt($ch, CURLOPT_POST,1);
    		curl_setopt($ch, CURLOPT_POSTFIELDS,"&txnMode=".$txnMode."&txnRequest=".urlencode($txnRequest));
    		curl_setopt($ch, CURLOPT_URL,$this->web_service_url);
    		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    		$result = curl_exec($ch);
    		if (curl_errno($ch)) {
    			return false;
    		} else {
    		   return $this->xmlString2Array($result);
    			curl_close($ch);
    		}

    	}
    	private function xmlString2Array($xml_data)
    	{
    		$xml = simplexml_load_string($xml_data);
    		$xmlarray = array(); // this will hold the flattened data
    		$xmlarray = $this->simpleXMLToArray($xml, $xmlarray, '', true);

    		$final_array= $this->_processArrayResponse($xmlarray) ;
    		$final_array['response_xml'] = $xml_data;
    		$final_array['response_json'] = json_encode($xml_data);
    		return $final_array;
    	}
    	private function _processArrayResponse($data)
    	{
    		foreach($data as $key => $datum)
    		{
    			if(count($datum) == 1 and isset($datum['value']))
    			{
    				$new_data[$key] = $datum['value'];
    			}
    			else
    			{
    				foreach($datum as $key1=> $datum1)
    				{
    					if(!empty($datum1['tag']))
    						$new_data[$datum1['tag']['value']] = $datum1['value']['value'];
    					else
    						$new_data[$key1] = $datum1;
    				}
    			}

    		}
    		return $new_data;
    	}
    	private function simpleXMLToArray($xml, $flattenValues=true, $flattenAttributes = true,$flattenChildren=true, $valueKey='value',$attributesKey='attributes',$childrenKey='children')
    	{
            $return = array();
            if(!($xml instanceof SimpleXMLElement)){return $return;}
            $name = $xml->getName();
            $_value = trim((string)$xml);
            if(strlen($_value)==0){$_value = null;};

            if($_value!==null){
                if(!$flattenValues){$return[$valueKey] = $_value;}
                else{$return = $_value;}
            }

            $children = array();
            $first = true;
            foreach($xml->children() as $elementName => $child){
                $value = $this->simpleXMLToArray($child, $flattenValues, $flattenAttributes, $flattenChildren, $valueKey, $attributesKey, $childrenKey);
                if(isset($children[$elementName])){
                    if($first){
                        $temp = $children[$elementName];
                        unset($children[$elementName]);
                        $children[$elementName][] = $temp;
                        $first=false;
                    }
                    $children[$elementName][] = $value;
                }
                else{
                    $children[$elementName] = $value;
                }
            }
            if(count($children)>0){
                if(!$flattenChildren){$return[$childrenKey] = $children;}
                else{$return = array_merge($return,$children);}
            }

            $attributes = array();
            foreach($xml->attributes() as $name=>$value){
                $attributes[$name] = trim($value);
            }
            if(count($attributes)>0){
                if(!$flattenAttributes){$return[$attributesKey] = $attributes;}
                else{$return = array_merge($return, $attributes);}
            }

            return $return;
        }
    	public function getCardTypeList()
    	{
    		return $card_type = array(
    			"VI" => "Visa",
    			"VD" => "Visa  Debit",
    			"MC" => "MasterCard",
    			"MD" => "Maestro",
    			"AM" => "American Express",
    			"DC" => "Diners Club",
    			"DI" => "Discover",
    			"VE" => "Visa  Electron",
    			"JC" => "JCB",
    		        "LA" => "Laser",
    		        "SF" => "Swiff",
    			"SO" => "Solo",
    			"SW" => "Switch",
    		);

    	}
    	public function getCitiesList()
    	{
    		return $uk_cities = array(
    			'ABD' => 'Aberdeenshire',
    			'ABE' => 'Aberdeen',
    			'AGB' => 'Argyll and Bute',
    			'AGY' => 'Isle of Anglesey',
    			'ANS' => 'Angus',
    			'ANT' => 'Antrim',
    			'ARD' => 'Ards',
    			'ARM' => 'Armagh',
    			'BAS' => 'Bath and North East Somerset',
    			'BBD' => 'Blackburn with Darwen',
    			'BDF' => 'Bedfordshire',
    			'BDG' => 'Barking and Dagenham',
    			'BEN' => 'Brent',
    			'BEX' => 'Bexley',
    			'BFS' => 'Belfast',
    			'BGE' => 'Bridgend',
    			'BGW' => 'Blaenau Gwent',
    			'BIR' => 'Birmingham',
    			'BKM' => 'Buckinghamshire',
    			'BLA' => 'Ballymena',
    			'BLY' => 'Ballymoney',
    			'BMH' => 'Bournemouth',
    			'BNB' => 'Banbridge',
    			'BNE' => 'Barnet',
    			'BNH' => 'Brighton and Hove',
    			'BNS' => 'Barnsley',
    			'BOL' => 'Bolton',
    			'BPL' => 'Blackpool',
    			'BRC' => 'Bracknell Forest',
    			'BRD' => 'Bradford',
    			'BRY' => 'Bromley',
    			'BST' => 'Bristol, City of',
    			'BUR' => 'Bury',
    			'CAM' => 'Cambridgeshire',
    			'CAY' => 'Caerphilly',
    			'CGN' => 'Ceredigion',
    			'CGV' => 'Craigavon',
    			'CHS' => 'Cheshire',
    			'CKF' => 'Carrickfergus',
    			'CKT' => 'Cookstown',
    			'CLD' => 'Calderdale',
    			'CLK' => 'Clackmannanshire',
    			'CLR' => 'Coleraine',
    			'CMA' => 'Cumbria',
    			'CMD' => 'Camden',
    			'CMN' => 'Carmarthenshire',
    			'CON' => 'Cornwall',
    			'COV' => 'Coventry',
    			'CRF' => 'Cardiff',
    			'CRY' => 'Croydon',
    			'CSR' => 'Castlereagh',
    			'CWY' => 'Conwy',
    			'DAL' => 'Darlington',
    			'DBY' => 'Derbyshire',
    			'DEN' => 'Denbighshire',
    			'DER' => 'Derby',
    			'DEV' => 'Devon',
    			'DGN' => 'Dungannon and South Tyrone',
    			'DGY' => 'Dumfries and Galloway',
    			'DNC' => 'Doncaster',
    			'DND' => 'Dundee',
    			'DOR' => 'Dorset',
    			'DOW' => 'Down',
    			'DRY' => 'Derry',
    			'DUD' => 'Dudley',
    			'DUR' => 'Durham',
    			'EAL' => 'Ealing',
    			'EAY' => 'East Ayrshire',
    			'EDH' => 'Edinburgh',
    			'EDU' => 'East Dunbartonshire',
    			'ELN' => 'East Lothian',
    			'ELS' => 'Eilean Siar',
    			'ENF' => 'Enfield',
    			'ERW' => 'East Renfrewshire',
    			'ERY' => 'East Riding of Yorkshire',
    			'ESS' => 'Essex',
    			'ESX' => 'East Sussex',
    			'FAL' => 'Falkirk',
    			'FER' => 'Fermanagh',
    			'FIF' => 'Fife',
    			'FLN' => 'Flintshire',
    			'GAT' => 'Gateshead',
    			'GLG' => 'Glasgow',
    			'GLS' => 'Gloucestershire',
    			'GRE' => 'Greenwich',
    			'GSY' => 'Guernsey',
    			'GWN' => 'Gwynedd',
    			'HAL' => 'Halton',
    			'HAM' => 'Hampshire',
    			'HAV' => 'Havering',
    			'HCK' => 'Hackney',
    			'HEF' => 'Herefordshire, County of',
    			'HIL' => 'Hillingdon',
    			'HLD' => 'Highland',
    			'HMF' => 'Hammersmith and Fulham',
    			'HNS' => 'Hounslow',
    			'HPL' => 'Hartlepool',
    			'HRT' => 'Hertfordshire',
    			'HRW' => 'Harrow',
    			'HRY' => 'Haringey',
    			'IOS' => 'Isles of Scilly',
    			'IOW' => 'Isle of Wight',
    			'ISL' => 'Islington',
    			'IVC' => 'Inverclyde',
    			'JSY' => 'Jersey',
    			'KEC' => 'Kensington and Chelsea',
    			'KEN' => 'Kent',
    			'KHL' => 'Kingston upon Hull, City of',
    			'KIR' => 'Kirklees',
    			'KTT' => 'Kingston upon Thames',
    			'KWL' => 'Knowsley',
    			'LAN' => 'Lancashire',
    			'LBH' => 'Lambeth',
    			'LCE' => 'Leicester',
    			'LDS' => 'Leeds',
    			'LEC' => 'Leicestershire',
    			'LEW' => 'Lewisham',
    			'LIN' => 'Lincolnshire',
    			'LIV' => 'Liverpool',
    			'LMV' => 'Limavady',
    			'LND' => 'London, City of',
    			'LRN' => 'Larne',
    			'LSB' => 'Lisburn',
    			'LUT' => 'Luton',
    			'MAN' => 'Manchester',
    			'MDB' => 'Middlesbrough',
    			'MDW' => 'Medway',
    			'MFT' => 'Magherafelt',
    			'MIK' => 'Milton Keynes',
    			'MLN' => 'Midlothian',
    			'MON' => 'Monmouthshire',
    			'MRT' => 'Merton',
    			'MRY' => 'Moray',
    			'MTY' => 'Merthyr Tydfil',
    			'MYL' => 'Moyle',
    			'NAY' => 'North Ayrshire',
    			'NBL' => 'Northumberland',
    			'NDN' => 'North Down',
    			'NEL' => 'North East Lincolnshire',
    			'NET' => 'Newcastle upon Tyne',
    			'NFK' => 'Norfolk',
    			'NGM' => 'Nottingham',
    			'NLK' => 'North Lanarkshire',
    			'NLN' => 'North Lincolnshire',
    			'NSM' => 'North Somerset',
    			'NTA' => 'Newtownabbey',
    			'NTH' => 'Northamptonshire',
    			'NTL' => 'Neath Port Talbot',
    			'NTT' => 'Nottinghamshire',
    			'NTY' => 'North Tyneside',
    			'NWM' => 'Newham',
    			'NWP' => 'Newport',
    			'NYK' => 'North Yorkshire',
    			'NYM' => 'Newry and Mourne',
    			'OLD' => 'Oldham',
    			'OMH' => 'Omagh',
    			'ORK' => 'Orkney Islands',
    			'OXF' => 'Oxfordshire',
    			'PEM' => 'Pembrokeshire',
    			'PKN' => 'Perth and Kinross',
    			'PLY' => 'Plymouth',
    			'POL' => 'Poole',
    			'POR' => 'Portsmouth',
    			'POW' => 'Powys',
    			'PTE' => 'Peterborough',
    			'RCC' => 'Redcar and Cleveland',
    			'RCH' => 'Rochdale',
    			'RCT' => 'Rhondda Cynon Taf',
    			'RDB' => 'Redbridge',
    			'RDG' => 'Reading',
    			'RFW' => 'Renfrewshire',
    			'RIC' => 'Richmond upon Thames',
    			'ROT' => 'Rotherham',
    			'RUT' => 'Rutland',
    			'SAW' => 'Sandwell',
    			'SAY' => 'South Ayrshire',
    			'SCB' => 'Scottish Borders, The',
    			'SFK' => 'Suffolk',
    			'SFT' => 'Sefton',
    			'SGC' => 'South Gloucestershire',
    			'SHF' => 'Sheffield',
    			'SHN' => 'St Helens',
    			'SHR' => 'Shropshire',
    			'SKP' => 'Stockport',
    			'SLF' => 'Salford',
    			'SLG' => 'Slough',
    			'SLK' => 'South Lanarkshire',
    			'SND' => 'Sunderland',
    			'SOL' => 'Solihull',
    			'SOM' => 'Somerset',
    			'SOS' => 'Southend-on-Sea',
    			'SRY' => 'Surrey',
    			'STB' => 'Strabane',
    			'STE' => 'Stoke-on-Trent',
    			'STG' => 'Stirling',
    			'STH' => 'Southampton',
    			'STN' => 'Sutton',
    			'STS' => 'Staffordshire',
    			'STT' => 'Stockton-on-Tees',
    			'STY' => 'South Tyneside',
    			'SWA' => 'Swansea',
    			'SWD' => 'Swindon',
    			'SWK' => 'Southwark',
    			'TAM' => 'Tameside',
    			'TFW' => 'Telford and Wrekin',
    			'THR' => 'Thurrock',
    			'TOB' => 'Torbay',
    			'TOF' => 'Torfaen',
    			'TRF' => 'Trafford',
    			'TWH' => 'Tower Hamlets',
    			'VGL' => 'Vale of Glamorgan',
    			'WAR' => 'Warwickshire',
    			'WBK' => 'West Berkshire',
    			'WDU' => 'West Dunbartonshire',
    			'WFT' => 'Waltham Forest',
    			'WGN' => 'Wigan',
    			'WIL' => 'Wiltshire',
    			'WKF' => 'Wakefield',
    			'WLL' => 'Walsall',
    			'WLN' => 'West Lothian',
    			'WLV' => 'Wolverhampton',
    			'WND' => 'Wandsworth',
    			'WNM' => 'Windsor and Maidenhead',
    			'WOK' => 'Wokingham',
    			'WOR' => 'Worcestershire',
    			'WRL' => 'Wirral',
    			'WRT' => 'Warrington',
    			'WRX' => 'Wrexham',
    			'WSM' => 'Westminster',
    			'WSX' => 'West Sussex',
    			'YOR' => 'York',
    			'ZET' => 'Shetland Islands'
    		);

    	}
    }


Implementation
~~~~~~~~~~~~~~

Models
``````
Add models for logs and necessary change to save info

Controller
``````````
Add Optimal Payment component in the components array( Sorry Cake
gurus. It's intented for all from freshers to gurus ;) ).

::

        public $components = array(
            'All',
            'YourExisting',
            'Components ',
            'OptimalPayment',
        );


Views
`````
Necessary Codes to get user inputs, like amount and credit card info

Sample Implementation
~~~~~~~~~~~~~~~~~~~~~

::

    // This is sample code to show how it works
    // Please add necessary code for get input from user, validation,..

    $merchant_info = array(
    	'accountNum' =>'MERCHANT_ACC_NUMBER',
    	'storeID' =>'test',
    	'storePwd' =>'test',
    	'is_test' => true,
    );
    $payment_info= array(
    	'user_id' => '1111111111111',
    	'amount' => 22,
    	'card_deatils' =>array(
    		'cardNum' =>'1111111111111111',
    		'cardExpiry' =>array(
    			'month' => '12',
    			'year' =>  '12'
    		),
    		'cardType' => 'VI',
    		'cvdIndicator' =>1, // Do we need CVV
    		'cvd' =>'111'
    	),
    	'billing_info' => array(
    		"firstName"	=> 'Test',
    		"lastName"	=> 'Test',
    		"street"	=>  '1130 test',
    		"street2"	=>  '',
    		"city"		=>  'Laval',
    		"state"		=>  'QC',
    		"country"	=>  'CA',
    		"zip"		=>  'H7V 1A2',
    		"phone"		=>  '123-973-2227',
    		"email"		=>  'email@example.com',
    	)
    );

    $this->OptimalPayment->intiatePayment($merchant_info);
    // Authorization
    $result = $this->OptimalPayment->doAuthorize($payment_info);

    $reversal_info = array(
    	'user_id' => '1111111111111',
    	'amount'  => 22,
    	'confirmation_number' =>'233444',
    );

    //$result = $this->OptimalPayment->doAuthReversal($reversal_info);

    $cpature_info = array(
    	'user_id' => '1111111111111',
    	'amount'  => 22,
    	'confirmation_number'=>'1233',
    );



    $result = $this->OptimalPayment->doAuthSettlement($cpature_info);


Todo
~~~~
Need proper documentation. But I personally believe this perfectly
fine for all php developers

References
~~~~~~~~~~

+ `http://subin.me/blog/cake-php-optimal-payment-component-with-ccpurchase-ccauthorize-ccverification-ccsettlement-ccstoreddatapurchase-and-ccstoreddataauthorize/`_
+ `http://www.optimalpayments.com`_
+ `WebServices_API_1.0.pdf`_
+ `The Optimal Payments test environment`_



.. _WebServices_API_1.0.pdf: http://support.optimalpayments.com/REPOSITORY/WebServices_API_1.0.pdf
.. _The Optimal Payments test environment:  http://support.optimalpayments.com/test_environment.asp
.. _http://subin.me/blog/cake-php-optimal-payment-component-with-ccpurchase-ccauthorize-ccverification-ccsettlement-ccstoreddatapurchase-and-ccstoreddataauthorize/: http://subin.me/blog/cake-php-optimal-payment-component-with-ccpurchase-ccauthorize-ccverification-ccsettlement-ccstoreddatapurchase-and-ccstoreddataauthorize/
.. _http://www.optimalpayments.com: http://www.optimalpayments.com/?refer=subin.me

.. author:: subingeorge
.. categories:: articles, components
.. tags:: word,Components

