Yet Another JQuery AutoComplete Helper
======================================

I created this helper as an exercise to learn some more about JQuery
and CakePHP. Although there is an AutoComplete available in CakePHP,
it is in the Ajax helper which is deprecated. My version could use
some cleanup still, but I would like to think someone may find it
useful. Updated to handle multiple autocomplete's on one page. I had
to change the javascript to iterate through the autocomplete items and
then added a specific tag to the drop down list so they could find the
correct text input. Also prevented the js from being sourced twice
(maybe Cake does that internally?) and updated the CSS to attach to
the class and not the id.
Create auto_complete.php in view/helpers directory.

::

    
    <?php
    /*
     * Creates a text input field that triggers an autocomplete on keyup.
     * 
     * autocompleterequestitem = attribute equal to name of variable to send in ajax request
     * 		retrieve with $this->params['url']['yourvariable']
     * autocompleteurl = request url to get the autocomplete terms via getJSON
     * autocompletetext = attribute to identify the text input in jquery
     * update = id of div to receive autocomplete terms
     * 
     * Example:
     * 
     * View file:
     * 			echo $this->AutoComplete->input(
     *				'Term.name',
     *				array(
     *					'autoCompleteUrl'=>$this->Html->url( 
     *						array(
     *							'controller'=>'terms',
     *							'action'=>'auto_complete',
     *						)
     *					),
     *					'autoCompleteRequestItem'=>'autoCompleteText',
     *				)
     *			);
     *
     * Controller:
     * 
     * 	function auto_complete() {
     *		$terms = $this->Term->find('all', array(
     *			'conditions' => array(
     *				'Term.name LIKE' => $this->params['url']['autoCompleteText'].'%'
     *			),
     *			'fields' => array('name'),
     *			'limit' => 3,
     *			'recursive'=>-1,
     *		));
     *		$terms = Set::Extract($terms,'{n}.Term.name');
     *		$this->set('terms', $terms);
     *		$this->layout = 'ajax';	
     *	}
     *
     */
    	class AutoCompleteHelper extends AppHelper {
    		var $helpers = array('Html','Form');
    		
    	/**
    	 * Makes an input field with a helper
    	 * @author cmwoody
    	 *
    	 */
    		public $update='autoCompleteDiv';
    		public $scriptPath = 'views/helpers/auto_complete.js';
    		private $jsIncluded = false;
    		
    		function input($name, $options) {
    			#-- Identify the div to show the results
    			$baseOptions = array(
    				'update'=>$this->update,
    				'label'=>false,
    				'autoCompleteText'=>1,
    			);
    			$options = array_replace($baseOptions,$options);
    			$html = '';
    			
    			#-- Add the javascript
    			if(!$this->jsIncluded) {
    				$html .= $this->Html->script($this->scriptPath,array('inline'=>true));
    			}
    			$this->jsIncluded=true;
    			
    			#-- Return the html
    			$html .= $this->Form->input( $name, $options );
    			$html .= $this->Html->div('','',array('id'=>$options['update'],'class'=>'autoCompleteDiv'));
    			//debug($options['update']);
    			return $html;
    		}
    	}
    ?>

Create webroot/js/views/helpers/auto_complete.js, or any other
directory you would like but make sure to set the scriptPath in the
helper so it can include it.

