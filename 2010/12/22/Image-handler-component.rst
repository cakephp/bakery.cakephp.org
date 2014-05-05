Image handler component
=======================

This is an attempt to make a previously published article more
readable, the article is found here: http://bakery.cakephp.org/article
s/xixilive/2010/12/01/image_handler_component_with_resize_crop_flip_wa
termark_etc
I have attached as a file the image.php component, instructions seem
to be included in the comments at the top.

::

    
    <?php
    /**
     * 图片处理组件,for CakePHP framework
     * @author mickey
     * usage in controller:
     * 		var $components=array('Image');
     * 
     * 		$img=$this->Image->open('/usr/local/images/test.png');
     * 		
     * 		if($img)
     * 		{
     * 			$_autosave='';
     * 
     * 			//resize image
     * 			$img->resize(100,200,true,$_autosave);
     * 			//crop image
     * 			$img->crop(array(0,5,100,200),$_autosave);
     * 
     * 			//crop and resize,NOTICE:you must set auto_dispose=false on this use case
     * 			//then,you get 2 copies of this image
     * 			$img->crop(array(0,5,100,200),$_autosave)->resize(100,200,true,$_autosave);
     * 			
     * 			$img->close();
     * 		}
     * 
     */
    class ImageComponent extends Object
    {
    	var $_image=null;				//source image resource
    	var $_imageFile='';				//source image file path and name
    	var $_imagePathInfo=false;		//source image pathinfo,see also function:pathinfo()
    	var $_width=0;					//source image width
    	var $_height=0;					//source image height
    	var $_type=0;					//source image type,see also IMAGETYPE_xxx
    	var $_isImageResource=false;	//check current image is a resource type,see also function:is_resource()
    	
    	/**
    	 * 保存图片的质量，[1,100]
    	 * @var int
    	 */
    	var $default_qulity=80;
    	
    	/**
    	 * 保存图片的平滑系数,[10,100]
    	 * @var int
    	 */
    	var $default_smooth=50;
    	
    	/**
    	 * 指示在使用自动保存功能时，是否自动释放资源
    	 * @var bool
    	 */
    	var $auto_dispose=true;
    	
    	/**
    	 * 指示在保存目录不存在是是否自动创建
    	 * @var bool
    	 */
    	var $auto_mkdir=true;
    	
    	/**
    	 * callback:initialize
    	 * @param $controller	the controller
    	 * @param $settings		settings of this component,array([default_qulity],[default_smooth],[auto_dispose],[auto_mkdir])
    	 * @return void
    	 */
    	function initialize(&$controller, $settings = array()) 
    	{
    		extract($settings,EXTR_PREFIX_ALL,'init');
    		if(isset($init_default_qulity) && $init_default_qulity>=1 && $init_default_qulity<=100)
    		{
    			$this->default_qulity=$init_default_qulity;
    		}
    		
    		if(isset($init_default_smooth) && $init_default_smooth>=10 && $init_default_smooth<=100)
    		{
    			$this->default_smooth=$init_default_smooth;
    		}
    		
    		if(isset($init_auto_dispose))
    		{
    			$this->auto_dispose=$init_auto_dispose;
    		}
    		
    		if(isset($init_auto_mkdir))
    		{
    			$this->auto_mkdir=$init_auto_mkdir;
    		}
    	}
    	
    	/**
    	 * callback:startup
    	 * @param $controller
    	 * @return void
    	 */
    	function startup(&$controller) 
    	{
    		//
    	}
    	
    	/**
    	 * open a image file
    	 * @param $imgfile
    	 * @return mixed	false on failed,and object on success
    	 */
    	function open($imgfile)
    	{
    		if($this->_imageFile && strtolower($this->_imageFile)==trim(low($imgfile)) && is_resource($this->_image))
    		{
    			return $this;
    		}
    		
    		if(!file_exists($imgfile))
    		{
    			return false;
    		}
    		
    		$this->_imageFile=trim(strtolower($imgfile));
    		
    		$this->_imagePathInfo=pathinfo($imgfile);
    		
    		list($this->_width,$this->_height,$this->_type)=getimagesize($imgfile);
    		if($this->_width*$this->_height*$this->_type==0)
    		{
    			return false;
    		}
    		
    		//打开图片
    		switch($this->_type)
    		{
    			case IMAGETYPE_GIF:
    				$this->_image = imagecreatefromgif($imgfile);
    				break;
    			case IMAGETYPE_JPEG:
    				$this->_image = imagecreatefromjpeg($imgfile);
    				break;
    			case IMAGETYPE_PNG:
    				$this->_image = imagecreatefrompng($imgfile);
    				break;
    			default:
    				$this->_image = null;
    				break;
    		}
    		
    		$this->_isImageResource=is_resource($this->_image);
    		
    		if(!$this->_isImageResource)
    		{
    			return false;
    		}
    		
    		return $this;
    	}
    	
    	/**
    	 * close and releasea current image resource
    	 * @return void
    	 */
    	function close()
    	{
    		if(is_resource($this->_image))
    		{
    			@imagedestroy($this->_image);
    		}
    		$this->_isImageResource=is_resource($this->_image);
    	}
    	
    	/**
    	 * get the reference of current image resource
    	 * @return	resource
    	 */
    	function &getImage()
    	{
    		return $this->_isImageResource?$this->_image:false;
    	}
    	
    	/**
    	 * get current image file
    	 * @return string
    	 */
    	function getImageFile()
    	{
    		return $this->_imageFile;
    	}
    	
    	/**
    	 * get current image size
    	 * @return array
    	 */
    	function getImageSize()
    	{
    		return array($this->_width,$this->_height);
    	}
    	
    	/**
    	 * get current image type
    	 * @return int
    	 */
    	function getImageType()
    	{
    		return $this->_type;
    	}
    	
    	/**
    	 * get current image pathinfo
    	 * @return array
    	 */
    	function getImagePathInfo()
    	{
    		return $this->_imagePathInfo;
    	}
    	
    	/**
    	 * scale current image
    	 * @param $dest_width	目标宽度
    	 * @param $dest_height	目标高度
    	 * @param $noscale		是否禁止拉伸
    	 * @param $autosave		自动保存,设置此参数，将自动保存图片，并释放资源
    	 * @return object	the instance of this component
    	 */
    	function resize($dest_width,$dest_height,$noscale=true,&$autosave=null)
    	{
    		$width=0;
    		$height=0;
    		
    		if($this->_width<=$dest_width && $this->_height<=$dest_height)
    		{
    			return $this;
    		}
    		
    		if($width>$dest_width && $height<=$dest_height)//较宽于目标尺寸
    		{
    			$height=$noscale?$this->_height*$dest_width/$this->_width:$dest_height;
    			$width=$dest_width;
    		}
    		else if($this->_width<=$dest_width && $this->_height>$dest_height)//较高于目标尺寸
    		{
    			$width=$noscale?$this->_width*$dest_height/$this->_height:$dest_width;
    			$height=$dest_height;
    		}
    		else if($this->_width>$dest_width && $this->_height>$dest_height)//宽高均大于目标尺寸
    		{
    			if($noscale)
    			{
    				if($dest_width>=$dest_height)
    				{
    					$height=$this->_height*$dest_width/$this->_width;
    					$width=$dest_width;
    				}
    				else
    				{
    					$width=$this->_width*$dest_height/$this->_height;
    					$height=$dest_height;
    				}
    			}
    			else
    			{
    				$width=$dest_width;
    				$height=$dest_height;
    			}
    		}
    		
    		$width=round($width);
    		$height=round($height);
    		
    		$_tmpImage=imagecreatetruecolor($width,$height);
    		imagecopyresized($_tmpImage,$this->_image,0,0,0,0,$width,$height,$this->_width,$this->_height);
    		imagedestroy($this->_image);
    		$this->_image=&$_tmpImage;
    		
    		$this->_width=$width;
    		$this->_height=$height;
    		
    		if(isset($autosave))
    		{
    			$_file=sprintf('%s%s_%sx%s.%s',
    					$this->_imagePathInfo['dirname'].DS,
    					$this->_imagePathInfo['filename'],
    					$width,$height,
    					$this->_imagePathInfo['extension']
    			);
    			
    			if($this->saveAs($_file,$this->default_qulity,$this->default_smooth,$this->auto_dispose))
    			{
    				$autosave=$_file;
    			}
    		}
    		
    		return $this;
    	}
    	
    	/**
    	 * crop current image with a rectangle
    	 * @param $rect		rectangle defintion,(x,y,width,height) or (anchor,width,height) or (width,height)
    	 * @param $autosave
    	 * @return object	the instance of this component
    	 */
    	function crop($rect=array(),&$autosave=null)
    	{
    		//invalid rectangle defintion
    		if(empty($rect))
    		{
    			return $this;
    		}
    		
    		if(count($rect)==2)
    		{
    			$_rect=$rect;
    			$rect=array(0,0,$_rect[0],$_rect[1]);
    			unset($_rect);
    		}
    		
    		if(count($rect)==3)
    		{
    			$_rect=array($rect[0],$rect[1],$rect[2]);
    			$rect=array(0,0,$_rect[1],$_rect[2]);
    			
    			switch(trim(strtolower($_rect[0])))
    			{
    				case 'lt':
    					$rect[0]=0;
    					$rect[1]=0;
    					break;
    				case 'rt':
    					$rect[0]=$this->_width-$rect[2];
    					$rect[1]=0;
    					break;
    				case 'lb':
    					$rect[0]=0;
    					$rect[1]=$this->_height-$rect[3];
    					break;
    				case 'rb':
    					$rect[0]=$this->_width-$rect[2];
    					$rect[1]=$this->_height-$rect[3];
    					break;
    				case 'center':
    					$rect[0]=($this->_width-$rect[2])*0.5;
    					$rect[1]=($this->_height-$rect[3])*0.5;
    					break;
    			}
    			unset($_rect);	
    		}
    		
    		if(count($rect)!=4 || $rect[0]<0 || $rect[1]<0 || $rect[2]<=0 || $rect[3]<0)
    		{
    			return $this;
    		}
    		
    		//overflow
    		if($rect[0]+$rect[2]>$this->_width || $rect[1]+$rect[3]>$this->_height)
    		{
    			return $this;
    		}
    				
    		$_tmpImage=imagecreatetruecolor($rect[2],$rect[3]);
    		imagecopy($_tmpImage,$this->_image,0,0,$rect[0],$rect[1],$rect[2],$rect[3]);
    		imagedestroy($this->_image);
    		$this->_image=&$_tmpImage;
    		
    		$this->_width=$rect[2];
    		$this->_height=$rect[3];
    		
    		if(isset($autosave))
    		{
    			$_file=sprintf('%s%s_%sx%s.%s',
    					$this->_imagePathInfo['dirname'].DS,
    					$this->_imagePathInfo['filename'],
    					$this->_width,$this->_height,
    					$this->_imagePathInfo['extension']
    			);
    			
    			if($this->saveAs($_file,$this->default_qulity,$this->default_smooth,$this->auto_dispose))
    			{
    				$autosave=$_file;
    			}
    		}
    		
    		return $this;
    	}
    	
    	/**
    	 * tranform current image
    	 * @param unknown_type $direction	翻转方向,1=horizontal,2=vertical
    	 * @param unknown_type $autosave
    	 * @return object	the instance of this component
    	 */
    	function flip($direction=1,&$autosave=null)
    	{
    		if($direction!==1 && $direction!==2)
    		{
    			$direction=1;
    		}
    		
    		$this->_flipH();
    		if($direction===2)//垂直翻转等于 水平翻转+180度旋转
    		{
    			$this->_rotate(180);
    		}
    		
    		if(isset($autosave))
    		{
    			$_file=sprintf('%s%s_%s.%s',
    					$this->_imagePathInfo['dirname'].DS,
    					$this->_imagePathInfo['filename'],
    					$direction===1?'h':'v',
    					$this->_imagePathInfo['extension']
    			);
    			
    			if($this->saveAs($_file,$this->default_qulity,$this->default_smooth,$this->auto_dispose))
    			{
    				$autosave=$_file;
    			}
    		}
    		
    		return $this;
    	}
    	
    	/**
    	 * rotate current image
    	 * @param $angle	in degree
    	 * @return object	the instance of this component
    	 */
    	function rotate($angle,&$autosave=null)
    	{
    		$_bgc = imagecolorallocate($this->_image, 255, 255, 255);
    		$this->_image = imagerotate($this->_image, $angle, $_bgc);
    		imagecolordeallocate($this->_image, $_bgc);
    		$this->_width = imagesx($this->_image);
            $this->_height = imagesy($this->_image);
    		
    		if(isset($autosave))
    		{
    			$_file=sprintf('%s%s_%s.%s',
    					$this->_imagePathInfo['dirname'].DS,
    					$this->_imagePathInfo['filename'],
    					$angle,
    					$this->_imagePathInfo['extension']
    			);
    			
    			if($this->saveAs($_file,$this->default_qulity,$this->default_smooth,$this->auto_dispose))
    			{
    				$autosave=$_file;
    			}
    		}
    		
    		return $this;
    	}
    	
    	
    	/**
    	 * merge a image as watermark of current image
    	 * @param $anchor
    	 * @param $markImgFile
    	 * @param $padding
    	 * @param $alpha
    	 * @param $autosave
    	 * @return object	the instance of this component
    	 */
    	function watermark($anchor,$markImgFile,$padding=5,$alpha=50,&$autosave=null)
    	{
    		if(empty($anchor) || empty($markImgFile) || !file_exists($markImgFile))
    		{
    			return $this;
    		}
    		
    		$anchor=strtolower(trim($anchor));
    		if(!in_array($anchor,array('lt','rt','lb','rb','center')))
    		{
    			$anchor='rb';
    		}
    		
    		if($padding<0)
    		{
    			$padding=0;
    		}
    		if($padding>10)
    		{
    			$padding=10;
    		}
    		
    		$_tmpImage=null;
    		
    		//mark image info
    		list($_mw,$_mh,$_mt)=getimagesize($markImgFile);
    		switch($_mt)
    		{
    			case IMAGETYPE_GIF:
    				$_tmpImage = imagecreatefromgif($markImgFile);
    				break;
    			case IMAGETYPE_JPEG:
    				$_tmpImage = imagecreatefromjpeg($markImgFile);
    				break;
    			case IMAGETYPE_PNG:
    				$_tmpImage = imagecreatefrompng($markImgFile);
    				break;
    			default:
    				$_tmpImage = null;
    				break;
    		}
    		
    		if(!is_resource($_tmpImage))
    		{
    			return $this;
    		}
    		
    		$pos=array();
    		switch($anchor)
    		{
    			case 'lt':
    				$pos[0]=$padding;
    				$pos[1]=$padding;
    				break;
    			case 'rt':
    				$pos[0]=$this->_width-$_mw-$padding;
    				$pos[1]=$padding;
    				break;
    			case 'lb':
    				$pos[0]=$padding;
    				$pos[1]=$this->_height-$_mh-$padding;
    				break;
    			case 'rb':
    				$pos[0]=$this->_width-$_mw-$padding;
    				$pos[1]=$this->_height-$_mh-$padding;
    				break;
    			case 'center':
    				$pos[0]=($this->_width-$_mw-$padding)*0.5;
    				$pos[1]=($this->_height-$_mh-$padding)*0.5;
    				break;
    		}
    		
    		imagecopymerge($this->_image,$_tmpImage,$pos[0],$pos[1],0,0,$_mw,$_mh,50);
    		imagedestroy($_tmpImage);
    		
    		if(isset($autosave))
    		{
    			$_file=sprintf('%s%s_%s.%s',
    					$this->_imagePathInfo['dirname'].DS,
    					$this->_imagePathInfo['filename'],
    					'wm',
    					$this->_imagePathInfo['extension']
    			);
    			
    			if($this->saveAs($_file,$this->default_qulity,$this->default_smooth,$this->auto_dispose))
    			{
    				$autosave=$_file;
    			}
    		}
    		
    		return $this;
    		
    	}
    	
    	/**
    	 * horizontal flip
    	 * @access private
    	 * @return void
    	 */
    	function _flipH()
    	{
    		$_tmpImage=imagecreatetruecolor($this->_width,$this->_height);
    		$_bgc = imagecolorallocate($this->_image, 255, 255, 255);
    		imagefilledrectangle($_tmpImage,0,0,$this->_width,$this->_height,$_bgc);
    		imagecolordeallocate($_tmpImage,$_bgc);
    		for ($i = 0; $i < $this->_width; $i++) 
    		{
                imagecopyresampled($_tmpImage, $this->_image, ($this->_width - $i), 0, $i, 0, 1, $this->_height, 1, $this->_height);
            }
            imagedestroy($this->_image);
    		$this->_image=&$_tmpImage;
    	}
    	
    	
    	/**
    	 * 保存图片
    	 * @param $filename
    	 * @param $quantity
    	 * @param $smooth
    	 * @param $close_onsaved
    	 * @return bool
    	 */
    	function saveAs($filename,$quantity=80,$smooth=-1,$dispose_onsaved=true)
    	{
    		$_dest_dir=pathinfo($filename,PATHINFO_DIRNAME);
    		
    		//自动创建目录
    		if($this->auto_mkdir && !is_dir($_dest_dir))
    		{
    			@mkdir($_dest_dir,0,true);
    		}
    		
    		if(!is_dir($_dest_dir))
    		{
    			return false;
    		}
    		
    		if($smooth>=0)
    		{
    			@imagefilter($this->_image,IMG_FILTER_SMOOTH,$smooth);
    		}
    		
    		switch($this->_type)
    		{
    			case IMAGETYPE_GIF:
    				imagegif($this->_image,$filename);
    				break;
    			case IMAGETYPE_JPEG:
    				imagejpeg($this->_image,$filename,$quantity);
    				break;
    			case IMAGETYPE_PNG:
    				imagepng($this->_image,$filename,$quantity*0.1);
    				break;
    		}
    		
    		if($dispose_onsaved)
    		{
    			$this->close();
    		}
    		
    		return file_exists($filename);
    	}
    	
    	/**
    	 * destruct
    	 * @return void
    	 */
    	function __destruct()
    	{
    		$this->close();
    	}
    }
    ?>



.. author:: nicho12
.. categories:: articles
.. tags:: image,resize,crop,flip,watermark,Articles

