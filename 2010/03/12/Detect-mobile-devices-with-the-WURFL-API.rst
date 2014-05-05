Detect mobile devices with the WURFL API
========================================

This component uses the WURFL API to detect any mobile or wireless
device, and sets custom paths for your views and css, so you can
easily create a mobile version of your website.
This component uses the WURFL API to detect any mobile or wireless
device, and sets custom paths for your views and css, so you can
easily create a mobile version of your website.

Lets get started.


The WURFL API
~~~~~~~~~~~~~

First of all, download the WURFL API package `here`_ (Make sure to
download the 1.1 version).

Extract the entire WURFL folder in the package to your /app/vendors
folder.
Create a directory /app/configs/wurfl, and extract everything in the
resources folder to that directory.

In the examples/resources directory, extract the file in the wurfl-
regression.zip to your /app/configs/wurfl directory.
Edit the wurfl-config.xml file to look like the following:

::

    
    <?xml version="1.0" encoding="UTF-8"?>
    <wurfl-config>
        <wurfl>
    		<main-file>wurfl.xml</main-file>
            <patches>
            	<patch>web_browsers_patch.xml</patch>
            </patches>
        </wurfl>
        <persistence>
        	<provider>file</provider>
        	<params>dir=../../tmp/cache/wurfl</params>
        </persistence>
        <cache>
        	<provider>null</provider>
        </cache>
    </wurfl-config>

Create the folder /app/tmp/cache/wurfl.


The Component
~~~~~~~~~~~~~

Create a file /app/controllers/components/mobiledetect.php and put the
following in the file:

Component Class:
````````````````

::

    <?php 
    class MobiledetectComponent extends Object
    {
        var $isMobile = false;
    
        function startup(&$controller)
        {
            $this->controller =& $controller;
        }
    
        function detect()
        {
    		
    		App::import( 'Vendor', 'WURFL', array( 'file' => 'WURFLManagerProvider.php')); 
    		
    		$wurflConfigFile = CONFIGS.'wurfl/wurfl-config.xml';
    
    		$wurflManager = WURFL_WURFLManagerProvider::getWURFLManager($wurflConfigFile);
    		
    		$requestingDevice = $wurflManager->getDeviceForHttpRequest($_SERVER);
    
    		if($requestingDevice->getCapability('is_wireless_device') == 'true')
    		{
                            $this->isMobile = true;
    			$this->setMobile();
                            $this->controller->theme = 'mobile';
              		$this->controller->layoutPath = 'mobile';
    		}
    		
           
        }
    }
    ?>

In your app_controller, remember to include the component like this:

::

    
    var $components = array('Mobiledetect');

and add to the beforeFilter function the following:

::

    
    function beforeFilter()
    {
        $this->Mobiledetect->startup($this);
        $this->Mobiledetect->detect();
    }

And thats it! Now you can create a custom layout file for your mobile
website, located under /app/views/layouts/mobile.
You also need to put your css in a directory in
/app/webroot/themed/mobile/css
and (optional)images in /app/webroot/themed/mobile/css/img.
Your views need to go to /app/views/themed/mobile.

Your done! Now you can create a mobile version of your website.

.. _here: http://sourceforge.net/projects/wurfl/files/WURFL%20PHP/

.. author:: Pierre
.. categories:: articles, components
.. tags:: api,mobile,wireless device,wurfl,Components

