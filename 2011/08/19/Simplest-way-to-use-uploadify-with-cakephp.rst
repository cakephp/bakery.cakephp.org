Simplest way to use uploadify with cakephp
==========================================

I have posted a tutorial on how to use uploadify with cakephp on my
blog you can it...
here is the link for the tutorial if you face any problem you can
contact me at
`instatutorial@gmail.com`_ You can view complete tutorial on this
website...
`Go to the main tutorial....`_
> <br > **Code for javascript part:**

::

    
    
    $(document).ready(function() {
    
    $('#file_upload').uploadify({
    
    'uploader' : 'url('/webroot/uploadify/uploadify.swf');?>',
    
    'script' : 'url('/webroot/uploadify/uploadify.php');?>',
    
    'cancelImg' : 'url('/webroot/uploadify/cancel.png');?>',
    
    'folder' : 'url('/extraz/uploaded_by_all_users');?>',
    
    'auto' : true,
    
    'buttonText' : 'Browse',
    
    'multi' :true,
    
    'queueSizeLimit' : 5,
    
    'sizeLimit' : 1024*1024
    
    });
    
    });
    
    
    


**Code for uploadify.php file (for server side work):**

::

    
    
    if (!empty($_FILES)) {
    
    	$tempFile = $_FILES['Filedata']['tmp_name'];
    
    	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $_REQUEST['folder'] . '/';
    
    	$targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
    
            move_uploaded_file($tempFile,$targetFile);
    
            echo str_replace($_SERVER['DOCUMENT_ROOT'],'',$targetFile);
    
    
    
    }
    
    ?>
    
    





for more details you can visit complete tutorial here

`Go to the main tutorial....`_



.. _instatutorial@gmail.com: mailto:instatutorial@gmail.com=instatutorial@gmail.com
.. _Go to the main tutorial....: http://www.instatutorial.com/using-uploadify-with-cakephp

.. author:: instatutorial
.. categories:: articles
.. tags:: CakePHP,jquery,upload,Articles

