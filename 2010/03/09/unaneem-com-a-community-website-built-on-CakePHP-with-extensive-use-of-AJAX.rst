unaneem.com : a community website built on CakePHP with extensive use of AJAX
=============================================================================

[p]On April 2007 a friend and I started a project we named
"[b]unaneem[/b]". The purpose of this project was to develop a
community website which helps people to share and organize events.We
decided to use only open source technologies. As our core application
library we used [b]CakePHP[/b].[/p][p]The project steps over time were
:[/p] [list] [li]April 2007 to June2007 : Functional studies[/li]
[li]June 2007 to July 2007 : Templates design[/li] [li]July 2007 to
September 2007 : Database development[/li] [li]September 2007 to
October 2008 (now): Application development[/li] [li]October 2008 :
Production deployment : [b]unaneem goes online ![/b][/li] [li]October
2008 to 2009 (now): [b]Beta version[/b] test and debug[/li] [/list]
[p]The application uses CakePHP as its core PHP library, Prototype as
its core AJAX library and many open source external PHP and JS
libraries :[/p] [p]PHP Libraries :[list] [li]PHPThumb[/li]
[li]PHPBrowscap[/li] [li]KCaptcha[/li] [li]...[/li] [/list][/p] [p]JS
Libraries :[list] [li]Scriptaculous[/li] [li]SWFUpload[/li]
[li]Lightbox[/li] [li]...[/li] [/list][/p] [p]You can see the
application current version at [url]http://www.unaneem.com/[/url][/p]


Motivation

As a computer engineer, a little bit geeky I confess, I wanted to
create my own business. I was very interested in the opportunities
given by the web technologies. In 2007, I felt that I should take the
opportunity to create a web 2.0 (3.0, 4.0, 2.265.34, how marketing is
that !) website. I came up with the idea of a community website were
people would be able to share their favorite places and events and
communicate in order to hang out with friends.

I talked about this project with a friend of mine and he decided to
build it with me. We began with a white paper sheet with nothing more
than our fingers, keyboards and imagination. As we had nothing (you
know the kind of things like money that makes it a lot easier...) we
decided to work only with open source technologies and get the best of
it.

2 years later we've got a running web application that matches our
initial vision. From nothing, from scratch to the real thing, that's
where my motivation is !



Why CakePHP ?

Our main frameworks :

+ CakePHP (as our core PHP framework): `http://cakephp.org/`_
+ Prototype (as our main AJAX framework) :
  `http://www.prototypejs.org/`_


We decided to rely on php/mysql server-side technologies and
javascript with AJAX integration for client-side technologies. As we
were searching for frameworks we found CakePHP and were seduced by
it's "orthodox" MVC (Model View Controller) approach and AJAX
prospects.



The softwares/tools we use with CakePHP

We are using free (open source) softwares for development,design and
maintenance of our CakePHP application:

Server softwares :

+ Apache 2: `http://www.apache.org/`_
+ MySQL 5.1: `http://www.mysql.com/`_
+ QMAIL: `http://www.qmail.org/`_


Database design, integration and maintenance :

+ DBDesigner 4: `http://fabforce.net/dbdesigner4/`_
+ PHPMyAdmin: `http://www.phpmyadmin.net/`_


Programming tools:

+ Notepad++: `http://notepad-plus.sourceforge.net/`_


Web browsers (for cross-compatibility purpose) and browser debugging
tools:

+ Mozilla 2,3 (PC): `http://www.mozilla.org/`_
+ FireBug: `http://getfirebug.com/`_
+ IE 6,7,8 (PC): `http://www.microsoft.com/`_
+ Internet Explorer Developer ToolBar: `http://www.microsoft.com/downloadS/details.aspx?familyid=E59C3964-672D-4511-BB3E-2D5E1DB91038=en`_
+ Chrome Browser (PC): `http://www.google.com/chrome/`_
+ Safari Browser (PC + MAC): `http://www.apple.com/safari/`_
+ Opera Browser (PC): `http://www.opera.com/`_
+ Konqueror Browser (LINUX): `http://www.konqueror.org/`_


Graphic design and optimization :

