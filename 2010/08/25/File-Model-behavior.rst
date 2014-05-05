File Model behavior
===================

File Model behavior is a CakePHP behavior which is able to handle file
uploads automatically.


How to use this behavior:
`````````````````````````

Download this behavior and place it inside folder
"app/modes/behaviors/file_model.php":

Model Class:
````````````

::

    <?php 
    /*
     * Developed by The-Di-Lab
     * www.the-di-lab.com
     * www.startutorial.com
     * contact at thedilab@gmail.com
     * FileMode v2.0 support multiple fields
     */
    App::import('Core', array('Folder'));
    class FileModelBehavior extends ModelBehavior {
        /**
         * Model-specific settings
         * @var array
         */
        public $settings = array();    
        /**
         * Setup
         * @param unknown_type $model
         * @param unknown_type $settings
         */
        public function setup(&$Model, $settings) {
        	//Folder for setting up permission
        	if (!isset($this->Folder)) {
    			$this->Folder = new Folder();
    		}		
    		//default settings
    		if (!isset($this->settings[$Model->alias])) {
    			$this->settings[$Model->alias] = array(
    				'file_db_file'=>array('filename'),
    				'file_field'=>array('file'),
    				'dir' => array('uploads'),
    				'overwrite'=>1,
    			);
    		}		
    		$this->settings[$Model->alias] = array_merge(
    			$this->settings[$Model->alias], (array)$settings
    		);		
    		//hold settings
    		$this->dir=$this->settings[$Model->alias]['dir'];
    		$this->file_db_file=$this->settings[$Model->alias]['file_db_file'];
    		$this->file_field=$this->settings[$Model->alias]['file_field'];
    		$this->uploads=array();
    		$this->overwrite=$this->settings[$Model->alias]['overwrite'];
    	}	
    
    	//call back
    	public function afterSave(&$Model,$created){
    		//callback only if there is a file attached
    		if($this->_hasUploads($Model)){				
    				//save
    				if($created){
    					$id=$Model->getLastInsertId();	
    				//update
    				}else{					
    					//overwrite
    					if($this->overwrite){		
    						$oldFile=$Model->find('first',array('contain'=>false,
    															'conditions'=>array($Model->primaryKey=>$Model->data[$Model->alias][$Model->primaryKey])));								
    						//delete all of the old files
    						for($i=0;$i<sizeof($this->uploads);$i++){
    							$this->_delete($oldFile[$Model->alias][$this->file_db_file[$this->uploads[$i]]],$oldFile[$Model->alias][$Model->primaryKey],$this->uploads[$i]);
    						}						
    						
    					}				
    					$id=$Model->data[$Model->alias][$Model->primaryKey];
    				}		
    				
    				//upload files		
    				$uploadOk=true;
    				for($i=0;$i<sizeof($this->uploads);$i++){
    					$thisUploadOk = $this->_upload($Model->data[$Model->alias][$this->file_field[$this->uploads[$i]]],$id,$this->uploads[$i]);
    					$uploadOk=$uploadOk*$thisUploadOk;
    					//get file name first
    					$filename = $Model->data[$Model->alias][$this->file_field[$this->uploads[$i]]]['name'];	
    					//assign file name to updateModel
    					$updateM[$Model->alias][$Model->primaryKey]=$id;
    					$updateM[$Model->alias][$this->file_db_file[$this->uploads[$i]]]=$filename;
    				}
    				
    				if($uploadOk){
    						return $this->_customizedSave($Model,$updateM);
    				}else{
    						echo 'Upload failed,please try again.';
    					    return false;
    				}
    				
    		}else{
    				return true;
    		}
    	}	
    	//call back
    	public function beforeDelete(&$Model){
    		$data = $Model->read(null,$Model->id);
    		if (!empty($data[$Model->alias]['id'])) {
    				for($i=0;$i<sizeof($this->file_db_file);$i++){
    					$this->_delete($data[$Model->alias][$this->file_db_file[$i]],$data[$Model->alias][$Model->primaryKey],$i);
    				}
    				
    		}
    		return true;
    	}
    	//check if there is any uploads
    	private function _hasUploads($Model){
    		//clear first
    		unset($this->uploads);
    		$this->uploads=array();
    		for($i=0;$i<sizeof($this->file_field);$i++){
    			//print_r($Model->data[$Model->alias]);
    			if(isset($Model->data[$Model->alias][$this->file_field[$i]]['size'])&&
    					$Model->data[$Model->alias][$this->file_field[$i]]['size']!=0){
    						array_push($this->uploads,$i);
    			}
    		}
    		if(sizeof($this->uploads)==0){
    			return false;
    		}
    		return true;
    	}
    	private function _noUploads($Model){
    		for($i=0;$i<sizeof($this->file_field);$i++){
    			$Model->data[$Model->alias][$this->file_field[$i]]['size']=0;
    		}
    	}
    	private function _delete($filename,$id,$dirIndex){
    		$path=WWW_ROOT.$this->dir[$dirIndex].DS.$id.DS.$filename;
    		if (null!=$filename&&file_exists($path)) {
    			clearstatcache();
    			return unlink($path);
    		}else{
    			return false;
    		}
    	}	
    	private function _customizedSave(&$Model,$modelDate){		
    		//this will prevent it from calling the callback	
    		$this->_noUploads($Model);
    		return $Model->save($modelDate);
    	}	
    	private function _upload($file,$id,$dirIndex){		
    		if($this->_validate($file)){		
    			$des=$this->_createDir($id,$dirIndex).DS.$file['name'];
    			if (move_uploaded_file($file['tmp_name'], $des)) { 
    				return true;
    			}else if (copy($file['tmp_name'],$des)) { 
    				return true;
    			}else{
    				return false;
    			}
    		}else{
    				return false;
    		}
    		
    	}	
    	private function _createDir($id,$dirIndex){
    		$fullUploadDir = WWW_ROOT.$this->dir[$dirIndex].DS.$id;
    		//make sure the permission
    		if (!is_dir($fullUploadDir)) {
    			$this->Folder->create($fullUploadDir, 0777);
    			
    		} else if (!is_writable($fullUploadDir)) {
    			$this->Folder->chmod($fullUploadDir, 0777, false); 
    		}
    		return $fullUploadDir;
    	}	
    	//give your own validation logic here
    	private function _validate($file){
    		return true;
    	}
    
    		
    }
    ?>

Create a database table for storing the file name:

::

    
    CREATE TABLE  `photos` (
     `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
     `filename` VARCHAR( 250 ) NOT NULL
    ) ENGINE = MYISAM ;

Create a photo model and include FileModel:

Model Class:
````````````

::

    <?php 
    <?php 
    class Photo extends AppModel {
            public $actsAs = array('FileModel');
    }
    ?>
    ?>

Now if you call $this->Photo->save(), it will automatically store the
file into "app/webroot/uploads". And when you call
$this->Photo->delete(), it will remove the file automatically.

Thank you for reading.
I have actually wrote a tutorial on
`http://www.startutorial.com/articles/view/12`_, you may take a look
there as well for more information about this behavior.


.. _http://www.startutorial.com/articles/view/12: http://www.startutorial.com/articles/view/12

.. author:: thedilab
.. categories:: articles, behaviors
.. tags:: behavior,upload,file,Behaviors

