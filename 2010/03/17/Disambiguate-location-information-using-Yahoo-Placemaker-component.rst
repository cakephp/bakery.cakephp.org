Disambiguate location information using Yahoo! Placemaker component
===================================================================

This component uses Yahoo Placemaker service to disambiguate location
information and return the best match with a geo marker. e.g. input:
big apple => output: [locationType]=town,[name] =>New York, NY
[latitude] => 40.7146 [longitude] => -74.0071
While building web applications, many times we come across a feature
where we have to take location information from user to search a
database or query a webservice. e.g. the â€˜Locate Storeâ€™ feature on
many retailer web sites. While building this feature normally we ask
the user to either enter a city name and state name OR enter a zip
code. But using the placemaker component you can just ask the users to
enter the location information in a free form (like for New York City,
user can enter â€˜NYCâ€™ or â€˜Big Appleâ€™). This component will
disambiguate the user input and provide you the best match with a geo
marker (latitude and longitude).
More information about Yahoo Placemaker service can be found at
`http://developer.yahoo.com/geo/placemaker/`_


The Component
~~~~~~~~~~~~~


::

    
    <?php
    /**
     * This is the Yahoo Placemaker Component Class to disambiguate the place name
     * and returns the best matches with a geomarker
     *
     * Requires PHP5 (simple xml) and the cURL library 
     * 
     * @author	Prashant Patil
     * @version 1.0
     * @link http://developer.yahoo.com/geo/placemaker/
     * @category Components 
     */
    class PlacemakerComponent extends Object {
      
        /**
         * Yahoo Place Make WebService
         */ 
    	protected $ypHost = 'http://wherein.yahooapis.com/v1/document';
    	/**
    	 * Yahoo Application ID for Yahoo Developer Network
    	 * @link https://developer.apps.yahoo.com/wsregapp/
    	 */ 
    	protected $ypAppId = '';
    	/**
    	 * Variable to store the error generated during the operation
    	 */
    	protected $lastError = '';
    	/**
    	 * the suffix is used to get the location info within United States
    	 */
    	protected $suffixUsed = ', US';
    
    	
    	//called before Controller::beforeFilter()
    	function initialize(&$controller, $settings = array()) {
    		// saving the controller reference for later use
    		$this->controller =& $controller;
    		
    		if(isset($settings['appid']))
    		{
    			$this->ypAppId = $settings['appid'];
    		}
    	}
    
    	//called after Controller::beforeFilter()
    	function startup(&$controller) {
    	}
    	
    	/**
    	 * Method to get the locationinfo for a place
    	 * 
    	 * @param string $locationName
    	 * @return array Location info or error
    	 */
    	public function getLocationInfo($locationName)
    	{
    	  $stateArray = array();
    	  $townArray = array();
    	  $suburbArray = array();
    	  $zipArray = array();
    	  
    	  $locationType = '';
    	  
    	  $returnData = array('error'=>0,
    	                      'errorMessage'=>'',
    	                      'locationDetails'=>array());
    	  $locationName = strip_tags(trim($locationName));
    	  $tmpLocations = array();
    	  
    	  try
    	  {   
        	  if($ypResponse = $this->_ypCall($locationName))
        	  {  
        	    if($simpleXml = simplexml_load_string($ypResponse))
        	    {
        	      if($simpleXml instanceof SimpleXMLElement)
        	      {
        	        if(isset($simpleXml->document->placeDetails))
        	        {
            	        foreach ($simpleXml->document->placeDetails as $place)
            	        { 
            	           $data['name']= str_replace($this->suffixUsed,'',trim((string)$place->place->name));
            	           $data['latitude']= (string)$place->place->centroid->latitude;
            	           $data['longitude']= (string)$place->place->centroid->longitude;
            	           
            	          // To avoid the duplicate data
            	          // for location Monroe, LA Yahoo Placemaker returns two locations with same name 
            	          if(!in_array($data['name'],$tmpLocations))
            	          {
                	          $tmpLocations[]=$data['name'];
                	           
                	          switch (strtolower((string)$place->place->type))
                	          {
                	            case 'state':
                	              $stateArray[]=$data;
                	              break;  // End foreach Loop also since we found a state
                	            case 'town':
                	              $townArray[]=$data;
                	              break;
                	            case 'zip':
                	              $zipArray[]=$data;
                	              break;
                	            case 'suburb':
                	              $suburbArray[]=$data;
                	              break;
                	          }
            	          }
            	          
            	        }
                        
            	        //If State is found just return the state info
            	        if(sizeof($stateArray)>0)
            	        {
            	          $returnData['locationDetails']['locationType'] = 'state';
            	          $returnData['locationDetails']['locations'] = $stateArray;
            	        }
            	        // if zip is found just return zip info
            	        elseif(sizeof($zipArray)>0)
            	        {
            	          $returnData['locationDetails']['locationType'] = 'zip';
            	          $returnData['locationDetails']['locations'] = $zipArray;
            	        }
            	        elseif(sizeof($townArray)>0)
            	        {
            	          $returnData['locationDetails']['locationType'] = 'town';
            	          $returnData['locationDetails']['locations'] = $townArray;
            	        }
        	        }
        	        else
        	        {
        	          //If placeDetails Element is not found
        	          throw new Exception('Can not find place details');
        	        }
        	      }
        	      else
        	      {
        	        // Not able to create simpleXmlElement object from Response XML
        	        throw new Exception('Can not create the SimpleXMLElement object');
        	      }
            	      
        	    }
        	    else
        	    {
        	      // Not a valid response from the Yahoo Placemaker service
        	      throw new Exception('Not a valid XML Response');
        	    }
        	   
        	  }
        	  else
        	  {
        	    // Not a valid response from the Yahoo Placemaker service
        	    throw new Exception($this->lastError);
        	  }
    	  }
    	  catch (Exception $e)
    	  {
    	    $returnData = array('error'=> 1,
    	                      'errorMessage'=> $e->getMessage(),
    	                      'locationDetails' => null);
    	  }
    	  return $returnData;
        }
    	
        /**
         * Method to get last error generated during the call
         */
    	public function getLastError()
    	{
    	  return $this->lastError;
    	}
    	
    	/**
    	 * Method to send request and receive the response from Yahoo webservice
    	 * 
    	 * @param string $locationName
    	 * @return string 
    	 */
    	protected function _ypCall($locationName)
    	{ 
    	  $ch = curl_init();
          
          $data = array(
          				'documentContent'=>$locationName.$this->suffixUsed,
                        'documentType'=>'text/plain',
                        'outputType'=>'xml',
                        'autoDisambiguate' => 'false', 
                        //'focusWoeid'=>'23424977',
                        'appid'=>$this->ypAppId);
          
          curl_setopt($ch, CURLOPT_URL, $this->ypHost);
          curl_setopt($ch, CURLOPT_POST, 1);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,10);
          curl_setopt($ch, CURLOPT_FAILONERROR, 1);
    	  curl_setopt($ch, CURLOPT_HEADER, 0);
    	  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    	  
          $output = curl_exec($ch);
          
          if(curl_errno($ch))
          {
             $this->lastError = 'Curl error: ' . curl_error($ch);
             $output = false;
          }
          else
          {
             $this->lastError = '';
          }
          curl_close($ch);
          return $output;
    	}	
    }
    ?>


