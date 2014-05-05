Cipher Plugin Behavior
======================

This plugin behavior handles encrypting and decrypting fields, to
store information securely in the database. It uses either *mcrypt* or
CakePHP's built-in *Security::cipher*. This version supports CakePHP
2.1.

`http://jmillerdesign.github.com/Cipher-Behavior-for-CakePHP/`_



Installation
~~~~~~~~~~~~

#. Install the plugin as a submodule:

::

     `
    gitsubmoduleaddhttps://jmillerdesign@github.com/jmillerdesign/Cipher-Behavior-for-CakePHP.gitapp/Plugin/Cipher
    `

#. Load the plugin in Config/bootstrap.php

::

     `
    CakePlugin::load('Cipher');
    `

#. In the model(s) that has the fields to encrypt, add Cipher.Cipher
   to the $actsAs array, along with the settings to use.

::

     `
    var$actsAs=array(
    'Cipher.Cipher'=>array(
    'fields'=>array('password')
    )
    );
    `



Settings
~~~~~~~~

+ fields (array): Fields to cipher. Default: no fields
+ autoDecrypt (boolean): Decrypt ciphered fields automatically.
  Default: true
+ key (string): Key to encrypt with. Default: Security.salt
+ cipher (string): Cipher method to use (cake OR mcrypt OR auto).
  Default: auto

`http://jmillerdesign.github.com/Cipher-Behavior-for-CakePHP/`_


.. _http://jmillerdesign.github.com/Cipher-Behavior-for-CakePHP/: http://jmillerdesign.github.com/Cipher-Behavior-for-CakePHP/

.. author:: jmillerdesign
.. categories:: articles, plugins
.. tags:: security,plugin,behavior,cryptography,decryption,encryption,crypt,cipher,decrypt,encrypt,Plugins

