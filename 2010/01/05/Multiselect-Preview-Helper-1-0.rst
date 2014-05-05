Multiselect Preview Helper 1.0
==============================

Immagine you want to provide your model centric add/edit form with
master/slave support (one to many or many to many models relation).
The simpliest way to avoid tedious embedded list with add/edit/delete
support or more complex Javascript/AJAX widgets is a multiple select
(automagically cake supported). Unfortunately this control is not
intuitive working with long items lists (whole selection is not always
visible), expecially for novice web users. Multiselect Preview Helper
provide Javascript based realtime list preview of the current
selection of the control.
Solution is "easy or die". Follow this 4 steps:

1) Copy Helper Class in /app/views/helpers/multiselect.php

Helper Class:
`````````````

::

    <?php 
    /**
     * Multiselect Preview Helper by Pietro Brignola.
     *
     * Provide realtime list preview of the selected items of a multiple select control.
     *
     * PHP versions 4 and 5
     *
     * Comments and bug reports welcome at pietro.brignola AT unipa DOT it
     *
     * Licensed under The MIT License
     *
     * @writtenby      Pietro Brignola
     * @lastmodified   Date: July 31, 2009
     * @license        http://www.opensource.org/licenses/mit-license.php The MIT License
     */
    class MultiselectHelper extends AppHelper {
    	
    	var $helpers = array('Html', 'Form');
    	
    	/**
    	 * Generates multiple select input element complete with realtime selection preview
    	 *
    	 * @param string $fieldName Model.Field (Model.Model) name (same as FormHelper::input() options param)
    	 * @param array $options Options array (same as FormHelper::input() options param)
    	 * @return string Completed multiple select input widget
    	 */
    	function display($fieldName, $options = array()) {
    		$items = MultiselectHelper::getSelectedItems($this->Form->input($fieldName, $options));
    		$label = '';
    		foreach($items as $item)
    			$label .= '<input type="checkbox" disabled checked/>'.$item.'<br/>';
    		$options['type'] = 'select';
    		$options['multiple'] = 'multiple';
    		$options['between'] = $this->Form->label($fieldName.'.Preview', $label, array('id' => $fieldName.'.Preview'));
    		$options['onchange'] = 'previewSelectedOptionsText(document.getElementById(this.id), document.getElementById("'.$fieldName.'.Preview"));';
    		return $this->output($this->Form->input($fieldName, $options));
    	}
    	
    	/**
    	 * Extract selected items array from html multiselect tag
    	 *
    	 * @param array Html multiselect tag
    	 * @return array Selected items array
    	 */
    	
    	private function getSelectedItems($html) {
    		$dom = new domDocument();
    		$dom->loadHTML($html);
    		$dom->preserveWhiteSpace = false;
    		$options = $dom->getElementsByTagname('option');
    		$items = array();
    		foreach($options as $option) {
    			if($option->hasAttribute('selected'))
    				$items[] = $option->nodeValue;
    		}
    		return $items;
    	}
    	
    }
    ?>

2) Copy Javascript Function in app/webroot/js/multiselect.js

Javascript Function
```````````````````

::

    
    function getSelectedOptionsText(object){
    	selected = new Array();
    	for (var i = 0; i < object.options.length; i++)
    		if (object.options[i].selected)
    			selected.push(object.options[i].text);
    	return selected;
    }
    
    function previewSelectedOptionsText(object, preview){
    	selected = getSelectedOptionsText(object);
    	label = "";
    	for (var i = 0; i < selected.length; i++)
    		label += "<input type = 'checkbox' disabled checked/>" + selected[i] + "<br/>";
    	document.getElementById(preview.id).innerHTML = label;
    }

3) Setup your controller

Controller Class:
`````````````````

::

    <?php 
    ...
    var $helpers = array(...,'Multiselect');
    ...
    ?>

4) Setup your view template

View Template:
``````````````

::

    
    <?php
    ...
    echo $multiselect->display('Model.Field', array('label' => '...', 'options' => ..., ... ));
    ...
    echo $javascript->link(array('multiselect'));
    ?>




enjoy ;-)
~~~~~~~~~



.. author:: pietro.brignola
.. categories:: articles, helpers
.. tags:: javascript,list,multiple,HABTM,select,preview,Helpers

