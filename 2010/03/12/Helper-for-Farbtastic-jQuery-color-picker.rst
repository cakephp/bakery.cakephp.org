Helper for Farbtastic (jQuery color picker)
===========================================

I needed to drop the Farbtastic color picker (
[url]http://acko.net/dev/farbtastic[/url] ) into my Cake project, and
while adding it manually was easy enough, I was surprised that nobody
had previously come up with a helper for it. So I decided to write my
own. You download all of the Farbtastic files and put the folder into
your webroot's js folder, include the helper in your model, and off
you go!
[P]The helper includes three functions: includeHead (which spits out a
Cake-style link to the Farbtastic javascript and css files); input
(similar to a Cake $html->input, but also includes the Farbtastic
picker div and a button to show/hide the picker); and readyJS (which
goes into the document.ready function to hook up the Farbtastic/jQuery
goodness).
[P]You could manually do any or all of the view elements with your own
$html or $javascript calls instead of using the helper functions
(i.e., they're not interdependent), but it's easier to do it all
together.

Get Farbtastic
~~~~~~~~~~~~~~
`http://acko.net/dev/farbtastic`_ [P]Unzip files into
app/webroot/js/farbtastic.

Get a color-picker icon
~~~~~~~~~~~~~~~~~~~~~~~
(for show/hide button)
`http://www.iconfinder.net/icondetails/5185/16/`_ [P]Save image as
color.png, put someplace in your webroot. (Default:
app/webroot/img/icon/color.png)

Save helper file
~~~~~~~~~~~~~~~~
Save as farbtastic.php in app/views/helpers/


Helper Class:
`````````````

::

    <?php 
    /**
     *	Farbtastic helper
     *	@author		Curtis Gibby
     *	@desc		This helper does everything you need related to Farbtastic within CakePHP
     *
     *				Like Farbtastic, requires jQuery to function properly.
     *				jQuery: http://jquery.com
     *
     *				Also requires a Color Wheel icon (color.png in this example)
     *				like the one from Mark James' Silk set
     *				http://www.iconfinder.net/icondetails/5185/16/
     *
     *	@version	5 March 2010
     */ 
    class FarbtasticHelper extends Helper  {
    
    	var $helpers = array('Javascript', 'Html'); 
    	
    	/**
    	*	Add the JS/CSS to your header 
    	*	
    	*	Assumes all Farbtastic files are in single folder 'farbtastic' in js root
    	*/
    	function includeHead() {
    		$str = '';
    		$str .= $this->Javascript->link('farbtastic/farbtastic', false);
    		$str .= $this->Html->css('../js/farbtastic/farbtastic');
    		
    		return $str;
    	}
    	
    	
    	
    	/**
    	*	Generate a form input and related div and icon
    	*	
    	*	may need to customize $icon_file (relative to webroot)
    	*
    	*	Adapted from April Hodge Silver's "Simple Colorpicker" input function
    	*	http://bakery.cakephp.org/articles/view/simple-colorpicker
    	*/
        function input($name, $label='') {
    	
    		$icon_file = '/img/icon/color.png'; // update to wherever your icon is.
    		
            list($model, $fieldname) = split('\.', $name);
            if (empty($label)) {
    			$label = Inflector::Humanize($fieldname);
    		}
    		
    		if(isset($this->data[$model][$fieldname])) {
    			$color_value = str_replace("#", "", $this->data[$model][$fieldname]); // expects an RGB string, strips any incoming '#' character
    		}
    		else {
    			$color_value = "000000"; // black
    		}
    		
            $str = '';
            $str .= '<div class="input text colorpicker">';
            $str .= '<label for="'.$model.Inflector::Camelize($fieldname).'">'.$label.'</label>';
            $str .= '<input name="data['.$model.']['.$fieldname.']" type="text" maxlength="7" value="#'.$color_value.'" id="'.$model.Inflector::Camelize($fieldname).'" class="farbtastic-input" />';
            $str .= '<img id="farbtastic-picker-icon-'.Inflector::Camelize($fieldname).'" src="'.$icon_file.'" alt="Color Picker" title="Color Picker" class="farbtastic-picker-icon">';
            $str .= '<div style="display:none;" class="farbtastic-picker" id="farbtastic-picker-'.Inflector::Camelize($fieldname).'"></div>';
            $str .= '</div>';
    
            return $str;
        }
    
    	
    	
    	/**
    	*	Add the jQuery magic to the $(document).ready function
    	*	Farbtastic-ize the input, make the button show/hide the color picker div
    	*/
    	function readyJS($name) {
            list($model,$fieldname) = split('\.',$name);
    		$str = '';
    		$str .= ' $("#farbtastic-picker-'.Inflector::Camelize($fieldname).'").farbtastic("#'.$model.Inflector::Camelize($fieldname).'"); ';
    		$str .= ' $("#farbtastic-picker-icon-'.Inflector::Camelize($fieldname).'").click( function() { $("#farbtastic-picker-'.Inflector::Camelize($fieldname).'").toggle("slow"); }); ';
    
    		return $str;
    	}
    }?>



Include the helper in your controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    <?php
    var $helpers = array('Form', 'Farbtastic'); // and whatever other helpers you may need
    ?>



Use the functions in your view
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


View Template:
``````````````

::

    <?php 
    	/* any other javascript and/or css includes -- make sure you've got jQuery in here!!! */
    	echo $farbtastic->includeHead(); // outputs link to Farbtastic JS and CSS
    ?>
    
    <?php echo $form->create('User');?>
    	<fieldset>
     		<legend>Edit User</legend>
    	<?php
    		echo $form->input('id');
    		echo $form->input('name');
    		echo $farbtastic->input('User.favorite_color'); // field gets Humanized and label comes out as 'Favorite Color';
    		echo $farbtastic->input('User.dislike_color', 'What color do you really dislike?'); // passing the label explicitly
    	?>
    	</fieldset>
    <?php echo $form->end('Save User');?>
    <script type="text/javascript" charset="utf-8">
    	$(document).ready(function() {
    		<?php 
    			echo $farbtastic->readyJS('User.background_color'); // add the jQuery
    			echo $farbtastic->readyJS('User.text_color');
    		?>
    	});
    </script>



.. _http://acko.net/dev/farbtastic: http://acko.net/dev/farbtastic
.. _http://www.iconfinder.net/icondetails/5185/16/: http://www.iconfinder.net/icondetails/5185/16/

.. author:: cgibby
.. categories:: articles, helpers
.. tags:: helper,jquery,color picker,colorpicker,farbtastic,Helpers

