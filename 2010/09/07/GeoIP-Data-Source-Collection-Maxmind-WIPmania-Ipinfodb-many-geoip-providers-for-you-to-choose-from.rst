GeoIP Data Source Collection - Maxmind, WIPmania, Ipinfodb - many
geoip providers for you to choose from!
=======================================

Recently, I did a lot of projects about geo-targeting websites, and
most of my projects are cakephp-based. So it makes sense for me
digging into the bakery trying to find out if there is any existing
codes that I can reuse, and I found this
([url]http://bakery.cakephp.org/articles/view/quickly-translate-ip-to-
geo-coordinates[/url]), this
([url]http://bakery.cakephp.org/articles/view/geoip-component[/url])
and this ([url]http://bakery.cakephp.org/articles/view/hostip-info-
accessing-geoip-information-using-httpsocket[/url]). I am living in
Australia, and the hostip solution is basically useless to me because
it can't tell the ip address of Australia (I suspect if it works on
countries other than the State). Anyway, the other two are basically
the same and are based on Maxmind GeoIP/GeoCity database. These two
solutions are basically wrapping the Maxmind API into a cakephp
component. that's fine. BUT I do believe it's much better to have this
functionality implemented as a data source instead of components, so
that we can swap the backend with other geoip provider easily.


Design Consideration
--------------------


#. It has to be a drop-in solution - everything will be packaged into
   a plugin, and the developer only needs to drop in the plugin codes
   into their cakephp plugin folder and everything should works!
#. Geoip database provider (and path to the database) will be
   configured in the database.php file just like all other database
   connection setting
#. All geoip lookup codes are done through a model and it should
   follow the basic cakephp model convention. In other words, you use
   your familiar $geoip = $this->Geoip->find('first') to get your geo-
   location records, and the result will be something like
   $geoip['Geoip']['country_code'] or $geoip['Geoip']['country_name'].
   Everything needs to be cakephp-like and there should NOT be any
   surprise to the developer, the geoip lookup should be transparent to
   anyone.
#. Lookup result will be cached using standard cakephp caching
   mechanism



Supported Geoip providers
-------------------------


#. Maxmind (both GeoCountry and GeoCity database) - I am using the
   official API to interface with their binary database. So you should be
   able to either the commercial version or the free version - Download
   the database from `http://www.maxmind.com/app/geolitecity`_ or
   `http://www.maxmind.com/app/geolitecountry`_
#. Worldip (WIPmania) - Download the database from
   `http://www.wipmania.com/en/base/`_
#. Worldip (WIPmania) API - Worldip also provides an API for your to
   query their database live. I have included a live API version of the
   data source as well. You don't have to download anything, but the
   catch is you have got a quota of 10,000 request per day.
#. Webnet77 - This hosting company offers their own version of geoip
   database as well. I am not sure where they get their data from, but
   you can use their database at `http://software77.net/geo-ip/`_
#. LinuxBox UK - They have a geoip database based on whois records,
   you can downdload their database at `http://linuxbox.co.uk/ip-address-whois-database.php`_
#. Free GeoIP - This is a live data source, accessed through an API,
   you don't have to download anything, but feel free to checkout their
   website `http://freegeoip.appspot.com/`_. I am not sure where they get
   their data from, but it looks like Maxmind data - but needs to be
   confirmed.
#. IP Info DB - This is another live data source I can offer. you
   don't have to download anything, but feel free to checkout their
   website `http://ipinfodb.com/ip_location_api.php`_. They claimed their
   data is from Maxmind. So if you like the Maxmind data, but don't want
   to keep downloading database from Maxmind website to keep up-to-date,
   you may want to try this data source.



How to Use?
-----------

This geoip data source collection plugin is under my github account
and you can download the codes from
`http://github.com/dereklio/cakephp_geoip`_.

Once downloaded, put all the source codes under your /app/plugins
folder. Recommended path is /app/plugins/geoip, but any other path
should be fine.

Then you need to create your own Geoip model. A very minimum model is
required. Put the following codes into /app/models/geoip.php


Model Class:
````````````

::

    <?php
    class Geoip extends AppModel {

    	var $useDbConfig = 'geoip';

    }
    ?>

And now, you can set up your database.php config to use one of the
supported geoip providers. Refer below for the sample database config.

