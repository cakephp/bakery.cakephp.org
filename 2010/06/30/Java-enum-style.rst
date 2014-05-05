Java enum style
===============

I have been programming in Java and have noticed that I needed
something like Java enums. In this article I want to share the
solution I have adopted.
Hello colleagues, first of all i want to apologize for my poor
english.
To get the enums of java in php I have developed a library called
enums.

By using this library we have several listed of enums where the values
are constant and can not be changed at runtime.
The following lines show an example:

Definition of a enum:

::

    
    <?php
    App::import('Lib','enums/Enum'); 
    Final Class ServiceTypeEnum extends Enum{ 
          
         public $transport=array('value'=>0, 'text'=> 'Transport', 'description'=>'Transport service type' ); 
         public $assembler=array('value'=>1, 'text'=> 'Assembler', 'description'=>'Assembler service type'); 
         public $measure=array('value'=>2, 'text'=> 'Measure', 'description'=>'Measure service type'); 
         public $store=array('value'=>3, 'text'=> 'Storage', 'description'=>'Merchandise store'); 
                   
     }  
    ?> 

Usual functions:

::

    
    <?php
    
    App::import('Lib', 'Enums/EnumFactory'); 
    $enums=EnumFactory::getInstance();
    
    
    // Show the text list of enum         
    $r=$enums->ServiceTypeEnum->getTexts(); 
    debug($r); 
    
    // Showing the value, the text and description of all enums 
    $r=$enums->ServiceTypeEnum->getAll(); 
    debug($r); 
    
    // get the item enum for the text "Transport"
    $r=$enums->ServiceTypeEnum->getEnumByText("Transport"); 
    
    // get the item enum for the value 0
    $r=$enums->ServiceTypeEnum->getEnumByValue(0); 
    ?>


This library is located in app/libs/enums . It contains three main
classes:

ItemEnum : This class is useful to store the various items of an Enum.

Enum : This abstract class is the base class for all enums.

EnumFactory : This class maybe used to access any enum of the
application.


The source of ItemEnum (item_enum.php):
```````````````````````````````````````

::

    
    <?php
    Class ItemEnum{
    
    	/**
    	 * @var mix : Value of item enum. Is recommended that it be an integer or a string
    	 */
    	private $value=null;
    	
    	/**
    	 * @var string:  Description of item enum
    	 */
     	private $text=null;
     	
     	/**
     	 * @var string:  Description of item enum
     	 */
     	private $description=null;
     	
     	
     	/**
     	 * Class constructor. This method initializes the class attribute. 
     	 * Then these attributes will no longer be modified
     	 * @param mix $value: can be a single value or an array. If an array 
     	 * 	is an associative array where the keys should be 'value', 'text' and 'description'.
     	 * @param string $text: The text of item enum
     	 * @param string $description: The description of item enum
     	 */
     	public function __construct($value,$text=null,$description=null){
     		if (! isSet($value)){
     			throw new Exception('The enum must have a value.');
     		}	
    
     		if (is_array($value)){
     			if (! isSet($value['value'])){
     				throw new Exception('The enum must have a value.');
     			}
     			$val=$value['value'];
     			if (isSet($value['text'])){
     				$text=$value['text'];
     			}
    			if (isSet($value['description'])){
     				$description=$value['description'];
     			} 			
     		}
     		$this->value=$val;
     		$this->text=$text;
     		$this->description=$description;
     	}
     	
     	/**
     	 * @return mix return the value of the item
     	 */
     	public function getValue(){
     		return $this->value;
     	}
     	
     	/**
    	 * @return string return the string of the item
    	 */
     	public function getText(){
     		return $this->text;
     	}
     	
     	/**
     	 * @return string return the description of the item
     	 */
     	public function getDescription(){
     		return $this->description;	
     	}
     }
    ?>



The source of Enum (enum.php) :
```````````````````````````````

