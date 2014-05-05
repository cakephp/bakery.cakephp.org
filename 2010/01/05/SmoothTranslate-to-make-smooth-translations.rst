SmoothTranslate to make smooth translations
===========================================

Usage of this behavior does not modify a real Translate behavior, it
extends it`s functionality in two cases: 1) Core Translate behavior,
when adding translation in other locale, original record`s
translatable field is also updated. In some cases we might want to
keep the original record`s translatable field, and this extended
behavior will allow you to unset those fields. 2) In some cases we
want our new record`s translatable field to have default translation
in all the locales used by our application. This extension allows you
to specify in which locales the default translation will be added
after a new record is inserted. Furthermore SmoothTranslate behavior
is a good example of how easily CakePHP core can be extended to meet
your needs.

First of all, thanks to the development team of CakePHP core, when it
comes to multilingual application it is very convenient that you can
simply translate records by adding them on the locale you are using at
the moment.

I had a case where I needed to translate all ACL ACO functions to
different languages for a user management plugin. Thanks to a good
example of simple ACL based application, it was easy to attach
Translate bahavior to a function which assembles all actions and
controllers into the ACO model. But it was good to have all default
translations at the same time, which later can be easily edited on
different locale, also in this case there is no need to alter original
table when adding translations later

So if you think this extension can help you, then follow the tutorial


Things you need to do
~~~~~~~~~~~~~~~~~~~~~


+ If you are not familiar with `Translate`_ behavior, read a manual
  about it first!
+ Save SmoothTranslate behavior to /app/models/behaviors/ directory
+ Setup a multi-language application
+ Use it :)



SmoothTranslate behavior
~~~~~~~~~~~~~~~~~~~~~~~~

::

    <?php
    // File -> app/models/behaviors/smooth_translate.php

    /**
     * SmoothTranslate behavior will leave your translation source
     * fields untouched and add default translation to the i18n table
     * for all locales which application uses.
     *
     * @author Sky_l3ppard
     * @version 2.1.2
     * @license MIT
     * @category Behaviors
     */
    App::import('Behavior', 'Translate');

    class SmoothTranslateBehavior extends TranslateBehavior {

    	/**
    	 * Initiate behavior with specified settings.
    	 * Available settings are:
    	 *
    	 * 		Array fields - translatable fields for the Translate behavior
    	 *
    	 * 		Array except - fields which will still be touched then translating
    	 *
    	 * 		Mixed locales - case: Array - list of locales for default translations
    	 * 			to be added. case: String - name of the language model which must
    	 * 			contain field "locale"
    	 *
    	 * @see cake/libs/model/ModelBehavior#setup($model, $config)
    	 * @return Void
    	 * @access Public
    	 */
    	function setup(&$Model, $settings) {
    		if (!isset($this->__settings[$Model->alias])) {
    			$this->__settings[$Model->alias] = array(
    				'fields' => array(),
    				'except' => array(),
    				'locales' => array()
    			);
    		}
    		if (!is_array($settings)) {
    			$settings = array();
    		}
    		$this->__settings[$Model->alias] = array_merge($this->__settings[$Model->alias], $settings);
    		//setup Translate behavior with translatable fields
    		return parent::setup($Model, $this->__settings[$Model->alias]['fields']);
    	}

    	/**
    	 * Callback executed before saving data. In this case it
    	 * will unset those fields which we want to leave untouched
    	 * then translating
    	 *
    	 * @see cake/libs/model/ModelBehavior#beforeSave($model)
    	 * @return Bolean - true to continue saving data
    	 * @access Public
    	 */
    	function beforeSave(&$Model) {
    		if (!empty($Model->data[$Model->alias]['id']) || !empty($Model->id)) {
    			foreach ($this->__settings[$Model->alias]['fields'] as $key => $field) {
    				$translatable_field = is_numeric($key) ? $field : $key;
    				if (!in_array($translatable_field, $this->__settings[$Model->alias]['except'])) {
    					unset($Model->data[$Model->alias][$field]);
    				}
    			}
    		}
    		return true;
    	}
    	/**
    	 * AfterSave callback.
    	 * Adds default translations to all languages included
    	 *
    	 * @see cake/libs/model/ModelBehavior#afterSave($model, $created)
    	 * @access Public
    	 * @return
    	 */
    	function afterSave(&$Model, $created) {
    		parent::afterSave($Model, $created);

    		//return if record is currently modified
    		if (!$created) {
    			return true;
    		}

    		//get specified locale list or from database
    		$locale_list = $this->__settings[$Model->alias]['locales'];
    		if (!is_array($locale_list)) {
    			$model_name = Inflector::classify($locale_list);
    			if (!App::import('Model', $model_name)) {
    				$this->log("SmoothTranslate, failed to import model: {$model_name}");
    			} else {
    				if (($pos = strpos($model_name, '.')) !== false) {
    					$pos += 1;
    					$model_name = substr ($model_name, $pos, strlen($model_name) - $pos);
    				}
    				$model_inst = new $model_name();
    				$locale_list = $model_inst->find('list', array('fields' => array($model_name.'.locale')));
    				unset($model_inst);
    			}
    		}
    		//if non of new locales return
    		if (empty($locale_list) || !is_array($locale_list)) {
    			return true;
    		}

    		$conditions['model'] = $Model->alias;
    		$conditions['foreign_key'] = $Model->id;
    		$translation_model = &$this->translateModel($Model);
    		$fields[] = $translation_model->alias.'.content';
    		$default_locale = $this->_getLocale($Model);

    		//add default translations for other locales
    		foreach ($this->__settings[$Model->alias]['fields'] as $key => $field) {
    			unset($conditions['content']);
    			$conditions['locale'] = $default_locale;
    			$conditions['field'] = is_numeric($key) ? $field : $key;

    			$translation = $translation_model->find('first', compact('conditions', 'fields'));
    			$conditions['content'] = $translation[$translation_model->alias]['content'];
    			foreach ($locale_list as $locale) {
    				if ($locale == $default_locale) {
    					continue;
    				}
    				$translation_model->create();
    				$translation_model->save(
    					array($translation_model->alias => array_merge($conditions, array('locale' => $locale)))
    				);
    			}
    		}
    	}
    }
    ?>