+ GIMP: `http://www.gimp.org/`_
+ PngOptimizer: `http://psydk.org/PngOptimizer.php`_


These are the main tools/softwares we are using on this project.



The technologies we integrated with CakePHP

We used many external libraries for specific purpose that should
answer our functionnal needs. And we found great snippets, helpers,
components, controllers and tutorials on the bakery that eased
integration.



The PHP libraries we use with CakePHP:


+

CSSpp for CSS compression:
++++++++++++++++++++++++++

    + Library: `https://trac.cakephp.org/browser/vendor/csspp/csspp.php`_
    + This feature is one of CakePHP basic features.

+

KCaptcha for captcha generation:
++++++++++++++++++++++++++++++++

    + Library: `http://www.captcha.ru/en/kcaptcha/`_
    + Integration based on the following Bakery component:
      `http://bakery.cakephp.org/articles/view/integrate-cakephp-with-kcaptcha`_

+

PHPThumb for thumbnails generation:
+++++++++++++++++++++++++++++++++++

    + Library: `http://phpthumb.sourceforge.net/`_
    + Integration based on the following Bakery component and snippet:
      `http://bakery.cakephp.org/articles/view/phpthumb-component`_ and
      `http://bakery.cakephp.org/articles/view/thumbnails-generation-with-phpthumb`_

+

PHPBrowscap for accurate browser detection:
+++++++++++++++++++++++++++++++++++++++++++

    + Library: `http://code.google.com/p/phpbrowscap/`_
    + To integrate this library we developped a custom CakePHP component.

+

OpenInviter to provide a contact importer service to our users:
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    + Library: `http://openinviter.com/`_
    + To integrate this library we developped a custom CakePHP component.

+

HostIP for IP geotargeting (not very reliable, we're currently
searching for another solution):
++++++++++++++++++++++++++++++++

    + Library: `http://www.hostip.info/`_
    + To integrate this library we developped a custom CakePHP component
      disclosed here : `http://bakery.cakephp.org/articles/view/openinviter-for-cakephp-2`_.




The Javascript libraries we use with CakePHP:


+

FCKeditor for text editing:
+++++++++++++++++++++++++++

    + Library: `http://www.fckeditor.net/`_
    + Integration based on the following Bakery tutorial:
      `http://bakery.cakephp.org/articles/view/using-fckeditor-with-cakephp`_

+

SWF Upload for AJAX picture upload:
+++++++++++++++++++++++++++++++++++

    + Library: `http://swfupload.org/`_
    + Integration based on the following Bakery component:
      `http://bakery.cakephp.org/articles/view/swfupload-and-multipurpose-uploader`_

+

Scriptaculous for various graphic effects:
++++++++++++++++++++++++++++++++++++++++++

    + Library: `http://script.aculo.us/`_
    + To integrate this library we developped a custom helper.

+

LightBox 2 for full image display:
++++++++++++++++++++++++++++++++++

    + Library: `http://www.lokeshdhakar.com/projects/lightbox2/`_
    + To integrate this library we developped a custom helper.

+

HelpBalloon 2 to display tooltips:
++++++++++++++++++++++++++++++++++

    + Library:
      `http://www.beauscott.com/examples/help_balloons/doc/examples.php`_
    + To integrate this library we developped a custom helper.



All these libraries are licensed as open source (GPL,BSD,MIT,etc...)
and with a little bit of JS/PHP/MySQL handcrafting they can be used in
a professional context, show great performances and functional value.



Steps toward production of a CakePHP application



Functional studies
``````````````````
   Our first task was to assess all the functionalities the different
   user categories (visitors, members, etc...) would access throughout
   the application. We created a functionnal chart which was in a way a
   summary of what our website would be. For this task we used white
   paper sheets and pens, well it had to begin somewhere.

Templates design
````````````````
   Then, we decided to design templates of the various website pages. For
   this purpose we used the GIMP to design various graphic objects and
   Notepad++ for html/css programming.

Database development
````````````````````
   We created the database according to our functional chart with
   dbdesigner and tested it with PMA (PhpMyAdmin).

