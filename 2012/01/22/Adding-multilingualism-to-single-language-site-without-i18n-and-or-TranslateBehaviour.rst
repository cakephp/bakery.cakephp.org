Adding multilingualism to single language site without i18n and/or
TranslateBehaviour
==================

I'm currently working on a site that requires multiple languages. As I
didn't know this at the start of the project, I didn't prepare to use
CakePHP integrated facilities for translation. So I decided to put a
little something of my own...

Notice!
~~~~~~~
This tutorial is for CakePHP 2.x!


Basic premises
--------------

In CakePHP you have wonderful things like i18n and l10n, and
TranslateBehaviour. Problem is this is only useful if you design your
app from the beginning to do the translation as you go on. This
presumes having separate tables for translated content and so on. But
what if you want to use your contents table for all language content,
your news table for all the news in all the languages and so on. Then,
what you do is just add language_id to all the tables from where you
pull content, and have a languages table for mapping your languages to
names, and of course for adding new languages.


DB/Model setup
--------------

First you should create your content table, containing a language_id
field. And of course the languages table. Like so:
`
CREATETABLE`contents`(
`id`int(11)NOTNULLAUTO_INCREMENT,
`title`varchar(50)DEFAULTNULL,
`body`varchar(250)DEFAULTNULL,
`language_id`int(11)DEFAULTNULL,
PRIMARYKEY(`id`)
)ENGINE=MyISAMDEFAULTCHARSET=utf8AUTO_INCREMENT=1;

CREATETABLE`languages`(
`id`int(11)NOTNULLAUTO_INCREMENT,
`value`varchar(20)NOTNULL,
PRIMARYKEY(`id`),
UNIQUEKEY`value`(`value`)
)ENGINE=MyISAMAUTO_INCREMENT=5DEFAULTCHARSET=utf8AUTO_INCREMENT=5;
`
Create a model and the associations like. Content > belongsTo >
Language / Language > hasMany > Content. Example below.

Content.php
~~~~~~~~~~~
`
classContentextendsAppModel{

public$displayField='title';
public$validate=array(
'title'=>array(
'notempty'=>array(
'rule'=>array('notempty'),
),
),
'body'=>array(
'notempty'=>array(
'rule'=>array('notempty'),
),
),
);

public$belongsTo=array(
'Language'=>array(
'className'=>'Language',
'foreignKey'=>'language_id',
'conditions'=>'',
'fields'=>'',
'order'=>''
)
);
}
`

Language.php
~~~~~~~~~~~~
`
classLanguageextendsAppModel{

public$displayField='value';

public$hasMany=array(
'Content'=>array(
'className'=>'Content',
'foreignKey'=>'language_id',
'dependent'=>false)
);

}
<code>
<p>Wellthattakescareofdb/modelpart,letsgoontoController.</p>

<h2>Controllersetup</h2>

<p>Thecontrollersetupisprettyeasy,butdependsonhowisyoursiteconfigured.
IdoallmyfrontendcontentfromPagesControllercoupledwithextensiveuseofele
ments,andofcourseroutingtovariousactionsdefined.ForeaseofuseI'llbaseth
isonthebasicPagesControlleryougetwhenyoudownload/unpackCakePHP.ButI'mg
ettingaheadofmyself.Thereisonethingyoumustconfigurebeforeyoudoanything
.YoumustconfigureyourapptouseSessioncomponent.Thisisparamountasthisall
isbasedonaverysimpletrickusingsessions:)

So,let'sgo...InAppControlleryousimplyaddthefollowingcode

<code>
<?php
classAppControllerextendsController{
public$components=array('Session');
}
`
That's it, yes. Only that, a bit more code is contained in the
controller that serves the front page where you put the selectors for
the language. Basically links to controller actions only. I put the
links in default.ctp layout file because the top menu is the same for
all the pages. So let's look at how to config PagesController to make
the language switching possible. `
<?php
classPagesControllerextendsAppController{
publicfunctiondisplay(){
$path=func_get_args();
$count=count($path);
if(!$count){
$this->redirect('/');
}
$page=$subpage=$title_for_layout=null;

if(!empty($path[0])){
$page=$path[0];
}
if(!empty($path[1])){
$subpage=$path[1];
}
if(!empty($path[$count-1])){
$title_for_layout=Inflector::humanize($path[$count-1]);
}
$this->set(compact('page','subpage','title_for_layout'));
$this->render(implode('/',$path));
}
publicfunctionsetLangEng(){
$this->Session->write('lang','2');
$this->redirect(array('controller'=>'pages','action'=>'display','home'
));
}
publicfunctionsetLangGer(){
$this->Session->write('lang','1');
$this->redirect(array('controller'=>'pages','action'=>'display','home'
));
}
}
`
The only custom code here is setLangEng() and setLangGer() method that
only write a session variable for the language used. And of course you
have to configure the routes for those actions to map correctly. That
goes in your routes.php, and goes something like this.
`
//restoftheroutes.phpyouleavealone,justaddthesetwolinesafter
//Router::connect('/eng',array('controller'=>'pages','action'=>'displa
y','home'));

Router::connect('/eng',array('controller'=>'pages','action'=>'setLangE
ng'));
Router::connect('/ger',array('controller'=>'pages','action'=>'setLangG
er'));
`
And the last, but not the least piece of magic happens in
ContentsController where you set the content to get for each language
based on language_id ('lang' session variable) you set in the
PagesController.php. So you open the ContentsController.php, and add a
few methods of your own, like so...
`
<?php
classContentsControllerextendsAppController{
//basicindex,add,view,edit...
publicfunctiongetcont(){
if($this->Session->read('lang')==1)
{
$this->paginate=array(
'conditions'=>array('Content.language_id'=>1),
'limit'=>3,
'fields'=>array('News.body')
);
$content=$this->paginate('Content');
return$content;
}
if($this->Session->read('lang')==2)
{
$this->paginate=array(
'conditions'=>array('Content.language_id'=>2),
'limit'=>3,
'fields'=>array('News.body')
);
$content=$this->paginate('Content');
return$content;
}
}
`

Finishing it up
---------------

All you have to do now is to setup links for the language selection,
and of course, get the content. I do so in elements. But first the
links... Open your /app/View/Layouts/default.ctp and put the following
in in the place you want the language selection menu to be.
`
<ahref="/ger">Ger</a>
<ahref="/eng">Eng</a>
`
As you see i used plain HTML links, but that is because I like it more
that way, because the designer that works on the front end can then
find their way around more easily.

The last thing is to call up the content in the view. Because of the
way it is set up it will be the same view for every language, just the
content (or whatever you set up this way) will change depending on the
session variable 'lang'. So the view would look something like this
(I'll use the requestAction because I'm calling it from a different
controller).
`
//restofyourviewcode
<divclass="content-boxsix-cols">
<?php$contents=$this->requestAction('/contents/getcont');?>
<?phpforeach($contentsas$content):?>
<h2><?phpecho$content['Content']['title'];?></h2>
<p><?phpecho$content['Content']['body'];?></p>
<?phpendforeach;?>
</div>
`
So, this is about it... This is my first CakePHP writeup, all before
were, how do I do this, or how do I do that. All the other solutions
I've come accross for adding multiple languages had meant I had to do
massive refactoring, so I settled for this solution. It works just
fine. So if you like it, shout :)




.. author:: mormy
.. categories:: articles
.. tags:: translation,Internationalization,multilanguage,sessions,cakephp2,Articles

