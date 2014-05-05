Plugin for Paypal Web Payments Pro for Cake PHP 2.x
===================================================

Basic Plugin that uses the NVP Methods for the WPP API from Paypal.
Component pushes method and NVP combo to paypal url curl. Required
php5-curl configuration in php.


PayPal WebPaymentsPro (WPP) Plugin for CakePHP 2.x
--------------------------------------------------


CakePHP 2.x Plugin for interfacing with Paypal WPP

Plugin can be found at `https://bitbucket.org/chrispierce/paypalwpp-plugin-for-cakephp-2.x/overview`_


Usage
~~~~~


Load plugin in your APP and enable it by using the following
bootstrap.php config:

::

     `
    CakePlugin::load('PaypalWPP');
    `

Configure your account by opening the Config/paypal.php file as
follows

::

     `
    $config=array(
    'paypal'=>array(
    'username'=>'username_api1.domain.com',
    'password'=>'THGSWS658IKUN79S',
    'signature'=>'AFYn4irhcVyzOOiJkc.H2zPIuztlArzO7mr5uXMO6DLICAE85JF.H5PPp',
    'endpoint'=>'https://api-3t.paypal.com/nvp',
    'version'=>'53.0',
    ),
    );
    `

Load the Component into the controller of your choice.

::

     `
    public$components=array(
    'PaypalWPP.PaypalWPP',
    );
    `

Next urlencode your data and send it to the component using a method
and an nvp. For doing payments using DoDirectPayment
(`https://developer.paypal.com/webapps/developer/docs/classic/api/merchant/DoDirectPayment_API_Operation_NVP/`_)
the following example would work::

     `
    publicfunctionadd(){
    if($this->request->is('post')||$this->request->is('put')){
    $firstName=urlencode($this->request->data['Sale']['first_name']);
    $lastName=urlencode($this->request->data['Sale']['last_name']);
    $creditCardType=urlencode($this->request->data['Sale']['card_type']);
    $creditCardNumber=urlencode($this->request->data['Sale']['card_number']);
    $expDateMonth=$this->request->data['Sale']['exp']['month'];
    $padDateMonth=urlencode(str_pad($expDateMonth,2,'0',STR_PAD_LEFT));
    $expDateYear=urlencode($this->request->data['Sale']['exp']['year']);
    $cvv2Number=urlencode($this->request->data['Sale']['cvv2']);
    $amount=urlencode($this->request->data['Sale']['amount']);
    $nvp='&PAYMENTACTION=Sale';
    $nvp.='&AMT='.$amount;
    $nvp.='&CREDITCARDTYPE='.$creditCardType;
    $nvp.='&ACCT='.$creditCardNumber;
    $nvp.='&CVV2='.$cvv2Number;
    $nvp.='&EXPDATE='.$padDateMonth.$expDateYear;
    $nvp.='&FIRSTNAME='.$firstName;
    $nvp.='&LASTNAME='.$lastName;
    $nvp.='&COUNTRYCODE=US&CURRENCYCODE=USD';

    $response=$this->PaypalWPP->wpp_hash('DoDirectPayment',$nvp);
    if($response['ACK']=='Success'){
    $this->Session->setFlash('PaymentSuccessful');
    }else{
    $this->Session->setFlash('PaymentFailed');
    }
    debug($response);
    }
    }
    `

Other Methods can be found at `https://devtools-paypal.com/apiexplorer/PayPalAPIs`_


.. _https://developer.paypal.com/webapps/developer/docs/classic/api/merchant/DoDirectPayment_API_Operation_NVP/: https://developer.paypal.com/webapps/developer/docs/classic/api/merchant/DoDirectPayment_API_Operation_NVP/
.. _https://bitbucket.org/chrispierce/paypalwpp-plugin-for-cakephp-2.x/overview: https://bitbucket.org/chrispierce/paypalwpp-plugin-for-cakephp-2.x/overview
.. _https://devtools-paypal.com/apiexplorer/PayPalAPIs: https://devtools-paypal.com/apiexplorer/PayPalAPIs

.. author:: cpierce
.. categories:: articles, plugins
.. tags:: paypal,curl,plugin,web payments pro,wpp,Plugins