::

    
    <?php
    App::import('Lib','enums/ItemEnum');
    Abstract Class Enum{
    
     	/**
     	 * Class constructor. Each class attribute is read and 
     	 * transformed into an object ItemEnum
     	 */
    	public function __construct(){
     		$attributes=get_class_vars(get_class($this));
     		foreach ($attributes as $key => $value){
     			$this->$key=new ItemEnum($value);
     		}	
     	}
     	 	
     	/**
     	 * This method controls not try to access a class attribute does not exist
     	 * @param unknown_type $member
     	 */
     	final function __get($member) {
    		if (! isSet($this->$member)){
    			throw new Exception('Not exist the enumerator at that attempts to access: ' . $member);
    		}
        	return $this->$member;
      	} 	
      	
      	
      	/**
      	 * This method is used to obtain the itemEnum that has the value equal to the parameter
      	 * 
      	 * @param undetermined $findValue 
      	 * @return ItemEnum object
      	 */
      	public function getEnumByValue($findValue){
    		$attributes=get_class_vars(get_class($this));
      	 	foreach ($attributes as $key => $value){
     			if ($value['value'] == $findValue){
     				return $this->$key;
     			}
     		}		
     		return null;
      	}
      	
      	/**
      	 * This method is used to obtain the itemEnum that has the text equal to the parameter
      	 * 
      	 * @param undetermined $findValue 
      	 * @return ItemEnum object
      	 */  	
      	public function getEnumByText($findText){
    		$attributes=get_class_vars(get_class($this));
      	 	foreach ($attributes as $key => $value){
     			if ($value['text'] == $findText){
     				return $this->$key;
     			}
     		}
     		return null;	  		
      	}
      	
      	/**
      	 * This method returns an associative array with all values of the enum.
      	 * The keys of this array are the names of enum attributes
      	 */
      	public function getValues(){
     		$attributes=get_class_vars(get_class($this));
     		$values=array();
     		foreach ($attributes as $key => $value){
     			$values[$key]=$value['value'];
     		}	
     		return $values;	 				
     	}
     	
      	/**
      	 * This method returns an associative array with all texts of the enum.
      	 * The keys of this array are the names of enum attributes
      	 */ 	
      	public function getTexts(){
     		$attributes=get_class_vars(get_class($this));
     		$texts=array();
     		foreach ($attributes as $key => $value){
     			$texts[$key]=$value['text'];
     		}
     		return $texts;	 			
     	}
     	
      	/**
      	 * This method returns an associative array with all descriptions of the enum.
      	 * The keys of this array are the names of enum attributes
      	 */ 	
      	public function getDescriptions(){
     		$attributes=get_class_vars(get_class($this));
     		$descriptions=array();
     		foreach ($attributes as $key => $value){
     			$descriptions[$key]=$value['description'];
     		}
     		return $descriptions;	 			
     	} 	
     	
      	/**
      	 * This method returns an associative array with all values,texts and descriptions of the enum.
      	 * The keys of this array are the names of enum attributes
      	 */
     	public function getAll(){
    		$attributes=get_class_vars(get_class($this));
    		return $attributes;
     	} 	 	 	
     }
    
     
     ?>



The source of EnumFactory (enum_factory.php):
`````````````````````````````````````````````

::

    
    <?php
    Class EnumFactory{
    	
    	private static $instance=null;
    	
    	/**
    	 * Is a private class constructor. So that you can not make a new
    	 * of this class
    	 * 
    	 */
    	private function __construct(){
    		
    	}
    	
    	
    	/**
    	 * To obtain the only instance of this class.
    	 */
    	public static function getInstance(){
    		if (self::$instance == null){
    			self::$instance=new self;
    		}
    		return self::$instance;
    	}
    	
    	/**
    	 * To prevent the cloning of this class
    	 */
        private function __clone() {
            throw new Exception('Cloning is not allowed');
        }
    	
    	
    	/**
    	 * This method is executed when you attempt to access any attribute of the class.
    	 * If the attribute is null create a object. This object class name matches the name 
    	 * of the attribute.
    	 * 
    	 * @param string $member: Attribute name is trying to access 
    	 */
    	final function __get($member) {
    		if (empty($member)){
    			throw new Exception('The parameter is empty');
    		}
    		
    		if (empty($this->$member)){
    			if (! class_exists($member)){
    				// Try to load the class
    				App::import('Lib',"Enums/EnumList/$member");
    				if (! class_exists($member)){
    					throw new Exception('The enum are trying to access It does not exist: ' . $member);
    				}
    			}
    			$this->$member=new $member();
    		}
        	return $this->$member;
      	}
     }
    
    ?>

This library contains a folder named enum_list
(app/libs/enums/enum_list). In this folder are the definitions of
enums used in the application, two examples of these enums would be:


The source of task_status_enum.php:
```````````````````````````````````