Application development
```````````````````````
   We began learning how to use CakePHP and developping the application
   (with notepad++ the greatest web development tool in the world i
   guess). Our goal before deployment was to gather as many functionnal
   needs as possible to provide a service that would attract people on
   the website and keep them coming to help us with the beta testing.

Production deployment : unaneem goes online
```````````````````````````````````````````
   We deployed unaneem (`http://www.unaneem.com/`_) and asked to our
   friends and relatives to sign up on October 2008.

Beta version test and debug
```````````````````````````
   We are currently testing unaneem with 170 users (if you want to
   contribute anyone can sign up). Our users can use a website feature
   called "bug report" to send reports about enhancements or bugs to be
   corrected. The point is to have the smoothest result in terms of
   navigation and performances.



Challenges we had to face and overcome using CakePHP
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


full UTF-8 support
``````````````````
   Our application is intended to be international and therefore to be
   UTF-8 compliant to handle all kind of characters (japanese, arabic,
   russian, etc...). We had to set every application layers to UTF-8
   (database, php core: CakePHP, html documents, javascript functions and
   core : Prototype).CakePHP supports natively UTF-8 data input and
   outputs. However some basic PHP functions are not relevant with UTF-8
   characters. We had to build a custom CakePHP helper and a custom
   CakePHP component to handle what should be basic text manipulation.
   For instance, the "substr" PHP method is not compliant with UTF-8. An
   UTF-8 non latin character is multibytes. It occurs that the "substr"
   method doesn't count characters but bytes. When you get a substring
   from an UTF-8 multibyte string, a multibyte character can be cropped
   in the middle and return a false multibyte character code. The output
   of the "substr" method will be a string ending with a multibyte string
   error. We created a custom method to handle this kind of basic
   manipulation which prevents this kind of errors. Here's the code for
   this custom substring UTF-8 method (needs mb_string to be loaded):

::


    function substring($string = '',$limit = 10,$suffix='...',$from = 0){
    	if(isset($string)&&is_string($string)){
    		if(mb_strlen($string,'UTF-8')>$limit){
    			//removing characters according to limit and UTF-8 encoding
    			$string = preg_replace('#^(?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$from.'}'.'((?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$limit.'}).*#s','$1', $string);
    			return $string.$suffix;
    		}else{
    			return $string;
    		}
    	}else{
    		return null;
    	}
    }


Dynamic sitemaps generation
```````````````````````````
   As I wrote before, our application is intended to be international and
   is mutlilingual. We have multiple host aliases based on various
   locales to set the right language and localization for our users (en-
   us : english for united states,en-en : english for england,fr-fr :
   french for france,es-es : spanish for spain,...). Each document of our
   site must be indexed for these various locales. For instance the home
   page needs to be indexed by search engines as:

    + `http://en-us.unaneem.com/home/index`_
    + `http://es-es.unaneem.com/home/index`_
    + `http://fr-fr.unaneem.com/home/index`_

   The application translations are saved in a database with
   corresponding locale codes. When a locale is detected in the typed
   url, the application switches to the right language which is set into
   a view variable. For indexing purpose we had to have one sitemap per
   locale. And the sitemap has to be located at the website root
   (example: `http://www.mysite.com/sitemap.xml`_). This recommendation
   is made by `http://www.sitemaps.org/`_. We had two problems occuring.
   First, to generate sitemaps for each locales with a cron job every
   week and the second problem was to make all the sitemaps accessible
   with a root-level path.

    + First problem: Creating a cronjob using CakePHP controllers and
      models to fetch the language database and the main data database to
      create sitemaps for each locales in a webroot folder.

   To create our CakePHP cron we based our work on this great bakery
   article: `http://bakery.cakephp.org/articles/view/calling-controller-actions-from-cron-and-the-command-line`_
   We built a controller which
   could only be called by the CakePHP cron dispatcher with a method that
   would generate the sitemaps.

    + Second problem: Make the sitemaps accessible from a root level path.

   The generated sitemaps are located in folders and subfolders of the
   webroot directory. This means that they would be accessible by typing
   "mysite.com/folder/subfoled/sitemap.xml". But they should be
   accessible by typing "mysite.com/sitemap.xml" instead. To solve this
   problem we created a sitemaps controller which could read and render
   the requested sitemap. We used one of the great CakePHP ability which
   is custom routes . When we type : `http://www.mysite.com/sitemap_en-us_index.xml`_,
   the custom route calls the sitemaps controller with
   index action and parse the string "sitemap_en-us_index" to put in the
   $this->params['pass'] the locale (ie: "en-us") and the kind of file
   (ie: "index"). The custom route which is located in the
   /config/routes.php file looks like :

