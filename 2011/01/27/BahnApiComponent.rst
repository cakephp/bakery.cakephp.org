BahnApiComponent
================

A simple, but very helpful component to receive the schedule of the
german railway system.
The component:


PHP Snippet:
````````````

::

    <?php 
     
    /**
     * This Component receives Train departure and arrival information, parsing the bahn.de Website
     * Use it, change it, copy it, but please inform me about your activities with this component.
     * @author Sebastian Horwege (sebastian [at] minamo [dot] de)
     * @version 1.0
     * 
     */
    class BahnApiComponent extends Object {
    
    	/**
    	 * 
    	 * @param depart string departure station
    	 * @param arrive string arrival station
    	 * @param timestamp integer optional if !isset() current Servertime will be used
    	 * @return array containing the information about the next 3 departures / arrivals
    	 */
    	function get_schedule($depart,$arrive,$timestamp = 0){
    		$DateTime = date('D M d y H:i eO',$timestamp);
    		if($DateTime == date('D M d y H:i eO',0)) $Uhrzeit = date('D M d y H:i eO');
    
    
    		$ch = curl_init();
    		curl_setopt($ch, CURLOPT_URL,"http://reiseauskunft.bahn.de/bin/query.exe/dn?cb=processFahrtmoeglichkeiten&nrCons=3&S=".$depart."&SBH=1&Z=".$arrive."&ZBH=1&journeyProducts=1023&wTime=&widget=1&start=1&now=".$Uhrzeit."&encoding=utf-8");
    		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    		$output = curl_exec($ch);
    		curl_close($ch); 
    		
    		preg_match_all('/"([a-zA-Z]*)"\:[ ]?"([^"]*)"/',$output,$regs);
    		$keys = $regs[1];
    		$values = $regs[2];
    
    		$endKey = 0;
    		foreach($keys as $key => $value){
    			if($value == 'ab') $endKey++;
    			$return[$endKey][$value] = $values[$key];
    		}
    		
    			return $return;
    	}
    }				
    
    
    
    ?>

Use it like this:

PHP Snippet:
````````````

::

    <?php 
    $schedule = $this->BahnApi->get_schedule('Hamburg','Bremen');
    ?>

print_r($schedule) will display something like this:

PHP Snippet:
````````````

::

    <?php 
    Array
    (
        [0] => Array
            (
                [S] => HAMBURG
                [Z] => Bremen Hbf
            )
    
        [1] => Array
            (
                [ab] => 16:46
                [abpm] => p�nktlich
                [an] => 17:41
                [anpm] => p�nktlich
                [d] => 0:55
                [g] => 14a/b
                [ps] => IC
                [pl] => IC
                [durl] => http://reiseauskunft.bahn.de/bin/query.exe/dn?ld=9644&country=DEU&rt=1&date=27.01.11&time=16:50&S=008096009&Z=008000050&start=1&
                [surl] => http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?input=Hamburg%20Hbf%238002549&boardType=dep&date=27.01.11&time=16%3A46&productsFilter=111111111&rt=1&start=1
                [zurl] => http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?input=Bremen%20Hbf%238000050&boardType=arr&date=27.01.11&time=17%3A41&productsFilter=111111111&rt=1&start=1
            )
    
        [2] => Array
            (
                [ab] => 17:15
                [abpm] => -
                [an] => 18:23
                [anpm] => -
                [d] => 1:08
                [g] => 13a/b
                [ps] => ME
                [pl] => ME
                [durl] => http://reiseauskunft.bahn.de/bin/query.exe/dn?ld=9644&country=DEU&rt=1&date=27.01.11&time=16:50&S=008096009&Z=008000050&start=1&
                [surl] => http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?input=Hamburg%20Hbf%238002549&boardType=dep&date=27.01.11&time=17%3A15&productsFilter=111111111&rt=1&start=1
                [zurl] => http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?input=Bremen%20Hbf%238000050&boardType=arr&date=27.01.11&time=18%3A23&productsFilter=111111111&rt=1&start=1
            )
    
        [3] => Array
            (
                [ab] => 17:46
                [abpm] => p�nktlich
                [an] => 18:41
                [anpm] => -
                [d] => 0:55
                [g] => 14a/b
                [ps] => IC
                [pl] => IC
                [durl] => http://reiseauskunft.bahn.de/bin/query.exe/dn?ld=9644&country=DEU&rt=1&date=27.01.11&time=16:50&S=008096009&Z=008000050&start=1&
                [surl] => http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?input=Hamburg%20Hbf%238002549&boardType=dep&date=27.01.11&time=17%3A46&productsFilter=111111111&rt=1&start=1
                [zurl] => http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?input=Bremen%20Hbf%238000050&boardType=arr&date=27.01.11&time=18%3A41&productsFilter=111111111&rt=1&start=1
            )
    
    )
    
    ?>





.. author:: anachronist
.. categories:: articles, components
.. tags:: api,Schedule,Bahn,Train,Components

