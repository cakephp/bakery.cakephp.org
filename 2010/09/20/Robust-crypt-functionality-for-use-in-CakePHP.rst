Robust crypt functionality for use in CakePHP
=============================================

Robust and flexible data encryption functionality inside your web
application is an essential part of your toolkit when developing your
next fantastic webapp. The right setup can help you through situations
that are troublesome and/or painful to deal with otherwise.

Catch the updated and easier to use CryptClass at Github here:-
`https://github.com/ndejong/CryptClass`_

The most common scenario is that where you need to pass application
state around that involves data that you do not want users to see or
tamper with. If you are dealing with your own application you would
just use a user session data-store or encode it an drop it into a
cookie. What about situations where you need to communicate in between
systems that do not have any form of backend communication between
them? Similarly, what about situations where you want to manage state
that involves an external callback where you have no opportunity to
add your own user data? AWS S3 file uploads, Paypal IPNs and
Salesforce.com all have scenarios where this can present itself.

So what to do?

Easy - serialize your data, compress it, encrypt the whole lot then
pass the resulting string around in the URL itself. You'll end up with
a long URL but for most practical usage scenarios you'll be able to
pass around a nice little array or object with your state data and be
confident that the said data was not observed or tampered with by the
user that transported it for you.


webapp/config/core.php
~~~~~~~~~~~~~~~~~~~~~~

::


    Configure::write('Cryptable.mode',MCRYPT_MODE_CBC);
    Configure::write('Cryptable.cipher',MCRYPT_RIJNDAEL_192);
    Configure::write('Cryptable.key',Configure::read('Security.salt'));
    Configure::write('Cryptable.iv',base64_decode(md5(Configure::read('Security.salt'))));



webapp/app_controller.php
~~~~~~~~~~~~~~~~~~~~~~~~~

Controller Class:
`````````````````

::

    <?php
    App::import('Lib','Crypt/CryptClass',array('file'=>'CryptClass.php'));

    class AppController extends Controller {

    	/**
    	 * crypt
    	 */
    	private $Crypt = null;

    	/**
    	 * _encrypt()
    	 *
    	 * @param mixed $data
    	 * @return string
    	 */
    	function _encrypt($data) {
    		if(!$this->Crypt) { $this->__makeCrypt(); }
    		return $this->Crypt->encrypt($data);
    	}

    	/**
    	 * _decrypt()
    	 *
    	 * @param mixed $data
    	 * @return mixed
    	 */
    	function _decrypt($data) {
    		if(!$this->Crypt) { $this->__makeCrypt(); }
    		return $this->Crypt->decrypt($data);
    	}

    	/**
    	 * __makeCrypt()
    	 */
    	function __makeCrypt() {
    	        $this->Crypt = new CryptClass(
    			Configure::read('Cryptable.cipher'),
    			Configure::read('Cryptable.key'),
    			Configure::read('Cryptable.mode'),
    			Configure::read('Cryptable.iv')
    		);
    	}
    }
    ?>



webapp/views/helpers/crypt.php
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Helper Class:
`````````````

::

    <?php
    class CryptHelper extends AppHelper {

            private $Crypt;

            /**
             * encrypt()
             *
             * @param mixed $data
             * @return string
             */
            function encrypt($data) {
                    if(!$this->Crypt) {
                            $this->Crypt = new CryptClass(
    				Configure::read('Cryptable.cipher'),
    				Configure::read('Cryptable.key'),
    				Configure::read('Cryptable.mode'),
    				Configure::read('Cryptable.iv'
    			));
                    }
                    return $this->Crypt->encrypt($data);
            }
    }
    ?>