once you put this component in your app/controllers/components
directory (as placemaker.php). Use following steps to use it in your
controller.

::

    
    <?php
    
    class PagesController extends AppController {
        	var $components = array('placemaker'=>array('appid'=>'your Yahoo App id goes here'));
            function index()     {
            	
            	$locInfo = $this->placemaker->getLocationInfo($this->data['searcj']['location']);
            }
    }
    ?>

You can get the Yahoo App Id at
`https://developer.apps.yahoo.com/wsregapp/`_.
The variable locInfo will be an array which will be of following
format

::

    
    Array
    (
        [error] => bit
        [errorMessage] => string 
        [locationDetails] => Array
    )

If no locations are found element 'error' will be 1 with appropriate
error message.
If the place info is found then element 'locationDetails' will have
detail information about the location

[h3]Examples[h3] [h4]input: NYC[h4]

::

    
    Array
    (
        [error] => 0
        [errorMessage] => 
        [locationDetails] => Array
            (
                [locationType] => town
                [locations] => Array
                    (
                        [0] => Array
                            (
                                [name] => New York, NY
                                [latitude] => 40.7146
                                [longitude] => -74.0071
                            )
    
                    )
    
            )
    
    )
    


[h4]input: 71203[h4]

::

    
    Array
    (
        [error] => 0
        [errorMessage] => 
        [locationDetails] => Array
            (
                [locationType] => zip
                [locations] => Array
                    (
                        [0] => Array
                            (
                                [name] => 71203, Monroe, LA
                                [latitude] => 32.5977
                                [longitude] => -92.0323
                            )
    
                    )
    
            )
    
    )

[h4]input: Monroe, LA[h4]

::

    
    Array
    (
        [error] => 0
        [errorMessage] => 
        [locationDetails] => Array
            (
                [locationType] => town
                [locations] => Array
                    (
                        [0] => Array
                            (
                                [name] => Monroe, LA
                                [latitude] => 32.815
                                [longitude] => -92.2056
                            )
    
                    )
    
            )
    
    )
    


If multiple locations are found it will return all the possibilities
e.g.
[h4]input: Monroe[h4]

