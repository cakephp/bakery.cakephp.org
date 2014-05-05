Model Repletion
===============

Take a quick look at some of the common model related issues that
affect many users in #cakephp, and potential solutions to keep your
controllers skinny, and fatten up your models.

The mantra "Fat models, skinny controllers" , seems to have been lost
on the latest wave of CakePHP users in #cakephp
irc://irc.freenode.org/#cakephp. This article will discuss a few ideas
that can be used to fatten up your models.


+ Model Validation & Callbacks
+ Custom Find Methods
+ Pagination of custom find methods, and
+ AppModel Instances


Model Validation & Callbacks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The first subject I like to touch on is model validation. In one
discussion in channel, a user showed a pastebin of a controller where
he would check the balance of user credits, before processing a
transaction that required the user to have enough credits for the
transaction. After saving the transaction, the user's balance is
updated. This code looked something like this:


Controller Class:
`````````````````

::

    <?php
    class TransactionsController extends AppController {
    	public function add() {
    		if (!empty($this->data)) {
    			// fetch user account
    			$user_id=$this->data['User']['id'];
    			$user = $this->Transaction->User->read(null, $user_id);

    			$amount=$this->data['Transaction']['amount'];
    			if($user['User']['balance'] < $amount) {
    				$this->Session->setFlash("You don't have enough credits");
    				$this->redirect('/');
    			}

    			// other checks

    			$this->Transaction->create($this->data);
    			if ($this->Transaction->save()){
    				$this->User->updateAll(
    					array('User.balance' => "User.balance - {$amount}"),
    					array('User.id' => $this->data[$this->alias]['user_id']));
    				$this->Session->setFlash('Saved and balance updated');
    			} else {
    				$this->Session->setFlash('Transaction failed');
    			}
    		}
    	}
    }
    ?>

This goes against the "Fat models, skinny controllers" mantra. I would
recommend doing this within the model as a validation rule, and handle
updating the user's balance in the afterSave() callback. Similar to
this:


Model Class:
````````````

::

    <?php
    class Transaction extends AppModel {
    	public $belongsTo = array('User');
    	public $validate = array(
    		'amount' => array(
    			'rule' => array('balanceCheck'),
    			'message' => "You don't have enough credits",
    			),
    		// other rules excluded for brevity
    		);
    	public function balanceCheck() {
    		$this->User->id = $this->data[$this->alias]['user_id'];
    		$user = $this->User->read();

    		$amount = $this->data[$this->alias]['amount'];
    		if ($user && $amount < $user['User']['balance']) {
    			return true;
    		}
    		return false;
    	}
    	public function afterSave() {
    		$amount=$this->data[$this->alias]['amount'];
    		$this->User->updateAll(
    			array(
    				'User.balance' => "User.balance - {$amount}"
    				),
    			array(
    				'User.id' => $this->data[$this->alias]['user_id']
    				)
    			);
    	}
    }
    ?>

This method gives you a skinny controller that simply calls the models
save() method.


Controller Class:
`````````````````

