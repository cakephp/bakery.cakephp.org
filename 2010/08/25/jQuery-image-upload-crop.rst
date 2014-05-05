jQuery image upload & crop
==========================

I was searching for a nice script with that i can upload and crop
images. I found a nice one @ [url]http://www.webmotionuk.co.uk/php-
jquery-image-upload-and-crop/[/url] and made it cake ready ;) So, i
hope i can help you with my first Article! Here we go:


Requirements
~~~~~~~~~~~~

+ PHP 4 or Higher (It has been tested on Version 5)
+ PHP GD Library
+ jQuery `http://jquery.com/`_
+ Image Area Select plugin -> `http://odyniec.net/projects/imgareaselect/`_



Installation
~~~~~~~~~~~~

Ok, now we must create a new Component called "JqImgcrop".
Let`s create a new file called "jq_imgcrop.php" in
yourapp/controllers/components/ with following content:


Component Class:
````````````````

::

    <?php
    class JqImgcropComponent extends Object {

    	function uploadImage($uploadedInfo, $uploadTo, $prefix){
    		$webpath = $uploadTo;
    		$upload_dir = WWW_ROOT.str_replace("/", DS, $uploadTo);
    		$upload_path = $upload_dir.DS;
    		$max_file = "34457280"; 						// Approx 30MB
    		$max_width = 800;

    		$userfile_name = $uploadedInfo['name'];
    		$userfile_tmp =  $uploadedInfo["tmp_name"];
    		$userfile_size = $uploadedInfo["size"];
    		$filename = $prefix.basename($uploadedInfo["name"]);
    		$file_ext = substr($filename, strrpos($filename, ".") + 1);
    		$uploadTarget = $upload_path.$filename;

    		if(empty($uploadedInfo)) {
                      return false;
                    }

    		if (isset($uploadedInfo['name'])){
    			move_uploaded_file($userfile_tmp, $uploadTarget );
    			chmod ($uploadTarget , 0777);
    			$width = $this->getWidth($uploadTarget);
    			$height = $this->getHeight($uploadTarget);
    			// Scale the image if it is greater than the width set above
    			if ($width > $max_width){
    				$scale = $max_width/$width;
    				$uploaded = $this->resizeImage($uploadTarget,$width,$height,$scale);
    			}else{
    				$scale = 1;
    				$uploaded = $this->resizeImage($uploadTarget,$width,$height,$scale);
    			}
    		}
    		return array('imagePath' => $webpath.$filename, 'imageName' => $filename, 'imageWidth' => $this->getWidth($uploadTarget), 'imageHeight' => $this->getHeight($uploadTarget));
    	}

    	function getHeight($image) {
    		$sizes = getimagesize($image);
    		$height = $sizes[1];
    		return $height;
    	}
    	function getWidth($image) {
    		$sizes = getimagesize($image);
    		$width = $sizes[0];
    		return $width;
    	}

    	function resizeImage($image,$width,$height,$scale) {
    		$newImageWidth = ceil($width * $scale);
    		$newImageHeight = ceil($height * $scale);
    		$newImage = imagecreatetruecolor($newImageWidth,$newImageHeight);
    $ext = strtolower(substr(basename($image), strrpos(basename($image), ".") + 1));
    		$source = "";
    		if($ext == "png"){
    			$source = imagecreatefrompng($image);
    		}elseif($ext == "jpg" || $ext == "jpeg"){
    			$source = imagecreatefromjpeg($image);
    		}elseif($ext == "gif"){
    			$source = imagecreatefromgif($image);
    		}
    		imagecopyresampled($newImage,$source,0,0,0,0,$newImageWidth,$newImageHeight,$width,$height);
    		if($ext == "png" || $ext == "PNG"){
    			imagepng($newImage,$image,0);
    		}elseif($ext == "jpg" || $ext == "jpeg" || $ext == "JPG" || $ext == "JPEG"){
    			imagejpeg($newImage,$image,90);
    		}elseif($ext == "gif" || $ext == "GIF"){
    			imagegif($newImage,$image);
    		}
    		chmod($image, 0777);
    		return $image;
    	}

    	function resizeThumbnailImage($thumb_image_name, $image, $width, $height, $start_width, $start_height, $scale){
    		$newImageWidth = ceil($width * $scale);
    		$newImageHeight = ceil($height * $scale);
    		$newImage = imagecreatetruecolor($newImageWidth,$newImageHeight);
    		$ext = strtolower(substr(basename($image), strrpos(basename($image), ".") + 1));
    		$source = "";
    		if($ext == "png"){
    			$source = imagecreatefrompng($image);
    		}elseif($ext == "jpg" || $ext == "jpeg"){
    			$source = imagecreatefromjpeg($image);
    		}elseif($ext == "gif"){
    			$source = imagecreatefromgif($image);
    		}
    		imagecopyresampled($newImage,$source,0,0,$start_width,$start_height,$newImageWidth,$newImageHeight,$width,$height);

    		if($ext == "png" || $ext == "PNG"){
    			imagepng($newImage,$thumb_image_name,0);
    		}elseif($ext == "jpg" || $ext == "jpeg" || $ext == "JPG" || $ext == "JPEG"){
    			imagejpeg($newImage,$thumb_image_name,90);
    		}elseif($ext == "gif" || $ext == "GIF"){
    			imagegif($newImage,$thumb_image_name);
    		}

    		chmod($thumb_image_name, 0777);
    		return $thumb_image_name;
    	}

    	function cropImage($thumb_width, $x1, $y1, $x2, $y2, $w, $h, $thumbLocation, $imageLocation){
    		$scale = $thumb_width/$w;
    		$cropped = $this->resizeThumbnailImage(WWW_ROOT.str_replace("/", DS,$thumbLocation),WWW_ROOT.str_replace("/", DS,$imageLocation),$w,$h,$x1,$y1,$scale);
    		return $cropped;
    	}
    }
    ?>


Then we must create a new helper called cropimage.php (you must create
this file in yourapp/views/helpers/ )


Helper Class:
`````````````

