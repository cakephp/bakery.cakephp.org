Component to send SMS/text messages
===================================

This is a quick guide demonstrating the use of the PanaceaSms
component (written for the Panacea Mobile SMS Gateway /
www.panaceamobile.com / free test credits given) which allows you to
easily send SMS from your application, as well as receive delivery
reports.
In order to use this component, your PHP installation needs to support
cURL and you need to have a Panacea Mobile username/password (can be
obtained at `http://www.panaceamobile.com`_).

You may download the component from:

`www.panaceamobile.com/panacea_sms_component.zip`_

Once done, save panacea_sms.php in your components directory (usually
under app/controllers/components).

Then place the following code in your controller where you wish to use
the component.

::

    
    var $components = array('PanaceaSms');

This will include the component into your controller.

Now, in your controller functions, when you wish to send an SMS/text
message, your code should look something like this:

::

    
    $this->PanaceaSms->username = "myusername"; /* This is your Panacea Mobile username */
    $this->PanaceaSms->password = "mypassword"; /* This is your Panacea Mobile password */
    if($this->PanaceaSms->send("44881234567", "Hello there!")) {
       /* SMS Sent */
    }

Easy as that!


Advanced features (optional)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are some 'advanced' features available if you wish to change the
from number (the number which the message appears to be from) as well
as receive delivery reports. This can be done as below:

::

    
    $fromNumber = "44881234569";
    $this->PanaceaSms->username = "myusername"; /* This is your Panacea Mobile username */
    $this->PanaceaSms->password = "mypassword"; /* This is your Panacea Mobile password */
    $this->PanaceaSms->delivery_report_mask = 31; /* This is for all statuses */
    $this->PanaceaSms->delivery_report_url = Router::url(array('action' => 'receive_delivery_report'), true);
    if($this->PanaceaSms->send("44881234567", "Hello there!", $fromNumber)) {
       /* SMS Sent */
    }

Now, when a delivery report comes in for your message, it will hit the
URL specified under delivery_report_url. I have included an example of
how to deal with this in your controller.

::

    
    function receive_delivery_report() {
        $details = $this->PanaceaSms->getDeliveryReport();
        if($details !== FALSE) {
            /* original to, from, message and status returned in an array */
        }
    }



.. _http://www.panaceamobile.com: http://www.panaceamobile.com/
.. _www.panaceamobile.com/panacea_sms_component.zip: http://www.panaceamobile.com/panacea_sms_component.zip

.. author:: donald_jackson
.. categories:: articles, components
.. tags:: sms,text message,panacea mobile,http sms,Components

