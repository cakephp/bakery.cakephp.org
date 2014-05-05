ConfigAdmin - Administration of Custom Configuration File
=========================================================

ConfigAdmin Pulgin is management of custom configuration file.
> This is created on top of available functionality in cakephp 2.1<br
> Ref: http://book.cakephp.org/2.0/en/development/configuration.html
#reading-and-writing-configuration-files
> To use this plugin you must have cakephp version 2.1+. <br > This
gives ability to end-user to modify key-value pairs in configuration
file through simple UI design.


Installation & Usage
~~~~~~~~~~~~~~~~~~~~
1. Download plugin from
> 2. Copy Paste ~/plugin/ConfigAdmin folder to your app/Plugin folder.
> 3. Copy Paste config_admin_codes.php file into app/Config folder.
> 4. That’s it now you can test it. http: /your-project-
name/config_admin/settings
> If you are testing it on localhost then - Ex. localhost
your_project/config_admin/settings
> 5. Now you can use config_admin_codes.php file by loading it in your
controller to set it in view.<br > 6. Load config_admin_codes at the
top of controller. Read it in any of action wherever you want to use
configuration file.
> Ex. <code><span style="color: #000000"> <br ><?php
App::uses('AppController','Controller');
Configure::load('config_admin_codes');//Lodingconfigfile
classContactsControllerextendsAppController{
publicfunctionindex(){
$this->Contact->recursive=0;
$this->set('contacts',$this->paginate());
$codes=Configure::read('config_admin_codes');//Readingconfigfile
$this->set($codes);//settingconfigvaluestoview
}
}
?>


Contact
-------
Email: `developers@maxbohr.com`

Download
--------
`https://github.com/maxbohr/ConfigAdmin/`_

.. _https://github.com/maxbohr/ConfigAdmin/: https://github.com/maxbohr/ConfigAdmin/

.. author:: maxbohr
.. categories:: articles, plugins
.. tags:: config,Plugins

