Adding a TinyMCE image browser to CakePHP 2.+
=============================================

This is just and update to `Adding a TinyMCE image browser the CakePHP
way`_ as applicable to the 2.+ versions of Cake. Nothing major, just
following with the api changes to make this work smoothly.
Here is the updated Model code: `
<?php
App::uses('Folder','Utility');
App::uses('File','Utility');

classImageuploadextendsAppModel{

var$name='Imageupload';

var$validate=array(
'imageupload'=>array(
'rule'=>array(
'validFile',
array(
'required'=>true,
'extensions'=>array(
'jpg',
'jpeg',
'gif',
'png'
)
)
)
)
);

var$useTable=false;

functionreadFolder($folderName=null){
$folder=newFolder($folderName);
$images=$folder->read(
true,
array(
'.',
'..',
'Thumbs.db'
),
true
);
$images=$images[1];//Weareonlyinterestedinfiles

//Getmoreinfosabouttheimages
$retVal=array();
foreach($imagesas$the_image)
{
$the_image=newFile($the_image);
$retVal[]=array_merge(
$the_image->info(),
array(
'size'=>$the_image->size(),
'last_changed'=>$the_image->lastChange()
)
);
}

return$retVal;
}

functionupload($data=null){
$this->set($data);

if(empty($this->data)){
returnfalse;
}

//Validation
if(!$this->validates()){
returnfalse;
}
//print_r($this->data);
//Movethefiletotheuploadsfolder
if(!move_uploaded_file($this->data['Imageupload']['Image']['image']['t
mp_name'],WWW_ROOT.DS.'uploads'.DS.$this->data['Imageupload']['Image']
['image']['name'])){
returnfalse;
}

returntrue;
}


functionvalidFile($check,$settings){
$_default=array(
'required'=>false,
'extensions'=>array(
'jpg',
'jpeg',
'gif',
'png'
)
);

$_settings=array_merge(
$_default,
ife(
is_array($settings),
$settings,
array()
)
);

//RemovefirstlevelofArray
$_check=array_shift($check);

if($_settings['required']==false&&$_check['size']==0){
returntrue;
}

//Nofileuploaded.
if($_settings['required']&&$_check['size']==0){
returnfalse;
}

//CheckforBasicPHPfileerrors.
if($_check['error']!==0){
returnfalse;
}

//UsePHPsownfilevalidationmethod.
if(is_uploaded_file($_check['tmp_name'])==false){
returnfalse;
}

//Validextension
returnValidation::extension(
$_check,
$_settings['extensions']
);
}
}
?>
`
You'll notice a couple of small changes, mainly addin the App:uses
functionality before the class declaration, and also i renamed it to
Imageuploads, as Images redirected to the webroot/images folders.

And here is the updated Controller code::

    <?php
    classImageuploadsControllerextendsAppController{

    var$name='Imageuploads';

    var$uses=array('Imageupload');

    var$helpers=array(
    'Html',
    'Form',
    'Js',
    'Number'//Usedtoshowreadablefilesizes
    );

    functionadmin_index(){
    $this->layout='admin';
    $this->set(
    'images',
    $this->Imageupload->readFolder(WWW_ROOT.DS.'uploads')
    );
    }

    functionadmin_upload(){
    //Uploadanimage
    if(!empty($this->data)){
    //Validateandmovethefile
    if($this->Imageupload->upload($this->data)){
    $this->Session->setFlash('Theimagewassuccessfullyuploaded.');
    }else{
    $this->Session->setFlash('Therewasanerrorwiththeuploadedfile.');
    }

    $this->redirect(
    array(
    'action'=>'index'
    )
    );
    }else{
    $this->redirect(
    array(
    'action'=>'index'
    )
    );
    }
    }
    }
    ?>
    <p>Iaddedtheadmin_partbecausethisfunctionalityisbehindanauthsystemandI
    wantedconsistentURI'sbutthatisuptotoyou.</p>
    <p>Hereisthetinymce.ctpcode</p>
    <?phpecho$this->Html->script("tiny_mce/tiny_mce.js");?>

    <?php
    echo$this->Html->scriptBlock(
    "functionfileBrowserCallBack(field_name,url,type,win){
    browserField=field_name;
    browserWin=win;
    window.open('".Helper::url(array('controller'=>'imageuploads'))."','br
    owserWindow','modal,width=600,height=400,scrollbars=yes');
    }"
    );
    ?>

    <?php
    echo$this->Html->scriptBlock(
    "tinyMCE.init({
    mode:'textareas',
    theme:'advanced',
    theme_advanced_buttons1:'forecolor,bold,italic,underline,|,justifyleft
    ,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,undo,redo,
    |,link,unlink,|,image,emotions,code',
    theme_advanced_buttons2:'',
    theme_advanced_buttons3:'',
    theme_advanced_toolbar_location:'top',
    theme_advanced_toolbar_align:'left',
    theme_advanced_path_location:'bottom',
    extended_valid_elements:'a[name|href|target|title|onclick],img[class|s
    rc|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onm
    ouseout|name],hr[class|width|size|noshade],font[face|size|color|style]
    ,span[class|align|style]',
    file_browser_callback:'fileBrowserCallBack',
    width:'620',
    height:'480',
    relative_urls:false
    });"
    );
    ?>

And lastly the the index (or admin_index in my case) view located in
View/imageuploads/::

    <?php
    echo$this->Html->scriptBlock(
    "functionselectURL(url){
    if(url=='')returnfalse;

    url='".Helper::url('/uploads/')."'+url;

    field=window.top.opener.browserWin.document.forms[0].elements[window.t
    op.opener.browserField];
    field.value=url;
    if(field.onchange!=null)field.onchange();
    window.top.close();
    window.top.opener.browserWin.focus();
    }"
    );
    ?>

    <?php
    echo$this->Form->create(
    null,
    array(
    'type'=>'file',
    'url'=>array(
    'action'=>'upload'
    )
    )
    );
    echo$this->Form->label(
    'Image.image',
    'Uploadimage'
    );
    echo$this->Form->file(
    'Image.image'
    );
    echo$this->Form->end('Upload');
    ?>

    <?phpif(isset($images[0])){
    $tableCells=array();

    foreach($imagesAs$the_image){
    $tableCells[]=array(
    $this->Html->link(
    $the_image['basename'],
    '#',
    array(
    'onclick'=>'selectURL("'.$the_image['basename'].'");'
    )
    ),
    $this->Number->toReadableSize($the_image['size']),
    date('m/d/YH:i',$the_image['last_changed'])
    );
    }

    echo$this->Html->tag(
    'table',
    $this->Html->tableHeaders(
    array(
    'Filename',
    'Size',
    'Datecreated'
    )
    ).$this->Html->tableCells(
    $tableCells
    )
    );
    }?>

You'll notice a few small differences, like $this->Html->scriptBlock

Finally just make sure you add
Element('tinymce'); ?>
to the form you want to add this to.
Cheers!



.. _Adding a TinyMCE image browser the CakePHP way: http://bakery.cakephp.org/articles/Braindead/2009/05/29/adding-a-tinymce-image-browser-the-cakephp-way

.. author:: jwilcox09
.. categories:: articles
.. tags:: wysiwyg TinyMCE AJAX,TinyMCE,TinyMCE Helper,Articles

