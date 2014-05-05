File upload and thumbnail component
===================================

Attachment component for CakePHP handles file uploads to the file
system. If it's an image file, it creates as many thumbnail copies
as you need.
I've this project from the public copy from sabbour, to have a
standard way of uploading files to CakePHP projects.

It is version controlled at (and you can download the fresher source
code from)
`http://github.com/tute/Thumbnail-component-for-CakePHP`_
Usage

#. [li] Copy attachment.php to /app/controllers/components/ [li] Add
component to your controller: var $components = array('Attachment');
[li] In your upload form:

View Template:
``````````````

::


    <?php
    echo $form->create('Model', array('type' => 'file'));
    echo $form->file('Attachment');
    ?>




Filesystem storage (default)
----------------------------

1. In your controller action (save file_path):


Controller Class:
`````````````````

::

    <?php $file_path = $this->Attachment->upload($this->data['Model']['Attachment']);?>

2. In your view, if it's an image:


View Template:
``````````````

::

    <?php echo $html->image('/attachments/$folderName/{size}/'.$data['Model']['file_path']); ?>



Configuration options
---------------------

* photos_dir: The folder which will hold the files, inside
  /app/webroot/attachments/.
* database: Whether to save the images in the database or the
  filesystem.
* allow_non_image_files, self descriptive ;-) .
* images_size: Array of different file sizes required by your app.

Each element is itself an array, like:

::

    'folder_name' => array($width, $height, $do_crop)

You can override the default configuration passing an array of options
while
including the component, like:

Controller Class:
`````````````````

::

    <?php var $components = array('Attachment' => array('photos_dir' => 'pets'));?>

(Check the $config array defined at the first lines of the component
to see
default values and the syntax.)


Methods
-------

upload($data)

* data: file data array from the form. If itâ€™s an image, it calls:

thumbnail($data, $upload_dir, $maxw, $maxh, $crop = false)

* data: the image data array from the form
* upload_dir: the name of the parent folder of the images
* maxw/maxh: maximum width/height for resizing images
* crop: indicates if image must be cropped or not (defaults to false)

delete_files($file-to-delete-name)


Requirements
------------

#. [li] PHP GD library installed and enabled [li] /app/webroot/ must
   be writable by the web server (or you can create
   /app/webroot/attachments/ and make writable that folder). [li] You
   must store in database $file_path returned by
   $this->Attachment->upload in order to reference the file.



To do list
----------

Image resize in upload_DB.

.. _http://github.com/tute/Thumbnail-component-for-CakePHP: http://github.com/tute/Thumbnail-component-for-CakePHP

.. author:: tutec
.. categories:: articles, components
.. tags:: component,thumbnail,upload,attachment,photos,Components

