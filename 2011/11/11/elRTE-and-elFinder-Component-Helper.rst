elRTE and elFinder Component + Helper
=====================================

Integrate elRTE and elFinder to cakephp 1.3 http://elrte.org/ - Text
editor http://elrte.org/elfinder - File manager
1- Download the content from http://elrte.org/ and put it in your js
public folder /js/elrte/ and css also. Do the same for elFinder. 2 -
Create in your public folder one folder called public_upload 3 - Put
the class elFinder.class.php in vendor dir.

Helper
======

::

    <?php
    classCkHelperextendsHelper{

    var$helpers=Array('Html','Javascript');

    functionloadLibs(){
    return$this->Html->css("elfinder/elfinder.css").$this->Html->script("e
    lfinder/elfinder.min.js",array("inline"=>false)).$this->Html->script("
    elfinder/elfinder.pt_BR",array("inline"=>false)).$this->Html->script("
    elrte/elrte.min",array("inline"=>false)).$this->Html->script("elrte/el
    rte.pt_BR",array("inline"=>false)).$this->Html->css("elrte/elrte.min.c
    ss");
    }

    functionload($id){
    $did='';
    foreach(explode('.',$id)as$v){
    $did.=ucfirst($v);
    }

    $code="$(document).ready(function(){
    varopts={
    cssClass:'el-rte',
    lang:'pt_BR',
    height:280,
    toolbar:'complete',
    fmOpen:function(callback){
    $('<divid=\"myelfinder\"/>').elfinder({
    url:'".$this->Html->url(array("controller"=>"editor","action"=>"load_e
    ditor"))."',
    lang:'pt_BR',
    dialog:{width:800,modal:true,title:'Gerenciadordearquivos'},//openindi
    alogwindow
    closeOnEditorCallback:true,//closeafterfileselect
    editorCallback:callback//passcallbacktofilemanager
    });
    }
    //cssfiles:['css/elrte-inner.css']
    }
    $('#".$did."').elrte(opts);
    });";
    return$this->Html->scriptBlock($code,array("inline"=>false));
    }
    }
    ?>


Component
=========

::

    <?php
    classEditorComponentextendsObject{

    /*Carregaoeditornamemória*/
    functionloadEditor($user=null,$options=array())
    {
    App::import("Vendor","elFinder",array('file'=>'elfinder'.DS.'elFinder.
    class.php'));

    if(!is_dir(ROOT.DS.WEBROOT_DIR.DS."public_upload".DS.(!empty($user)?$u
    ser.DS:"")))
    {mkdir(ROOT.DS.WEBROOT_DIR.DS."public_upload".DS.(!empty($user)?$user.
    DS:""));}
    $opts=array(
    'root'=>ROOT.DS.WEBROOT_DIR.DS."public_upload".DS.(!empty($user)?$user
    .DS:""),//pathtorootdirectory
    'URL'=>WWW_ROOT."/public_upload/".(!empty($user)?$user."/":""),//rootd
    irectoryURL
    'rootAlias'=>'Principal',//displaythisinsteadofrootdirectoryname
    //'uploadAllow'=>array('images/*'),
    //'uploadDeny'=>array('all'),
    //'uploadOrder'=>'deny,allow'
    //'disabled'=>array(),//listofnotallowedcommands
    //'dotFiles'=>false,//displaydotfiles
    //'dirSize'=>true,//counttotaldirectoriessizes
    //'fileMode'=>0666,//newfilesmode
    //'dirMode'=>0777,//newfoldersmode
    //'mimeDetect'=>'internal',//filesmimetypesdetectionmethod(finfo,mime_
    content_type,linux(file-ib),bsd(file-Ib),internal(byextensions))
    //'uploadAllow'=>array(),//mimetypeswhichallowedtoupload
    //'uploadDeny'=>array(),//mimetypeswhichnotallowedtoupload
    //'uploadOrder'=>'deny,allow',//ordertoproccessuploadAllowanduploadAll
    owoptions
    //'imgLib'=>'mogrify',//imagemanipulationlibrary(imagick,mogrify,gd)
    //'tmbDir'=>'.tmb',//directorynameforimagethumbnails.Setto""toavoidthu
    mbnailsgeneration
    //'tmbCleanProb'=>1,//howfrequientlycleanthumbnailsdir(0-never,100-eve
    ryinitrequest)
    //'tmbAtOnce'=>5,//numberofthumbnailstogenerateperrequest
    //'tmbSize'=>48,//imagesthumbnailssize(px)
    //'fileURL'=>true,//displayfileURLin"getinfo"
    //'dateFormat'=>'jMYH:i',//filemodificationdateformat
    //'logger'=>null,//objectlogger
    //'defaults'=>array(//defaultpermisions
    //'read'=>true,
    //'write'=>true,
    //'rm'=>true
    //),
    //'perms'=>array(),//individualfolders/filespermisions
    //'debug'=>true,//senddebugtoclient
    //'archiveMimes'=>array(),//allowedarchive'smimetypestocreate.Leaveemp
    tyforallavailabletypes.
    //'archivers'=>array()//infoaboutarchiverstouse.Seeexamplebelow.Leavee
    mptyforautodetect
    //'archivers'=>array(
    //'create'=>array(
    //'application/x-gzip'=>array(
    //'cmd'=>'tar',
    //'argc'=>'-czf',
    //'ext'=>'tar.gz'
    //)
    //),
    //'extract'=>array(
    //'application/x-gzip'=>array(
    //'cmd'=>'tar',
    //'argc'=>'-xzf',
    //'ext'=>'tar.gz'
    //),
    //'application/x-bzip2'=>array(
    //'cmd'=>'tar',
    //'argc'=>'-xjf',
    //'ext'=>'tar.bz'
    //)
    //)
    //)
    );

    $opts=array_merge($opts,$options);

    $fm=newelFinder($opts);
    $fm->run();
    }
    }
    ?>


In your controller
==================

::

    <?php

    classEditorControllerextendsAppController{
    var$name="Editor";
    var$components=array("Auth","Editor");

    functionload_editor()
    {
    $this->layout="ajax";

    if($this->is_admin())
    {$this->Editor->loadEditor();}//Forallusersdirs
    else
    {$this->Editor->loadEditor($this->Auth->user("login"));}//Tousewithuse
    rs
    }
    }
    ?>


In your views
=============

::

    <?=$ck->loadLibs()?>

    <?=$form->label("TextEditor<br/>").$form->textarea("text_editor",array
    ('cols'=>'60','rows'=>'3',"size"=>"20")).$ck->load("Model.text_editor"
    );?>



.. author:: eliasfa
.. categories:: articles, components
.. tags:: cakephp elRTE elFinder compone,Components

