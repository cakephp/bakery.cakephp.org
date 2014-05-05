Website Title and Character Set Component
=========================================

This component allows you to pass a URL to one of its functions and
retrieve an external page's and character set.

Usage:
Add the website.php component to your *"/app/controllers/components"*
folder, and then include it in your controller using:
`public $components = array('Website');`
Call either of the two functions in your controller:
`debug($this->Website->getTitle('http://www.cakephp.org'));`
`debug($this->Website->getCharset('http://www.cakephp.org'));`

Let me know if you have any problems!

Arron Bailiss `http://www.arronbailiss.com`_

::

    <?php

    /*
    *Copyright(c)2011ArronBailiss<arron@arronbailiss.com>
    *
    *Permissiontouse,copy,modify,anddistributethissoftwareforany
    *purposewithorwithoutfeeisherebygranted,providedthattheabove
    *copyrightnoticeandthispermissionnoticeappearinallcopies.
    *
    *THESOFTWAREISPROVIDED"ASIS"ANDTHEAUTHORDISCLAIMSALLWARRANTIES
    *WITHREGARDTOTHISSOFTWAREINCLUDINGALLIMPLIEDWARRANTIESOF
    *MERCHANTABILITYANDFITNESS.INNOEVENTSHALLTHEAUTHORBELIABLEFOR
    *ANYSPECIAL,DIRECT,INDIRECT,ORCONSEQUENTIALDAMAGESORANYDAMAGES
    *WHATSOEVERRESULTINGFROMLOSSOFUSE,DATAORPROFITS,WHETHERINAN
    *ACTIONOFCONTRACT,NEGLIGENCEOROTHERTORTIOUSACTION,ARISINGOUTOF
    *ORINCONNECTIONWITHTHEUSEORPERFORMANCEOFTHISSOFTWARE.
    */

    classWebsiteComponentextendsObject{

    /**
    *Referencetothecontrollerusingthiscomponent
    *@varController
    */
    protected$controller;
    /**
    *Timeinsecondstocachewebsiteinformation
    *@varint
    */
    public$cacheLimit;

    /**
    *Setupthecomponentreadyforuse
    *@paramController$controller
    */
    publicfunctionstartup($controller=null){
    App::import('Core','HttpSocket');
    $this->HttpSocket=newHttpSocket();
    $this->controller=$controller;
    $this->cacheLimit=60*15;//15mins
    }

    /**
    *GetthepagetitlefromaURL
    *@paramstring$urlURLtoretrievethepagetitlefrom
    *@parambool$htmlSettoTRUEtoretrievethehtmlentitiestitle
    */
    publicfunctiongetTitle($url='',$html=false){
    if(empty($url))returnfalse;
    $title='';

    $request=$this->__loadContent($url);
    $content=$request['content'];
    $currCharset=$this->getCharset($url);

    if(!empty($content)){
    //GetthepagetitleandconverttoUTF-8
    $matches=array();
    preg_match('#<title[.]*>(.+)<\/title>#is',$content,$matches);
    if(isset($matches[1])){
    $title=$matches[1];
    }
    }

    //Tidyup
    if($html)$title=@htmlentities($title,null,$currCharset);//Htmlentities
    ifrequired
    $title=preg_replace('/\s\s+/si','',trim($title));
    return$title;
    }

    /**
    *GetthepagecharactersetfromaURL
    *@paramstring$urlURLtoretrievethecharactersetfor
    */
    publicfunctiongetCharset($url=''){
    if(empty($url))returnfalse;
    $matches=array();

    $request=$this->__loadContent($url);
    $headers=$request['header'];
    $content=$request['content'];

    //Findthecharactertypeonthepage
    preg_match('#content="text/html;\s?charset=[a-zA-Z0-9\-]+#i',$content,
    $matches);
    if(!empty($matches)){
    $matches[0]=strtolower($matches[0]);
    returnsubstr($matches[0],strpos($matches[0],'charset=')+8);
    }
    else{
    //Findthecharactertypeinthepageheaders
    $matches=array();
    if(is_array($headers['Content-Type'])){
    preg_match('#text/html;\s?charset=[a-zA-Z0-9\-]+#i',$headers['Content-
    Type'][0],$matches);
    }
    else{
    preg_match('#text/html;\s?charset=[a-zA-Z0-9\-]+#i',$headers['Content-
    Type'],$matches);
    }

    if(!empty($matches)){
    $matches[0]=strtolower($matches[0]);
    returnsubstr($matches[0],strpos($matches[0],'charset=')+8);
    }

    //Lastresort-usePHPfunctionstodeterminethecharacterset
    $detectCharset=mb_detect_encoding($content);
    if(!empty($returnVal))return$detectCharset;
    }
    return'utf-8';//Default
    }

    /**
    *Performrequesttoretrievepagecontentorloaddatafromcache
    *@paramstring$urlURLtoretrievecontentfor
    */
    privatefunction__loadContent($url=''){
    //Refreshdatawhencachehasexpired
    $dateDiff=time()-$this->controller->Session->read('WebLookup.date');
    if($dateDiff>=$this->cacheLimit||!$this->controller->Session->check('W
    ebLookup')||$this->controller->Session->read('WebLookup.url')!=$url){
    $resp=$this->HttpSocket->get($url);
    if(isset($this->HttpSocket->response['header']['Location'])&&!empty($t
    his->HttpSocket->response['header']['Location'])){
    //Returnthecontentforredirectedpages
    return$this->__loadContent($this->HttpSocket->response['header']['Loca
    tion']);
    }

    //Setthecachedata
    $this->controller->Session->delete('WebLookup');
    $this->controller->Session->write('WebLookup.url',$url);
    $this->controller->Session->write('WebLookup.content',$resp);
    $this->controller->Session->write('WebLookup.header',$this->HttpSocket
    ->response['header']);
    $this->controller->Session->write('WebLookup.date',time());
    }
    return$this->controller->Session->read('WebLookup');
    }

    }


.. _http://www.arronbailiss.com: http://www.arronbailiss.com

.. author:: abailiss
.. categories:: articles, components
.. tags:: encoding,page title,charset,website,Components

