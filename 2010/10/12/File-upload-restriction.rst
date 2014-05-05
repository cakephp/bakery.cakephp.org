File upload restriction
=======================

I have written this component which provide number of features during
file uploading. Following is the features of this component.
1.Provides the restriction of file size. 2.Provides the restriction of
file types. 3.Provides the restriction of image file height.
4.Provides the restriction of image file width. 5.Provides the change
of file name during uploading.
How to use in the controller class:

If you want to use default file name and default directory then this
component will save your file name in img folder of webroot.
eg.. $this->FileUpload->uploadFile($this->params,'filename');

Note: This two parameter is compulsory with this component and all the
parameter are optional.

Parameter 1
Pass "$this->params" parameter just like above example. Do not use any
specfic array with this parameter (eg. $this->params['data'],
$this->params[] etc).

Parameter 2
filename is the name of your actual file in view file.
Note: Do not write anything else with this file name.
eg. if your input file name in view is
then just write only filename instead of whole name
(data[modelname][filename]).

Collect this component function in some other variable because if
something is return with this function then this means that some error
is throwing by this function and use this variable to show respective
error.
eg. $showError =
$this->FileUpload->uploadFile($this->params,'filename');
if(!empty($showError)) {
echo 'file uploaded successfully';
} else {
echo $showError;
}

Save file to specfic folder
eg. $showError =
$this->FileUpload->uploadFile($this->params,'filename', 'foldername');
This will save your file to specific folder.
Note : Do not attach any slash character with this foldername.

Change your filename during uploading
eg. $showError =
$this->FileUpload->uploadFile($this->params,'filename', 'foldername',
'filename');
filename is the new filenam which you want to change during uploading
of file.
Note : Do not attach any slash character with this filename.

Restriction in file size(in kilobytes)
eg. $showError =
$this->FileUpload->uploadFile($this->params,'filename', 'foldername',
'filename', 'size');
size to be consider in kilobytes so if you write '4' then it will
consider all file having size under 4 kilobytes.
Note : Do not write any float number with this parameter.

Restriction in file width(In pixel)
eg. $showError =
$this->FileUpload->uploadFile($this->params,'filename', 'foldername',
'filename', 'size','width');

Restriction in file height(In pixel)
eg. $showError =
$this->FileUpload->uploadFile($this->params,'filename', 'foldername',
'filename', 'size','width','height');

Delete the filename
$showError = $this->FileUpload->removeFile('filename','foldername');
filename is compulsory with this function and foldername is
optional.Write your filename with filetype eg.image.jpg

Restriction of file type
At the top in the component file you can mentions the file type which
you want to support during uploading.

eg. var $fileType = array('image/jpg', 'image/jpeg', 'image/gif','image/png','image/pjpeg');

