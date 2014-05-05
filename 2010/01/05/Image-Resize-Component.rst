Image Resize Component
======================

I made an image resize component. Pass it the image location, resized
image location, dimensions, and quality and it will determine the
image type, and use the proper functions accordingly. It works with
GIFs, JPGs, and PNGs. I created a PHP4 and PHP5 version. You will need
the GD 2.0 or higher library as well.


PHP5 Version
~~~~~~~~~~~~

Component Class:
````````````````

::

    <?php 
    class ImageComponent extends Object {
    	public $name = 'Image';
    	private $__errors = array();
    
    	/**
    	 * Determines image type, calculates scaled image size, and returns resized image. If no width or height is
    	 * specified for the new image, the dimensions of the original image will be used, resulting in a copy
    	 * of the original image.
    	 *
    	 * @param string $original absolute path to original image file
    	 * @param string $new_filename absolute path to new image file to be created
    	 * @param integer $new_width (optional) width to scale new image (default 0)
    	 * @param integer $new_height (optional) height to scale image (default 0)
    	 * @param integer $quality quality of new image (default 100, resizePng will recalculate this value)
    	 *
    	 * @access public
    	 *
    	 * @return returns new image on success, false on failure. use ImageComponent::getErrors() to get an array
    	 * of errors on failure
    	 */
    	public function resize($original, $new_filename, $new_width = 0, $new_height = 0, $quality = 100) {
    		if(!($image_params = getimagesize($original))) {
    			$this->__errors[] = 'Original file is not a valid image: ' . $orignal;
    			return false;
    		}
    		
    		$width = $image_params[0];
    		$height = $image_params[1];
    		
    		if(0 != $new_width && 0 == $new_height) {
    			$scaled_width = $new_width;
    			$scaled_height = floor($new_width * $height / $width);
    		} elseif(0 != $new_height && 0 == $new_width) {
    			$scaled_height = $new_height;
    			$scaled_width = floor($new_height * $width / $height);
    		} elseif(0 == $new_width && 0 == $new_height) { //assume we want to create a new image the same exact size
    			$scaled_width = $width;
    			$scaled_height = $height;
    		} else { //assume we want to create an image with these exact dimensions, most likely resulting in distortion
    			$scaled_width = $new_width;
    			$scaled_height = $new_height;
    		}
    
    		//create image		
    		$ext = $image_params[2];
    		switch($ext) {
    			case IMAGETYPE_GIF:
    				$return = $this->__resizeGif($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality);
    				break;
    			case IMAGETYPE_JPEG:
    				$return = $this->__resizeJpeg($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality);
    				break;
    			case IMAGETYPE_PNG:
    				$return = $this->__resizePng($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality);
    				break;	
    			default:
    				$return = $this->__resizeJpeg($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality);
    				break;
    		}
    		
    		return $return;
    	}
    	
    	public function getErrors() {
    		return $this->__errors;
    	}
    	
    	private function __resizeGif($original, $new_filename, $scaled_width, $scaled_height, $width, $height) {
    		$error = false;
    		
    		if(!($src = imagecreatefromgif($original))) {
    			$this->__errors[] = 'There was an error creating your resized image (gif).';
    			$error = true;
    		}
    		
    		if(!($tmp = imagecreatetruecolor($scaled_width, $scaled_height))) {
    			$this->__errors[] = 'There was an error creating your true color image (gif).';
    			$error = true;
    		}
    		
    		if(!imagecopyresampled($tmp, $src, 0, 0, 0, 0, $scaled_width, $scaled_height, $width, $height)) {
    			$this->__errors[] = 'There was an error creating your true color image (gif).';
    			$error = true;
    		}
    
    		if(!($new_image = imagegif($tmp, $new_filename))) {
    			$this->__errors[] = 'There was an error writing your image to file (gif).';
    			$error = true;
    		}
    		
    		imagedestroy($tmp);
    
    		if(false == $error) {
    			return $new_image;
    		}
    		
    		return false;
    	}
    	
    	private function __resizeJpeg($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality) {
    		$error = false;
    		
    		if(!($src = imagecreatefromjpeg($original))) {
    			$this->__errors[] = 'There was an error creating your resized image (jpg).';
    			$error = true;
    		}
    
    		if(!($tmp = imagecreatetruecolor($scaled_width, $scaled_height))) {
    			$this->__errors[] = 'There was an error creating your true color image (jpg).';
    			$error = true;
    		}
    		
    		if(!imagecopyresampled($tmp, $src, 0, 0, 0, 0, $scaled_width, $scaled_height, $width, $height)) {
    			$this->__errors[] = 'There was an error creating your true color image (jpg).';
    			$error = true;
    		}
    
    		if(!($new_image = imagejpeg($tmp, $new_filename, $quality))) {
    			$this->__errors[] = 'There was an error writing your image to file (jpg).';
    			$error = true;
    		}
    		
    		imagedestroy($tmp);
    		
    		if(false == $error) {
    			return $new_image;
    		}
    		
    		return false;
    	}
    	
    	private function __resizePng($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality) {
    		$error = false;
    		/**
    		 * we need to recalculate the quality for imagepng()
    		 * the quality parameter in imagepng() is actually the compression level, 
    		 * so the higher the value (0-9), the lower the quality. this is pretty much
    		 * the opposite of how imagejpeg() works.
    		 */
    		$quality = ceil($quality / 10); // 0 - 100 value
    		if(0 == $quality) {
    			$quality = 9;
    		} else {
    			$quality = ($quality - 1) % 9;
    		}
    
    		
    		if(!($src = imagecreatefrompng($original))) {
    			$this->__errors[] = 'There was an error creating your resized image (png).';
    			$error = true;
    		}
    		
    		if(!($tmp = imagecreatetruecolor($scaled_width, $scaled_height))) {
    			$this->__errors[] = 'There was an error creating your true color image (png).';
    			$error = true;
    		}
    		
    		imagealphablending($tmp, false);
    		
    		if(!imagecopyresampled($tmp, $src, 0, 0, 0, 0, $scaled_width, $scaled_height, $width, $height)) {
    			$this->__errors[] = 'There was an error creating your true color image (png).';
    			$error = true;
    		}
    		
    		imagesavealpha($tmp, true);
    		
    		if(!($new_image = imagepng($tmp, $new_filename, $quality))) {
    			$this->__errors[] = 'There was an error writing your image to file (png).';
    			$error = true;
    		}
    		
    		imagedestroy($tmp);
    		
    		if(false == $error) {
    			return $new_image;
    		}
    		
    		return false;
    	}
    }
    ?>



