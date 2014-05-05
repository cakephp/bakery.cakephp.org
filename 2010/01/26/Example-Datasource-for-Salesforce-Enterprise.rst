Example Datasource for Salesforce Enterprise
============================================

I have been looking for a datasource for Sales force for some time and
Never found one so I constructed a Salesforce example Datasource for
Query/Login/delete/update/upsert(CRUD like) for the Salesforce
Enterprise API. It could be extended with a SOQL dialect (I would love
this).
I have built a sample way to integrate the Salesforce API with
CakePHP.

The zip package is at `http://www.contangoadvisors.com/work/SalesforceCakePHPdatasource.zip`_
This Datasource is for a Salesforce Enterprise implementation
to use the other types you will have to modify the code.

This Package requires you to have the Salesforce PHP Toolkit 13.0 or
greater.
(`http://wiki.developerforce.com/index.php/PHP_Toolkit`_)
I wrote this as a simple implementation of the Salesforce enterprise
API for read and login

Here is the class I use it is more than the class in the zip:

::


    <?php
    /**
    * SalesForceSource
    *
    * A Slaesforce SOAP Client Datasource
    * Connects to a Salesforce enterprise SOAP server using the configured wsdl file
    *
    * PHP Version 5
    *
    * Copyright 2009 Chris Roberts Ph.D, www.osxgnu.org
    *
    * This library is free software: you can redistribute it and/or modify
    * it.
    *
    * This library is distributed in the hope that it will be useful,
    * but WITHOUT ANY WARRANTY; without even the implied warranty of
    * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    *
    *
    *
    *
    */
    class SalesforceSource extends DataSource {

        /**
    * Description for this DataSource
    *
    * @var string
    */
        public $description = 'Salesforce Enterprise SOAP Client DataSource';

        /**
    * The SoapClient instance
    *
    * @var object
    */
        public $client = null;

        /**
    * The current connection status
    *
    * @var boolean
    */
        public $connected = false;

        /**
    * The default configuration
    *
    * @var array
    */
        public $_baseConfig = array(
            'wsdl' => '',
            'username' => '',
            'password' => ''
        );

        /**
    * Constructor
    *
    * @param array $config An array defining the configuration settings
    */
        public function __construct($config) {
            parent::__construct($config);
            $this->connect();
        }

    public function isConnected(){
     $this->connect();
    return $this->connected;
    }

        /**
    * Connects to the SOAP server using the wsdl in the configuration
    * passes the salesforce credentals for login
    * @param array $config An array defining the new configuration settings
    * @return boolean True on success, false on failure
    */
        public function connect() {
    		require_once ('models/datasources/soapclient/SforceEnterpriseClient.php');
    		$wsdl = APP.'models/datasources/soapclient/'.$this->config['wsdl'];
            	$mySforceConnection = new SforceEnterpriseClient();
            	$mySforceConnection->createConnection($wsdl);
            	$mySoapClient = $mySforceConnection->createConnection($wsdl);
    		$mylogin = $mySforceConnection->login($this->config['username'], $this->config['password']);
                  $this->client = $mySforceConnection;
                  $this->connected = true;
              return $this->connected;
        }

        /**
    * Sets the SoapClient instance to null
    *
    * @return boolean True
    */
        public function close() {
            $this->client = null;
            $this->connected = false;
            return true;
        }

        /**
    * Returns the available SOAP methods
    *
    * @return array List of SOAP methods
    */
        public function listSources() {
           return $this->client->__getFunctions();
        }

        /**
    * Query the SOAP server with the given method and parameters
    * pass the SOQL query as the only pram
    * @return mixed Returns the soql object array result on success, false on failure
    */
        public function query($Query = null) {
    	 $response =false;
            $this->error = false;
        try {
    	       $this->connect();
    	       $response = $this->client->query($Query);

    	  } catch (Exception $e) {
      		echo $e->faultstring;
    	  }
    	return($response);
        }

        /**
    * delete a salesforce record
    * pass the SOQL query as the only pram
    * @return mixed Returns the soql object array result on success, false on failure
    */
        public function delete($Id = null) {
    	 $response =false;
            $this->error = false;
        try {
    	       $this->connect();
    	       $response = $this->client->delete($Id);

    	  } catch (Exception $e) {
      		echo $e->faultstring;
    	  }
    	return($response);
        }

    /**
    * update the SOAP server with the given method and parameters
    * pass the sObject query as the only pram
    * @return mixed Returns the soql result object array result on success, false on failure
    */
        public function upsert($localid='upsert', $sOBject = null, $type='Contact' ) {

            $this->error = false;
        try {
    	       $this->connect();
                  $this->client->upsert($localid, $sObject, $type);
    	  } catch (Exception $e) {
    		print_r($mySforceConnection->getLastRequest());
      		echo $e->faultstring;
    	  }
    	return($response);
        }


    /**
    * update the SOAP server with the given method and parameters
    * pass the sObject query as the only pram
    * @return mixed Returns the soql result object array result on success, false on failure
    */
        public function update($sOBject = null, $type= 'Contact') {
    	 $response =false;
            $this->error = false;
        try {
    	       $this->connect();
    	       $response = $this->client->update(array($sOBject), $type);

    	  } catch (Exception $e) {
    		print_r($mySforceConnection->getLastRequest());
      		echo $e->faultstring;
    	  }
    	return($response);
        }

        /**
    * Returns the last SOAP response
    *
    * @return string The last SOAP response
    */
        public function getResponse() {
           return $this->client->__getLastResponse();
        }

        /**
    * Returns the last SOAP request
    *
    * @return string The last SOAP request
    */
        public function getRequest() {
            return $this->client->__getLastRequest();
        }

        /**
    * Shows an error message and outputs the SOAP result if passed
    *
    * @param string $result A SOAP result
    * @return string The last SOAP response
    */
        public function showError($result = null) {
            if(Configure::read() > 0) {
                if($this->error) {
                    trigger_error('<span style = "color:Red;text-align:left"><b>SOAP Error:</b> <pre>' . print_r($this->error) . '</pre></span>', E_USER_WARNING);
                }
                if($result) {
                    e(sprintf("<p><b>Result:</b> %s </p>", $result));
                }
            }
        }

    }
    ?>