::

    
    $(document).ready(function(){
    
    	// Get a ref to the update div, set minWidth to the text item
    	$('input[autoCompleteText]').each(function(){
    		
    		var updateDiv = '#'+$(this).attr('update');
    		$(updateDiv).css('minWidth',$(this).width());
    		var autoCompleteRequestItem = $(this).attr('autoCompleteRequestItem');
    		// Add a function to key up
    		$(this).bind('keyup', function(event){
    			// On escape key, hide the suggestions
    			if(event.keyCode==27) {
    				$(updateDiv).hide();
    			}else if($(this).val().length>0) {
    				// If a request is in process, return
    				if ( $(this).data('autoCompleteBusy') ) {
    					return;
    				}
    				// Don't send a request if we just did it
    				var lastVal = $(this).data('lastAutoComplete');
    				if(lastVal!=$(this).val()) {
    					// Set busy flag
    					$(this).data('autoCompleteBusy',true);
    					// Record the search term
    					$(this).data('lastAutoComplete',$(this).val());
    					// Call the function and get a JSON object
    					$.getJSON($(this).attr('autoCompleteUrl'),
    						autoCompleteRequestItem+"="+$(this).val(),
    			            function(itemList) {
    			              if(itemList !== null) {
    				            populateAutoComplete(itemList,updateDiv);
    			              } else {
    			            	$(updateDiv).hide();
    			              }
    			            }
    					);
    					// Remove busy flag
    					$(this).data('autoCompleteBusy',false);
    				}else{
    		        	$(updateDiv).show();
    				}
    			}else{
    	        	$(updateDiv).hide();
    			}
    		});
    	});
    	
    	function populateAutoComplete(itemList,updateDiv) {  
    		var tag = updateDiv.substring(1);
    		// Build a list of links from the terms, set href equal to the term
    		var options = '';
    		$.each(itemList, function(index, name) {
    			  options += '<a autoCompleteItem='+tag+' href="'+name+'" >' +  name + '</a>';
    			});
    		// Show them or hide div if nothing to show
    		if(options!=''){
    			$(updateDiv).html(options);
    			$(updateDiv).show();
    		} else {
    			$(updateDiv).hide();
    		}
    		// Attach a function to click to transfer value to the text box
    		$('a[autoCompleteItem='+tag+']').click(function(){
    			$('input[update='+tag+']').val( $(this).attr('href'));
    			$('input[update='+tag+']').focus();
    			return false;
    		});
    	}
    });

Add some markup to your app css file

::

    
    .autoCompleteDiv    {
         position: absolute;
         border: 1px solid #888;
         margin: 0px;
         padding: 2px;
         display: none;
         background: white;
    }
    .autoCompleteDiv a:hover {
    	background: none;
    	background-color: darkblue;
    	color: white;
    	font-weight: normal;
    }
    .autoCompleteDiv a {
    	background: none;
    	background-color: white;
    	color: black;
    	text-decoration: none;
    	padding: 2px;
    	margin: 0px;
    	display: block;
    }

Now in your view file where you want to have an auto complete text
field, replace the call to the Html helper with the AutoComplete
helper (make sure you add it to your $helpers array, along with
JQuery)

::

    
    <?php 
    echo $this->AutoComplete->input(
    	'Term.name',
    	array(
    		'autoCompleteUrl'=>$this->Html->url( 
    			array(
    				'controller'=>'terms',
    				'action'=>'auto_complete',
    			)
    		),
    		'autoCompleteRequestItem'=>'autoCompleteText',
    	)
    );
    ?>

The option autoCompleteUrl is the action that will be requested to get
the auto complete terms. The option autoCompleteRequestItem is the
name of the variable that will be passed to that action in the ajax
request. To process the request, add this to the appropriate
controller:

::

    
    	function auto_complete() {
    		$terms = $this->Term->find('all', array(
    			'conditions' => array(
    				'Term.name LIKE' => $this->params['url']['autoCompleteText'].'%'
    			),
    			'fields' => array('name'),
    			'limit' => 3,
    			'recursive'=>-1,
    		));
    		$terms = Set::Extract($terms,'{n}.Term.name');
    		$this->set('terms', $terms);
    		$this->layout = 'ajax';	
    	}

This function receives the request and the partial text used in the
search. The search is performed and then returned as a JSON object
using a view. Create this view file to send the data, in this case
'auto_complete.ctp'

::

    
    <?php
      if(isset($terms)) {
        echo $this->Js->object($terms);
      }
    ?>

Now you should have a text field and if you type a letter a div should
appear with the results found by the action in your controller. If you
select one, it will be copied to the text field and you may press
enter to submit your form. If you press Escape, the div disappears.

On my to-do list would be to include the js and css in the same file,
add some scroll bars to the div so there can be more items shown than
selected.


.. author:: Matt
.. categories:: articles, helpers
.. tags:: helper,autocomplete,jquery,Helpers

