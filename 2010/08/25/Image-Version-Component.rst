Image Version Component
=======================

Generate thumbnails from images within your app dynamically with many
options to control how the images are resized.
UPDATED May, 21 2010 This code was very dated and I've recently fixed
some bugs and added new features. Please be sure to stay current with
this project on github. It's been very well tested, but please bring
up any bugs that may exist.

Image Version component and helper allow you to very easily make
various versions of images in your Cake app. Typically speaking --
thumbnails. It allows you to set the way in which images are cropped
or sized to fit, "letterbox" effect, background fill color, quality
settings, sharpening, and more.

Requirements: GD Library and PHP modules to work with GD.

Just include the component in your controller and optionally use the
helper.
You can grab the code from github:
`http://github.com/tmaiaroto/image_version`_

Example Component Usage
```````````````````````

::

    
    // Example controller method...don't forget to include the component.
    var $components = array('ImageVersion');
    
    function view() {
       $image = $this->Model->find('first');
       // Remove any existing image, so the thumbnail is generated each time in this case
       $clear = $this->ImageVersion->flushVersion($image['Model']['file'], array(65, 50), true);
       // Create the thumbnail(simplest usage)
       $this->set('thumbnail', $this->ImageVersion->version(array('image' => $image['Model']['file'], 'size' => array(65, 50))));
    }
    
    // Example view template
    <img src="<?php echo $image; ?>" />
    



Example Helper Usage
````````````````````

::

    
    // In a view template...I have a Model with a file column that has a path to the source image.
    // Of course be sure to put in your controller var $helpers = array('ImageVersion'); 
    <?php 
    $modelName = Inflector::singularize($this->name); 
    foreach (${strtolower($this->name)} as $entry): 
    	echo $imageVersion->version(array('image' => $entry[$modelName]['file'], 'size' => array(75, 75), 90, 'crop' => true));
    endforeach;
    ?>

The component and helper are both well commented, but basically you're
passing in an array with the source image path (anything from the
webroot of your application), an array with X and Y dimensions, then
optionally, quality, sharpening (not applicable for images with
transparency) and other options for cropping/letterbox, etc. In the
example above for the controller I also call the flushVersion() method
which actually deletes the files I'm creating each time. I would
recommend making such a call during development, or on a link to have
perhaps a control for a visitor to clear the images (saves you from
deleting them manually to see updates).

.. _http://github.com/tmaiaroto/image_version: http://github.com/tmaiaroto/image_version

.. author:: tom_m
.. categories:: articles, components
.. tags:: image,GD,thumbnail,resize,generator,image version,Components

