Google Weather API Datasource
=============================

This Datasource delivers the weather forecast based on zip and country
using the google weather api
conditions in the model for the datasource:
['condition']['zip'] = Zip Code
['condition']['country'] = Country



PHP Snippet:
````````````

::

    <?php 
    <?php
    
    class WeatherSource extends DataSource {
    
    public function read($model, $queryData = array()) {
    	
    	$dom = new DOMDocument;
    	$dom->loadXML(utf8_encode(
    				file_get_contents("http://www.google.com/ig/api?weather=".$queryData['conditions']['zip']."-".$queryData['conditions']['country']."&hl=en")
    				));
    	if (!$dom) {
    	    echo 'Error while parsing the document';
    	    exit;
    	}
    	
    	$s = simplexml_import_dom($dom);
    	
    	//aktuelles wetter
    	$return[0]['condition'] = strtolower((string)$s->weather->current_conditions->condition['data']);
    	$return[0]['low'] = (string)$s->weather->current_conditions->temp_f['data'];
    	$return[0]['high'] = (string)$s->weather->current_conditions->temp_f['data'];
    	$return[0]['humidity'] = str_replace("Humidity: ", "", (string)$s->weather->current_conditions->humidity['data']);
    	$return[0]['wind_condition'] = (string)$s->weather->current_conditions->wind_condition['data'];
    	ereg("Wind: ([W|S|E|N]) at ([0-9]+) mph", $return[0]['wind_condition'], $wind);
    	$return[0]['speed'] = $wind[2];
    	$return[0]['direction'] = $wind[1];
    	$return[0]['date'] = strtotime($s->weather->forecast_information->forecast_date['data']);
    	
    	//wetter fuer die naechsten tage.
    	
    	$i = 1;
    	foreach($s->weather->forecast_conditions As $forecast){
    		
    		$return[$i]['condition'] = strtolower((string)$forecast->condition['data']);
    		$return[$i]['low'] = (string)$forecast->low['data'];
    		$return[$i]['high'] = (string)$forecast->high['data'];
    		$return[$i]['date'] = strtotime($s->weather->forecast_information->forecast_date['data']) + ($i * 86400);
    			
    		$i++;
    	}
    	
    	
    	
    	return $return;
    	
    		
    	}
    }
    
    ?>
    ?>



.. author:: anachronist
.. categories:: articles, models
.. tags:: Datasource weather,Models