PHP4 Version
~~~~~~~~~~~~

Component Class:
````````````````

::

    <?php 
    class ImageComponent extends Object {
    	var $name = 'Image';
    	var $__errors = array();
    
    	/**
    	 * Determines image type, calculates scaled image size, and returns resized image. If no width or height is
    	 * specified for the new image, the dimensions of the original image will be used, resulting in a copy
    	 * of the original image.
    	 *
    	 * @param string $original absolute path to original image file
    	 * @param string $new_filename absolute path to new image file to be created
    	 * @param integer $new_width (optional) width to scale new image (default 0)
    	 * @param integer $new_height (optional) height to scale image (default 0)
    	 * @param integer $quality quality of new image (default 100, resizePng will recalculate this value)
    	 *
    	 * @access public
    	 *
    	 * @return returns new image on success, false on failure. use ImageComponent::getErrors() to get an array
    	 * of errors on failure
    	 */
    	function resize($original, $new_filename, $new_width = 0, $new_height = 0, $quality = 100) {
    		if(!($image_params = getimagesize($original))) {
    			$this->__errors[] = 'Original file is not a valid image: ' . $orignal;
    			return false;
    		}
    		
    		$width = $image_params[0];
    		$height = $image_params[1];
    		
    		if(0 != $new_width && 0 == $new_height) {
    			$scaled_width = $new_width;
    			$scaled_height = floor($new_width * $height / $width);
    		} elseif(0 != $new_height && 0 == $new_width) {
    			$scaled_height = $new_height;
    			$scaled_width = floor($new_height * $width / $height);
    		} elseif(0 == $new_width && 0 == $new_height) { //assume we want to create a new image the same exact size
    			$scaled_width = $width;
    			$scaled_height = $height;
    		} else { //assume we want to create an image with these exact dimensions, most likely resulting in distortion
    			$scaled_width = $new_width;
    			$scaled_height = $new_height;
    		}
    
    		//create image		
    		$ext = $image_params[2];
    		switch($ext) {
    			case IMAGETYPE_GIF:
    				$return = $this->__resizeGif($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality);
    				break;
    			case IMAGETYPE_JPEG:
    				$return = $this->__resizeJpeg($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality);
    				break;
    			case IMAGETYPE_PNG:
    				$return = $this->__resizePng($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality);
    				break;	
    			default:
    				$return = $this->__resizeJpeg($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality);
    				break;
    		}
    		
    		return $return;
    	}
    	
    	function getErrors() {
    		return $this->__errors;
    	}
    	
    	function __resizeGif($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality) {
    		$error = false;
    		
    		if(!($src = imagecreatefromgif($original))) {
    			$this->__errors[] = 'There was an error creating your resized image (gif).';
    			$error = true;
    		}
    		
    		if(!($tmp = imagecreatetruecolor($scaled_width, $scaled_height))) {
    			$this->__errors[] = 'There was an error creating your true color image (gif).';
    			$error = true;
    		}
    		
    		if(!imagecopyresampled($tmp, $src, 0, 0, 0, 0, $scaled_width, $scaled_height, $width, $height)) {
    			$this->__errors[] = 'There was an error creating your true color image (gif).';
    			$error = true;
    		}
    
    		if(!($new_image = imagegif($tmp, $new_filename))) {
    			$this->__errors[] = 'There was an error writing your image to file (gif).';
    			$error = true;
    		}
    		
    		imagedestroy($tmp);
    
    		if(false == $error) {
    			return $new_image;
    		}
    		
    		return false;
    	}
    	
    	function __resizeJpeg($original, $new_filename, $scaled_width, $scaled_height, $width, $height, $quality) {
    		$error = false;
    		
    		if(!($src = imagecreatefromjpeg($original))) {
    			$this->__errors[] = 'There was an error creating your resized image (jpg).';
    			$error = true;
    		}
    
    		if(!($tmp = imagecreatetruecolor($scaled_width, $scaled_height))) {
    			$this->__errors[] = 'There was an error creating your true color image (jpg).';
    			$error = true;
    		}
    		
    		if(!imagecopyresampled($tmp, $src, 0, 0, 0, 0, $scaled_width, $scaled_height, $width, $height)) {
    			$this->__errors[] = 'There was an error creating your true color image (jpg).';
    			$error = true;
    		}
    
    		if(!($new_image = imagejpeg($tmp, $new_filename, $quality))) {
    			$this->__errors[] = 'There was an error writing your image to file (jpg).';
    			$error = true;
    		}
    		
    		imagedestroy($tmp);
    		
    		if(false == $error) {
    			return $new_image;
    		}
    		
    		return false;
    	}
    	
    	function __resizePng($original, $new_filename, $scaled_width, $scaled_height, $width, $height) {
    		$error = false;
    		
    		if(!($src = imagecreatefrompng($original))) {
    			$this->__errors[] = 'There was an error creating your resized image (png).';
    			$error = true;
    		}
    		
    		if(!($tmp = imagecreatetruecolor($scaled_width, $scaled_height))) {
    			$this->__errors[] = 'There was an error creating your true color image (png).';
    			$error = true;
    		}
    		
    		imagealphablending($tmp, false);
    		
    		if(!imagecopyresampled($tmp, $src, 0, 0, 0, 0, $scaled_width, $scaled_height, $width, $height)) {
    			$this->__errors[] = 'There was an error creating your true color image (png).';
    			$error = true;
    		}
    		
    		imagesavealpha($tmp, true);
    		
    		if(!($new_image = imagepng($tmp, $new_filename))) {
    			$this->__errors[] = 'There was an error writing your image to file (png).';
    			$error = true;
    		}
    		
    		imagedestroy($tmp);
    		
    		if(false == $error) {
    			return $new_image;
    		}
    		
    		return false;
    	}
    }
    ?>



.. author:: sethcardoza
.. categories:: articles, components
.. tags:: image,resize,image resize,Components