::

    <?php
    class CropimageHelper extends Helper {
        var $helpers = array('Html', 'Javascript', 'Form');

        function createJavaScript($imgW, $imgH, $thumbW, $thumbH) {
    			return $this->output("<script type=\"text/javascript\">
    				function preview(img, selection) {
    					var scaleX = $thumbW / selection.width;
    					var scaleY = $thumbH / selection.height;

    					$('#thumbnail + div > img').css({
    						width: Math.round(scaleX * $imgW) + 'px',
    						height: Math.round(scaleY * $imgH) + 'px',
    						marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
    						marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
    					});
    					$('#x1').val(selection.x1);
    					$('#y1').val(selection.y1);
    					$('#x2').val(selection.x2);
    					$('#y2').val(selection.y2);
    					$('#w').val(selection.width);
    					$('#h').val(selection.height);
    				}

    				$(document).ready(function () {
    					$('#save_thumb').click(function() {
    						var x1 = $('#x1').val();
    						var y1 = $('#y1').val();
    						var x2 = $('#x2').val();
    						var y2 = $('#y2').val();
    						var w = $('#w').val();
    						var h = $('#h').val();
    						if(x1==\"\" || y1==\"\" || x2==\"\" || y2==\"\"|| w==\"\" || h==\"\"){
    							alert('Please choose a area to crop...');
    							return false;
    						}else{
    							return true;
    					}
    				});
    			});

    			$(window).load(function () {
    				$('#thumbnail').imgAreaSelect({ aspectRatio: '1:1', onSelectChange: preview });
    			});
    			</script>");
        }

        function createForm($imagePath, $tH, $tW){
            $x1 =         $this->Form->hidden('x1', array("value" => "", "id"=>"x1"));
                $y1 =         $this->Form->hidden('y1', array("value" => "", "id"=>"y1"));
                $x2 =         $this->Form->hidden('x2', array("value" => "", "id"=>"x2",));
                $y2 =         $this->Form->hidden('y2', array("value" => "", "id"=>"y2"));
                $w =             $this->Form->hidden('w', array("value" => "", "id"=>"w"));
                $h =             $this->Form->hidden('h', array("value" => "", "id"=>"h"));
                $imgP =      $this->Form->hidden('imagePath', array("value" => $imagePath));
                $imgTum = $this->Html->image($imagePath, array('style'=>'float: left; margin-right: 10px;', 'id'=>'thumbnail', 'alt'=>'Create Thumbnail'));
                $imgTumPrev = $this->Html->image($imagePath, array('style'=>'position: relative;', 'id'=>'thumbnail', 'alt'=>'Thumbnail Preview'));
                return $this->output("$imgTum
                <div style=\"position:relative; overflow:hidden; width:".$tW."px; height:".$tH."px;\">
                    $imgTumPrev
                </div>
                <br style=\"clear:both;\"/>$x1 $y1 $x2 $y2 $w $h $imgP");
        }
    }
    ?>


Thats it, now i will tell you something about the

Usage
~~~~~

Ok, now you must add the component and the helper to your controller
where you want to use the cropload ( :) )

