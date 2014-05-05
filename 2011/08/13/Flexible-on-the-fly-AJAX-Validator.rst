Flexible on-the-fly AJAX Validator
==================================

This article shows how to implement a generic and easy to use AJAX
validator, which uses the regular model validation rules and works on-
the-fly. It doesn't require even to touch a model. This article
assumes that you are using jQuery. You don't have to set validation
rules for the validated fields, but if you have not, the validation
will always succeed. For this purpose, we'll make use of - an
additional helper AjaxValidator - an additional helper ExtendedForm -
an additional component AjaxValidator - one entry in the routing table
- one additional js-file - app_controller - if you wish, configuration
using Configure() - if you wish, css-files Note: I have encountered
side-effects in conjunction with the Analogue-Plugin, therefore I
don't map ExtendedForm to Form. Thus, you have to switch to
ExtendedForm as a Helper - there's no mapping layer.
Let's begin with the ExtendedForm helper. It's basically a child of
the well-known Form-Helper and inherits from it too - it just modifies
the input-method to enable an intuitive way of enabling AJAX-
Validation. (I only needed the input-method, if you need specific
field types, just port the method)

views/helpers/extended_form.php

::


    <?php

       App::import('Helper', 'Form');
      class ExtendedFormHelper extends FormHelper{

        var $helpers = array('AjaxValidator', 'Html');

        /**
         * Add Ajax-Validator flag to options of FormHelper->input
         */
        public function input($fieldName, $options = array()){
          $ret = $this->_convFieldName($fieldName);

          if(isset($options['ajaxValidation']) && $options['ajaxValidation']){
            //Define which messages to show
            if(!ctype_alpha($options['ajaxValidation'])){
              $state = "all";
            }
            else{
              $state =  $options['ajaxValidation'];
            }

            $options['after'] = $this->AjaxValidator->MessageField($ret['model'], $ret['singleFieldName'], $state) . @$options['after'];
          }


          $regular_return =  parent::input($fieldName, $options);

          return $regular_return;
        }

        /**
         *  Convert given Fieldname to internal representation
         *  e.g. "name" => "UserName"
         */
        protected function _convFieldName($field){
          $model = $fieldName = "";

          //If explicit notation is used
          if($point = strpos($field, ".")){
            $model = substr($field, 0, $point);
            $fieldName = substr($field, $point+1);
          }
          else{
            $model = $this->model();
            $fieldName = $field;
          }
          $singleField = Inflector::camelize($fieldName);

          $fieldName = $model.Inflector::camelize($fieldName);

          return array('camelFieldName' => $fieldName, 'model' => $model, 'singleFieldName' => $singleField);
        }

      }
    ?>

As you can see above, the form helper only adds an extra option to the
$options-Array to enable AJAX validation for the field.

ajaxValidation can have several values:
- true => enable ajaxValidation, show result in every case
- false => disalbe ajaxValidation
- "all" => default, enables and shows result in every case
- "valid" => enables, result is only shown if input is valid
- "invalid" => enables, result is only shown if input is invalid
- "none" => enables, but result is shown in no case (whoever needs
this ;-P)

As you can see, the real logic is in AjaxValidator Helper, so let's
take a look at him now:

/views/helpers/ajax_validator.php

::


    <?php

      class AjaxValidatorHelper extends AppHelper{

        var $helpers = array('Html', 'Js');

        /**
         * Returns the HTML-Code for the container of the ajax-messages.
         * These containers are completely maintained by the helper
         * @param string  the name of the model, camelCased
         * @param string  camelcased Fieldname
         * @param string  states when to show message (default: "all" => all states)
         */
        function MessageField($model, $field, $show = "all"){

          //Add the AJAX-functionality
          $this->Html->script('ajax_validator', array('inline' => false));

          $jsField = $model.$field; //CakePHP Naming convention

          $ajaxRequest =    $this->Js->request(
                          array(
                          'controller' => Inflector::pluralize($model),
                          'action' => 'is'.$field.'Valid'),
                          array(
                            'success' => 'generateFieldValid("'.$jsField.'", "'.$show.'")(data)',
                            'data' => '{value: $("#'.$jsField.'").val() }' ,
                            'dataExpression' => true
                          )
                        );
          $this->Js->buffer($this->Js->get('#'.$jsField)->event('blur', $ajaxRequest));

          //Hide all fields initially
          $this->Js->buffer('$(document).ready( function(){
                  $(\'#ajax'.$jsField.'\').hide();
                    }
                );');



          return $this->Html->tag('span', '', array('class' => 'ajax_return', 'id' => 'ajax'.$jsField));
        }

    }



    ?>

