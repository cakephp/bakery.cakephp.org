Datetime formatter behavior
===========================

Taking the idea from previous post, I have made a Behavior that
formats date and datetime fields.

I took the idea from Rikkin post:`http://bakery.cakephp.org/articles/rikkin/2012/01/26/formatos_de_fechas`_

Give thanks to him, I only put his idea into a behavior.

Here's the code: (pasted here: `http://bin.cakephp.org/saved/72238)`_

::

    <?php

    class DatetimeFormatterBehavior extends ModelBehavior {

        private $__defaultSettings = array(
            'date_format' => '%d/%m/%Y',
            'date_suffix' => '_d',
            'datetime_suffix' => '_dt',
            'datetime_format' => '%d/%m/%Y %H:%i:%s',
            'fields' => true,
        );

        function setup(&$model, $config = array()) {
            $this->settings[$model->alias] = $config + $this->__defaultSettings;
            $this->addDefaultVirtualFields($model);
        }

        function addDefaultVirtualFields($model) {
            extract($this->settings[$model->alias], EXTR_SKIP);
            $colTypes = $model->getColumnTypes();
            foreach($colTypes as $field => $type){
                if($fields === true || in_array($field, $fields)){
                    if($type === 'date' || $type === 'datetime'){
                        $model->virtualFields[$field . $date_suffix] = "date_format($model->alias.$field, '" . $date_format . "')";
                        $model->virtualFields[$field . $datetime_suffix] = "date_format($model->alias.$field, '" . $datetime_format . "')";
                    }
                }
            }
        }

    }

    // Usage:
    class User extends AppModel {

        var $actsAs = array('DatetimeFormatter');

    }

    // Test (take a look to output):
    debug($this->User->find('first'));




.. _http://bakery.cakephp.org/articles/rikkin/2012/01/26/formatos_de_fechas: http://bakery.cakephp.org/articles/rikkin/2012/01/26/formatos_de_fechas
.. _http://bin.cakephp.org/saved/72238): http://bin.cakephp.org/saved/72238)

.. author:: adael
.. categories:: articles
.. tags:: behaviors,Articles

