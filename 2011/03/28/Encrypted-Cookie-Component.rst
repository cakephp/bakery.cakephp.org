Encrypted Cookie Component
==========================

A Cookie component for Cake PHP 1.1 (which should also work in 1.2 as
well). The aim of this component was to make saved data as secure as
possible. I have (hopefully) achieved this by utilizing mcrypt (for
encrypting and decrypting the data) and checksuming the stored data.
Update: SVN build 385 Cookie's now get stored with their expiration
timestamp. When __unpacking() we can check to see if the user has
tampered with the cookies expiration time and kill the cookie if they
have. Update: SVN build 387 Fixed constructor and tidied up comments,
please note that the use of __construct() relies upon PHP5, but this
could easily be adapted for PHP4 if required::

    <?php
    /**
    *Cookie.php
    *JohnReeves
    *November2007
    *SVNbuild387
    *
    *CookieComponentforCakePHP1.1
    */

    classCookieComponentextendsObject
    {
    /**
    *@varint$default_cookie_life
    *Defaulttimethatacookiewilllastforifnotspecified(604800=1week)
    */
    var$default_cookie_life=604800;//oneweek

    /**
    *@varboolean$use_mcrypt
    *Encryptcookiedatausingthemcryptextension,MCryptwillusethe
    *CAKE_SESSION_STRINGconstantasthekey.
    */
    var$use_mcrypt=true;

    /**
    *Constructor.
    *CheckthatmCryptispresent,ifnotdisableit.
    *
    *@returnVoid.
    */
    function__construct()
    {
    parent::__construct();

    //Over-ridemcryptchoiceifmodulenotavaliable.
    if($this->use_mcrypt&&!extension_loaded('mcrypt')){
    $this->log(__METHOD__."couldnotloadthemcryptmodule.");
    $this->use_mcrypt=false;
    }
    }

    /**
    *GetscalledimmediatleyafterbeforeFilter()bytheController.
    *empty.
    *
    *@paramobject$controllerReferencetoController.
    *@returnVoid
    */
    functionstartup(&$controller)
    {
    }

    /**
    *Returnsthevariable$keyfromthecookiespecifiedby$cookie.If
    *youdonotspecify$key,thewholearraywillbereturned.
    *
    *@paramstring$cookie
    *@paramstring$key
    *@returnmixedfalseonfailure.Array/Stringonsuccess.
    */
    functionread($cookie,$key=null)
    {
    if(!$this->valid($cookie))
    returnfalse;

    //Readinthecookiefrom$_COOKIE
    $cookie=$_COOKIE[$cookie];

    //Unpackthestoredcookie,errorifunpackingfails.
    if(!$cookie_array=$this->__unpackCookie($cookie)){
    returnfalse;
    }

    if(!is_array($cookie_array)){
    $error=__METHOD__."cookie:{$cookie}wasnotaserializedarray.";
    $this->log($error);
    trigger_error($error);
    }

    //Extractkey.
    if($key){
    if(!isset($cookie_array[$key]))
    returnfalse;

    return$cookie_array[$key];
    }

    //Returnwholeunserialisedarray.
    else{
    return$cookie_array;
    }
    }

    /**
    *Writesthearrayspecifiedby$datatothecookiespecifiedby$cookie
    *whichwillexpireafter$expires(Whichcaneitherbetimeasastring
    *orinseconds).
    *
    *@paramstring$cookie
    *@paramarray$data
    *@paramstring$expires
    *@returnboolean
    */
    functionwrite($cookie,$data,$expires=null)
    {
    if(!is_array($data)){
    $error=__METHOD__."expectsanarray.";
    $this->log($error);
    trigger_error($error);
    }

    $expires=$this->__getCookieExpires($expires);
    $contents=$this->__packCookie($data,$expires);

    if(!setcookie($cookie,$contents,$expires,'/')){
    $this->log(__METHOD__."failedtowritecookie:{$cookie}");
    returnfalse;
    }

    returntrue;
    }

    /**
    *Deletesthecookiespecifiedby$cookie
    *
    *@paramstring$cookie
    *@returnboolean
    */
    functiondelete($cookie)
    {
    if(!$this->valid($cookie))
    returnfalse;

    if(!setcookie($cookie,'',time()-1,'/')){
    $this->log(__METHOD__."failedtodeletecookie{$cookie}");
    returnfalse;
    }

    returntrue;
    }

    /**
    *Deletethecookiespecifiedby$cookie
    *
    *@paramstring$cookie
    *@returnboolean
    */
    functiondel($cookie)
    {
    return$this->delete($cookie);
    }

    /**
    *Returnstrueifthecookiespecifiedby$cookiehasbeenset.
    *
    *@paramstring$cookie
    *@returnboolean
    */
    functionvalid($cookie)
    {
    return(isset($_COOKIE[$cookie]));
    }

    /**
    *Privatefunctiontogettheexirationvaluewhensettingacookie.
    *$valuecaneitherbeexpressedasthenumberofsecondsintothefuture,
    *orasastringthatwillbeparsedviastrtotime.
    *
    *@parammixed$value
    *@returnmixedunix_timestamponsuccess,falseonfailure.
    */
    function__getCookieExpires($value=null)
    {
    if(!$value)
    $expires=time()+$this->default_cookie_life;

    elseif(is_numeric($value)){
    $expires=time()+$value;
    }

    else{
    $time=strtotime($value);
    if($time!=false&&is_numeric($time)&&$time>time()){
    $expires=$time;
    }

    else{
    $this->log(__METHOD__."failedtoparseexpiresval:{$value}",LOG_DEBUG);
    returnfalse;
    }
    }

    return$expires;
    }

    /**
    *Encodesamixedvaluespecifiedby$dataintoastringvaluewhichcan
    *bestoredsafelyinacookie.Thisfunctionalsoaddschecksumming,
    *expirationdatevalidtion(asspecifiedby$expires)and,ifmcryptis
    *enabled,encryption.Cookie'spackedwith__packCookie()canbeunpacked
    *bycalling__unpackCookie()onthem.
    *
    *@parammixed$dataDatatostoreinthecookie(willbeserialized)
    *@paramint$expiresDate(unixtimestamp)thatthecookieissettoexpire.
    *@returnstringbase64encoded,seralizeddatasafetostoreinacookie.
    */
    function__packCookie($data,$expires)
    {
    if(!is_numeric($expires)||$expires<time()){
    trigger_error(__METHOD__.'$expiresmustbeavalidtimestampnotinthepast.')
    ;
    }

    $serialized=serialize(array($data,$expires));
    $checksum=md5($serialized.CAKE_SESSION_STRING);
    $cookie_data=serialize(array($serialized,$checksum));

    if($this->use_mcrypt){
    $cookie_data=$this->__encrypt($cookie_data);
    }

    //base64encodeforsafestorageinUS-ASCIICookieformat
    returnbase64_encode($cookie_data);
    }

    /**
    *Unpacksthevalueofacookiespecifiedby$cookieintoanarray.If
    *thecookiedataisnotstoredasexpecteditwillreturnfalse.
    *
    *@paramstring$cookieSerialisedcookiedata.
    *@returnarrayarray($data,$checksum);
    *
    */
    function__unpackCookie($cookie)
    {
    //base64decode.
    $data=base64_decode($cookie);

    //decryptthecookie
    if($this->use_mcrypt){
    $data=$this->__decrypt($data);
    }

    $checksum_array=unserialize($data);

    //$checksum_array[0](thedata)shouldmatchthehashwestoredin
    //$checksum_array[1].
    if(md5($checksum_array[0].CAKE_SESSION_STRING)!==$checksum_array[1]){
    $msg=__METHOD__."cookiefailedchecksum,possibletampering.";
    $this->log($msg);
    debug($msg);
    returnfalse;
    }

    //Unserialisethechecksumeddata,nowverifythetimestamp.
    $expires_array=unserialize($checksum_array[0]);

    if(!is_numeric($expires_array[1])||$expires_array[1]<time()){
    $msg=__METHOD__."cookieshouldhaveexpired,possibletampering.";
    $this->log($msg);
    debug($msg);
    returnfalse;
    }

    return$expires_array[0];
    }

    /**
    *Encrypt'saplaintextstringvaluespecifiedby$plain_textintoan
    *encryptedstringusingthemcryptencryptionmethodspecifiedby
    *$method.
    *
    *@paramstring$plain_text
    *@paramstring$method
    *@returnstring
    *@trigger_erroronmissingMCryptModule.
    */
    function__encrypt($plain_text,$method='rijndael-256')
    {
    //Checkthemethodrequestedexists
    if(!in_array($method,mcrypt_list_algorithms())){
    trigger_error(__METHOD__."requestedencryptionmethod{$method}is"
    ."notsupportedbyyourMCryptlibrary.");
    }

    $td=mcrypt_module_open($method,'','ecb','');
    $iv=mcrypt_create_iv(mcrypt_enc_get_iv_size($td),MCRYPT_RAND);
    $key_length=mcrypt_enc_get_key_size($td);

    //Chopthekeytothecorrectsize.
    $key=substr(md5(CAKE_SESSION_STRING),0,$key_length);

    mcrypt_generic_init($td,$key,$iv);
    $encrypted=mcrypt_generic($td,$plain_text);

    //Teardown.
    mcrypt_generic_deinit($td);
    mcrypt_module_close($td);

    return$encrypted;
    }

    /**
    *Decryptesanencryptedstringspecifiedby$encryptedusingthemcrypt
    *modulespecifiedby$method
    *
    *@paramstring$encrypted
    *@paramstring$method
    *@returnstringDecryptedplaintext.
    */
    function__decrypt($encrypted,$method='rijndael-256')
    {
    $td=mcrypt_module_open($method,'','ecb','');
    $iv=mcrypt_create_iv(mcrypt_enc_get_iv_size($td),MCRYPT_RAND);
    $key_length=mcrypt_enc_get_key_size($td);

    //Chopthekeytothecorrectsize.
    $key=substr(md5(CAKE_SESSION_STRING),0,$key_length);

    mcrypt_generic_init($td,$key,$iv);
    returnrtrim(mdecrypt_generic($td,$encrypted));
    }
    }
    ?>



.. author::
.. categories:: articles, components
.. tags:: php cake cakephp cookie encryp,Components