::

    /*
    Created By : Santosh R. Yadav
    Created Date : 24-Sep-2010
    Company Name : Technomile Software Solution
    Email : `santosh.yadav.wms@gmail.com`_ */

    class FileUploadComponent extends Object {
    var $fileType = array('image/jpg', 'image/jpeg',
    'image/gif','image/png','image/pjpeg');
    var $showError;

    function uploadFile($data, $inputFileName, $folderName=NULL,
    $fileName=NULL, $checkSize=NULL, $checkWidth=NULL, $checkHeight=NULL)
    {
    $getModelName = array_keys($data['data']);
    $checkType = $this->fileType;
    // to check if limitation in height is specified by user //
    $errorFilesHeight = $this->checkFileHeight($data, $inputFileName,
    $checkHeight);
    if(!empty($errorFilesHeight)) {
    return $errorFilesHeight;
    exit;
    }
    // to check if limitation in width is specified by user //
    $errorFilesWidth = $this->checkFileWidth($data, $inputFileName,
    $checkWidth);
    if(!empty($errorFilesWidth)) {
    return $errorFilesWidth;
    exit;
    }
    // to check if limitation in size is specified by user //
    $errorFilesSize = $this->checkFileSize($data, $inputFileName,
    $checkSize);
    if(!empty($errorFilesSize)) {
    return $errorFilesSize;
    exit;
    }
    // to check file type //
    $errorFilesType = $this->checkFileType($data, $inputFileName,
    $checkType);
    if(!empty($errorFilesType)) {
    return $errorFilesType;
    exit;
    }

    // to check if folder name is specified by user //
    if(!empty($folderName)) {
    if(!file_exists(WWW_ROOT.$folderName)) {
    mkdir(WWW_ROOT.$folderName);
    chmod(WWW_ROOT.$folderName, 0777);
    }
    $destinationFolder = WWW_ROOT.$folderName.DS;
    } else {
    $destinationFolder = WWW_ROOT.'img'.DS;

    }
    // to check if file name is changed by user //
    if(!empty($fileName)) {
    $destinationFile = $fileName;
    if(file_exists($destinationFolder.$destinationFile)) {
    $fileExistError = 'This File is already exist';
    return $this->showError($fileExistError);
    exit;
    } else {
    copy($data['data'][$getModelName[0]][$inputFileName]['tmp_name'],
    $destinationFolder.$destinationFile);
    }
    } else {
    if(file_exists($destinationFolder.$data['data'][$getModelName[0]][$inp
    utFileName]['name'])) {
    $fileExistError = 'This File is already exist';
    return $this->showError($fileExistError);
    exit;
    } else {
    copy($data['data'][$getModelName[0]][$inputFileName]['tmp_name'], $des
    tinationFolder.$data['data'][$getModelName[0]][$inputFileName]['name']
    );
    }

    }

    }

    function removeFile($fileName, $folderName=NULL) {
    if(!empty($folderName)) {
    $destinationFolder = WWW_ROOT.$folderName.DS;
    } else {
    $destinationFolder = WWW_ROOT.'img'.DS;
    }
    if(file_exists($destinationFolder.$fileName)) {
    unlink($destinationFolder.$fileName);
    } else {
    $fileDeleteError = 'File Delete Error';
    return $this->showError($fileDeleteError);
    }
    }

    function checkFileType($data, $inputFile, $fileType=NULL) {
    $getModelName = array_keys($data['data']);
    if(!empty($fileType)) {
    $getFileType = $data['data'][$getModelName[0]][$inputFile]['type'];
    if(!in_array($getFileType,$fileType)) {
    $fileTypeError = 'File Type Error';
    return $this->showError($fileTypeError);
    }
    }
    }

    function checkFileSize($data, $inputFile, $fileSize=NULL) {
    $getModelName = array_keys($data['data']);
    if(!empty($fileSize)) {
    $getFileSize =
    $data['data'][$getModelName[0]][$inputFile]['size']/1024;
    if($getFileSize > $fileSize) {
    $fileSizeError = 'File size Error';
    return $this->showError($fileSizeError);
    }
    }
    }

    function checkFileWidth($data, $inputFile, $fileWidth=NULL) {
    $getModelName = array_keys($data['data']);
    $getFileDim =
    getimagesize($data['data'][$getModelName[0]][$inputFile]['tmp_name']);
    if(!empty($fileWidth)) {
    if($getFileDim[1] > $fileWidth) {
    $fileWidthError = 'File Width Error';
    return $this->showError($fileWidthError);
    }
    }
    }

    function checkFileHeight($data, $inputFile, $fileHeight=NULL) {
        $getModelName = array_keys($data['data']);
        $getFileDim =
        getimagesize($data['data'][$getModelName[0]][$inputFile]['tmp_name']);
        if(!empty($fileHeight)) {
            if($getFileDim[0] > $fileHeight) {
                $fileHightError = 'File height Error';
                return $this->showError($fileHightError);
            }
        }
    }

    function showError($errorDisplay) {
        if(!empty($errorDisplay)) {
            $this->showError = $errorDisplay;
            return $this->showError;
        }
    }

    }



.. _santosh.yadav.wms@gmail.com: mailto:santosh.yadav.wms@gmail.com=santosh.yadav.wms@gmail.com

.. author:: santoshgroup
.. categories:: articles, components
.. tags:: Components