::

    //For sitemaps : specific pattern connects to sitemaps controller
    $Route->connect('/sitemap_((index)|([0-9]+)).xml', array('controller' => 'sitemaps', 'action' => 'index'));
    $Route->connect('/sitemap_([a-z]{2}-[a-z]{2}){1}_((index)|([0-9]+)).xml', array('controller' => 'sitemaps', 'action' => 'index'));


Native CakePHP 1.1 poor join tables management
``````````````````````````````````````````````
Another problem was directly linked to CakePHP HABTM
(hasAndBelongsToMany) management. For instance I have a join table
"members_messages" between the "members" table and the "messages"
table and I want to put a flag on the unread messages. This means that
I'll have a field ("unread") on the join table. The problem we had
with CakePHP native functions was to manipulate these kind of fields.
An other concern was adding, deleting and finding join relationships
with extra join table fields. To solve this problem, I found a great
Bakery article `http://bakery.cakephp.org/articles/view/add-delete-habtm-behavior`_.
It occured to me that this solution was not solving
all my habtm issues because the add/delete methods were resetting the
extra fields values. I created custom methods that would perform CRUD
operations over join tables preserving join tables extra fields. In
app_model.php in the app root I added these methods that I called
"smartHABTM..." :

Model Class:
````````````

::

    <?php class AppModel extends Model{
    	/**
    	* Smart!!! Find
    	* fetch habtm relationship and returns full habtm table data
    	*
    	* @param string $assoc
    	* @param int $id
    	* @return array
    	**/
    	function smartHabtmFind($assoc, $id) {

    		//smart bind
    		$className = $this->smartHabtmBind($assoc);

    		if($className===false){
    			return array();
    		}else{
    			// temp holder for model-sensitive params
    			$tmp_recursive = $this->recursive;
    			$tmp_cacheQueries = $this->cacheQueries;

    			$this->recursive = 1;
    			$this->cacheQueries = false;

    			$this->expects(array($className));

    			$data = $this->read(array($this->name.'.'.$this->primaryKey),$id);

    			$this->recursive = $tmp_recursive;
    			$this->cacheQueries = $tmp_cacheQueries;

    			if($this->smartHabtmUnbind($assoc)===false){
    				return array();
    			}else{
    				if(isset($data[$className])){
    					return $data[$className];
    				}else{
    					return array();
    				}
    			}
    		}
    	}

    	/**
    	* Smart!!! Add
    	* Add a Smart!!! HABTM association
    	*
    	* @param string $assoc
    	* @param int $id
    	* @param mixed $assoc_ids
    	* @return boolean
    	**/
    	function smartHabtmAdd($assoc, $id, $assoc_ids,$extra = array()){

    		if(!is_array($assoc_ids)){
    			$assoc_ids = array($assoc_ids);
    		}

    		if(isset($this->hasAndBelongsToMany[$assoc])){

    			//smart bind
    			$className = $this->smartHabtmBind($assoc);

    			if($className===false){
    				return false;
    			}else{

    				$data = $this->smartHabtmFind($assoc,$id);

    				$new_data = $data;

    				foreach($assoc_ids as $assoc_id){

    					$assoc_data = $this->__buildRecordSet($className,$assoc,$id,$assoc_id,$extra);

    					$add = true;
    					foreach($new_data as &$record){
    						if($add&&isset($record[$this->hasAndBelongsToMany[$assoc]['foreignKey']])&&isset($record[$this->hasAndBelongsToMany[$assoc]['associationForeignKey']])&&isset($assoc_data[$this->hasAndBelongsToMany[$assoc]['foreignKey']])&&isset($assoc_data[$this->hasAndBelongsToMany[$assoc]['associationForeignKey']])&&($record[$this->hasAndBelongsToMany[$assoc]['foreignKey']]==$assoc_data[$this->hasAndBelongsToMany[$assoc]['foreignKey']])&&($record[$this->hasAndBelongsToMany[$assoc]['associationForeignKey']]==$assoc_data[$this->hasAndBelongsToMany[$assoc]['associationForeignKey']])){
    							$add = false;
    							foreach($record as $key => &$field){
    								foreach($assoc_data as $assoc_key => $assoc_field){
    									if($key===$assoc_key){
    										$field = $assoc_field;
    									}
    								}
    							}
    							break;
    						}
    					}
    					if($add){
    						$new_data[] = $assoc_data;
    					}

    				}

    				if(isset($new_data)&&!empty($new_data)){

    					$new_data = Set::diff($new_data,$data);

    					if(empty($new_data)){
    						$this->smartHabtmUnbind($assoc);
    						return true;
    					}else{
    						$tmp_cacheQueries = $this->$className->cacheQueries;
    						$this->$className->cacheQueries = false;
    						foreach($new_data as $save){
    							if($this->$className->save(array($className => $save))){
    								$this->$className->id = false;
    								continue;
    							}else{
    								$this->$className->cacheQueries = $tmp_cacheQueries;
    								$this->smartHabtmUnbind($assoc);
    								return false;
    							}
    						}
    						$this->$className->cacheQueries = $tmp_cacheQueries;
    						$this->smartHabtmUnbind($assoc);
    						return true;
    					}
    				}else{
    					$this->smartHabtmUnbind($assoc);
    					return false;
    				}

    			}

    		}else{
    			return false;
    		}
    	}

    	/**
    	* Smart!!! Delete
    	* Smart!!! Delete of an HABTM association
    	*
    	* @param string $assoc
    	* @param int $id
    	* @param mixed $assoc_ids
    	* @return boolean
    	*/
    	function smartHabtmDelete($assoc, $id, $assoc_ids) {

    		if(!is_array($assoc_ids)){
    			$assoc_ids = array($assoc_ids);
    		}

    		if(isset($this->hasAndBelongsToMany[$assoc])){

    			//smart bind
    			$className = $this->smartHabtmBind($assoc);

    			if($className===false){
    				return false;
    			}else{

    				$delete = array();
    				$data = $this->smartHabtmFind($assoc,$id);

    				foreach($assoc_ids as $assoc_id){

    					$assoc_data = $this->__buildRecordSet($className,$assoc,$id,$assoc_id);

    					foreach($data as &$record){
    						if(isset($record[$this->hasAndBelongsToMany[$assoc]['foreignKey']])&&isset($record[$this->hasAndBelongsToMany[$assoc]['associationForeignKey']])&&isset($assoc_data[$this->hasAndBelongsToMany[$assoc]['foreignKey']])&&isset($assoc_data[$this->hasAndBelongsToMany[$assoc]['associationForeignKey']])&&($record[$this->hasAndBelongsToMany[$assoc]['foreignKey']]==$assoc_data[$this->hasAndBelongsToMany[$assoc]['foreignKey']])&&($record[$this->hasAndBelongsToMany[$assoc]['associationForeignKey']]==$assoc_data[$this->hasAndBelongsToMany[$assoc]['associationForeignKey']])){
    							$delete[] = $record[$this->$className->primaryKey];
    						}
    					}
    				}

    				if(empty($delete)){
    					$this->smartHabtmUnbind($assoc);
    					return false;
    				}else{
    					$tmp_cacheQueries = $this->$className->cacheQueries;
    					$this->$className->cacheQueries = false;
    					foreach($delete as $del){
    						if($this->$className->del($del)){
    							continue;
    						}else{
    							$this->$className->cacheQueries = $tmp_cacheQueries;
    							$this->smartHabtmUnbind($assoc);
    							return false;
    						}
    					}
    					$this->$className->cacheQueries = $tmp_cacheQueries;
    					$this->smartHabtmUnbind($assoc);
    					return true;
    				}
    			}
    		}else{
    			return false;
    		}
    	}

    	/**
    	* Smart!!! bind
    	* to fake habtm association
    	* enables CRUD on habtm relationships
    	*
    	* @param string $assoc
    	* @return className
    	**/
    	function smartHabtmBind($assoc,$unbind = false) {
    		if(isset($this->hasAndBelongsToMany[$assoc])&&(isset($this->hasAndBelongsToMany[$assoc]['joinTable']))){
    			$className = Inflector::classify($this->hasAndBelongsToMany[$assoc]['joinTable']);
    			if(!isset($this->hasMany[$className])){
    				/*$this hasMany habtm & habtm belongsTo $this*/
    				if($unbind){
    					$this->unbindModel(array('hasMany' => array($className => array('className' => $className))));
    				}else{
    					$this->bindModel(array('hasMany' => array($className => array('className' => $className))));
    					if(!isset($this->$className->belongsTo[$this->name])){
    						$this->$className->bindModel(array('belongsTo' => array($this->name => array('className' => $this->name))));
    					}
    				}
    			}
    			if(!isset($this->$assoc->hasMany[$className])){
    				/*$this->$assoc hasMany habtm & habtm belongsTo $this->$assoc*/
    				if($unbind){
    					$this->$assoc->unbindModel(array('hasMany' => array($className => array('className' => $className))));
    				}else{
    					$this->$assoc->bindModel(array('hasMany' => array($className => array('className' => $className))));
    					if(!isset($this->$assoc->$className->belongsTo[$this->$assoc->name])){
    						$this->$assoc->$className->bindModel(array('belongsTo' => array($this->$assoc->name => array('className' => $this->$assoc->name))));
    					}
    				}
    			}
    			return $className;
    		}else{
    			return false;
    		}
    	}

    	/**
    	* Smart!!! unbind
    	* destroy fake habtm association
    	*
    	* @param string $assoc
    	* @return className
    	**/
    	function smartHabtmUnbind($assoc) {
    		if($this->smartHabtmBind($assoc,true)===false){
    			return false;
    		}else{
    			return true;
    		}
    	}

    	function __buildRecordSet($className,$assoc,$id,$assoc_id,$extra=null){

    		$assoc_data = array();
    		$fields = Set::extract($this->$className->_tableInfo,'value.{n}.name');

    		//building record set
    		foreach($fields as $field){

    			switch($field){
    				case $this->hasAndBelongsToMany[$assoc]['foreignKey']:
    					$assoc_data[$field] = $id;
    				break;
    				case $this->hasAndBelongsToMany[$assoc]['associationForeignKey']:
    					$assoc_data[$field] = $assoc_id;
    				break;
    			}

    			if(is_array($extra)&&array_key_exists($field,$extra)){
    				$assoc_data[$field] = $extra[$field];
    			}

    		}

    		return $assoc_data;
    	}
    }?>