::


    <?php

    class DATABASE_CONFIG {
    	var $default;

    	var $geoip = array(
    		'datasource' => 'Geoip.webnet77',
    		'path' => '/full/path/to/the/database/file/IpToCountry.csv',
    		'cache' => '+6 months',
    	);

    	var $geoip = array(
    		'datasource' => 'Geoip.worldip',
    		'path' => '/full/path/to/the/database/file/worldip.en.txt',
    		'cache' => '+6 months',
    	);

    	var $geoip = array(
    		'datasource' => 'Geoip.worldip_api',
    		'cache' => '+6 months',
    	);

    	var $geoip = array(
    		'datasource' => 'Geoip.linuxbox',
    		'path' => '/full/path/to/the/database/file/ipv4addresses_august2009.csv',
    		'cache' => '+6 months',
    	);

    	var $geoip = array(
    		'datasource' => 'Geoip.maxmind',
    		'path' => '/full/path/to/the/database/file/GeoIP.dat',
    		'cache' => '+6 months',
    	);

    	var $geoip = array(
    		'datasource' => 'Geoip.maxmind',
    		'path' => '/full/path/to/the/database/file/GeoLiteCity.dat',
    		'cache' => '+6 months',
    	);

    	var $geoip = array(
    		'datasource' => 'Geoip.freegeoip',
    		'cache' => '+6 months',
    	);

    	var $geoip = array(
    		'datasource' => 'Geoip.ipinfodb',
    		'cache' => '+6 months',
    	);

    }

    ?>

I listed all available options in the above files, but in reality, you
only need to have either one of them!!

Please also note that cache config property. It specifies how long
should the geoip lookup result being cached in the cakephp tmp
directory. This option is especially useful when you're working with a
live data source, in order to reduce the network load and quota usage.
The default cache period is 6 months.

You can also combine different data source to get a bigger picture of
the geoip data. You can do this by using the combination data source.

::


    <?php

    class DATABASE_CONFIG {
    	var $default;

    	var $geoip = array(
    		'datasource' => 'Geoip.combination',
    		'priority' => array(
    			'ipinfodb' => array(),
    			'freegeoip' => array(),
    			'maxmind' => array(
    				'path' => '/full/path/to/the/database/file/GeoLiteCity.dat',
    			),
    			'worldip' => array(
    				'path' => '/full/path/to/the/database/file/worldip.en.txt',
    			),
    			'webnet77' => array(
    				'path' => '/full/path/to/the/database/file/IpToCountry.csv',
    			),
    			'linuxbox' => array(
    				'path' => '/full/path/to/the/database/file/ipv4addresses_august2009.csv',
    			),
    		),
    		'cache' => '+6 months',
    	);

    ?>

Again, all lookup result is cached!!

The actual geoip lookup codes will look like this


Controller Class:
`````````````````

::

    <?php
    class TestController extends AppController {

    	var $uses = array('Geoip');

    	function test() {
    		pr($this->Geoip->find('first'));
    		pr($this->Geoip->find('first', aa('conditions', aa('ip', '74.125.45.100'))));
    		pr($this->Geoip->find('first', aa('conditions', aa('Geoip.ip', '74.125.45.100'))));
    	}

    }
    ?>

Either one of them is ok. and the output will look like the following
(please note that the following is produced using the combination data
source, NOT all data source will give you all data fields.

::


    Array
    (
        [Geoip] => Array
            (
                [area_code] => 650
                [city] => Mountain View
                [continent_code] => NA
                [country_code] => US
                [country_code3] => USA
                [country_name] => United States
                [dma_code] => 807
                [gmt_offset] => -25200
                [ip] => 74.125.45.100
                [is_dst] => 1
                [latitude] => 37.4192
                [longitude] => -122.057
                [metro_code] => 807
                [organization] => Google Inc.
                [postal_code] => 94043
                [region] => 06
                [region_name] => California
                [registry] => arin
                [state] => CA
                [tech_contact] => arin-contact@google.com
                [timezone] => America/Los_Angeles
            )

    )

And.... that's all, enjoy your day!

.. _http://software77.net/geo-ip/: http://software77.net/geo-ip/
.. _http://www.wipmania.com/en/base/: http://www.wipmania.com/en/base/
.. _http://ipinfodb.com/ip_location_api.php: http://ipinfodb.com/ip_location_api.php
.. _http://github.com/dereklio/cakephp_geoip: http://github.com/dereklio/cakephp_geoip
.. _http://freegeoip.appspot.com/: http://freegeoip.appspot.com/
.. _http://www.maxmind.com/app/geolitecountry: http://www.maxmind.com/app/geolitecountry
.. _http://linuxbox.co.uk/ip-address-whois-database.php: http://linuxbox.co.uk/ip-address-whois-database.php
.. _http://www.maxmind.com/app/geolitecity: http://www.maxmind.com/app/geolitecity

.. author:: dereklio
.. categories:: articles, models
.. tags:: geoip,maxmind,iptolocation,wipmania,linuxbox,webnet,worldip,freegeoip,ipinfodb,Models

