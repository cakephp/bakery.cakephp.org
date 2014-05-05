For the Core Translation Behavior (i18n)
========================================

I started using the Core Translation Behavior. I discovered that if I
added a record, it was only being added in ONE language. I don't know
how other people create the records in the i18m table for the other
languages, at the same time. What I did is a little hack on the
TranslateBehavior's afterSave, so if the record was $created it would
be created in ALL languages I have defined in my core.php.

I have all the languages used in my App defined in core.php as

::

    Configure::write('Config.languages', array(
        'spa' => __('Español', true),
        'eng' => __('English', true),
    ));

So it is easy to add them to a selectbox and select the language.

I first copied translate.php from CakePHP core files into my
APP/models/behavior directory.

Then, the change in the translate.php `afterSave` method is as
follows:

::

    function afterSave(&$model, $created) {
          if (!isset($this->runtime[$model->alias]['beforeSave'])) {
            return true;
        }
    
        if ($created) {
            if (!($locales = Configure::read('Config.languages'))) {
                $locale = $this->_getLocale($model);
                $locales = array($locale => $locale);
            }
        } else {
            $locale = $this->_getLocale($model);
            $locales = array($locale => $locale);
        }
    
        foreach($locales as $locale => $localeName) {
            $tempData = $this->runtime[$model->alias]['beforeSave'];
            $conditions = array('model' => $model->alias, 'foreign_key' => $model->id);
            $RuntimeModel =& $this->translateModel($model);
    
            foreach ($tempData as $field => $value) {
                unset($conditions['content']);
                $conditions['field'] = $field;
                if (is_array($value)) {
                    $conditions['locale'] = array_keys($value);
                } else {
                    $conditions['locale'] = $locale;
                    if (is_array($locale)) {
                        $value = array($locale[0] => $value);
                    } else {
                        $value = array($locale => $value);
                    }
                }
                $translations = $RuntimeModel->find('list', array('conditions' => $conditions, 'fields' => array($RuntimeModel->alias . '.locale', $RuntimeModel->alias . '.id')));
                foreach ($value as $_locale => $_value) {
                    $RuntimeModel->create();
                    $conditions['locale'] = $_locale;
                    $conditions['content'] = $_value;
                    if (array_key_exists($_locale, $translations)) {
                        $RuntimeModel->save(array($RuntimeModel->alias => array_merge($conditions, array('id' => $translations[$_locale]))));
                    } else {
                        $RuntimeModel->save(array($RuntimeModel->alias => $conditions));
                    }
                }
            }
        }
        unset($this->runtime[$model->alias]['beforeSave']);
    }

I haven't tried it much yet, but I think it work alright. Please, let
me know if there's a better way to do it... or if you have troubles...



.. author:: arod
.. categories:: articles, snippets
.. tags:: i18n translation behavior,Snippets

