Image resize and crop on the fly
================================

I was working on a helper that could handle images that have already
been uploaded but could create a cropped image of the size we choose
and cache it in a temp folder. This is the first run through of this
and I have only tested it minimally.
There is only one requirement for this, that there is a "cache" and
"tmp" folder in your files folder in webroot. It will also need to be
writable. Other then that you should be good.

EX.

::

    
    $imageSize->crop('original_file_location', 40, 40)

This would crop an image to 40x40 naming it
40x40_original_file_name.jpg.


Helper Class:
`````````````

::

    <?php 
    /* Helper to auto resize images, cache them and display them as called */
    
    class ImageSizeHelper extends AppHelper
    {
    	/*
    	 * Array of all available image types
    	 */
    	var $type = array(
    		1 => 'gif',
    		2 => 'jpg',
    		3 => 'png'
    	);
    	
    	/*
    	 * Tmp folder location for thumbs
    	 */
    	PUBLIC $tmpLocation = null;
    	
    	/* Construct
    	 * Link $tmpLocation to the appropriate location as well as check if folder exists and is writable, if not
    	 * create folder and change permissions
    	 * 
    	 */
    	function __construct(){
    		parent::__construct();
    		
    		$dir = WWW_ROOT . 'files' . DS . 'cache' . DS . 'thumbs' . DS;
    		if(!is_dir($dir)){
    			mkdir(WWW_ROOT . 'files' . DS . 'cache' . DS . 'thumbs' . DS, 0774, true);
    			chmod(WWW_ROOT . 'files' . DS . 'cache' . DS . 'thumbs' . DS, 0777);
    		}
    		
    		$this->tmpLocation = WWW_ROOT . 'files' . DS . 'cache' . DS . 'thumbs' . DS;
    	}
    	
    	
    	/* Crop
    	 * crop image passed through, if no image is passed return false 
    	 * 
    	 */
    	
    	function crop($obj = null, $width = 100, $height = 100) 
    	{
    		
    		$file = WWW_ROOT . $obj;
    		$name = substr($obj, strrpos($obj, '/') + 1);
    			
    		// assure that file exists
    		if(is_file($file)){
    			
    			list($w, $h, $type) = getimagesize($file);
    			// if the file is an image and not a swf or undetermined file
    			if($type){
    				
    				$name = $width . 'x' . $height . '_' . $name;
    				// check that file does not exist, if it does return image otherwise proceed
    				if($this->checkFile($name)){
    				
    					// get file ext for ease of use
    					$fileType = $this->type[$type];
    					
    					//loop through file type and prepare image for cropping
    					switch($fileType) {
    						case 'gif':
    							$img = imagecreatefromgif($file);
    							break;
    						case 'jpg':
    							$img = imagecreatefromjpeg($file);
    							break;
    						case 'png':
    							$img = imagecreatefrompng($file);
    							break;
    					}
    					
    					// determine larger side and size both appropriately
    					if($w > $h){
    						if($width > $height){
    							$ratio = $h/$width;
    						} else {
    							$ratio = $h/$height;
    						}
    					} else {
    						if($width > $height){
    							$ratio = $w/$width;
    						} else {
    							$ratio = $w/$height;
    						}
    					}
    					$new_width = round($w/$ratio);
    					$new_height = round($h/$ratio);
    					
    					// determine how far in to middle the crop should begin
    					$src_x = ($new_width - $width) / 2;
    					$src_y = ($new_height - $height) / 2;
    					
    					// create thumb placeholder and then create image
    					$thumb = imagecreatetruecolor($width, $height);
    					imagecopyresized($thumb, $img, 0, 0, $src_x, $src_y, $new_width, $new_height, $w, $h);
    					
    					imagejpeg($thumb, $this->tmpLocation . $name, 100);
    					
    				}
    
    				return '<img src="/files/cache/thumbs/' . $name . '" rel="notprocessed">';
    				
    			} else {
    				$fileType = substr($file, strrpos($file, '.') + 1);
    				return 'There is no preview for file ' . $name;
    			}
    		} else {
    			return false;
    		}
    	}
    	
    	/* Check File
    	 * Check if file exists, if it does NOT then return true, else, return false
    	 * 
    	 */
    	
    	function checkFile($name){
    		if(is_file($this->tmpLocation . $name)){
    			return false;
    		} else {
    			return true;
    		}
    	}
    	
    }
    ?>

future plans include to add the ability to just resize and not crop as
well as dynamically locate folders for future use with a CDN.


.. author:: matthistory
.. categories:: articles, helpers
.. tags:: images,resize,crop,Helpers

