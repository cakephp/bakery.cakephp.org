CakePHP internationalization and localization
=============================================

One of the best ways for your applications to reach a larger audience
is to cater for multiple languages. This can often prove to be a
daunting task, but the internationalization and localization features
in CakePHP make it much easier and better one of the advantages of
CakePHP is Internationalization and Localization with static
translations in gettext style or dynamic translations of model data
and It’s a good idea to serve up public content available in multiple
languages from a unique url – this makes it easy for users (and search
engines) to find what they’re looking for in the language they are
expecting. There are several ways to do this, it can be by using
language specific subdomains (en.example.com, fra.example.com, etc.),
or using a prefix to the url such as is done with this application.
You may also wish to glean the information from the browser’s user-
agent, among other things.

First, it’s important to understand some terminology.
Internationalization refers to the ability of an application to be
localized. The term localization refers to the adaptation of an
application to meet specific language (or culture) requirements (i.e.,
a “locale”).

1-Part:
First of all you need to change the Security.salt value of the
config/core.php to a different value, and then create the file
/app/config/config.php for inserting the languages you want to
display. In this article I’ll use English and Spanish, and the default
language is English.

PHP Snippet:
````````````

::

    <?php
    <?php

    /* add language to the file*/

    $config['LANGUAGE'] = array(‘supported’ => array(‘eng’, ‘spa’),

    ‘default’   => ‘eng’);
    ?>

Internationalization and localization are often abbreviated as i18n
and l10n respectively,

Why CakePHP use i18n or L10n?

because The terms are frequently abbreviated to the numeronyms i18n
(where 18 stands for the number of letters between the first i and
last n in internationalization, a usage coined at DEC in the 1970s or
80s) and L10n respectively, due to the length of the words. The
capital L in L10n helps to distinguish it from the lowercase i in
i18n.

You need to know your own language abbreviation. Here is the list of
languages and the abbreviation of them:

cake/libs/l10n.php

Note:The three-character locale codes conform to the ISO 639-2
standard, although if you create regional locales (en_US, en_GB, etc.)
cake will use them if appropriate.if you use The three-character
locale code it will locale as a fallback if it doesn’t exist add it
manually like this

$this->Session->write(‘Config.language’, ‘eng’);


For loading the configuration in your application, you need to append
the following code at the end of file config/core.php

PHP Code

PHP Snippet:
````````````

::

    <?php
    <?php

    Configure::load(‘config’);?>
    ?>

2-Part:
The language files in CakePHP have either the extension .po or .mo. In
this tutorial I’ll use .po files.

For getting more information you can refer to this article:

Localizing PHP Applications series Abouzekry wrote.
`https://phpmaster.com/localizing-php-applications-1`_
Note: Remember that po files are useful for short messages, if you
find you want to translate long paragraphs, or even whole pages – you
should consider implementing a different solution which we skip in
this article

We create this folders:

app/locale/eng
app/locale/spa
For this tutorial, we will use translation for “messages”, so each
language folder we have a sub folder names LC_MESSAGES (in uppercase).

Now we should have this:

app/locale/eng/LC_MESSAGES/default.po

app/locale/spa/LC_MESSAGES/default.po

Now that this step is finished, we can move on to the next step.

3-Part:
In order to work with CakePHP’s text function (ie : __() ..etc ..)
first we need to describe them , in fact The __() function identifies
these strings as translatable text that will differ by language locale
and uses the text within the __() function as the message ID. If we
define the translations for a certain language, those translations
will appear in place of these functions. If we do not define the
translations for that language, the text within the __() function will
display instead by default. Every word or phrase to translate is
composed of a pair id-string the id is the “msgid” value and the
string is the “msgstr” value.

Your Spanish PO file should look like this:

CODE

msgid “bienvenida”

msgstr ” En varios idiomas-tutorial por Alireza.”

msgid “congrat”

msgstr ” le da las gracias”

We now need to make a fake controller to switch between languages.
It’s role consists of calling the AppController::beforeFilter() method
when a user wants to switch languages.

Create the controller in app/controllers/switchto_controller.php using
the following code:

PHP Snippet:
````````````