As you can see, there's nothing special in this helper.

What ensues, is the js-helper, which displays the result of the
validation:
/webroot/js/ajax_validator.js

::


    /**
     *  Generates a callback for the given field to handle the validation ajax-request answer
     *  showOnly    set this to "valid" or "invalid" to only show the message if the specified state occurs
     */
    /**
     * @param   string  the Field to be updated
     * @param   string  the state for which to show the result. psosible: "all", "valid", "invalid" or "none"
     */
    function generateFieldValid(passedField, showOnly){
      var field = passedField;

      return function(response){
        var localField = field;
        var show = showOnly;

        var res = JSON.parse(response);

        var elementName = '#ajax'+localField;

        //check showOnly
        if(_showOnlyDecision(show, res.valid)){


          var div = $(elementName).get(0);

          div.innerHTML = '';

          var img = document.createElement('img');
          img.setAttribute("src", "../img/icons/"+res.icon);

          div.appendChild(img);
          div.appendChild( document.createTextNode(" "+res.message));

          div.setAttribute('class', res.style + " ajax_return");

          $(elementName).fadeIn();

          //now change class of the input element itself
          $('#'+localField).addClass(res.style);
        }
        else{
          $(elementName).fadeOut();
        }

      }
    }

    /**
     * Aid function to decide whether to show the field
     * param-types: string, bool
     */
    function _showOnlyDecision(setting, state){
      state = state ? 'valid' : 'invalid';
      if(setting == "all" || setting == state) return true;
      return false;
    }

You may want to change the path of the images from /img/icons to
something else
Don't forget to add this script where you need the validation.

Now we're already finished with the "client"-part of the feature.

To get the serverside validation to work, let's begin with the
routing:
config/routes.php

::


    <?php
    //Special validation rules for AjaxValidaton
    	Router::connect(
        '/:controller/is:fieldValid/*',
        array('action' => 'validateField'),
             array(
              'pass'  => array('field'),
              'field' => "(.*)"
             )
      );
    ?>

This will route any requests of scheme "/users/isNameValid/" to
validateField. This method will be placed directly in app_controller,
so you don't have to touch each controller.

/app_controller.php

