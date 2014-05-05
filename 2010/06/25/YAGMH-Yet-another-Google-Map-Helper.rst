YAGMH - Yet another Google Map Helper
=====================================

This is just an update of the google map helper by Mahmoud Lababidi
(based on an older helper by gwoo). Some tweaks to let it work inside
an ajax rendered view, and a couple of small new features (render map
with zoom and center based on actual markers, and an optional minimap
overview).
I've got no comments published, and the e-mail address of Mahmoud
Lababidi in the tutorial doesn't seem to be working, so I'm posting
here (please be kind, I'm a GMap API and CakePhp newbie and, wow!,
this is my very first bakery post)

This is intended as a jumpstart for rendering a functional map in your
application; if you are looking for more features check the Google
maps api, it's really easy to get started with, even without much
client-side coding experience.

For a tutorial on a complete geocoding / map rendering check the
original post by Mahmoud: it's still fine (and very clear), just use
the new helper function at the end instead of the two "map" and
"markers" methods.
`http://bakery.cakephp.org/articles/view/adding-a-google-map-to-your-app`_
So here is the code. The main change is the way variables are defined:
not the usual

var map = [..]
but

windows.map = [..]

That's because the former way wasn't working in my case.

I had the map inside an element rendered after an ajax call . The
global variables scope seemed not to be enough, it was lost between
different tags. This may be obvious for javascript / ajax experts, but
for newbies it may be not immediately apparent. So, I use the window
object which is truly "superglobal", even between ajax calls;
variables defined as properties of "window" can be accessed
everywhere.

(tested it with firefox 3.0.11 and IE 7, using cakephp 1.2)

For the new features, check the new map_and_markers method below.

The line

::


    if ($smallmap) $out .= "window.map.addControl( new GOverviewMapControl());";

simply adds an overview minimap in the lower right corner, if the
argument $smallmap (default = true) is set to true.

There is also a new way of setting the center and zoom of the map
dynamically, based on the actual markers.
the map is still set at defaults first:

::


    window.map.centerAndZoom(new GPoint(".$default['long'].", ".$default['lat']."), ".$default['zoom'].");

but a "Bounds" object is also defined

::


    window.bounds = new GLatLngBounds();

and, in the main loop, for every marker added the bounds are updated
(extended if needed)

::


    window.bounds.extend(window.latlng".$i.");

and then the map is rendered with the new center and zoom level, based
on the bounds determined by the markers.

::


    window.map.setCenter(window.bounds.getCenter());
    newzoom = window.map.getBoundsZoomLevel(window.bounds);
    window.map.setZoom(newzoom);


Here is the code:


