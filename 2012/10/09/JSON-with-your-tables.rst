JSON with your tables
=====================

Be able to easily save and retrieve PHP arrays to/from a database's
column
Have you ever needed to save a PHP array into your database? Well,
this behavior is for that. You won't have to worry about encoding
(when saving) and decoding (when retrieving) your data.

Behavior code below.

How to use in your model:

::

    <?php
    class Recipe extends AppModel{
    
        public $actsAs = array(
            'JsonColumn' => array(
                'fields' => array('additional_info') /** add the fields you wanna encode here **/
            )
        );
    ?>

That's it! Now when you save/retrieve data the magic will happens:

::

    <?php class RecipesController extends AppController {
        public function save(){
             // add some fake data here. This could come from a submit/form, for instance
             $this->request->data('Recipe.additional_info', array('flavor' => 'strawberries', 'type' => 'cake'));
             $this->Recipe->save($this->request->data);
        }
    }
    

This will save the following json data into the "additional_info"
column:

::

    {"flavor":"strawberries","type":"cake"}

And the following:

::

    $this->Recipe->findById(1);

Will result in:

::

    Array
    (
        [Recipe] => Array
            (
                [id] => 1
                [additional_info] => Array
                    (
                        [flavor] => strawberries
                        [type] => cake
                    )
    
                 ...
                [created] => 2012-10-09 16:46:11
                [updated] => 2012-10-09 16:46:11
            )
    
    )

JsonColumnBehavior.php

::

    <?php
    /**
     * Be able to easily save and retrieve PHP arrays to/from a database's column
     *
     * @author Lucas Pelegrino <lucas.wxp@gmail.com>
     */
    class JsonColumnBehavior extends ModelBehavior {
    /**
     * The default options for the behavior
     *
     * @var array
     * @access public
     */
    	public $settings = array(
            'fields' => array()
    	);
    
    /**
     * Setup the behavior.
     *
     * @param object $model Reference to model
     * @param array $settings Settings
     * @return void
     * @access public
     */
    	public function setup(Model $model, $settings) {
            $this->settings = array_merge($this->settings, $settings);
    	}
    
    /**
     *
     * @param object $model Reference to model
     * @access public
     */
    	public function beforeSave(Model $model) {
            foreach($this->settings['fields'] as $field){
                if(isset($model->data[$model->alias][$field]))
                    $model->data[$model->alias][$field] = $this->_encode($model->data[$model->alias][$field]);
            }
    		return true;
    	}
    
    
    /**
     *
     * @param object $model Reference to model
     * @access public
     */
        public function afterFind(Model $model, $results) {
            foreach($results as $i => &$res){
                foreach($this->settings['fields'] as $field){
                    if(isset($res[$model->alias][$field]))
                        $res[$model->alias][$field] = $this->_decode($res[$model->alias][$field]);
                }
            }
            return $results;
        }
    
    /**
     * Encode json
     *
     * @param $data
     * @return mixed
     */
        protected function _encode($data){
            return json_encode($data);
        }
    
    /**
     * Decode json
     *
     * @param $data
     * @return mixed
     */
        protected function _decode($data){
            $decode = json_decode($data);
            return is_object($decode) ? (array)$decode : $decode;
        }
    }
    ?>


Have fun!


.. author:: lucaswxp
.. categories:: articles, models
.. tags:: behavior,json,encode,decode,column,Models

