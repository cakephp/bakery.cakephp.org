VideoEncoder Component
======================

This is a component to convert and encode videos in your CakePHP
application. This was extracted from a live project.


Introduction
~~~~~~~~~~~~
This is a component to convert and encode videos in your CakePHP
application. This was extracted from a live project.

Project page: `http://andrw.net/code/cakephp-video-encoder-component`_

How to use
~~~~~~~~~~
Place the component in your components directory and then include it
inside of any controller that you want to encode videos.

Here is a basic example of how to use the component inside of an
action.


Controller Class:
`````````````````

::

    <?php 
    function add () {
    	// You probably will upload the video from a form
    	
    	// Let's say all of that is said and done and you have your video 
    	// uploaded and have it's path stored in the variable $path
    	
    	// Let's also say that you have a variable set with the output path
    	// that the converted video will be stored named $out_path
    	
    	// The first this we need to do is convert the video
    	$this->VideoEncoder->convert_video($path, $out_path, 480, 360);
    	
    	// Then we need to set the buffer on the converted video
    	$this->VideoEncoder->set_buffering($out_path);
    	
    	// We can now get some information back about the converted video that
    	// can be stored in a database for further use
    	$duration = $this->VideoEncoder->get_duration($out_path);
    	$filesize = $this->VideoEncoder->get_filesize($out_path);
    	
    	// We can also grab a screenshot from the video as a jpeg
    	// and store it for future use.
    	$this->VideoEncoder->grab_image($out_path, $path_to_save_image);
    }
    ?>

If the convert_video's final parameter $optimized is set to 'true' I
find that it delivers better quality and a smaller file size than
manually setting the sample and bit rates.


Component Class:
````````````````

::

    <?php 
    /*
     * Video Encoder CakePHP Component
     * Copyright (c) 2009 Andrew Weir
     * http://andrw.new
     *
     *
     * @author      Andrew Weir <andru.weir@gmail.com>
     * @version     1.0
     * @license     MIT
     */
    class VideoEncoderComponent extends Object {
    	
    	/**
    	 * Everything in this method can be placed into a global configuration
    	 * file that is called at bootstrap/runtime.
    	 **/
    	function __construct () {
    		// ffmpeg path
    		Configure::write('Video.ffmpeg_path', '/usr/bin/ffmpeg');
    
    		// flvtool2 path
    		Configure::write('Video.flvtool2_path', '/bin/flvtool2');
    
    		// Bitrate of audio (valid vaues are 16,32,64)
    		Configure::write('Video.bitrate', 64);
    
    		// Sampling rate (valid values are 11025, 22050, 44100)
    		Configure::write('Video.samprate', 44100);
    	}
    	
    	function convert_video ($in, $out, $width = 480, $height = 360, $optimized = false) {
    		if ($optimized == false) {
    			$command = Configure::read('Video.ffmpeg_path') . " -i {$in} -y -s {$width}x{$height} -r 30 -b 500 -ar " . Configure::read('Video.samprate') . " -ab " . Configure::read('Video.bitrate') . " {$out}";
    		} else {
    			$command = Configure::read('Video.ffmpeg_path') . " -i {$in} -b 256k -ac 1 -ar 44100 {$out}";
    		}
    		echo exec($command);
    	}
    	
    	function set_buffering ($in) {
    		$command = Configure::read('Video.flvtool2_path') . " -U {$in}";
    		shell_exec($command);
    	}
    	
    	function grab_image ($in, $out) {
    		$command = Configure::read('Video.ffmpeg_path') . " -y -i {$in} -f mjpeg -t 0.003 {$out}";
    		shell_exec($command);
    	}
    	
    	function get_duration ($in) {
    		$command = Configure::read('Video.ffmpeg_path') . " -i {$in} 2>&1 | grep \"Duration\" | cut -d ' ' -f 4 | sed s/,//";
    		return shell_exec($command);
    	}
    	
    	function get_filesize ($in) {
    		return filesize($in);
    	}
    	
    	function remove_uploaded_video ($in) {
    		unlink($in);
    	}
    }
    ?>



.. _http://andrw.net/code/cakephp-video-encoder-component: http://andrw.net/code/cakephp-video-encoder-component

.. author:: andru
.. categories:: articles, components
.. tags:: converting,video,encoder,encode,converter,Components

