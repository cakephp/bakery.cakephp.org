Internationalization with static and dynamic content, routing and
switching
=========

Many times, when I prepare a new website I always think how to solve
better internationalization. Mainly how resolve displaying dynamic
content in the event that this has not been translated into the
selected language, how to make search friendly links (called nice
urls, slugs) in the database, how to solve the problem of routing
these links and how to perform switching and keeping language.
In last web project I was prepared application without Cookies and
Session, but I only by switching parameter in the address (URL).


Why that solutions?
-------------------
Because Session and Cookies works perfectly when We haven’t translated
links by magic function from Gettext ( __(); ).

In many tutorials setting language is inside Controller (mainly
AppControler or Component). This doesn't work when We use translate
content in Router ( Router::connect(); ).
Sometimes tutorials resolved problem by set language and refresh page
(by $this->redirect(); ). I don't like that!


Routing
-------
I would like URL like these:

::


    / // home page for default language
    /en // home page for english
    /pl // home page for polish
    /de // home page for germany
    /register // register action (for e.g. UsersController) for default language
    /pl/rejestracja // register action for polish
    /de/anmeldung // register action for germans

And I thinking shouldn't work links like these:

::


    /pl/register // polish language for translated action name
    /en/anmeldung // like above
    …

Why? Because in my opinion there is no place for mixing links (mainly
for SEO).

My solutions is setting language before app starting (AppController)
and this is most ugly part in my article, latter I wrote why.


Let's start coding!
-------------------

bootstap.php (app/Config):
~~~~~~~~~~~~~~~~~~~~~~~~~~

::


    define('DEFAULT_LANGUAGE', 'en').

    Configure::write('Config.languages', array(
    	'en' => 'English version',
    	'pl' => 'Język polski',
    	'de' => 'Deutsch Version'));

In first line we define constant with 2-letter code for default
language, which is English. Next prepare array with codes and
description languages for own app and save it in configuration.


routes.php (app/Config):
~~~~~~~~~~~~~~~~~~~~~~~~

::


    $language = substr(Router::url(''), 0, 2); // check that it works properly (sometimes You must trip part of url, for e.g. folder names)
    $languages = array_keys(Configure::read('Config.languages'));

    if(!in_array($language, array_diff($languages, array(DEFAULT_LANGUAGE)))) {
    	$language = DEFAULT_LANGUAGE;
    	$schema = '';
    } else {
    	$schema = '/:language';
    }

    Configure::write('Config.language', $language);

    /* PagesController */
    Router::connect('/', array(
    	'controller' => 'pages',
    	'action' => 'display',
    	'home'));
    Router::connect('/:language', array(
    	'controller' => 'pages',
    	'action' => 'display',
    	'home'), array(
    		'language' => implode('|', $languages)));

    /* UsersController */
    Router::connect($schema .'/'. __('register', true), array(
    	'controller' => 'users',
    	'action' => 'register'), array(
    		'persist' => array(
    			'language')));

Yeah, in first line is most ugly code from all codes. This get first 2
letters from url for checking what is code represent language inside
configurations 'Config.languages'. Next prepare schema for using in
routing schemas and write selected language to Config.language .
In this code I was prepare 3 routing schemas for home page with
default language and with selected language and last for registration
page.

Note: How prepare app to using static translated content, using Poedit
app It has been well described in the book "CakePHP 1.3 Application
Development Cookbook" by Mariano Iglesias (Yeap, the book was
translated to polish!).

There is no different between 1.3 and 2.x.

I use magic parameter 'persist' for routing. It's works for adding
language params for $this->Html->links(); when the schema using
/:language . More info on `Router API`_.


AppHelper.php (app/Views/Helpers):
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::


    function url($url = null, $full = false) {
    	if($this->params['language'] == DEFAULT_LANGUAGE) {
    		unset($this->params['language']);
    	}

    	return parent::url($url, $full);
    }

I must rewrite url() method because I want using language parameter
from configuration. I unset language params when it is default,
because we have duplicate content (by 2 urls: /register and
/en/register).

When I rewrite url() method and using persist in routing schemas these
two things work perfectly together!


default.ctp (app/Views/Layouts/):
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Now we test own app with codes below:

::


    foreach(Configure::read('Config.languages') as $code => $language) { // show links for translated version
    	echo $this->Html->link($language, array(
    		'controller' => 'pages',
    		'action' => 'display',
    		'home',
    		'language' => $code)) .' ';
    }

    echo $this->Html->link(__('register', true), array( // show link to registartion page
    	'controller' => 'users',
    	'action' => 'register'));

And static, routing and switching all done.


Dynamic content
---------------
For dynamic conent Cake setting $locale variable by default in own app
from configuration ( Config.language ). How setting this variable by
hand is described on `Saving in another language`_.

But if We want display translate article from database and this
article isn't translated I want view oryginal version. How do this?


AppController.php (app/Controller):
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Put code below to beforeFilter(); .

::


    if(Configure::read('Config.language') !== DEFAULT_LANGUAGE) {
    	$this->{$this->modelClass}->locale = array(Configure::read('Config.language'), DEFAULT_LANGUAGE);
    } else {
    	$this->{$this->modelClass}->locale = DEFAULT_LANGUAGE;
    }

This try get translated version (first array param) or oryginal
version (second param).

How add, edit and translate content?
I think the best way is adding content in only default language, but
if You want translate content and save it, You must switch language
and go to edit page.

This is magic!
Whem we are on edit page and there is no language param in url, we
save it in default language, but when there is language param in url,
we save it in selected language.

Don't forget to prepare i18n database table and Your model for
translated fields.

That's all!
I waiting on question and comments! Tested on 2.2.5 version.

Sorry, but I still learn english.

kicaj
`blog.kdev.pl`_

.. _blog.kdev.pl: http://blog.kdev.pl
.. _Router API: http://book.cakephp.org/2.0/en/development/routing.html#router-api
.. _Saving in another language: http://book.cakephp.org/2.0/en/core-libraries/behaviors/translate.html#saving-in-another-language

.. author:: kicaj
.. categories:: articles
.. tags:: route,i18n,routing,url,Localization,Internationalization,l10n,switching,Articles