::

    
    Array
    (
        [error] => 0
        [errorMessage] => 
        [locationDetails] => Array
            (
                [locationType] => town
                [locations] => Array
                    (
                        [0] => Array
                            (
                                [name] => Lenox Center, OH
                                [latitude] => 41.6802
                                [longitude] => -80.763
                            )
    
                        [1] => Array
                            (
                                [name] => Monroe, CT
                                [latitude] => 41.3342
                                [longitude] => -73.2061
                            )
    
                        [2] => Array
                            (
                                [name] => Monroe, IN
                                [latitude] => 40.745
                                [longitude] => -84.937
                            )
    
                        [3] => Array
                            (
                                [name] => Monroe, KY
                                [latitude] => 37.2333
                                [longitude] => -85.7014
                            )
    
                        [4] => Array
                            (
                                [name] => Monroe, LA
                                [latitude] => 32.815
                                [longitude] => -92.2056
                            )
    
                        [5] => Array
                            (
                                [name] => Monroe, ME
                                [latitude] => 44.6155
                                [longitude] => -69.0138
                            )
    
                        [6] => Array
                            (
                                [name] => Monroe, MS
                                [latitude] => 31.474
                                [longitude] => -90.8287
                            )
    
                        [7] => Array
                            (
                                [name] => Monroe, NE
                                [latitude] => 41.4751
                                [longitude] => -97.6005
                            )
    
                        [8] => Array
                            (
                                [name] => Monroe, NH
                                [latitude] => 44.2607
                                [longitude] => -72.0544
                            )
    
                        [9] => Array
                            (
                                [name] => Monroe, OH
                                [latitude] => 39.4418
                                [longitude] => -84.3624
                            )
    
                        [10] => Array
                            (
                                [name] => Monroe, OK
                                [latitude] => 34.9946
                                [longitude] => -94.5189
                            )
    
                        [11] => Array
                            (
                                [name] => Monroe, OR
                                [latitude] => 44.3154
                                [longitude] => -123.297
                            )
    
                        [12] => Array
                            (
                                [name] => Monroe, PA
                                [latitude] => 41.1217
                                [longitude] => -79.433
                            )
    
                        [13] => Array
                            (
                                [name] => Monroe, SD
                                [latitude] => 43.4881
                                [longitude] => -97.2129
                            )
    
                        [14] => Array
                            (
                                [name] => Monroe, TN
                                [latitude] => 36.4399
                                [longitude] => -85.2519
                            )
    
                        [15] => Array
                            (
                                [name] => Monroe, TX
                                [latitude] => 32.3361
                                [longitude] => -94.7363
                            )
    
                        [16] => Array
                            (
                                [name] => Monroe, VA
                                [latitude] => 37.4991
                                [longitude] => -79.1247
                            )
    
                        [17] => Array
                            (
                                [name] => Monroe, WA
                                [latitude] => 47.8524
                                [longitude] => -121.982
                            )
    
                        [18] => Array
                            (
                                [name] => Monroe, NC
                                [latitude] => 34.9826
                                [longitude] => -80.5489
                            )
    
                        [19] => Array
                            (
                                [name] => Monroe, WI
                                [latitude] => 42.603
                                [longitude] => -89.6451
                            )
    
                        [20] => Array
                            (
                                [name] => Monroe, MI
                                [latitude] => 41.9079
                                [longitude] => -83.4431
                            )
    
                        [21] => Array
                            (
                                [name] => Monroe, UT
                                [latitude] => 38.6311
                                [longitude] => -112.121
                            )
    
                        [22] => Array
                            (
                                [name] => Monroe, GA
                                [latitude] => 33.7954
                                [longitude] => -83.7133
                            )
    
                        [23] => Array
                            (
                                [name] => Monroe, IA
                                [latitude] => 41.522
                                [longitude] => -93.1059
                            )
    
                        [24] => Array
                            (
                                [name] => Monroe, NY
                                [latitude] => 41.3281
                                [longitude] => -74.1871
                            )
    
                        [25] => Array
                            (
                                [name] => Monroe Bridge, MA
                                [latitude] => 42.722
                                [longitude] => -72.9418
                            )
    
                        [26] => Array
                            (
                                [name] => Monroe, NJ
                                [latitude] => 40.3303
                                [longitude] => -74.4392
                            )
    
                    )
    
            )
    
    )
    



.. _http://developer.yahoo.com/geo/placemaker/: http://developer.yahoo.com/geo/placemaker/
.. _https://developer.apps.yahoo.com/wsregapp/: https://developer.apps.yahoo.com/wsregapp/

.. author:: prashant_patil
.. categories:: articles, components
.. tags:: component,location aware,yahoo placemaker,Components