::

    <?php
    class TransactionsController extends AppController {
    	public function add() {
    		if (!empty($this->data)) {
    			$this->Transaction->create($this->data);
    			if ($this->Transaction->save()) {
    				$this->Session->setFlash('Saved and balance updated');
    				$this->redirect('/');
    			} else {
    				$this->Session->setFlash('Transaction failed');
    			}
    	}
    }
    ?>


Custom Find Methods
~~~~~~~~~~~~~~~~~~~

Often in channel I encounter developers who write a majority of their
code in their controllers. One thing you will see a lot is the setup
for a call to find, where the developer specifies fields, conditions,
joins, and more all within an action. Inevitably, this code will be
cut and pasted into multiple actions. It looks something like this:


Controller Class:
`````````````````

::

    <?php
    class TransactionsController extends AppController {
    	public function index() {
    		$position = ClassRegistry::init('Zipcode')->read(null,$this->params['named']['zipcode'];

    		$distance='( 3959 * acos( cos( radians("'.$position['Zipcode']['latitude'].'") ) * cos( radians( Location.latitude ) ) * cos( radians( Location.longitude ) - radians("'.$position['Zipcode']['longitude'].'") ) + sin( radians("'.$position['Zipcode']['latitude'].'") ) * sin( radians( Location.latitude) ) ) ) AS distance';

    		$options['fields'] = array('*',$distance);
    		$options['conditions'][] = array('Deal.id != 0');
    		$options['link'] = array('Location');
    		$options['contain'] = array('DealOption','Restaurant'=>array('Upload'));
    		$options['order'] = array('distance');
    		$options['group'] = array('Deal.id');

    		$results = $this->Location->find("all", $options);

    		$this->set(compact('results));
    	}
    }
    ?>

Wow! That's not a skinny controller, is it? Creating a custom find
method within the model to handle this is fairly simple. There are
quite a few articles on adding custom finds online, however most of
them seem to concentrate on the CakePHP v1.1/1.2 style of overriding
the find() method, to handle dispatching to the new find method.

With CakePHP v1.3, you can simply add your method to the models
$_findMethods list and define your method. Here's the above example
moved to the model.


Model Class:
````````````

::

    <?php
    class Transaction extends AppModel {
    	public $actsAs = array('Containable', 'Linkable');

    	public $_findMethods = array('zipcode' => true);

    	public function _findZipcode($state, $query, $results=array()) {
    		if ($state == "before") {
    			$position = $this->__getPosition($query['zipcode']);
    			if ($position) {
    				$query = $this->__zipcodeQuery($position, $query);
    				return $query;
    			} else {
    				return false;
    			}
    		} else {
    			return $results;
    		}
    	}
    	private function __getPosition($zipcode) {
    		return ClassRegistry::init('Zipcode')->read(null, $zipcode);
    	}

    	private function __zipcodeQuery($position, $query) {
    		$distance='( 3959 * acos( cos( radians("'.$position['Zipcode']['latitude'].'") ) * cos( radians( Location.latitude ) ) * cos( radians( Location.longitude ) - radians("'.$position['Zipcode']['longitude'].'") ) + sin( radians("'.$position['Zipcode']['latitude'].'") ) * sin( radians( Location.latitude) ) ) ) AS distance';

    		$query['fields'] = array('*',$distance);
    		$query['conditions'][] = array('Deal.id != 0');
    		$query['link'] = array('Location');
    		$query['contain'] = array('DealOption','Restaurant'=>array('Upload'));
    		$query['order'] = array('distance');
    		$query['group'] = array('Deal.id');

    		return $query;
    	}
    }
    ?>

And now, the controller is fairly skinny:


Controller Class:
`````````````````

::

    <?php
    class TransactionsController extends AppController {
    	public function index() {
    		$results = $this->Transaction->find('zipcode', array('zipcode' => $this->params['named']['zipcode']));
    		$this->set(compact('results'));
    	}
    }
    ?>


Pagination of Custom Find Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that you've created your custom find method, you need to paginate
the results. This can be done by specifying the method name as the
first element of the controllers $paginate member. Continuing with our
example from the previous section:


Controller Class:
`````````````````

::

    <?php
    class TransactionsController extends AppController {
    	public function index() {
    		$this->paginate = array(
    			'zipcode',
    			'zipcode'=>$this->params['named']['zipcode'],
    			'limit'=>10,
    			);
    		$results = $this->paginate();
    	}
    }
    ?>

It almost seems too easy, doesn't it. The custom find will be used to
fetch the data.


AppModel Instances
~~~~~~~~~~~~~~~~~~

A very common issue in #cakephp involves AppModel instances of models.
If the table for a model exists in your database, and you don't
provide a model file for it, CakePHP will create an automatic model
(automodel). The automodel will be an instance of AppModel.

In the typical situation, the developer has a table in his database
table named transactions. He creates a file
app/models/tranactions.php, with validation rules, callbacks, and a
few custom methods. When the developer attempts to save a record, he
notices that the validation rules are ignored, or that a custom method
is not available.

In this case, the model is not being loaded. I hope many of you
noticed that the file name is not correct. The model file should be
app/models/transaction.php, singular. If you don't understand this
check the conventions in the CakePHP manual.

CakePHP generated an automodel for you, which will not contain your
validation rules, callbacks, and custom methods.

If you think you may have an issue with automodels, you can output the
object using debug(). If the object type is AppModel, instead of your
object type, you have an automodel. Review the file name, and the
class name; make sure the conform to the conventions or that you
override the appropriate portions.


Controller Class:
`````````````````

::

    <?php
    class TransactionsController extends AppController {
    	public function examine() {
    		debug(get_class($this->Transaction));
    	}
    }
    ?>



.. author:: tehtreag
.. categories:: articles, tutorials
.. tags:: find,validation,models,paginate,custom,controllers,callbacks,methods,tehtreag,Tutorials