::

    <?php
    <?php

    class SwitchtoController extends AppController {

    var $uses = array();

    var $name = ‘Switchto’;

    function beforeFilter()

    {

    parent::beforeFilter();

    }

    }



    The AppController needs some modifications; edit the controller so it looks like this:

    <?php

    class AppController extends Controller

    {

    function beforeFilter()

    {

    if($this->_checkLanguage())

    $this->redirect($this->referer(), null, true);

    }

    function _checkLanguage()

    {

    if(!$this->Session->check(‘Config.language’) || $this->name == “Switchto”) {

    $default_lang   = Configure::read(‘LANGUAGE.default’);

    $supported_lang = Configure::read(‘LANGUAGE.supported’);

    $lang = null;

    if($this->name == “Switchto”)

    $lang = $this->action;

    // we need the Cookie

    App::Import(‘Component’, ‘Cookie’);

    $cookie = & new CookieComponent;

    $cookie->time   = ‘+360 days’;

    $cookie->name   = ‘MYAPP’;

    $cookie->domain = ”;

    $cookie->key    = ‘whatever-key-you-wish’;

    $cookie->startup();

    if(!class_exists(“L10n”))

    uses(‘l10n’);

    $l10n = & new L10n();

    if(!$lang || !in_array($lang, $supported_lang))

    {

    if($cookie->read(‘tutolanguage.lang’) )

    {

    $lang = $cookie->read(‘tutolang/lang’);

    if(!in_array($lang, $supported_lang))

    $lang = null;

    }

    /* try to find a language spaom browser that we support */

    if(!$lang)

    {

    $browserLang = split (‘[,;]‘, env(‘HTTP_ACCEPT_LANGUAGE’));

    foreach($browserLang as $langKey )

    {

    if(isset($l10n->__l10nCatalog[$langKey]) &&

    in_array($l10n->__l10nCatalog[$langKey]['locale'], $supported_lang) )

    {

    $lang = $l10n->__l10nCatalog[$langKey]['locale'];

    break;

    }

    }

    }

    }

    if(!$lang)

    $lang = $language_default;

    // set the language, and write in cookie

    $l10n->__setLanguage($lang);

    $cookie->write(array(‘tutolanguage.lang’ => $lang));

    $this->Session->write(‘Config.language’,$lang);

    if($this->name == “Switchto”)

    return true;

    }

    return false;

    }

    }

     ?>

In order to remember the language selected by the user, we will use
cookies and so I’ve imported the Cookie component. I’ve chosen to
integrate the cookie this way instead of declaring it in $components
in order to avoid the overhead on the component in every call.

Explanations for _checkLanguage method:

The method work in 2 cases only: “when no session language is set” and
“when user wants to switch language”. This is handling by the first
condition statement.
We get our supported languages and the default one from the
configuration.
If the controller is “SwitchTo”, it’s because the user clicks on a
link to change the language. Then the action will be our language
chosen (see below how to set a link to handle language switching. We
suppose the desired language is the action name.
Next we import the Cookie component. Indeed in order to remember the
language we use cookies,I have used this way to integrate the cookie
instead of declaring it in the $components in order to avoid the
overhead on the component in every call(I test it ).
We set the cookie parameters, you may change this to your own setting.
Note that the call to $cookie->startup is essential to have the
expiration date properly initialized.
We will use the class L10n for setting our language. We instantiate an
object of this class.
We verify that our desired language is supported (either the desired
is null, or set by the SwitchTo action.
If the language is not supported we look if we have it in the cookie.
If so we still verify we support it (that can happen in case or a
removal of a language).
In case we did not have any language, we verify if one of the browser
supported language is matching one of our supported language. If so,
we will use the first one matching.
Still no language defined, then we will use our application default’s
language.
We use the L10n _setLanguage method to set our language application
wide and we set our session language (missing this will screw up the
process).
We write the language in the cookie. When a user comes back, he will
be automatically set to the last language he was.
We return true in case of a deliberated language switch in order the
beforeFilter to redirect to the referrer URL.
The beforerFilter is self-explanatory, we redirect to the referrer in
case the user did choose another language.

4-Part:
A sample main page

To test the example, I modified the cake default main page (copy from
cake distribution and place it in app/views/pages/display.ctp

PHP Snippet:
````````````

::

    <?php
    <h2><?php __(” bienvenida”); ?></h2>

    <br />

    <ul>

    <li><?php echo $html->link(‘English’, ‘/switchto/eng’);?></li>

    <li><?php echo $html->link(‘Spanish’, ‘/switchto/spa’);?></li>

    </ul>

    <br />

    <h3><?php echo __(“congrat”, true);?><h3>

     ?>

The file demonstrates two ways in which the __() function is used. In
either case, the first argument is a value that matches a msgid in the
default.po file. if the msgid is not found in the PO file, then the
value will be returned as is. By default, the translation message (or
the unmatched msgid) will be outputted to the user. But __() also
supports a second optional Boolean parameter which you can use if you
want to capture the output instead of sending it, perhaps to pass to
another function or anything else you may need to do to it.

It’s worth noting the language files are cached into the
tmp/cache/persistent/cake_core_default_xxx files (where xxx is the
locale). When using cake with debug = 0, be sure to delete the cached
language file in order to reflect the changes immediately.

5-Part: Summery
When it comes to internationalization and localization your web
application, you may have a lot of options but CakePHP will be the
best choice . in fact using cookie instead of subdomain and other ways
or using translations in gettext style have lots of advantages which
we will find in this article and CakePHP make it rapid and more
flexible to create your applicatio

.. _https://phpmaster.com/localizing-php-applications-1: https://phpmaster.com/localizing-php-applications-1

.. author::
.. categories:: articles
.. tags:: Articles

