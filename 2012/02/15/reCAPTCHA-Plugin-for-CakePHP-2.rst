reCAPTCHA Plugin for CakePHP 2
==============================

I have updated and improved `tbsmcd's reCAPTCHA Plugin`_ for CakePHP2.
`https://github.com/Jahdrien/ReCaptcha-Plugin`_



1. Get reCAPTCHA key.
=====================
http://www.google.com/recaptcha


2. Setting.
===========
Download recaptchalib.php.
And put it in "Recaptcha/Vendor".
http://code.google.com/p/recaptcha/downloads/list?q=label:phplib-
Latest


3. Config.
==========
Insert keys in Recaptcha/Config/key.php .
$config = array(
'Recaptcha' => array(
'Public' => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
'Private' => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
),
);



4. Bootstrap.
=============
if you load your plugins one by one add
CakePlugin::load('Recaptcha');

ReCaptcha/Config/bootstrap.php only reads your key.php config file



5. Controller.
==============
public $components = array('Recaptcha.Recaptcha');
public $helpers = array('Recaptcha.Recaptcha');

or inside controller action

$this->helpers[] = 'Recaptcha.Recaptcha';
$this->Components->load('Recaptcha.Recaptcha')->startup($this);

always add in your controller action or in bootstrap
Configure::load('Recaptcha.key');



6. View.
========
Inside <form> tags:
echo $this->Recaptcha->show(array $options);
$options : any recaptcha supported option (theme, lang,
custom_translations, custom_theme_widget, tabindex)
example:
echo $this->Recaptcha->show(array(
'theme' => 'white',
'lang' => 'fr',
));

echo $this->Recaptcha->error();



.. _https://github.com/Jahdrien/ReCaptcha-Plugin: https://github.com/Jahdrien/ReCaptcha-Plugin
.. _tbsmcd's reCAPTCHA Plugin: http://bakery.cakephp.org/articles/tbsmcd/2011/02/05/recaptcha_plugin_6

.. author:: Jahdrien
.. categories:: articles, plugins
.. tags:: plugin,recaptcha,cakephp 2.0.x,Plugins