::


    <?php
    class AppController extends Controller{

    // add component if we want to use it...
    var $components = array(
          'ajaxValidator',
          );

    // If you don't choose ajax if necessary anywhere else, do it inhere
    public function beforeFilter(){

        //If request is ajax, choose ajax-layout without header and so on
        if($this->RequestHandler->isAjax()){
          $this->layout = 'ajax';
        }

        parent::beforeFilter();
      }

    //That's enough.
    public function validateField(){
          $this->ajaxValidator->validateField($this);
      }
    ?>

The core of the hole thing is the AjaxValidatorComponent:
/controllers/components/ajax_validator.php

::


    <?php

    class AjaxValidatorComponent extends Object {

        /**
         *  If Auth-Component is loaded, allow ajax validation
         * @param Controller $controller
         * @param array $settings
         */
        public function initialize(&$controller, $settings = array()) {
            //Check if Auth is active
            if (array_key_exists('Auth', $controller->components) || in_array('Auth', $controller->components)) {
                $controller->Auth->allow('validateField');
            }
        }

        /**
         * Automatically validates field
         * @param Controller $controller
         */
        function startup($controller) {}

        /**
         *  Validates against model-defined validation rules
         * @param Controller $controller
         * @return string   json-encoded validation result
         */
        function validateField($controller) {
            $controller->layout = 'ajax';
            $value = $controller->params['url']['value'];

            //First, retrieve own class name ;)
            $originalClassName = get_class($controller);

            //Remove 'Controller'
            preg_match('/^(.*)Controller$/i', $originalClassName, $matches);
            $className = Inflector::singularize($matches[1]);

            //Get Values from URL
            if (preg_match('/.*\/is(.*)Valid\/?/i', $controller->params['url']['url'], $matches)) {
                $field = $matches[1];  // Fieldname

                $lower_field = Inflector::underscore($field);

                //Proceed only if there's such a field in the current model
                if ($controller->{$className}->hasField($lower_field)) {
                    //Ok - proceed real validation
                    $ret = array(
                        'check' => 'is' . $field . 'Valid'
                    );
                    $controller->data[$className][$lower_field] = $value;
                    $controller->{$className}->set($controller->data);

                    $condition = array();

                    if (!$controller->{$className}->validates(array('fieldList' => $lower_field))) {
                        $condition['valid'] = false;
                        $errors = $controller->{$className}->invalidFields();
                        $condition['message'] = __($errors[$lower_field], true);
                        $this->_isValidMeta($ret, $field, $condition);
                    } else {
                        $this->_isValidMeta($ret, $field, array('valid' => true));
                    }
                } else {
                    $condition = array('valid' => false, 'message' => __('Invalid field', true));
                    $this->_isValidMeta($ret, $field, $condition);
                }
            } else {
                // Could not retrieve field from URL => invalid request
                $condition = array('valid' => false, 'message' => __('Invalid request (could not retrieve field)', true));
                $this->_isValidMeta($ret, __('unknown', true), $condition);
            }

            $controller->set('ajax_return', $ret);

            return $controller->render('', '', VIEWS . 'ajaxValidator/ajax.ctp');
        }


        /**
         *  generic helper function for generating error-/successmessages
         * @param &array $ret    Return message to complete
         * @param string $field  Name of the field being validated
         * @param [array] $condition overwrite defaults of the message
         */
        function _isValidMeta(&$ret, $field, $condition = array("valid" => true, "message" => NULL)) {
            if ($condition['valid']) {
                $ret['message'] = $field." ".__(' is valid', true);
                $ret['icon'] = Configure::read('Icons.Success');
                $ret['style'] = Configure::read('Ajax.SuccessStyle');
            } else {
                $ret['message'] = $field." ".__('is invalid', true);
                $ret['icon'] = Configure::read('Icons.Error');
                $ret['style'] = Configure::read('Ajax.ErrorStyle');
            }

            // If message given - overwrite
            if (isset($condition['message']))
                $ret['message'] = $condition['message'];

            $ret['valid'] = $condition['valid'];
        }

    }

    ?>

And of course, the associated view:

views/ajaxValidator/ajax.ctp

::


    <?= json_encode($ajax_return) ?>


As you can see, the component uses Configure() to obtain some classes
and images. So give hime some:

/config/someconfig.php

::


    <?php
    $config['Icons']['Success'] = 'accept.png';
    $config['Ajax']['SuccessStyle'] = 'ajax_success';
    $config['Icons']['Error']   = 'exclamation.png';
    $config['Ajax']['ErrorStyle'] = 'ajax_error';
    ?>

I load the config using bootstrap.php, but you can also narrow the use
of this config down to specific controllers if you wish:

config/bootstrap.php

::


     Configure::load('someconfig');

In the end, add some graphical amenities:
/webroot/css/some.css

::


    .ajax_return{
      margin-left:1%;

      font-size: large;

      padding-left: 1%;
      padding-right: 1%;
      border-radius: 5px;
    }


    .ajax_success{
      color: green;
      background-color: rgb(204,255,204);
      border: 1px solid rgb(0,204,0);
    }

    .ajax_error{
      color: red;
      background-color: rgb(255,204,255);
      border: 1px solid rgb(255,0,0);
    }

    input.ajax_error{
      border:1px solid red;
    }

    input.ajax_success{
      border: 1px solid green;
      color:black;
    }


Now the feature is ready to use:

::


    echo $this->ExtendedForm->input('Profile.first_name', array('ajaxValidation'=> true));

(You don't need to write fully-qualifed fieldname identifiers if it's
your main model in this form)

It's not that this feature is incredible special, complex or
necessary. It's just that I liked that way of generic on-the-fly
validation. Once added, this feature will serve for all models and all
fields of your application without extra configuration.

If there are any suggestions, critism and so on, don't be shy.



.. author:: dispy
.. categories:: articles, tutorials
.. tags:: php,AJAX,CakePHP,validation,form helper,generic,on the fly,Tutorials