::


    	var $helpers = array(..., 'Cropimage')
    	var $components = array(..., 'JqImgcrop');

Now you have to create a form where you can select a image.
I will give you an example:

::


    <?php echo $form->create('YourModel', array('action' => 'createimage_step2', "enctype" => "multipart/form-data"));?>
    	<?php
    		echo $form->input('name');
    		echo $form->input('image',array("type" => "file"));
    		echo $form->end('Upload');
    	?>


Now, in the createimage_step2 function you have to add the upload
function of our component:

::


    $uploaded = $this->JqImgcrop->uploadImage($this->data['YourModel']['image'], '/img/upload/', 'prefix_');

and then push it to the view:

::


    $this->set('uploaded',$uploaded);

This is what it looks in my controller:

::


    	function createimage_step2(){
    		if (!empty($this->data)) {
    			$uploaded = $this->JqImgcrop->uploadImage($this->data['YourModel']['image'], '/img/upload/', 'prefix_');
    			$this->set('uploaded',$uploaded);
    		}


Now you have to add in your view ( in my case createimage_step2.ctp )
at the top the 2 Javascript libraries:

::


    <?php
    if(isset($javascript)):
    		echo $javascript->link('jquery-1.2.6.min.js');
    		echo $javascript->link('jquery.imgareaselect-0.4.2.min.js');
    endif;
    ?>

Then you have to create a new form with the cropimage helper and add
the javascript using:

::


    echo $cropimage->createJavaScript($uploaded['imageWidth'],$uploaded['imageHeight'],151,151);
    echo $cropimage->createForm($uploaded["imagePath"], $width, $height);

The 2 width and height parameters specify the size of the thumbnail
which will be created.

You have to close the form with a form->submit with the id
"save_thumb"

::


    echo $form->submit('Done', array("id"=>"save_thumb"));

In my case it looks like this:

::


    <?php
    		echo $form->create('YourModel', array('action' => 'createimage_step3',"enctype" => "multipart/form-data"));
    		echo $form->input('id');
    		echo $form->hidden('name');
    		echo $cropimage->createForm($uploaded["imagePath"], 151, 151);
    		echo $form->submit('Done', array("id"=>"save_thumb"));
    echo $form->end();?>



Final Step
~~~~~~~~~~

Now, in the createimage_step3 function in your controller we crop and
save the image

::


    $this->JqImgcrop->cropImage(151, $this->data['YourModel']['x1'], $this->data['YourModel']['y1'], $this->data['YourModel']['x2'], $this->data['YourModel']['y2'], $this->data['YourModel']['w'], $this->data['YourModel']['h'], $this->data['YourModel']['imagePath'], $this->data['YourModel']['imagePath'])

The function is using this pararmeters:

::


    $thumb_width, $x1, $y1, $x2, $y2, $w, $h, $thumbLocation, $imageLocation

$thumb_width is the width of your thumbnail, $x1, $y1, $x2, $y2, $w
and $h are including the crop parameters, $thumbLocation the location
where you want to save your thumb, and $imageLocation the location of
the sourceimage.

This function returns the filename of the created thumbnail.

Ok, that's it.

Big thanks to `http://www.webmotionuk.co.uk`_ for your great article!


.. _http://jquery.com/: http://jquery.com/
.. _http://odyniec.net/projects/imgareaselect/: http://odyniec.net/projects/imgareaselect/
.. _http://www.webmotionuk.co.uk: http://www.webmotionuk.co.uk/

.. author:: klagoggle.myopenid.com
.. categories:: articles, snippets
.. tags:: image,thumbnail,jquery,upload,crop,manuplation,Snippets

