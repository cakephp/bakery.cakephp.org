Dynamic thumbnails creation
===========================

By using this component, you can generate thumbnails dynamically.This
component provide the following features. 1.You can generate
thumbnails by giving either image width or image height and image
height and image width both. 2.You can also generate thumbnails by
giving scale ratio. 3.You can also generate thumbnails on output of
browsers. 4.You can save your generated thumbnails on specific
folders.

::

    /* Created By : Santosh R. Yadav
    Created Date : 16-Sep-10
    Company Name : Technomile software solutions
    eg.
    $this->ImageResize->load($this->data['User']['ClientLogo']['tmp_name']
    );
    $this->ImageResize->resize(100,$checkImageWidth[1]);
    // save to specific folder
    $this->ImageResize->save($destination.$newfilename); OR
    // generated thumbnails on browser output directly //
    $this->ImageResize->output($destination.$newfilename);
    */
    class ImageResizeComponent extends Object
    {

    var $image;
    var $image_type;

    function load($filename) {
    $image_info = getimagesize($filename);
    $this->image_type = $image_info[2];
    if( $this->image_type == IMAGETYPE_JPEG ) {
    $this->image = imagecreatefromjpeg($filename);
    } elseif( $this->image_type == IMAGETYPE_GIF ) {
    $this->image = imagecreatefromgif($filename);
    } elseif( $this->image_type == IMAGETYPE_PNG ) {
    $this->image = imagecreatefrompng($filename);
    }
    }
    function save($filename, $image_type=IMAGETYPE_JPEG, $compression=75,
    $permissions=null) {
    if( $image_type == IMAGETYPE_JPEG ) {
    imagejpeg($this->image,$filename,$compression);
    } elseif( $image_type == IMAGETYPE_GIF ) {
    imagegif($this->image,$filename);
    } elseif( $image_type == IMAGETYPE_PNG ) {
    imagepng($this->image,$filename);
    }
    if( $permissions != null) {
    chmod($filename,$permissions);
    }
    }
    function output($image_type=IMAGETYPE_JPEG) {
    if( $image_type == IMAGETYPE_JPEG ) {
    imagejpeg($this->image);
    } elseif( $image_type == IMAGETYPE_GIF ) {
    imagegif($this->image);
    } elseif( $image_type == IMAGETYPE_PNG ) {
    imagepng($this->image);
    }
    }
    function getWidth() {
    return imagesx($this->image);
    }
    function getHeight() {
    return imagesy($this->image);
    }
    function resizeToHeight($height) {
    $ratio = $height / $this->getHeight();
    $width = $this->getWidth() * $ratio;
    $this->resize($width,$height);
    }
    function resizeToWidth($width) {
    $ratio = $width / $this->getWidth();
    $height = $this->getheight() * $ratio;
    $this->resize($width,$height);
    }
    function scale($scale) {
    $width = $this->getWidth() * $scale/100;
    $height = $this->getheight() * $scale/100;
    $this->resize($width,$height);
    }
    function resize($width,$height) {
    $new_image = imagecreatetruecolor($width, $height);
    imagecopyresampled($new_image, $this->image, 0, 0, 0, 0, $width,
    $height, $this->getWidth(), $this->getHeight());
    $this->image = $new_image;
    }
    }
    ?>



.. author:: santoshgroup
.. categories:: articles, components
.. tags:: Components

