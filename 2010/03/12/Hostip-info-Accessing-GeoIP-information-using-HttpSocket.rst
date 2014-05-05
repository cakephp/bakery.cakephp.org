Hostip.info - Accessing GeoIP information using HttpSocket
==========================================================

This article will cover how to access geoIP information from
hostip.info. Hostip.info is a community-based project to geolocate IP
addresses, making the database freely available but it needs you to
put in your city to make it work.
The component was developed for the following sites:
`http://www.hostip.info/`_, `http://www.countycriminal.com`_, and
`http://theeasyapi.com`_. Initially it was developed in a very simple
form not doing a lot of error checking or making it into a component.
I decided that it's a great time to create this into a component and
released it to all my fellow bakers.


/app/controllers/components/hostipinfo.php
``````````````````````````````````````````

Component Class:
````````````````

::

    <?php
    // Let's use HttpSocket
    App::import('Core', 'HttpSocket');

    class HostipinfoComponent extends Object {
    	function get_data($ip_address){
    		// Start a new Socket
    		$HttpSocket = new HttpSocket();

    		// We need to base64-encode it and then url-encode that.
    		$result = $HttpSocket->get("http://api.hostip.info/get_html.php?ip=" . $ip_address . "&position=true");

    		if(strlen(trim($result)) > 0){
    	        $get_return = $this->parse_data($result);
    	        return $get_return;
    		}else{
    	       	return false;
    	    }
    	}

    	function parse_data($result){

    		// The array of data to return
    		$returnArray = array();

    		$find_string = "Country:";
            $start = strpos($result,$find_string);
            if ($start != false){
                    $start = strpos($result,$find_string);
                    $line_end = strpos($result,"\n",$start) - strlen($find_string) - $start;
                    $returnArray['country'] = trim(substr($result,$start + strlen($find_string),$line_end));
            }

            $find_string = "City:";
            $start = strpos($result,$find_string);
            if ($start != false){
                    $line_end = strpos($result,"\n",$start) - strlen($find_string) - $start;
                    $city_state = trim(substr($result,$start + strlen($find_string),$line_end));
                    $returnArray['city'] = trim(substr($city_state,0,strpos($city_state,",")));
                    $returnArray['state'] = trim(substr($city_state,strpos($city_state,",")+1));
            }

            $find_string = "Latitude:";
            $start = strpos($result,$find_string);
            if ($start != false){
                    $line_end = strpos($result,"\n",$start) - strlen($find_string) - $start;
                    $returnArray['latitude'] = trim(substr($result,$start + strlen($find_string),$line_end));
            }

            $find_string = "Longitude:";
            $start = strpos($result,$find_string);
            if ($start != false){
                    $line_end = strpos($result,"\n",$start) - strlen($find_string) - $start;
                    if ($line_end <= 0) $line_end = strlen($result) - $start - strlen($find_string);
                    $returnArray['longitude'] = trim(substr($result,$start + strlen($find_string),$line_end));
            }

    		return $returnArray;
    	}
    }
    ?>



/app/controllers/hostips_controller.php
```````````````````````````````````````

Controller Class:
`````````````````

::

    <?php
    class HostipsController extends AppController {

    	var $name = 'Hostips';
    	var $uses = array();
    	var $components = array('Hostipinfo');

    	function getipinfo($theIP){
    		$getInfo = $this->Hostipinfo->get_data($theIP);

    		echo "<pre>";
    		print_r($getInfo);
    		echo "</pre>";
    	}
    }
    ?>



Calling the function
````````````````````
To view a sample of how this will work assuming you have it setup with
the controller above you can just point a browser to
`http://domain.com/hostips/getipinfo/174.129.200.54`_

Sample Return
`````````````

::


    <pre>
    Array
    (
        [city] => Seattle
        [state] => WA
        [latitude] => 47.6218
        [longitude] => -122.35
    )
    </pre>



Using HttpSocket
````````````````
If you saw the previous version of the code it utilized cURL, but it's
been replaced with the more widely used CakePHP HttpSocket method. The
component works by initializing the HttpSocket class then sends a GET
request to the Hostip.info server and obtains the raw data. It will
then decode the data turning it into valid XML documentation.

This is a great project that deserves some attention in your next
application. Additional The Easy API provides an API that you can use
to access this as well. Check them out at: `http://theeasyapi.com`_
Happy Baking!

.. _http://www.countycriminal.com: http://www.countycriminal.com
.. _http://www.hostip.info/: http://www.hostip.info/
.. _http://domain.com/hostips/getipinfo/174.129.200.54: http://domain.com/hostips/getipinfo/174.129.200.54
.. _http://theeasyapi.com: http://theeasyapi.com

.. author:: chadsmith729
.. categories:: articles, components
.. tags:: geoip,httpsocket,hostip,Components