Setting up multilingual app
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Notice: this step is for beginners, otherwise skip this..

Before you begin, bake the translation table: I18n , by using cake
i18n shell script with option I . You can refer to the manual
`Creating i18n table`_ and you should also read about
`Internationalization`_.

First you need to specify default language, and a set of locales your
app will be using - either in database or in config. In this example
we will do it in config file /app/config/bootstrap.php, example code
as follows:

::

    <?php
    //tell cake about default app language
    Configure::write('Config.language', 'en-us');
    //list of available locales in application,
    //notice that these are not languages but locales
    //language maps can be found: /cake/libs/l10n.php
    Configure::write('Config.locales.available', array('en_us', 'rus', 'lit'));
    ?>

Furthermore, if you want to switch between languages you can create a
controller to handle it: /app/controllers/language_controller.php

Controller Class:
`````````````````

::

    <?php
    class LanguageController extends AppController {
    	var $name = 'Language';
    	var $uses = null;

    	function change($lang) {
    		$this->Session->write('Config.language', $lang);
    		$this->redirect($this->referer(), null, true);
    	}
    }
    ?>

Finally, your /app/app_controller.php for language switching

Controller Class:
`````````````````

::

    <?php
    class AppController extends Controller
    {
    	var $components = array('Session');
    	var $helpers = array('Html');

    	function beforeFilter() {
    		if($this->Session->check('Config.language')) {
    			Configure::write('Config.language', $this->Session->read('Config.language'));
    		} else {
    			$this->Session->write('Config.language', Configure::read('Config.language'));
    		}
    	}
    }
    ?>

And then you simply add a language switch link anywhere in your
/app/views/layouts/default.ctp layout:

View Template:
``````````````

::


    <ul>
    	<li><?php echo $html->link('EN', array('controller' => 'language', 'action' => 'change', 'en-us')); ?></li>
    	<li><?php echo $html->link('RU', array('controller' => 'language', 'action' => 'change', 'ru')); ?></li>
    	<li><?php echo $html->link('LT', array('controller' => 'language', 'action' => 'change', 'lt')); ?></li>
    </ul>


Note: if you are using internationalizing function __() and your
current language is set for example to en-us the list of translations
will be merged from the en_us locale
(/app/locale/en_us/LC_MESSAGES/default.po English-American)) and a
fallback locale eng (/app/locale/eng/LC_MESSAGES/default.po
English)same as all other languages. Language map can be found in
/cake/libs/l10n.php file.



Using the behavior
~~~~~~~~~~~~~~~~~~

I will assume we have a blog example installed and running. Then in
your Post model: /app/models/post.php add the following actsAs
behavior:

::

    <?php
    var $actsAs = array(
    	'SmoothTranslate' => array(
    		'fields' => array('title'),
    		'locales' => array('en_us', 'rus', 'lit')
    	)
    );
    ?>

or
In your Posts controller /app/controllers/posts_controller.php in the
beforeFilter function add these lines which will attach this behavior

::

    <?php
    $this->Post->Behaviors->attach(
    	'SmoothTranslate',
    	array(
    		'fields' => array('title'),
    		'locales' => Configure::read('Config.locales.available')
    	)
    );
    ?>


In this case we tell Translate behavior to translate Post.title field
and SmoothTranslate to create default translation records for all our
app locales and do not modify title field in the source record when
record is being saved in different locale.

Another way to do this is to specify locales by giving a model name,
where all application locales are stored:

::

    <?php
    var $actsAs = array(
    	'SmoothTranslate' => array(
    		'fields' => array('title'),
    		'locales' => 'Language'
    	)
    );
    ?>

Now default translations will be generated for all locales which will
be found on languages table.
Notice: languages table must contain a field locale which stores a
language locale

Next, if you have completed previous steps successfully,when a new
Post is created, two more default translations for a Post.title will
also be created. It is useful because Translate will not show Post, if
no Post translation is found.

Now, if we insert a new Post on en_us locale, for example, with
title-"test" and body-"body",
we should have something like this:

Post table:
id: 1
title: test
body: body

I18n table:
id: 1
foreign_key: 1
model: Post
field: title
locale: en_us
content: test
-------------
id: 2
...
locale: rus
content: test
-------------
id: 3
...
locale: lit
content: test

Now if we switch to rus language and edit the post with new values:
title-"zdarof" body-"nietu".. we will have:

Post table:
id: 1
title: test
body: nietu //because we do not translate this field, and it is not in
exception list

I18n table:
id: 1
...
locale: en_us
content: test
-------------
id: 2
...
locale: rus
content: zdarof
-------------
id: 3
...
locale: lit
content: test

[p]I hope everything is quite simple and objective. Any ideas for
additional SmoothTranslate functionality are very welcome


.. _Creating i18n table: http://book.cakephp.org/view/793/Initializing-the-i18n-Database-Tables
.. _Translate: http://book.cakephp.org/view/92/Translate
.. _Internationalization: http://book.cakephp.org/view/161/Internationalization-Localization

.. author:: sky_l3ppard
.. categories:: articles, behaviors
.. tags:: Translate,save original,default translations,sky leppard,persist,smoothtranslation,multi language,Behaviors