When a sOBject is needed in a method the object is created as follows:

::


    $sObject = new stdClass();
      $sObject->FirstName = 'George';
      $sObject->LastName = 'Smith';
      $sObject->Phone = '510-555-5555';
      $sObject->BirthDate = '1927-01-25';
      $sObject->Email = 'test@test.com';

When a type is needed you will have to pass the Salesforce object
type:

::


      $type='Contact';      // for the contact object
      $type='myobject__c';  // for myobject custom object

Hers is the example Model:

Model Class:
````````````

::

    <?php
    class Account extends AppModel {

            var $useDbConfig='sftest';
            var $useTable = false;

       function first10account() {
    	   	$SOQL = "SELECT
    			   		a.AccountNumber,
    			   		a.AnnualRevenue,
    			   		a.BillingCity,
    			   		a.BillingCountry,
    			   		a.BillingPostalCode,
    			   		a.BillingState,
    			   		a.BillingStreet,
    			   		a.CreatedById,
    			   		a.CreatedDate,
    			   		a.Description,
    			   		a.Fax,
    			   		a.FirstName,
    			   		a.Id,
    			   		a.Industry,
    			   		a.IsDeleted,
    			   		a.IsPersonAccount,
    			   		a.LastActivityDate,
    			   		a.LastModifiedById,
    			   		a.LastModifiedDate,
    			   		a.LastName,
    			   		a.MasterRecordId,
    			   		a.Name,
    			   		a.NumberOfEmployees,
    			   		a.OwnerId,
    			   		a.Ownership,
    			   		a.ParentId,
    			   		a.Phone,
    			   		a.Rating,
    			   		a.RecordTypeId,
    			   		a.Salutation,
    			   		a.Type,
    			   		a.Website
    	   			FROM Account a
    				WHERE  IsDeleted = Null
    				Limit 10";
    		return $this->query($SOQL);
       }

    }
    ?>