What is left to do
"The hard part is done ! The hardest remains"

Currently we are correcting the bugs reported by our users and there
are still many of them. We're also working on some enhancements.
Besides, we have a lot of work to do to ensure cross-browser
compatibility (we want the website to work on browsers like IE 6 and
that's not an easy thing...)



Thanks !

Thanks for reading this article. I Hope that you'll visit us soon at
`http://www.unaneem.com/`_ and give your feedbacks. If you want to
follow our updates on unaneem's new developments you can also visit
our developers blog (sorry in french only for now) at
`http://blog.unaneem.com/`_. And by the way thanks to the CakePHP
developers for their great framework and to all the community for
their contributions.



.. _http://www.microsoft.com/downloads/details.aspx?familyid=e59c3964-672d-4511-bb3e-2d5e1db91038=en: http://www.microsoft.com/downloads/details.aspx?familyid=e59c3964-672d-4511-bb3e-2d5e1db91038=en
.. _http://www.google.com/chrome/: http://www.google.com/chrome/
.. _http://www.beauscott.com/examples/help_balloons/doc/examples.php: http://www.beauscott.com/examples/help_balloons/doc/examples.php
.. _http://bakery.cakephp.org/articles/view/calling-controller-actions-from-cron-and-the-command-line: http://bakery.cakephp.org/articles/view/calling-controller-actions-from-cron-and-the-command-line
.. _http://www.unaneem.com/: http://www.unaneem.com/
.. _http://www.lokeshdhakar.com/projects/lightbox2/: http://www.lokeshdhakar.com/projects/lightbox2/
.. _=en: http://www.microsoft.com/downloadS/details.aspx?familyid=E59C3964-672D-4511-BB3E-2D5E1DB91038&displaylang=en
.. _http://bakery.cakephp.org/articles/view/thumbnails-generation-with-phpthumb: http://bakery.cakephp.org/articles/view/thumbnails-generation-with-phpthumb
.. _http://fr-fr.unaneem.com/home/index: http://fr-fr.unaneem.com/home/index
.. _http://www.mozilla.org/: http://www.mozilla.org/
.. _http://www.gimp.org/: http://www.gimp.org/
.. _http://bakery.cakephp.org/articles/view/openinviter-for-cakephp-2: http://bakery.cakephp.org/articles/view/openinviter-for-cakephp-2
.. _http://bakery.cakephp.org/articles/view/integrate-cakephp-with-kcaptcha: http://bakery.cakephp.org/articles/view/integrate-cakephp-with-kcaptcha
.. _http://www.microsoft.com/: http://www.microsoft.com/
.. _http://phpthumb.sourceforge.net/: http://phpthumb.sourceforge.net/
.. _http://bakery.cakephp.org/articles/view/phpthumb-component: http://bakery.cakephp.org/articles/view/phpthumb-component
.. _http://notepad-plus.sourceforge.net/: http://notepad-plus.sourceforge.net/
.. _http://bakery.cakephp.org/articles/view/swfupload-and-multipurpose-uploader: http://bakery.cakephp.org/articles/view/swfupload-and-multipurpose-uploader
.. _http://www.captcha.ru/en/kcaptcha/: http://www.captcha.ru/en/kcaptcha/
.. _http://openinviter.com/: http://openinviter.com/
.. _http://cakephp.org/: http://cakephp.org/
.. _http://fabforce.net/dbdesigner4/: http://fabforce.net/dbdesigner4/
.. _http://es-es.unaneem.com/home/index: http://es-es.unaneem.com/home/index
.. _http://www.mysite.com/sitemap_en-us_index.xml: http://www.mysite.com/sitemap_en-us_index.xml
.. _http://script.aculo.us/: http://script.aculo.us/
.. _http://blog.unaneem.com/: http://blog.unaneem.com/
.. _http://bakery.cakephp.org/articles/view/using-fckeditor-with-cakephp: http://bakery.cakephp.org/articles/view/using-fckeditor-with-cakephp
.. _http://www.fckeditor.net/: http://www.fckeditor.net/
.. _http://www.konqueror.org/: http://www.konqueror.org/
.. _http://swfupload.org/: http://swfupload.org/
.. _http://www.mysite.com/sitemap.xml: http://www.mysite.com/sitemap.xml
.. _https://trac.cakephp.org/browser/vendor/csspp/csspp.php : https://trac.cakephp.org/browser/vendor/csspp/csspp.php
.. _http://www.prototypejs.org/: http://www.prototypejs.org/
.. _http://www.apache.org/: http://www.apache.org/
.. _http://www.hostip.info/: http://www.hostip.info/
.. _http://psydk.org/PngOptimizer.php: http://psydk.org/PngOptimizer.php
.. _http://www.apple.com/safari/: http://www.apple.com/safari/
.. _http://www.sitemaps.org/: http://www.sitemaps.org/
.. _http://en-us.unaneem.com/home/index: http://en-us.unaneem.com/home/index
.. _http://bakery.cakephp.org/articles/view/add-delete-habtm-behavior: http://bakery.cakephp.org/articles/view/add-delete-habtm-behavior
.. _http://www.phpmyadmin.net/: http://www.phpmyadmin.net/
.. _http://code.google.com/p/phpbrowscap/: http://code.google.com/p/phpbrowscap/
.. _http://www.qmail.org/: http://www.qmail.org/
.. _http://getfirebug.com/: http://getfirebug.com/
.. _http://www.mysql.com/: http://www.mysql.com/
.. _http://www.opera.com/: http://www.opera.com/

.. author:: Kainchi
.. categories:: articles, case_studies
.. tags:: AJAX,CakePHP,unaneem,community website,Case Studies

