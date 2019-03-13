Multistep forms
===============

One of the features I really love about PHP frameworks is form
management. Coding forms in plain PHP can easily become a pain if not
well planned out. Multistep forms take this complexity even further,
especially when you care about user experience. In this tutorial
you'll be amazed by how much little code can manage a whole full
featured multistep form when taking advantage of CakePHP powerful
classes. We'll build the form in only 60 lines of controller code.
`Original article here, with better syntax highlighting`_.

The form will have the following features:

+ automagical data management
+ flexible steps control
+ back and forth buttons
+ progress indicator
+ data validation and error messages

For this demo we'll create a sort of social network style user
registration page with four steps and very few fields. We won't deal
with CSS styling since this is not the focus of this tutorial.
`Complete source is available for download`_.

Create model and table
----------------------
Run the following query to create our database table, where we are
going to store each submission data. Saving to multiple (related)
models is not a problem and should require very little adaption.

::

    CREATE TABLE `users` (
     `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
     `created` datetime DEFAULT NULL,
     `modified` datetime DEFAULT NULL,
     `username` varchar(99) DEFAULT NULL,
     `password` varchar(99) DEFAULT NULL,
     `first_name` varchar(99) DEFAULT NULL,
     `last_name` varchar(99) DEFAULT NULL,
     `mobile` varchar(20) DEFAULT NULL,
     `sex` varchar(6) DEFAULT NULL,
     `birthdate` date DEFAULT NULL,
     `city` varchar(99) DEFAULT NULL,
     `zip` varchar(5) DEFAULT NULL,
     `about` longtext,
     `interests` longtext,
     `job` longtext,
     PRIMARY KEY (`id`)
    )

Now let's create a basic User class with some validation rules at
Model/User.php:

::


    class User extends AppModel {
    	var $validate = array(
    		'username' => array(
    			'unique' => array(
    				'rule' => 'isUnique',
    				'message' => 'User already registered'
    			),
    			'email' => array(
    				'rule' => 'email',
    				'message' => 'Username must be a valid email address'
    			)
    		),
    		'password' => array(
    			'rule' => array('minLength', 6),
    			'message' => 'Minimum six characters please'
    		),
    		'first_name' => array(
    			'rule' => 'notEmpty',
    			'message' => 'required field'
    		),
    		'last_name' => array(
    			'rule' => 'notEmpty',
    			'message' => 'required field'
    		),
    		'mobile' => array(
    			'rule' => 'notEmpty',
    			'message' => 'required field'
    		),
    		'birthdate' => array(
    			'rule' => 'notEmpty',
    			'message' => 'required field'
    		),
    		'city' => array(
    			'rule' => 'notEmpty',
    			'message' => 'required field'
    		),
    		'zip' => array(
    			'numeric' => array(
    				'rule' => 'numeric',
    				'message' => 'zip code can contain only numeric values'
    			),
    			'lenght' => array(
    				'rule' => array('between', 5,5),
    				'message' => 'zip code must be 5 digits long'
    			)
    		)
    	);
    }



The controller
--------------
This is the really interesting part. Using this method, we will have a
single method managing write to session/database and validation of
every step . A specific view file for each step will be loaded by the
controller based on a parameter from the URL. The total number of
steps is dynamically calculated by counting the number of view files
that start with `"msf_step_"` (we will name msf_step_1.ctp and so on).
If you don't like this level of dynamicity you can just hardcode the
value in your controller's beforeFilter. Of course, we will also
implement a series of checks to prevent users playing with the URL ,
to arbitrarily skip the steps or load non existent views. Another time
saving feature of CakePHP is the ability to restore previously
submitted data to the same form with just a single command . In our
case, data is saved and retrieved, on each step, using Cake's Session
class. Ok, here is the code of Controller/UsersController.php.
Everything is explained in the comments!

::


    class UsersController extends AppController {

    	/**
    	 * use beforeRender to send session parameters to the layout view
    	 */
    	public function beforeRender() {
    		parent::beforeRender();
    		$params = $this->Session->read('form.params');
    		$this->set('params', $params);
    	}

    	/**
    	 * delete session values when going back to index
    	 * you may want to keep the session alive instead
    	 */
    	public function msf_index() {
    		$this->Session->delete('form');
    	}

    	/**
    	 * this method is executed before starting the form and retrieves one important parameter:
    	 * the form steps number
    	 * you can hardcode it, but in this example we are getting it by counting the number of files that start with msf_step_
    	 */
    	public function msf_setup() {
    		App::uses('Folder', 'Utility');
    		$usersViewFolder = new Folder(APP.'View'.DS.'Users');
    		$steps = count($usersViewFolder->find('msf_step_.*\.ctp'));
    		$this->Session->write('form.params.steps', $steps);
    		$this->Session->write('form.params.maxProgress', 0);
    		$this->redirect(array('action' => 'msf_step', 1));
    	}

    	/**
    	 * this is the core step handling method
    	 * it gets passed the desired step number, performs some checks to prevent smart users skipping steps
    	 * checks fields validation, and when succeding, it saves the array in a session, merging with previous results
    	 * if we are at last step, data is saved
    	 * when no form data is submitted (not a POST request) it sets this->request->data to the values stored in session
    	 */
    	public function msf_step($stepNumber) {

    		/**
    		 * check if a view file for this step exists, otherwise redirect to index
    		 */
    		if (!file_exists(APP.'View'.DS.'Users'.DS.'msf_step_'.$stepNumber.'.ctp')) {
    			$this->redirect('/users/msf_index');
    		}

    		/**
    		 * determines the max allowed step (the last completed + 1)
    		 * if choosen step is not allowed (URL manually changed) the user gets redirected
    		 * otherwise we store the current step value in the session
    		 */
    		$maxAllowed = $this->Session->read('form.params.maxProgress') + 1;
    		if ($stepNumber > $maxAllowed) {
    			$this->redirect('/users/msf_step/'.$maxAllowed);
    		} else {
    			$this->Session->write('form.params.currentStep', $stepNumber);
    		}

    		/**
    		 * check if some data has been submitted via POST
    		 * if not, sets the current data to the session data, to automatically populate previously saved fields
    		 */
    		if ($this->request->is('post')) {

    			/**
    			 * set passed data to the model, so we can validate against it without saving
    			 */
    			$this->User->set($this->request->data);

    			/**
    			 * if data validates we merge previous session data with submitted data, using CakePHP powerful Hash class (previously called Set)
    			 */
    			if ($this->User->validates()) {
    				$prevSessionData = $this->Session->read('form.data');
    				$currentSessionData = Hash::merge( (array) $prevSessionData, $this->request->data);

    				/**
    				 * if this is not the last step we replace session data with the new merged array
    				 * update the max progress value and redirect to the next step
    				 */
    				if ($stepNumber < $this->Session->read('form.params.steps')) {
    					$this->Session->write('form.data', $currentSessionData);
    					$this->Session->write('form.params.maxProgress', $stepNumber);
    					$this->redirect(array('action' => 'msf_step', $stepNumber+1));
    				} else {
    					/**
    					 * otherwise, this is the final step, so we have to save the data to the database
    					 */
    					$this->User->save($currentSessionData);
    					$this->Session->setFlash('Account created!');
    					$this->redirect('/users/msf_index');
    				}
    			}
    		} else {
    			$this->request->data = $this->Session->read('form.data');
    		}

    		/**
    		 * here we load the proper view file, depending on the stepNumber variable passed via GET
    		 */
    		$this->render('msf_step_'.$stepNumber);
    	}
    }



The views
---------
This is the easiest part. Here is the content of each step view.

::

    // View/Users/msf_step_1.ctp
    echo $this->Form->create('User');
    echo $this->Form->input('username');
    echo $this->Form->input('password');
    echo $this->Form->input('first_name');
    echo $this->Form->input('last_name');
    echo $this->Form->end('Next step');

    // View/Users/msf_step_2.ctp
    echo $this->Form->create('User');
    echo $this->Form->input('birthdate');
    echo $this->Form->input('sex');
    echo $this->Form->input('mobile');
    echo $this->Html->link('Previous step',
    	array('action' => 'msf_step', $params['currentStep'] -1),
    	array('class' => 'button')
    );
    echo $this->Form->end('Next step');

    // View/Users/msf_step_3.ctp
    echo $this->Form->create('User');
    echo $this->Form->input('city');
    echo $this->Form->input('zip');
    echo $this->Html->link('Previous step',
    	array('action' => 'msf_step', $params['currentStep'] -1),
    	array('class' => 'button')
    );
    echo $this->Form->end('Next step');


    // View/Users/msf_step_4.ctp
    echo $this->Form->create('User');
    echo $this->Form->input('about');
    echo $this->Form->input('interests');
    echo $this->Form->input('job');
    echo $this->Html->link('Previous step',
    	array('action' => 'msf_step', $params['currentStep'] -1),
    	array('class' => 'button')
    );
    echo $this->Form->end('Save');
    ?>

    // View/Users/msf_index.ctp
    echo $this->Html->link('Start form >', array('action' => 'msf_setup'));

A little bit of editing of the layout file is needed to display the
progress indicator, which also provides link functionality, allowing
to users to jump back and forth. Place this code in your layout file
where you want the progress indicator to appear.

::


    for ($i=1; $i <= $params['steps']; $i++) {
    	if ($i > $params['maxProgress'] + 1) {
    		echo 'Step '.$i.'';
    	} else {
    		$class = ($i == $params['currentStep']) ? 'active' : 'normal';
    		echo $this->Html->link('Step '.$i,
    			array('action' => 'msf_step', $i),
    			array('class' => $class)
    		);
    	}
    }

Some CSS styling is required to properly display the indicator, and
you can find my version in the zipped source.

Conclusion
----------
This is just an example of how much CakePHP can help you write less
and better code. I hope you liked it! Share your thoughts using the
comments below.

.. _Original article here, with better syntax highlighting: http://www.ergotaxio.net/2012/09/09/multistep-forms-in-cakephp/
.. _Complete source is available for download: http://www.ergotaxio.net/wp-content/uploads/2012/09/cake_multistep_forms.zip

.. author:: antoniomad
.. categories:: articles, tutorials
.. tags:: form,multistep,Tutorials