Helper Class:
`````````````

::

    <?php
    <?php
    /*
     * CakeMap -- a google maps integrated application built on CakePHP framework.
     * Copyright (c) 2005 Garrett J. Woodworth : gwoo@rd11.com
     * rd11,inc : http://rd11.com
     *
     * @author      gwoo <gwoo@rd11.com>
     * @version     0.10.1311_pre_beta
     * @license     OPPL
     *
     * Modified by 	Mahmoud Lababidi <lababidi@bearsontherun.com>
     * Date		Dec 16, 2006
     *
     * Modified by  Stefano Manfredini <info@stefanomanfredini.info>
     * Date		Jul 1, 2008
     */
    class GoogleMapHelper extends Helper {

    	var $errors = array();

    	var $key = "YourGoogleMapsKeyHere";


    	function map($default, $style = 'width: 400px; height: 400px' )
    	{
    	    //<![CDATA[
    	    //if (empty($default)){return "error: You have not specified an address to map"; exit();}
    		$out = "<div id=\"map\"";
    		$out .= isset($style) ? "style=\"".$style."\"" : null;
    		$out .= " ></div>";
    		$out .= "
    		<script type=\"text/javascript\">

    		if (GBrowserIsCompatible())
    		{
    			window.map = new GMap(document.getElementById(\"map\"));
    			window.map.addControl(new GLargeMapControl());
    			window.map.addControl(new GMapTypeControl());
    			window.map.setMapType(window.map.getMapTypes()[".$default['type']."]);
    			window.map.enableScrollWheelZoom();
    			window.map.centerAndZoom(new GPoint(".$default['long'].", ".$default['lat']."), ".$default['zoom'].");

    		}

    			</script>
    		";
    		////]]>
    		return $out;

    	}

    	function addMarkers(&$data, $icon=null)
    	{
    		////<![CDATA[
    		$out = "<script type=\"text/javascript\">

    			if (GBrowserIsCompatible())
    			{
    			";

    			if(is_array($data))
    			{
    				if($icon)
    				{
    					$out .= $icon;
    				}
    				else
    				{
    					$out .= 'var icon = new GIcon();

    						icon.image = "http://labs.google.com/ridefinder/images/mm_20_red.png";
    						icon.shadow = "http://labs.google.com/ridefinder/images/mm_20_shadow.png";
    						icon.iconSize = new GSize(12, 20);
    						icon.shadowSize = new GSize(22, 20);
    						icon.iconAnchor = new GPoint(6, 20);
    						icon.infoWindowAnchor = new GPoint(5, 1);
    					';

    				}
    				$i = 0;
    				foreach($data as $n=>$m){
    					$keys = array_keys($m);
    					$point = $m[$keys[0]];
    					if(!preg_match('/[^0-9\\.\\-]+/',$point['longitude']) && preg_match('/^[-]?(?:180|(?:1[0-7]\\d)|(?:\\d?\\d))[.]{1,1}[0-9]{0,15}/',$point['longitude'])
    						&& !preg_match('/[^0-9\\.\\-]+/',$point['latitude']) && preg_match('/^[-]?(?:180|(?:1[0-7]\\d)|(?:\\d?\\d))[.]{1,1}[0-9]{0,15}/',$point['latitude']))
    					{
    						$out .= "
    							window.point".$i." = new GPoint(".$point['longitude'].",".$point['latitude'].");
    							window.marker".$i." = new GMarker(window.point".$i.",icon);
    							window.map.addOverlay(window.marker".$i.");
    							window.marker$i.html = \"$point[title]$point[html]\";
    							GEvent.addListener(window.marker".$i.", \"click\",
    							function() {
    								window.marker$i.openInfoWindowHtml(window.marker$i.html);
    							});";
    						$data[$n][$keys[0]]['js']="window.marker$i.openInfoWindowHtml(window.marker$i.html);";
    						$i++;
    					}
    				}
    			}
    		$out .=	"}

    			</script>";
    		return $out;
    		//]]>
    	}


    	function addClick($var, $script=null)
    	{
    		//
    		$out = "<script type=\"text/javascript\">
    			<![CDATA[

    			if (GBrowserIsCompatible())
    			{
    			"
    			.$script
    			.'GEvent.addListener(window.map, "click", '.$var.', true);'
    			."}
    				//]]>
    			</script>";
    		return $out;
    	}

    	function addMarkerOnClick($innerHtml = null)
    	{
    		$mapClick = '
    			var mapClick = function (overlay, point) {
    				window.point = new GPoint(point.x,point.y);
    				window.marker = new GMarker(window.point,icon);
    				window.map.addOverlay(window.marker)
    				GEvent.addListener(window.marker, "click",
    				function() {
    					window.marker.openInfoWindowHtml('.$innerHtml.');
    				});
    			}
    		';
    		return $this->addClick('mapClick', $mapClick);

    	}

    	function map_and_markers (&$data, $default, $style = 'width: 400px; height: 400px', $smallmap=true, $icon=null) {
    	    $out = "<div id=\"map\"";
    		$out .= isset($style) ? "style=\"".$style."\"" : null;
    		$out .= " ></div>";
    		$out .= "
    		<script type=\"text/javascript\">
    		//<![CDATA[
    		if (GBrowserIsCompatible())
    		{
    			window.map = new GMap(document.getElementById(\"map\"));
    			window.map.addControl(new GLargeMapControl());
    			window.map.addControl(new GMapTypeControl());
    			window.map.enableScrollWheelZoom();";
    		if ($smallmap) $out .= "window.map.addControl( new GOverviewMapControl() ); ";

    		$out	.= "window.map.setMapType(window.map.getMapTypes()[".$default['type']."]);
    			window.map.centerAndZoom(new GPoint(".$default['long'].", ".$default['lat']."), ".$default['zoom'].");

    			window.bounds = new GLatLngBounds();

    		";

    		$out .= "

    			";

    			if(is_array($data))
    			{
    				if($icon)
    				{
    					$out .= $icon;
    				}
    				else
    				{
    					$out .= 'var icon = new GIcon();
    						icon.image = "http://labs.google.com/ridefinder/images/mm_20_red.png";
    						icon.shadow = "http://labs.google.com/ridefinder/images/mm_20_shadow.png";
    						icon.iconSize = new GSize(12, 20);
    						icon.shadowSize = new GSize(22, 20);
    						icon.iconAnchor = new GPoint(6, 20);
    						icon.infoWindowAnchor = new GPoint(5, 1);
    					';

    				}
    				$i = 0;
    				foreach($data as $n=>$m){
    					$keys = array_keys($m);
    					$point = $m[$keys[0]];
    					if(!preg_match('/[^0-9\\.\\-]+/',$point['longitude']) && preg_match('/^[-]?(?:180|(?:1[0-7]\\d)|(?:\\d?\\d))[.]{1,1}[0-9]{0,15}/',$point['longitude'])
    						&& !preg_match('/[^0-9\\.\\-]+/',$point['latitude']) && preg_match('/^[-]?(?:180|(?:1[0-7]\\d)|(?:\\d?\\d))[.]{1,1}[0-9]{0,15}/',$point['latitude']))
    					{
    						$out .= "
    							window.point".$i." = new GPoint(".$point['longitude'].",".$point['latitude'].");
    							window.latlng".$i." = new GLatLng(".$point['latitude'].",".$point['longitude'].");
    							window.marker".$i." = new GMarker(window.point".$i.",icon);

    							window.bounds.extend(window.latlng".$i.");

    							window.map.addOverlay(window.marker".$i.");
    							window.marker$i.html = \"$point[title]$point[html]\";
    							GEvent.addListener(window.marker".$i.", \"click\",
    							function() {
    								window.marker$i.openInfoWindowHtml(window.marker$i.html);
    							});";
    						$data[$n][$keys[0]]['js']="window.marker$i.openInfoWindowHtml(window.marker$i.html);";
    						$i++;
    					}
    				}
    			}
    		$out .=	"
    			    newzoom = window.map.getBoundsZoomLevel(window.bounds);
    			    if(newzoom > 16) {newzoom = 16;}

    			    window.map.setCenter(window.bounds.getCenter(),newzoom);
    			    window.map.setZoom(newzoom);
    			    //alert(window.map.getZoom().toString());
    			    //alert(newzoom);

    			    }
    		    //}
    				//]]>
    			</script>";
    		return $out;

    	}


    }
    ?>
    ?>


Usage example (in your -normal or ajax rendered- view):

::


    $avg_lat = 44.8427098;
    $avg_lon = 11.6081656 ;


    // Prepare the markers data and popup balloons
    //  the $details array is similar to the â€œpointsâ€ array in Mahmoudâ€™s tutorial
    foreach($details as $id=>$detail){
        $points[$id]['Detail']=$detail;
        $points[$id]['Detail']['title'] = " <b>".$detail['location_name']."</b>";
        $points[$id]['Detail']['html'] = '<p>'.$detail['street'] . ', ' . $detail['zip'] . ', ' . $detail['city'] .
    	'</p>';

    }
    // and/or manually set some point:
    $points[0] = array('Detail' => array('title' => 'test', 'html' => 'just a test', 'latitude' => $avg_lat, 'longitude' => $avg_lon ));
    $details[0] = $points[0]['Detail'];
    //set the defaults like before
    $default = array('type'=>'0','zoom'=>3,'lat'=>$avg_lat,'long'=>$avg_lon);
    // finally, render the map with markers (and minimap and autozoom and center)
    echo $googleMap->map_and_markers($points, $default, $style = 'width:700px; height: 550px');

Please feel free to comment / ask / correct.
Make sure to check the original tutorial first!
`http://bakery.cakephp.org/articles/view/adding-a-google-map-to-your-app`_


.. _http://bakery.cakephp.org/articles/view/adding-a-google-map-to-your-app: http://bakery.cakephp.org/articles/view/adding-a-google-map-to-your-app

.. author:: -Ste-
.. categories:: articles, helpers
.. tags:: helpers,Google Maps,geocoding,Helpers

