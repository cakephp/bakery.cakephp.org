Form Helper: Enum Fields to Select Boxes
========================================

This Form Helper extension chooses select boxes as input fields for
enumeration database fields automatically.
Create a new file "form2.php" in app/views/helpers and insert the
following code:

Helper Class:
`````````````

::

    <?php
    class Form2Helper extends FormHelper
    {
        function input($fieldName, $options = array()) {
            $this->setEntity($fieldName);

            $modelKey = $this->model();
            $fieldKey = $this->field();

            if (!isset($this->fieldset[$modelKey])) {
                $this->_introspectModel($modelKey);
            }

            if ((!isset($options['type']) || $options['type'] == 'select') && !isset($options['options'])) {
                if(isset($this->fieldset[$modelKey]['fields'][$fieldKey]))
                {
                    $type = $this->fieldset[$modelKey]['fields'][$fieldKey]['type'];
                    if(substr($type, 0, 4) == 'enum')
                    {
                        $arr = explode('\'', $type);
                        $enumValues = array();
                        foreach($arr as $value)
                        {
                            if($value != 'enum(' && $value != ',' && $value != ')')
                                $options['options'][$value] = __($value, true);
                        }
                    }
                }
            }

            return parent::input($fieldName, $options);
        }
    }
    ?>

In the controller replace "Form" in $helpers array with "Form2":

Controller Class:
`````````````````

::

    <?php
    class AppController extends Controller {
          var $helpers = array('Form2');
    }
    ?>

in view use $this->Form2 instead of $this->Form:

View Template:
``````````````

::


    $this->Form2->create('User'); // it's important to use Form2 for creating a form
    $this->Form2->input('User.gender');
    $this->Form2->end('edit gender');

If User.gender is a enum, for example enum('male,female'), Form2 will
create a select box. If you also want to show the empty value in
select box use:

View Template:
``````````````

::


    $this->Form2->input('User.gender', array('empty' => true));




.. author:: christian.kilb
.. categories:: articles, helpers
.. tags:: sql,helper,enum,mysql,form,enumeration,form helper,enums,enumerations,Helpers