Here is the database.php example

::


    <?php
    class DATABASE_CONFIG {
            //test salesforce db config
    	var $sftest = array(
    		'datasource' => 'salesforce',
    		'wsdl' => 'test.enterprise.wsdl.xml',
    		'username' => 'your@test_login_id',
    		'password' => 'your_test_password'
    	);

           //production salesforce db config
           var $sfproduction = array(
    		'datasource' => 'salesforce',
    		'wsdl' => 'enterprise.wsdl.xml',
    		'username' => 'your@production_login_id',
    		'password' => 'your_production_password'
    	);
    }
    ?>

Here is an example Controller:

Controller Class:
`````````````````

::

    <?php
    class MytestController extends AppController {

    	var $name = 'Mytest';
    	// define helpers
    	var $helpers = array('Html', 'Form');
    	//use the Salesforce Account
    	var $uses = array('Account');

    	function index() {
    		$accounts = $this->Account->first10account();
    		$this->set(compact('accounts'));
    	}

    }
    ?>

Here is the example view:

View Template:
``````````````

::


    <!-- views/mytest/index.ctp -->
    <table border="1" cellpadding="1" cellspacing="0" >
    <?php
    foreach ($accounts->records as $record) {
    ?>


        <tr>
         	<td align="right" width="20%"><b>Id:</b></td>
        	<td style="text-align:left;" width="80%"><?php echo $record->Id; ?></td>
        </tr>
    	<tr>
        	<td align="right"><b>First Name:</b></td>
        	<td style="text-align:left;"><?php echo $record->FirstName; ?></td>
        </tr>
    	<tr>
         	<td align="right"><b>Last Name:</b></td>
        	<td style="text-align:left;"><?php echo $record->LastName; ?></td>
        </tr>
    	<tr>
         	<td align="right"><b>Salutation:</b></td>
        	<td style="text-align:left;"><?php echo $record->Salutation; ?></td>
        </tr>

     <?php }?>
     </table>



You may want to extend the salesforce_source.php file with other
methods for special Salesforce methods like lead2opportunity().

How to install this package:
1. Bake a CakePHP app ( see CakePHP.org) "app" refers your newly baked
application's directory
2. Place the following files in your App.
models/datasources/salesforce_source.php(or from above) in
app/models/datasources/
config/database.php in app/config/
models/account.php in app/models/
controllers/mytest_controller.php in app/controllers/
views/mytest directory in app/views/

Your copy of the Salesforce PHP Toolkit soapclient/ directory is
placed in app/models/datasources/

3. Download your enterprise.wsdl.xml from your Production salesforce
instance
4. Download your enterprise.wsdl.xml from your Sandbox salesforce
instance and name it test.enterprise.wsdl.xml
5. copy your enterprise.wsdl.xml and test.enterprise.wsdl.xml to
app/models/datasources/soapclient
6. Edit your app/config/database.php add your usernames and passwords
for BOOTH Instances.
(change sflive to default if needed.)

You can then test your connection by going to your new cake app in a
web browser HTTP://URLOFTHEINSTANCE/mytest
you should see the first 10 accounts on your test instance of
salesforce.

The Model for account sOBject (app/models/account.php) contains a SOQL
query.
The controller (app/controllers/mytest_controller.php) gets the result
of the query method in the model and passes it to the view.
The View (app/views/mytest/index.ctp) iterates through the query
result and displays the data in a table.



.. _http://www.contangoadvisors.com/work/SalesforceCakePHPdatasource.zip: http://www.contangoadvisors.com/work/SalesforceCakePHPdatasource.zip
.. _http://wiki.developerforce.com/index.php/PHP_Toolkit: http://wiki.developerforce.com/index.php/PHP_Toolkit

.. author:: cwestonr
.. categories:: articles, models
.. tags:: datasource,salesforce,Models

