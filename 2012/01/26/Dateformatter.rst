Dateformatter
=============

Hi!, Im new on the bakery, this is my first article, I hope this will
be helpfull. This is a behaviors for dateformat, I was looking for
something like this, but I never could get one that indulge my needs.
so, here it goes. A simple Dateformat behaviors. (lo publique en
español tambien)

<?php class DateformatBehavior extends ModelBehavior {

::

    //Our  format
    var $dateFormat = 'd.m.Y';
    //datebase Format
    var $databaseFormat = 'Y-m-d';

    function setup(&$model) {
        $this->model = $model;
    }

    function _changeDateFormat($date = null,$dateFormat){
        return date($dateFormat, strtotime($date));
    }

    //This function search an array to get a date or datetime field.
    function _changeDate($queryDataConditions , $dateFormat){
        foreach($queryDataConditions as $key => $value){
            if(is_array($value)){
                $queryDataConditions[$key] = $this->_changeDate($value,$dateFormat);
            } else {
                $columns = $this->model->getColumnTypes();
                //sacamos las columnas que no queremos
                foreach($columns as $column => $type){
                    if(($type != 'date') && ($type != 'datetime')) unset($columns[$column]);
                }
                //we look for date or datetime fields on database model
                foreach($columns as $column => $type){
                    if(strstr($key,$column)){
                        if($type == 'datetime') $queryDataConditions[$key] = $this->_changeDateFormat($value,$dateFormat.' H:i:s ');
                        if($type == 'date') $queryDataConditions[$key] = $this->_changeDateFormat($value,$dateFormat);
                    }
                }

            }
        }
        return $queryDataConditions;
    }

    function beforeFind($model, $queryData){
        $queryData['conditions'] = $this->_changeDate($queryData['conditions'] , $this->databaseFormat);
        return $queryData;
    }

    function afterFind(&$model, $results){
        $results = $this->_changeDate($results, $this->dateFormat);
        return $results;
    }

    function beforeSave($model) {
        $model->data = $this->_changeDate($model->data, $this->databaseFormat);
        return true;
    }

} ?>



.. author:: rikkin
.. categories:: articles, behaviors
.. tags:: behaviors,date,change date,Dateformat,database date,Behaviors

