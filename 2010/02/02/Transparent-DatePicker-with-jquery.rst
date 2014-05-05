Transparent DatePicker with jquery
==================================

We will create an extended Helper FormHelper, without Difficulty to
add a calendar date picker style in jquery
(http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/).
We want to get the dates to continue to have the current format, with
the addition of an icon that allows us to more quickly select a date.

For this I use the date picker from
`http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/`_ and
create a Helper.

Recipe:

1. Download date picker:
$ wget `http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/scripts/jquery.datePicker.js`_
$ mv jquery.datePicker.js $CAKE_PROJECT/app/webroot/js/
$ wget `http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/styles/datePicker.css`_
$ mv datePicker.css $CAKE_PROJECT/app/webroot/css/
$ wget `http://github.com/vitch/jquery-methods/raw/master/date.js`_
$ mv date.js $CAKE_PROJECT/app/webroot/js

2. Save two small images in $CAKE_PROJECT/app/webroot/img (over
20x20), a calendar and a cros to put NULL, for example:
$ wget
`http://www.elibrary.dep.state.pa.us/images/small/calendar.png`_
$ mv calendar.png $CAKE_PROJECT/app/webroot/img/
$ wget `http://www.ameibo.com/image/comment_cancel_icon.png`_
$ mv comment_cancel_icon.png $CAKE_PROJECT/app/webroot/img/drop.png

3. Create this file into
$CAKE_PROJECT/app/webroot/js/cake.datePicker.js

::


    function datepick(field_id,date_start,date_end){
    	$('#'+field_id)
    		.datePicker(
    			{
    				createButton:false,
    				startDate:date_start,
    				endDate:date_end

    			}
    		).bind(
    			'click',
    			function()
    			{
    				updateSelects($(this).dpGetSelected()[0],$(this).attr("id"));
    				$(this).dpDisplay();
    				return false;
    			}
    		).bind(
    			'dateSelected',
    			function(e, selectedDate, $td, state)
    			{
    				updateSelects(selectedDate,$(this).attr("id"));
    			}
    		).bind(
    			'dpClosed',
    			function(e, selected)
    			{
    				updateSelects(selected[0],$(this).attr("id"));
    			}
    		);
    	var updateSelects = function (selectedDate)
    	{
    		var selectedDate = new Date(selectedDate);
                    if (selectedDate.getDate()<10){
                        $('#'+field_id+'Day option[value=0' + selectedDate.getDate() + ']').attr('selected', 'selected');
                    } else {
                        $('#'+field_id+'Day option[value=' + selectedDate.getDate() + ']').attr('selected', 'selected');
                    }
                    if (selectedDate.getMonth()<9){
                        $('#'+field_id+'Month option[value=0' + (selectedDate.getMonth()+1) + ']').attr('selected', 'selected');
                    } else {
                        $('#'+field_id+'Month option[value=' + (selectedDate.getMonth()+1) + ']').attr('selected', 'selected');
                    }
    		$('#'+field_id+'Year option[value=' + (selectedDate.getFullYear()) + ']').attr('selected', 'selected');
    	}

    	$('#'+field_id+'Day, #'+field_id+'Month, #'+field_id+'Year')
    		.bind(
    			'change',
    			function()
    			{
    				var d = new Date(
    							$('#'+field_id+'Year').val(),
    							$('#'+field_id+'Month').val()-1,
    							$('#'+field_id+'Day').val()
    						);
    				$('#'+field_id).dpSetSelected(d.asString());
    			}
    		);

    	$('#'+field_id+'Day').trigger('change');

    	// Can i use drop?
    	$('#'+field_id+'_drop').bind(
    		'click',
    		function()
    		{
    			$('#'+field_id+'Year').val("");
    			$('#'+field_id+'Month').val("");
    			$('#'+field_id+'Day').val("");
    		}
    	);
    }

4. Create this Helper in
$CAKE_PROJECT/app/views/helpers/date_picker.php

Helper Class:
`````````````

::

    <?php

    class DatePickerHelper extends FormHelper {

        var $helpers = array('Html','Javascript');
        var $format = '%Y-%m-%d';

        function _setup(){
            $format = Configure::read('DatePicker.format');
            if($format != null){
                $this->format = $format;
            }
        }

        function picker($fieldName, $options = array()) {
            $this->_setup();
            $this->setEntity($fieldName);
            $htmlAttributes = $this->domId($options);
            $divOptions['class'] = 'date';
            $options['type'] = 'date';
            $options['div']['class'] = 'date';
    	$options['dateFormat'] = 'DMY';
            $options['minYear'] = isset($options['minYear']) ? $options['minYear'] : (date('Y') - 20);
            $options['maxYear'] = isset($options['maxYear']) ? $options['maxYear'] : (date('Y') + 20);

            $options['after'] = $this->Html->image('calendar.png', array('id'=> $htmlAttributes['id'],'style'=>'cursor:pointer'));

    	if (isset($options['empty'])) {
    	    $options['after'] .= $this->Html->image('b_drop.png', array('id'=> $htmlAttributes['id']."_drop",'style'=>'cursor:pointer'));
    	}
            $output = $this->input($fieldName, $options);
            $output .= $this->Javascript->codeBlock("datepick('" . $htmlAttributes['id'] . "','01/01/" . $options['minYear'] . "','31/12/" . $options['maxYear'] . "');");
            return $output;
        }

    }

    ?>

5. Add .js and .css in templates, maybe in
$CAKE_PROJECT/app/views/layouts/default.ctp

::


    <?php
       echo $javascript->link(array('jquery.js',
    			'date.js',
    			'jquery.datePicker.js',
    			'cake.datePicker.js'
    			));

       echo $html->css(array(...'datePicker.css'...));
    ?>

6. Add helper in controller:

Controller Class:
`````````````````

::

    <?php
      var $helpers = array(...'DatePicker'...);
    ?>

7. Then we can replace in the viewers:

::


       echo $form->input('start_date');

for:

::


       echo $datePicker->picker('start_date');



Bonus Track
```````````
You can add the parameter "empty" if we are to leave the date to null.

::


       echo $datePicker->picker('end_date',array('empty'=>true));



.. _http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/styles/datePicker.css: http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/styles/datePicker.css
.. _http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/scripts/jquery.datePicker.js: http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/scripts/jquery.datePicker.js
.. _http://www.elibrary.dep.state.pa.us/images/small/calendar.png: http://www.elibrary.dep.state.pa.us/images/small/calendar.png
.. _http://www.ameibo.com/image/comment_cancel_icon.png: http://www.ameibo.com/image/comment_cancel_icon.png
.. _http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/: http://www.kelvinluck.com/assets/jquery/datePicker/v2/demo/
.. _http://github.com/vitch/jquery-methods/raw/master/date.js: http://github.com/vitch/jquery-methods/raw/master/date.js

.. author:: agusti
.. categories:: articles, helpers
.. tags:: helper,jquery,form,date,picker,date picker,Helpers