webapp/libs/crypt/CryptClass.php
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::


    <?php
    /**
     * @author Nicholas de Jong
     * @copyright Nicholas de Jong
     * @license BSD
     *
     **/
    class CryptClass {

            /**
             * Enables / Disables compression
             *
             * @var bool
             */
            public $compression = TRUE;

            /**
             * Enables / Disables URL safe data encoding
             *
             * @var bool
             */
            public $url_safe = TRUE;

            /**
             * Enables / Disbles decrypt after encrypt with compare - useful in testing!
             *
             * @var bool
             */
            public $test_decrypt_before_return = FALSE;

            /**
             * The mcrypt setup
             *
             * @var array
             */
            public $mcrypt;

            /**
             * __construct()
             *
             * @param string $cipher
             * @param string $key
             * @param string $mode
             * @param string $iv
             */
            function __construct($cipher,$key,$mode,$iv) {

                    $this->mcrypt['cipher'] = $cipher;
                    $this->mcrypt['key'] = $key;
                    $this->mcrypt['mode'] = $mode;
                    $this->mcrypt['iv'] = $iv;

            }

            /**
             * encrypt()
             *
             * @param mixed $data
             * @return string
             */
            public function encrypt($data) {

                    // Check mcrypt config looks complete -- we test here because a
                    // user could change $this->mcrypt between calls
                    $this->__checkMcryptConfig();

                    // Return early if $data is empty
                    if(empty($data)) { return $data; }

                    // Make sure $data is cast as a JSON string if it is not an array
                    if(is_string($data)) {
                            $encrypt_data = $data;
                    } else {
                            $encrypt_data = json_encode($data);
                    }

                    // Compress if required
                    if($this->compression) {
                            $encrypt_data = gzcompress($encrypt_data);
                    }

                    // Encrypt and base64 the data string
                    $encrypted = base64_encode(mcrypt_encrypt(
                            $this->mcrypt['cipher'],
                            $this->mcrypt['key'],
                            $encrypt_data,
                            $this->mcrypt['mode'],
                            $this->mcrypt['iv']
                    ));

                    // Tweak the string to be url safe if required
                    if($this->url_safe) {
                            $encrypted = strtr($encrypted,'+/=','-_,');
                    }

                    // Decrypt test if we need to
                    if($this->test_decrypt_before_return) {

                            if($data != $this->decrypt($encrypted)) {

                                    // Because it is possible for a JSON string itself to be passed such cases
                                    if(json_decode($data,TRUE) != $this->decrypt($encrypted)) {
                                            throw new Exception('Unable to confirm encrypted data will match decrypted data!');
                                    } else {
                                            return $encrypted;
                                    }

                            } else {
                                    return $encrypted;
                            }
                    } else {
                            return $encrypted;
                    }
            }

            /**
             * decrypt()
             *
             * @param string $data
             * @return mixed
             */
            public function decrypt($data) {

                    // Check mcrypt config looks complete -- we test here because a
                    // user could change $this->mcrypt between calls
                    $this->__checkMcryptConfig();

                    // Return early if $data is empty
                    if(empty($data)) { return $data; }

                    // Undo the url safe transform
                    if($this->url_safe) {
                            $data = strtr($data,'-_,','+/=');
                    }

                    // base64 encode and encryption
                    $data = mcrypt_decrypt(
                            $this->mcrypt['cipher'],
                            $this->mcrypt['key'],
                            base64_decode($data),
                            $this->mcrypt['mode'],
                            $this->mcrypt['iv']
                    );

                    // Uncompress if required - supress errors due to bad input data
                    if($this->compression) {
                            $data = @gzuncompress($data);
                    }

                    // Attempt to JSON decode
                    $json = json_decode($data,TRUE);
                    if(is_array($json)) {
                            return $json;
                    } else {
                            return $data;
                    }
            }

            /**
             * __checkMcryptConfig
             *
             * @param array $mcrypt
             */
            private function __checkMcryptConfig() {

                    // Make sure all the $mcrypt components are present
                    if(!isset($this->mcrypt['cipher']) || empty($this->mcrypt['cipher'])) {
                            throw new Exception('Missing mcrypt cipher');
                    }

                    if(!isset($this->mcrypt['key']) || empty($this->mcrypt['key'])) {
                            throw new Exception('Missing mcrypt key');
                    }

                    if(!isset($this->mcrypt['mode']) || empty($this->mcrypt['mode'])) {
                            throw new Exception('Missing mcrypt mode');
                    }

                    if(!isset($this->mcrypt['iv'])) { // is optional, thus can be empty
                            throw new Exception('Missing mcrypt iv');
                    }
            }
    }

This article was originally posted at:
`http://www.nicholasdejong.com/story/robust-crypt-functionality-use-cakephp-and-other-frameworks`_

.. _http://www.nicholasdejong.com/story/robust-crypt-functionality-use-cakephp-and-other-frameworks: http://www.nicholasdejong.com/story/robust-crypt-functionality-use-cakephp-and-other-frameworks
.. _https://github.com/ndejong/CryptClass: https://github.com/ndejong/CryptClass

.. author:: ndejong
.. categories:: articles, snippets
.. tags:: view,encryption,controller,crypt,Snippets

