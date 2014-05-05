VMWare LabManager CakePHP SOAP API Component
============================================

This component is used to interact with VMWare LabManager 4.0 via
CakePHP using VMWare Lab Manager SOAP API. It is assumed that the user
is familiar with CakePHP and php is configured to use soap.


Step 1: Setup the Configuration settings.
-----------------------------------------
This can be done using Configure:write('vm_ware.soap_wsdl'); or hard
coding it in /app/config/core.php


+ vm_ware.soap_wsdl: https://labmanager.some-organization.com/LabManager/SOAP/LabManager.asmx?wsdl
+ vm_ware.soap_username: user in LabManager
+ vm_ware.soap_password: the user account password
+ vm_ware.soap_organization_name: Technology
+ vm_ware.soap_namespace: http://vmware.com/labmanager
+ (optional) vm_ware.soap_workspace_name: Testing Workspace

Step 2: Create a controller


Controller Class:
`````````````````

::

    <?php

    class LabManagerController extends AppController {
    	var $name = 'LabManager';
    	var $pageTitle = "VM Lab Manager Assistant";
    	var $components = array('LabManager');

    	function index() {
    		$libs = $this->LabManager->getLibraryConfigurationsList();
    		pr($libs); // print the library configuration list
    	}
    }

    ?>



Step 3: Create the component
----------------------------


Component Class:
````````````````

::

    <?php

    /*
     * Author: Tristan Everitt
     * LabManagerComponent is used by CakePHP to connect to VMWare LabManager 4.0
     * Note: Some functions (e.g. clone, capture, etc) take a long time so
     * 		the page might timeout.  It is recommended to execute those functions via CakePHP shell.
     */

    class LabManagerComponent extends Object {
    	var $Controller = null;
    	var $client = null;

    	function initialize(&$Controller) {
            $this->Controller = $Controller;
        }

        function createClient($wsdl,$username,$password,$organization,$workspacename='',$namespace='') {

        	if(empty($namespace)) $namespace = "http://vmware.com/labmanager";
        	$soap_dat = array();
        	$soap_dat["username"] = $username;
    		$soap_dat["password"] = $password;
    		$soap_dat["organizationname"] = $organization;
    		if(!empty($workspacename)) {
    			$soap_dat["workspacename"] = $workspacename;
    		}


    		$debug = Configure::read('debug');
    		if ($debug > 0) {
    			$this->client = new SoapClient($wsdl, array('trace' => 1));
    		} else {
    			$this->client = new SoapClient($wsdl);
    		}

    		$authvar = new SoapVar($soap_dat, SOAP_ENC_OBJECT);
    		$header = new SOAPHeader($namespace, 'AuthenticationHeader', $soap_dat);
    		$this->client->__setSoapHeaders($header);
        }

    	function startup() {
    		$wsdl = Configure::read('vm_ware.soap_wsdl');
    		$username = Configure::read('vm_ware.soap_username');
    		$password = Configure::read('vm_ware.soap_password');
    		$organization = Configure::read('vm_ware.soap_organization_name');
    		$namespace = Configure::read('vm_ware.soap_namespace');
    		if(empty($workspacename)) {
    			$workspacename = Configure::read('vm_ware.soap_workspace_name');
    		}
    		$this->createClient($wsdl,$username,$password,$organization,$workspacename,$namespace);
    	}

    	function getStatusType($status_id) {
    		switch($status_id) {
    			case 0:		return 'Undeployed';
    			case 1: 	return 'Off';break;
    			case 2: 	return 'Running';break;
    			case 3: 	return 'Suspended';break;
    			case 4: 	return 'Stuck';break;
    			case 128: 	return 'Invalid';break;
    		}
    	}

    	public function captureConfiguration($configurationId,$newName) {
    		if(!isset($this->client)) $this->startup();

    		try {
    			$soap_req["configurationId"] = $configurationId;
    			$soap_req["newLibraryName"] = $newName;
    			$result = $this->client->ConfigurationCapture($soap_req);
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}

    		return $result->ConfigurationCaptureResult;
    	}
    	public function checkoutConfiguration($configurationId, $newName,$workspace="") {
    		if(!isset($this->client)) {
    			if(!empty($workspace)) {
    				$workspacename = Configure::write('vm_ware.soap_workspace_name',$workspace);;
    			}
    			$this->startup();
    		}
    		try {
    			$soap_req["configurationId"] = $configurationId;
    			$soap_req["workspaceName"] = $newName;
    			$result = $this->client->ConfigurationCheckout($soap_req);
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}

    		return $result->ConfigurationCheckoutResult;
    	}

    	public function cloneConfiguration($configurationId, $newName,$workspace="") {
    		if(!isset($this->client)) {
    			if(!empty($workspace)) {
    				$workspacename = Configure::write('vm_ware.soap_workspace_name',$workspace);;
    			}
    			$this->startup();
    		}
    		try {
    			$soap_req["configurationId"] = $configurationId;
    			$soap_req["newWorkspaceName"] = $newName;
    			$result = $this->client->ConfigurationClone($soap_req);
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}

    		return $result->ConfigurationCloneResult;
    	}
    	public function deleteConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			return $this->client->ConfigurationDelete(array("configurationId" => $configurationId));
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	function getFenceDescription($fence_id) {
    		switch($fence_id) {
    			case 1: return 'Not Fenced';break;
    			case 2: return 'Fenced - Block Traffic In and Out';break;
    			case 3: return 'Fenced - Allow Traffic Out Only';break;
    			case 4: return 'Fenced - Allow Traffic In and Out';break;
    			default: return 'N/A';
    		}
    	}

    	public function deployConfiguration($configurationId, $fenceMode=1,$isCached=false) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			$soap_req["configurationId"] = $configurationId;
    			$soap_req["isCached"] = $isCached;
    			$soap_req["fenceMode"] = $fenceMode;
    			return $this->client->ConfigurationDeploy($soap_req);
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function powerOnConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->configurationAction($configurationId,1);
    	}

    	public function powerOffConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->configurationAction($configurationId,2);
    	}

    	public function suspendConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->configurationAction($configurationId,3);
    	}

    	public function resumeConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->configurationAction($configurationId,4);
    	}

    	public function resetConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->configurationAction($configurationId,5);
    	}

    	public function snapshotConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->configurationAction($configurationId,6);
    	}

    	public function revertConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->configurationAction($configurationId,7);
    	}

    	public function shutdownConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->configurationAction($configurationId,8);
    	}

    	public function configurationAction($configurationId,$actionId) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			$soap_req["configurationId"] = $configurationId;
    			$soap_req["action"] = $actionId;
    			return $this->client->ConfigurationPerformAction($soap_req);
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function powerOnMachine($machineId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->machineAction($machineId,1);
    	}

    	public function powerOffMachine($machineId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->machineAction($machineId,2);
    	}

    	public function suspendMachine($machineId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->machineAction($machineId,3);
    	}

    	public function resumeMachine($machineId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->machineAction($machineId,4);
    	}

    	public function resetMachine($machineId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->machineAction($machineId,5);
    	}

    	public function snapshotMachine($machineId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->machineAction($machineId,6);
    	}

    	public function revertMachine($machineId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->machineAction($machineId,7);
    	}

    	public function shutdownMachine($machineId) {
    		if(!isset($this->client)) $this->startup();
    		return $this->machineAction($machineId,8);
    	}

    	public function machineAction($machineId,$actionId) {
    		if(!isset($this->client)) $this->startup();
    		/*  MachinePerformAction
    		 *
    		 * Action ID
    		 	1â€”Power On. Turns on a configuration.
    			2â€”Power Off. Turns off a configuration. Nothing is saved.
    			3â€”Suspend. Freezes the CPU and state of a configuration.
    			4â€”Resume. Resumes a suspended configuration.
    			5â€”Reset. Reboots a configuration.
    			6â€”Snapshot. Saves a configuration state at a specific point in time.
    			7â€”Revert. Returns the configuration to a snapshot state.
    			8â€”Shutdown. Shuts down a configuration before turning it off.
    		 */

    		try {
    			$soap_req["machineId"] = $machineId;
    			$soap_req["action"] = $actionId;
    			return $this->client->MachinePerformAction($soap_req);
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function setConfigurationPublic($configurationId,$isPublic=true) {
    		if(!isset($this->client)) $this->startup();
    		try {
    				$soap_req["configurationId"] = $configurationId;
    				$soap_req["isPublic"] = $isPublic;
    				// NO results are returned if everything is good.
    				return $this->client->ConfigurationSetPublicPrivate($soap_req);
    			}
    			catch (SoapFault $e) {
    				return $e;
    			}
    	}

    	public function undeployConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			return $this->client->ConfigurationUndeploy(array('configurationId'=>$configurationId));
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function getConfiguration($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			return $this->client->GetConfiguration(array("id" => $configurationId))->GetConfigurationResult;
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function getConfigurationByName($name) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			$result = $this->client->GetConfigurationByName(array("name" => $name));
    			return $result->GetConfigurationByNameResult->Configuration;
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function getConfigurationIdByName($name) {
    		if(!isset($this->client)) $this->startup();
    		return $this->GetConfigurationByName($name)->id;
    	}

    	public function getCurrentOrganizationName() {
    		if(!isset($this->client)) $this->startup();
    		try {
    			$result = $this->client->__soapCall('GetCurrentOrganizationName', array());
    			$vars = get_object_vars($result);
    			return ($vars["GetCurrentOrganizationNameResult"]);
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function getCurrentWorkspaceName() {
    		if(!isset($this->client)) $this->startup();
    		try {
    			$result = $this->client->GetCurrentWorkSpaceName(array());
    			return $result->GetCurrentWorkspaceNameResult;
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function getMachine($machineId) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			return $this->client->GetMachine(array("machineId" => $machineId))->GetMachineResult;
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function getMachineByName($configurationId,$name) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			return $this->client->GetMachineByName(
    						array("configurationId" => $configurationId,"name"=>$name))->GetMachineByNameResult;
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function getSingleConfigurationByName($name) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			return $this->client->GetSingleConfigurationByName(
    						array("name"=>$name))->GetSingleConfigurationByNameResult;
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function getVariableTypes() {
    		if(!isset($this->client)) $this->startup();
    		return $this->client->__getTypes();
    	}
    	public function getFunctions() {
    		if(!isset($this->client)) $this->startup();
    		return $this->client->__getFunctions();
    	}

    	public function getLibraryConfigurations() {
    		if(!isset($this->client)) $this->startup();
    		return $this->getConfigurations(2);
    	}

    	public function getLibraryConfigurationsList($only_public_configs=false) {
    		if(!isset($this->client)) $this->startup();
    		$configs = $this->getConfigurations(2);
    		$libs = array();
    		foreach($configs as $idx =>$c) {
    			if($only_public_configs and $c->isPublic) {
    				$libs[$c->id] = $c->name;
    			} else if(!$only_public_configs) {
    				$libs[$c->id] = $c->name;
    			}

    		}
    		return $libs;
    	}

    	public function getWorkspaceConfigurationsList($only_public_configs=false) {
    		if(!isset($this->client)) $this->startup();
    		$configs = $this->getConfigurations(1);
    		$libs = array();
    		foreach($configs as $idx =>$c) {
    			if($only_public_configs and $c->isPublic) {
    				$libs[$c->id] = $c->name;
    			} else if(!$only_public_configs) {
    				$libs[$c->id] = $c->name;
    			}

    		}
    		return $libs;
    	}

    	public function getWorkspaceConfigurations($only_public_configs=false) {
    		if(!isset($this->client)) $this->startup();
    		$configs = $this->getConfigurations(1);
    		$libs = array();
    		foreach($configs as $idx =>$c) {
    			if($only_public_configs and $c->isPublic) {
    				$libs[$c->id] = $c;
    			} else if(!$only_public_configs) {
    				$libs[$c->id] = $c;
    			}

    		}
    		return $libs;
    	}

    	public function getConfigurations($configurationType) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			return $this->client->ListConfigurations(array("configurationType" => $configurationType))->ListConfigurationsResult->Configuration;
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function getMachines($configurationId) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			$result = $this->client->ListMachines(array("configurationId" => $configurationId));
    			if(!isset($result->ListMachinesResult->Machine)) {
    				return array();
    			} else if (is_array($result->ListMachinesResult->Machine)) {
    				return $result->ListMachinesResult->Machine;
    			}
    			else {
    				return array($result->ListMachinesResult->Machine);
    			}
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function createLiveLink($configName) {
    		if(!isset($this->client)) $this->startup();
    		try {
    			$soap_req["configName"] = $configName;
    			$result = $this->client->LiveLink($soap_req);
    			return $result->LiveLinkResult;
    		}
    		catch (SoapFault $e) {
    			return $e;
    		}
    	}

    	public function setCurrentOrganizationByName($orgName) {
    		if(!isset($this->client)) $this->startup();
    		$this->client->SetCurrentWorkspaceByName(array('orgName'=>$orgName));
    	}

    	public function setCurrentWorkspaceByName($workspaceName) {
    		if(!isset($this->client)) $this->startup();
    		$org = $this->getCurrentOrganizationName();
    		$this->client->SetCurrentWorkspaceByName(array('orgName'=>$org,'workspaceName'=>$workspaceName));
    	}
    }

    ?>



.. author:: tristann9
.. categories:: articles, components
.. tags:: Components

