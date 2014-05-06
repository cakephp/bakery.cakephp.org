reCAPTCHA plugin
================

If you are victim for SPAM, then you'll want to deal easily.
This reCAPTCHA plugin will help you in that case.
`https://github.com/tbsmcd/recaptcha_plugin`_



Features
--------

Display reCAPTCHA widget and validate input value.


How to use
----------

#. Put 'recaptcha_plugin' directory on APP/plugins in your app.
#. Get 'recaptchalib.php' from `Google code`_, and put it on
   recaptcha_plugin/vendors.
#. Place your reCAPTCHA keys on config/key.php . ` $config=array(
   'Recaptcha'=>array( 'Public'=>'YOUR_RECAPTCHA_PUBLIC_KEY',
   'Private'=>'YOUR_RECAPTCHA_PRIVATE_KEY', ), ); `
#. Include plugin helper and component in your controller.

Controller Class::

    public $components = array('RecaptchaPlugin.Recaptcha');
    public $helpers = array('RecaptchaPlugin.Recaptcha');

Add this code in your view.
View Template::

    echo $this->Recaptcha->show();//DisplayreCAPTCHAwidget.
    echo $this->Recaptcha->error();//ShowvalidationmessageofreCAPTCHA.

You must place these codes inside form tags.This helper use 'red'
theme in default, but you can use the other themes.

For example::

    echo $this->Recaptcha->show('white');
    //Possiblevalue:'red'|'white'|'blackglass'|'clean';

What does it do
---------------

   This plugin adds validation rule to model class::

       *RecaptchaComponent*
       ` functionbeforeValidate(&$model){
       $model->validate['recaptcha_response_field']=array(
       'checkRecaptcha'=>array(
       'rule'=>array('checkRecaptcha','recaptcha_challenge_field'),
       'message'=>'Youdidnotenterthewordscorrectly.Pleasetryagain.', ), ); }
       `RecaptchaComponent adds ValidationBehavior to model class, so you
       don't have to place any codes in model class.


.. _Google code: http://code.google.com/p/recaptcha/downloads/list?q=label:phplib-Latest
.. _https://github.com/tbsmcd/recaptcha_plugin: https://github.com/tbsmcd/recaptcha_plugin

.. author:: tbsmcd
.. categories:: articles, plugins
.. tags:: Plugins

