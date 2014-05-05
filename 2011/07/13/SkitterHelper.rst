SkitterHelper
=============

Place the Skitter Slideshow in his CakePHP with this simple helper!

See the work: `http://thiagosf.net/projects/cakephp/skitter_helper/`_
Download the files: `skitter_helper.zip`_


How to use?
-----------

Download the files here and unzip the corresponding directories.
Follow the steps below to install the Helper.


1) controllers/app_controller.php
---------------------------------

Add the helper in your Controller.
`<?php
classAppControllerextendsController
{
var$helpers=array(
'Skitter'
);
}
?>`

2) views/helpers/skitter.php
----------------------------

Unzip the class SkitterHelper.


3) views/layouts/default.ctp
----------------------------

Add the files needed to run the plugin by adding
$skitter->includeFiles(); inside header.

    <!DOCTYPEhtml>
    <html>
    <head>
    <title>SkitterHelper</title>
    <?php

    echo$html->css('styles');
    echo$javascript->link('jquery-1.5.2.min');
    echo$skitter->includeFiles();

    ?>
    </head>


3) Your View
------------

Below is an example of how to use the Helper in his View::

    <?php

    //Slides
    $slides=array(
    array(
    'image'=>'slides/001.jpg',
    'link'=>'#link1',
    'label'=>'Label1',
    'animation'=>'cubeJelly',
    ),
    array(
    'image'=>'slides/002.jpg',
    'link'=>'#link2',
    'label'=>'Label2',
    'animation'=>'paralell',
    ),
    array(
    'image'=>'slides/003.jpg',
    'link'=>'#link3',
    'label'=>'Label3',
    'animation'=>'fade',
    ),
    array(
    'image'=>'slides/004.jpg',
    'link'=>'#link4',
    'label'=>'Label4',
    'animation'=>'blindHeight',
    ),
    );

    //Configurationskitter
    $skitter->setConfig(array(
    'class'=>'box_skitter_large',
    'dots'=>true,
    'hideTools'=>true,
    'show_randomly'=>true,
    'animateNumberOver'=>'{backgroundColor:\'#999\',color:\'#fff\'}',
    'animateNumberActive'=>'{backgroundColor:\'#004499\',color:\'#fff\'}',
    ));

    //Displayskitter
    echo$skitter->display($slides);

    ?>


SkitterHelper
-------------

::

    <?php

    /**
    *SkitterHelper
    *
    *Skitter-Slideshowforanytime!
    *
    *@descriptionSlideshow
    *@authorThiagoSilvaFerreira-http://thiagosf.net
    *@version1.0
    *@dateJuly12,2011
    *@copyright(c)2011ThiagoSilvaFerreira-http://thiagosf.net
    *@licenseDuallicensedundertheMITorGPLVersion2licenses
    *@examplehttp://thiagosf.net/projects/jquery/skitter/
    *
    */
    classSkitterHelperextendsAppHelper
    {
    /**
    *Helpers
    */
    public$helpers=array(
    'Html',
    'Javascript',
    );

    /**
    *Configuration
    */
    private$config=array();

    /**
    *Validoptions
    */
    private$map=array(
    'velocity'=>'number',
    'interval'=>'number',
    'animation'=>'string',
    'numbers'=>'boolean',
    'navigation'=>'boolean',
    'label'=>'boolean',
    'easing_default'=>'string',
    'animateNumberOut'=>'json',
    'animateNumberOver'=>'json',
    'animateNumberActive'=>'json',
    'thumbs'=>'boolean',
    'hideTools'=>'boolean',
    'fullscreen'=>'boolean',
    'xml'=>'string',
    'dots'=>'boolean',
    'width_label'=>'string',
    'show_randomly'=>'boolean',
    );

    /**
    *Includefiles
    */
    functionincludeFiles(){
    //JSFiles
    $out='';
    //$out.=$this->Javascript->link('jquery-1.5.2.min');
    $out.=$this->Javascript->link('jquery.animate-colors-min');
    $out.=$this->Javascript->link('jquery.easing.1.3');
    $out.=$this->Javascript->link('jquery.skitter.min');

    //CSSTheme
    $out.=$this->Html->css('skitter.styles');

    return$out;
    }

    /**
    *Displayslideshow
    *
    *@param$slidesarrayArraywithslides
    *
    *Example:
    *
    *array(
    *array(
    *'image'=>'path/image.jpg',//Pathimage
    *'link'=>'#link',//Link(optional)
    *'label'=>'Label',//Label(optional)
    *'animation'=>'paralell',//Animation(optional)
    *),
    *);
    *
    */
    publicfunctiondisplay($slides=array()){
    if(!empty($slides)){

    $class=(isset($this->config['class'])?''.$this->config['class']:'');
    $options=$this->_getOptions();

    $js=$this->Javascript->codeBlock('
    $(document).ready(function(){
    $(".box_skitter").skitter('.$options.');
    });
    ');

    $out=$js;
    $out.='<divid="cake_skitter"class="box_skitter'.$class.'">';
    $out.='<ul>';

    foreach($slidesas$slide){
    $animation=(isset($slide['animation'])?$slide['animation']:'');
    $image=$this->Html->image($slide['image'],array('class'=>$animation));
    $label=null;

    if(!empty($slide['link'])){
    $image=$this->Html->link($image,$slide['link'],array('escape'=>false))
    ;
    }

    if(!empty($slide['label'])){
    $label=sprintf('<divclass="label_text"><p>%s</p></div>',$slide['label'
    ]);
    }

    $out.=sprintf('<li>%s%s</li>',$image,$label);
    }

    $out.='</ul>';
    $out.='</div>';

    return$out;
    }
    }

    /**
    *Configuration
    *
    *@param$configarraySkitteroptionssetup
    */
    publicfunctionsetConfig($config=array()){
    $this->config=$config;
    }

    /**
    *Options
    */
    privatefunction_getOptions(){
    if(!empty($this->config)){
    $block=array('class');
    $out=array();
    foreach($this->configas$key=>$value){
    if(!in_array($key,$block)&&isset($this->map[$key])){
    $out[]=$key.':'.$this->_getValue($key,$value);
    }
    }
    $out='{'.implode(',',$out).'}';
    return$out;
    }
    }

    /**
    *Getvalueformated
    *
    *@param$keystringNameoption
    *@param$valuestringValueoption
    */
    privatefunction_getValue($key,$value){
    $type=isset($this->map[$key])?$this->map[$key]:'string';
    switch($type){
    case'string':$value='"'.$value.'"';break;
    case'boolean':$value=(($value)?'true':false);break;
    }
    return$value;
    }
    }

    ?>


.. _http://thiagosf.net/projects/cakephp/skitter_helper/: http://thiagosf.net/projects/cakephp/skitter_helper/
.. _skitter_helper.zip: http://thiagosf.net/projects/cakephp/skitter_helper/download/skitter_helper.zip

.. author:: thiagosf
.. categories:: articles, helpers
.. tags:: image gallery,slideshow,slides,Helpers

