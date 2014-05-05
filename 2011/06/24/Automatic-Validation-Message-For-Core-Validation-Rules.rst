Automatic Validation Message For Core Validation Rules
======================================================

Are you tired of setting same validation message for each rules in
your models or inside the forms. If so, then my tiny ValidationMessage
Behavior will help you to get ride of this boring work. It will attach
message to each of your rules automatically.

It is flexible like Cake, it only works when you don't provide your
own validation message, so you can easily override the default message
setting your own message for your rules.

Moreover, it uses the __() internationalize function for each message,
so you don't have to worry about internationalization in your forms.

Behavior: validation_message.php::

    <?php
    /**
    *ValidationMessagebehaviorclass.
    *
    *Displayautomaticvalidationmessageforcorevalidationrules
    *
    *PHPversions5
    *
    *
    *LicensedunderTheMITLicense
    *Redistributionsoffilesmustretaintheabovecopyrightnotice.
    *
    *@authorMd.RayhanChowdhury<ray@raynux.com>
    *@copyrightCopyright2010,Raynux.com.
    *@packagecake
    *@subpackagecake.app.model.behaviors
    *@sinceCakePHPv1.2.0.4487
    *@licenseMITLicense(http://www.opensource.org/licenses/mit-
    license.php)
    */

    /**
    *ValidateMessageBehavior
    *
    *@packagecake
    *@subpackagecake.appe.model.behaviors
    */
    classValidationMessageBehaviorextendsModelBehavior{

    protected$_messages=array(
    'notempty'=>"Thisfieldcan'tbeleftblank.",
    'between'=>"Mustbebetween%sand%scharacterslong.",
    'email'=>"Pleaseprovideavalidemailaddress.",
    'alphanumeric'=>"Onlyalphabetsandnumbersallowed.",
    'boolean'=>"Onlybooleandataallowed.",
    'cc'=>"Thecreditcardnumberyousuppliedwasinvalid.",
    'comparison'=>'Thedatayousuppliedareincorrect.',
    'date'=>"Pleaseprovidedateincorrectformat.",
    "decimal"=>"Numericvaluerequired.",
    "equalto"=>"Valuemustbeequalto%s",
    "extension"=>"Pleaseuploadavalidfilewithsupportedextensions.",
    "ip"=>"PleasesupplyavalidIPaddress.",
    "isunique"=>"Thisvaluehasalreadybeentaken.",
    "minlength"=>"Mustbeatleast%scharacterslong.",
    "maxlength"=>"Mustbenolargerthan%scharacterslong.",
    "money"=>"Pleasesupplyavalidmonetaryamount.",
    "multiple"=>"Pleaseselectmultipleoptionsasspecified.",
    "inlist"=>"Invaliddataprovided,pleasetryagain.",
    "numeric"=>"Onlynumericvalueallowed.",
    "phone"=>"Phonenumberisinvalid.",
    "postal"=>"Postalcodeisinvalid.",
    "range"=>"Pleaseenteravaluebetween%sand%s.",
    "ssn"=>"SocialSecurityNumberisnotvalid.",
    "url"=>"PleaseprovideavalidURL.",
    "slug"=>"Onlyalphabets,numbers,dashandunderscorecharactersallowed",
    );

    /**
    *Gettheautomaticevalidationmessage
    *
    *@paramarray$rule,stringorarray
    *@returnstringinternationalized
    */
    function_autoMessage($rule){
    $rule[0]=$this->_messages[strtolower($rule[0])];
    return__(call_user_func_array('sprintf',$rule),true);
    }

    /**
    *Attachautomaticmessageforeachvalidation
    *
    *@returnvoid
    *@accesspublic
    */
    functionbeforeValidate(&$model){
    parent::beforeValidate($model);

    if(!empty($model->validate)){
    foreach($model->validateas$fieldName=>&$ruleSet){

    //forsinglerule
    if(is_string($ruleSet)&&!empty($this->_messages[strtolower($ruleSet)])
    ){
    $ruleSet=array('rule'=>$ruleSet,'message'=>$this->_autoMessage(array($
    ruleSet)));
    }

    //forarray
    if(is_array($ruleSet)){
    if(isset($ruleSet['rule'])){
    if(!isset($ruleSet['message'])){
    $rule=is_string($ruleSet['rule'])?array($ruleSet['rule']):$ruleSet['ru
    le'];
    if(is_string($rule[0])&&!empty($this->_messages[strtolower($rule[0])])
    ){
    $ruleSet['message']=$this->_autoMessage($rule);
    }
    }
    }else{
    //formultiplerulesperfield
    foreach($ruleSetas$index=>$rule){
    if(!isset($rule['message'])){
    $rule=is_string($rule['rule'])?array($rule['rule']):$rule['rule'];
    if(is_string($rule[0])&&!empty($this->_messages[strtolower($rule[0])])
    ){
    $ruleSet[$index]['message']=$this->_autoMessage($rule);
    }
    }
    }
    }
    }
    }
    }
    }
    }
    `
    Now you can load this behavior in each of your models to activate auto
    validation message.
    `

    public$actsAs=array('ValidationMessage');



.. author:: rayhan
.. categories:: articles, behaviors
.. tags:: message,model,validation,behavior,Validation Behavior,Auto Validation Message,Behaviors