::

    
    <?php
    /**
     * This enum defines the different states of a task
     * 
     * @author Marcos Medina
     */
    App::import('Lib','enums/Enum');
    Final Class TaskStatusEnum extends Enum{
     	
     	public $planned=array('value'=> 0, 'text'=> 'Planned', 'description' => 'The job is in scheduled state');
     	public $in_process=array('value'=> 1, 'text'=> 'In process', 'description' => 'The task is in the process');
     	public $completed=array('value'=> 2, 'text'=> 'Completed', 'description' => 'The task was completed');
     	public $canceled=array('value'=>3, 'text'=> 'Canceled', 'description' => 'The task is canceled');
     	 	 	
     } 
     ?>



The source of service_type_enum.php:
````````````````````````````````````

::

    
    <?php
    /**
     * This enum defines the different types of application services
     * 
     * @author Marcos Medina
     */
    App::import('Lib','enums/Enum');
    Final Class ServiceTypeEnum extends Enum{
     	
     	public $transport=array('value'=>0, 'text'=> 'Transport', 'description'=>'Transport service type' );
     	public $assembler=array('value'=>1, 'text'=> 'Assembler', 'description'=>'Assembler service type');
     	public $measure=array('value'=>2, 'text'=> 'Measure', 'description'=>'Measure service type');
     	public $store=array('value'=>3, 'text'=> 'Storage', 'description'=>'Merchandise store');
    	 	 	
     } 
     ?>


To facilitate access to enums I created a function in
app/config/bootstrap.php at the end of file:



The source app/config/bootstrap.php:
````````````````````````````````````

::

    
    <?php
    /**
     * This function returns an instance of the class factory of enums
     */
    function enums(){
    	App::import('Lib', 'Enums/EnumFactory');
    	return $enums=EnumFactory::getInstance();
    }
    ?>


And finally I made a test for testing the lib and also to act as how
they should use enums. This
file is created in: app/tests/cases/enums/enum.test.php . For the test
needs to be installed simpletest.


The source of enum.test.php:
````````````````````````````

::

    
    <?php 
    class EnumTestCase extends CakeTestCase {
        
    	public $enums=null;
        
    	function startTest() {
    		$this->enums=enums();
        }
        
        function testConfigurationInstance() {
            $this->assertTrue(is_a($this->enums, 'EnumFactory'));
        }
    
        function testUsosEnum(){
     		// Showing the value, the text and description of all enums
    		$r=$this->enums->TaskStatusEnum->getAll();
    		debug($r);
    		$this->assertTrue(!empty($r),'ok...');
    	
     		// Showing the value, the text and description of all enums
    		$r=$this->enums->TaskStatusEnum->getDescriptions();
    		debug($r);
    		$this->assertTrue(!empty($r),'ok...');		
    		
     		// Show de 	value list of enum
    		$r=$this->enums->ServiceTypeEnum->getValues();
    		debug($r);
    		$this->assertTrue(!empty($r),'ok...');
    		
    		// Show de 	text list of enum		
    		$r=$this->enums->ServiceTypeEnum->getTexts();
    		debug($r);
    		$this->assertTrue(!empty($r),'ok...');		
    		
    		// Show de 	text and value list of enum		
    		$r=$this->enums->ServiceTypeEnum->getAll();
    		debug($r);
    		$this->assertTrue(!empty($r),'ok...');
    
    		// verify that the value of transporte is 0
    		$this->assertEqual(	$this->enums->ServiceTypeEnum->transport->getValue(), 0);
    		
    		// verify that the text of transport is "Transport"
    		$this->assertEqual(	$this->enums->ServiceTypeEnum->transport->getText(),"Transport");	
    		
    		// verifying the method getEnumByText  
    		$r=$this->enums->ServiceTypeEnum->getEnumByText("Transport");
    		$this->assertEqual($this->enums->ServiceTypeEnum->transport,$r);
    		
    		// verifying the method getEnumByValue  
    		$r=$this->enums->ServiceTypeEnum->getEnumByValue(0);
    		$this->assertEqual($this->enums->ServiceTypeEnum->transport,$r);	
        }
        
    }
    
    ?>

I hope that this library be useful for you.

Bye.



.. author:: mmarencibia
.. categories:: articles, snippets
.. tags:: enum,library,constant,Snippets

