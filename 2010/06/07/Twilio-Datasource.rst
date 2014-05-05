Twilio Datasource
=================

This is a basic Twilio Datasource for reading/creating text messages.

Here is a simple example of how to use Datasources and `HttpSocket` to
implement a very basic `Twilio`_ source that allows querying the
Twilio API as well as posting new text messages to a configured
account.

This example will only work in PHP 5.2 and above , due to the use of
`json_decode` for the parsing of JSON formatted data.

You would place the Twilio datasource in
app/models/datasources/twilio_source.php :


Controller Class:
`````````````````

::

    <?php 
    /**
     * Twilio DataSource
     *
     * Used for reading and writing to Twilio, through models.
     *
     * PHP Version 5.x
     *
     *
     * @filesource
     * @copyright     Copyright 2010, Life Is Content
     * @link          http://lifeiscontent.net Life Is Content
     */
    App::import('Core', 'HttpSocket');
    class TwilioSource extends DataSource {
    	private $ApiVersion = "2008-08-01";
    	protected $_schema = array(
    		'texts' => array(
    			'From' => array(
    				'type' => 'integer',
    				'null' => true,
    				'key' => 'primary',
    				'length' => 10,
    			),
    			'To' => array(
    				'type' => 'integer',
    				'null' => true,
    				'key' => 'primary',
    				'length' => 10
    			),
    			'Body' => array(
    				'type' => 'string',
    				'null' => true,
    				'key' => 'primary',
    				'length' => 160
    			),
    		)
    	);
    	public function __construct($config) {
    		$auth = "{$config['AccountSid']}:{$config['AuthToken']}";
    		$this->connection = new HttpSocket(
    			"https://{$auth}@api.twilio.com/"
    		);
    		parent::__construct($config);
    	}
    	public function listSources() {
    		return array('texts');
    	}
    	public function read($model, $queryData = array()) {
    		$url = "/".$this->ApiVersion."/Accounts/";
    		$url .= "{$this->config['AccountSid']}/SMS/Messages.json";
    		$response = json_decode($this->connection->get($url), true);
    		$results = array();
    		foreach ($response['TwilioResponse']['SMSMessages'] as $record) {
    			$record = array('Text' => $record['SMSMessage']);
    			$results[] = $record;
    		}
    		return $results;
    	}
    	public function create($model, $fields = array(), $values = array()) {
    		$data = array_combine($fields, $values);
    		$result = $this->connection->post("/".$this->ApiVersion."/Accounts/{$this->config['AccountSid']}/SMS/Messages.json", $data);
    		$result = json_decode($result, true);
    		debug($result);
    		if (isset($result['Sid'])) {
    			$model->setInsertId($result['Sid']);
    			return true;
    		}
    		return false;
    	}
    	public function describe($model) {
    		return $this->_schema['texts'];
    	}
    }
    ?>


Your model implementation could be as simple as:

Model Class:
````````````

::

    <?php 
    class Text extends AppModel {
    	public $useDbConfig = 'twilio';
    }
    ?>


If we had not defined our schema in the datasource itself, you would
get an error message to that effect here.

And the configuration settings in your `app/config/database.php` would
resemble something like this:

::

    
    	var $twilio = array(
    
    		'datasource' => 'twitter',
    
    		'AccountSid' => 'accountsid',
    
    		'AuthToken' => 'authtoken',
    
    	);
    


Using the familiar model methods from a controller:

::

    
    // Will use the config defined in the $twilio as shown above:
    
    $texts = $this->Texts->find('all');
    

Similarly, saving a new text message:

::

    
    $this->Text->save(array('To'=>4155554444, 'From'=>4154445555, 'Body' => 'This is a text message'));
    



.. _Twilio: http://twilio.com

.. author:: aaroninfidel
.. categories:: articles, models
.. tags:: api,REST,datasource,twilio,Models

