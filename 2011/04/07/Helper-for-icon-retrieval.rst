Helper for icon retrieval
=========================

This helper easily can retrieve appropriate icons for a given mimetype
or file extension.
Create icon.php in your app/view/helpers directory and fill in the
following code:

::

    <?php
    /**
     * Class IconHelper
     * Retrieves an appropriate icon by given mimetype or file extension.
     */
    class IconHelper extends AppHelper {
    	var $name = "Icon";
    	
    	var $helpers = array( "Html" );
    
    	/**
    	 * Path to fileicons in app/wwwroot/img/
    	 * @var String
    	 */
    	var $pathFileicons = "fileicons";
    
    	function setFileiconsPath( $pathFileicons ) {
    		$this->pathFileicons = $pathFileicons;
    	}
    	
    	function get( $type_or_ext, $extension = "" ) {
    		$mimetype = "";
    		
    		// parse type_or_ext
    		// if $extension is set, first param is interpreted as mimetype
    		if( !empty( $extension ) ) $mimetype = $type_or_ext;
    		// else if first param contains slash it is interpreted as mimetype
    		elseif( strpos( $type_or_ext, "/" ) !== false )
    			$mimetype = $type_or_ext;
    		else 	
    			$extension = $type_or_ext;
    		
    		$mediatype = $subtype = "";
    		
    		if( !empty( $mimetype ))
    			list( $mediatype, $subtype ) = explode("/", $mimetype);
    		
    		if( substr( $subtype, 0, 2) == "x-" ) $subtype = substr( $subtype, 2 );
    		
    		$try = array( $subtype, $extension, $mediatype, "file" );
    		
    		foreach( $try as $name )
    			if( !empty( $name))
    				if( ( $extension = $this->iconExists($name) ) !== false ) 
    					return $this->Html->image( $this->pathFileicons . DS . $name . ".$extension", 
    											   array( "alt" => $name ));
    	}
    	
    	/**
    	 * Checks whether an icon of the given name exists in 
    	 * folder pathFileicons. Tries out several extensions.
    	 * @param $name
    	 * @return mixed: 
    	 * - false if no icon was found
    	 * - String $extension of the found icon
    	 * 
    	 */
    	private function iconExists( $name ) {
    		$path = IMAGES . DS . $this->pathFileicons . DS . $name;
    		$extensions = array( "png", "gif", "ico", "jpg", "jpeg" );
    		
    		foreach( $extensions as $extension ) 	
    			if( @file_exists( $path . ".$extension" ))
    				return $extension;
    				
    		return false;
    	}
    
    }?>

Of course, add 'Image' to your $helpers property of your Controller
class.

::

    <?php
    var $helpers = array( 'Image' );
    ?>

You need to create a folder with file icons in your images-folder
(default: "app/webroot/img/fileicons/"). The icons should be named
after the file extension, its media type or it subtype without leading
"x-" and be of the type PNG, GIF, ICO or JPG. For instance, the
following file icon names are possible:

pdf.png (from extension "pdf", or from the subtype of the mimetype
"application/pdf")

video.gif (from the mediatype of the mimetype "video/avi")

wav.ico (from the subtype of the mimetype "audio/x-wav")

You can download a big set of file icons from
`http://www.splitbrain.org/projects/file_icons`_.

Retrieving a file icon:
Oftenly, you will have to show a nice file icon to let people know
easily what type of file is being presented. To use it, simply use the
method "icon" of this helper:

::

    <?php
    // will create an icon by passing a mimetype:
    $mimetype = "image/jpg";
    $this->Icon->get( $mimetype );
    
    // will create an icon by passing an extension:
    $extension = "pdf";
    $this->Icon->get( $extension );
    
    // will create an icon by mimetype and use an extension as a fallback 
    // if no icon could be determined by the mimetype:
    $mimetype = "application/octet-stream";
    $extension = "avi";
    $this->Icon->get( $mimetype, $extension );
    ?>

To use a different fileicon-set, you can define the path to it. It
must be relative to Cake's images folder.

::

    <?php
    $this->Icon->setFileiconsPath( "other_fileicons" );  // lets IconHelper use app/webroot/img/other_fileicons for icon retrieval
    ?>



.. _http://www.splitbrain.org/projects/file_icons: http://www.splitbrain.org/projects/file_icons

.. author:: checkitout
.. categories:: articles, helpers
.. tags:: file icon,Helpers

