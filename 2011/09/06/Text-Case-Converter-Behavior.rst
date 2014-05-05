Text Case Converter Behavior
============================

This behavior is designed to convert text to all capital letters,
lower case or with the first letter capitalized words, having the
option for Brazilians in proper names ("Do", "Dos," "Da," "Das", "De
") for ("do","dos","da","das","de"), example: "João da Silva".


Usage
-----

::

    <?php
    //UpperCase
    classPostextendsAppModel{
    var$actsAs=array('DataCase'=>array('author'=>'upper'));
    }
    ?>

    <?php
    //LowerCase
    classPostextendsAppModel{
    var$actsAs=array('DataCase'=>array('author'=>'lower'));
    }
    ?>

    <?php
    //Firstwordsuppercase
    classPostextendsAppModel{
    var$actsAs=array('DataCase'=>array('author'=>'first'));
    }
    ?>

    <?php
    //Braziliannames
    classPostextendsAppModel{
    var$actsAs=array('DataCase'=>array('author'=>array('first','BR')));
    }
    ?>


Behavior
--------

::

    <?php
    /**
    *Converttextcasefieldsbeforesavetherecord
    *
    *@authorEliasFarah
    *@creditsLuizFernandoColombelliAlbuquerque
    *@creditsRinaldoBelisárioJúnior
    *@creditsCEJAM-http://www.saudeprev.com.br
    */
    classDataCaseBehaviorextendsModelBehavior{

    var$settings=array();

    functionsetup(&$model,$settings){
    $this->settings[$model->alias]=(array)$settings;
    }

    /**
    *Functionwhichconvertsthetexttospecifiedcase
    *@paramarray$datadataarrayfromandtodatabase
    *@returnarrayconvertedarray;
    *@accessrestricted
    */
    function_convertCase(&$model,$data){
    foreach($dataas$dado)
    {
    foreach($this->settings[$model->alias]as$field=>$type)
    {
    $language="";
    if(is_array($type))
    {
    $language=$type[1];
    $type=$type[0];
    }

    if($type=="upper")
    {$data[$model->alias][$field]=mb_strtoupper($data[$model->alias][$fiel
    d],'UTF-8');}
    elseif($type=="lower")
    {$data[$model->alias][$field]=mb_strtolower($data[$model->alias][$fiel
    d],'UTF-8');}
    elseif($type=="first")
    {
    $data[$model->alias][$field]=mb_convert_case($data[$model->alias][$fie
    ld],MB_CASE_TITLE,"UTF-8");

    //UsinginBraziliannames
    if($language=="BR")
    {
    $data[$model->alias][$field]=str_replace("Do","do",$data[$model->alias
    ][$field]);
    $data[$model->alias][$field]=str_replace("Dos","dos",$data[$model->ali
    as][$field]);
    $data[$model->alias][$field]=str_replace("Da","da",$data[$model->alias
    ][$field]);
    $data[$model->alias][$field]=str_replace("Das","das",$data[$model->ali
    as][$field]);
    $data[$model->alias][$field]=str_replace("De","de",$data[$model->alias
    ][$field]);
    }
    }
    }
    }
    return$data;
    }

    //Functionbeforesave.
    functionbeforeSave($model){
    $model->data=$this->_convertCase(&$model,$model->data);//directionisfr
    ominterfacetodatabase
    returntrue;
    }
    }
    ?>



.. author:: eliasfa
.. categories:: articles
.. tags:: text,behavior,lower,upper,Articles

