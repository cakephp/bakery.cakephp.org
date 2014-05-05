Key/Value storage table behavior built with cakephp-2.0.0 RC1
=============================================================

This is a model behavior that will allow you to easily work with
tables that are structured to be key/value storage tables.

Download this behavior here:

`https://github.com/mdunham/KeyValue-Behavior`_



I had a table called measurements and it contains five fields:

+ id
+ user_id
+ key
+ value
+ created

I wanted to store a flexible amount of data, and I wanted to do it
easily. So I created this KeyValue behavior which allows me to build
the form this is what my add.ctp looks like:

::

    <?php
        echo $this->Form->create('Measurement');
        echo $this->Form->input('weight');
        echo $this->Form->input('hips');
        echo $this->Form->input('waist');
        echo $this->Form->end();
    ?>

I could add an unlimited amount of custom fields just by adding more
echo $this->Form->input('waist'). Here is what my
MeasurementsController's add() method looks like:

::

    <?php
        public function add() {
            if ($this->request->is('post')) {
                $this->Measurement->create();
                $this->request->data['Measurement']['user_id'] = $this->Auth->user('id');
                if ($this->Measurement->save($this->request->data)) {
                    $this->Session->setFlash(__('The measurement has been saved'));
                    $this->redirect(array('action' => 'index'));
                } else {
                    $this->Session->setFlash(__('The measurement could not be saved. Please, try again.'));
                }
            }
            $users = $this->Measurement->User->find('list');
            $this->set(compact('users'));
        }
    ?>

Validation still works so you setup your model as such:

::

    <?php
    
    /**
     * Measurement Model
     *
     * @property User $User
     */
    class Measurement extends AppModel {
    
        /**
         * Tell this model how to behave
         * 
         * @var array 
         */
        public $actsAs = array('KeyValue');
    
        /**
         * Validation rules
         *
         * @var array
         */
        public $validate = array(
            'user_id' => array(
                'numeric' => array(
                    'rule' => array('numeric'),
                    'message' => 'You must select a user'
                )
            ),
            'weight' => array(
                'numeric' => array(
                    'rule' => array('numeric'),
                    'message' => 'You must enter your weight'
                )
            ),
            'waist' => array(
                'numeric' => array(
                    'rule' => array('numeric'),
                    'message' => 'You must enter your waist size'
                )
            ),
        );
    
        /**
         * belongsTo associations
         *
         * @var array
         */
        public $belongsTo = array(
            'User' => array(
                'className' => 'User',
                'foreignKey' => 'user_id',
                'conditions' => '',
                'fields' => '',
                'order' => ''
            )
        );
    }

The important thing is to remember to set $actsAs to include KeyValue.
You can change the fields and even tell it that the keys should be
unique. Here is how you can configure it:

::

    <?php
    
        /**
         * Options:
         *  - uniqueKeys: If this is true it run a deleteAll on the data to save minus the value
         *  - fields: This is a single array that lets us know what field to use for the key and for the value
         */
        public $actsAs = array(
            'KeyValue' => array(
                'uniqueKeys' => true,
                'fields' => array(
                    'key' => 'type',
                    'value' => 'value'
                )
            )
        );
    ?>

From there you just do a normal save() to your model and it will
create the records needed.


.. _https://github.com/mdunham/KeyValue-Behavior: https://github.com/mdunham/KeyValue-Behavior

.. author:: mdunham918
.. categories:: articles, behaviors
.. tags:: model,behavior,storage behavior,keyvalue,Behaviors

