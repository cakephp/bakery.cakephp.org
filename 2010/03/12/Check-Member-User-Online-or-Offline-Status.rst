Check Member / User Online or Offline Status
============================================

The following piece of code will calculate the last visited time of a
Member/User and calulate the time difference with current time. And if
the Member/User last visited time is greater than 10 minutes then that
will be considered OFFLINE otherwise ONLINE.
I was just searching for a time difference code in Bakery but couldn't
find the simple code. I have developed and used the following code to
calculate the time whether the User/Member is online or offline.
Only 3 Steps to follow.
~~~~~~~~~~~~~~~~~~~~~~~

I am assuming that you have the table named MEMBER (you can customize
it according to your requirements)
1. Make a field last_visit (DATETIME) in MEMBER Table.

2. For APP CONTROLLER.


Component Class:
````````````````

::

    <?php
    class AppController extends Controller {
    		/*
    		*
    		* beforeRender() function will run on every visit of the website
    		*/
    		function beforeRender()
    		{
    			### UPDATE LAST VISIT ###
    			$online_offline_status = 0;
    			if ($this->Session->check('userId')==true){ // Checking for the SESSION - Proceed only if MEMBER/USER is logged in.
    				$this->loadModel('Member'); // Loading MEMBER Model

    				// UPDATE MEMBER VISIT TIME
    				$last_visit = date('Y-m-d H:i:s', time());
    				$this->Member->updateAll(array('Member.last_visit' => '"'.$last_visit.'"'), array('Member.id' => $this->Session->read('userId')));

    				// GET TIME DIFFERENCE
    				$member_last_visit = $this->Member->find('first', array('conditions' => array('Member.id' => $this->Session->read('userId'))));
    				$current_time = strtotime(date("Y-m-d H:i:s")); // CURRENT TIME
    				$last_visit = strtotime($member_last_visit['Member']['last_visit']); // LAST VISITED TIME

    				$time_period = floor(round(abs($current_time - $last_visit)/60,2)); //CALCULATING MINUTES

    				//IF YOU WANT TO CALCULATE DAYS THEN USER THIS
    				//$time_period = floor(round(abs($current_time - $last_visit)/60,2)/1440);

    				echo $time_period;
    				if ($time_period <= 10){
    					$online_offline_status = 1; // Means User is ONLINE
    				} else {
    					$online_offline_status = 0; // Means User is OFFLINE
    				}
    			}
    			$this->set('online_offline_status', $online_offline_status);

    			}//end beforeRender()

    }
    ?>

3. Simply use the following code in your .ctp file according to your
demand.


View Template:
``````````````

::


    <!-- IF USER IS OFFLINE -->
    <?php if ($online_offline_status == 0){ ?>
      <span style="color:#FF0000;">(Member/User is Offline)</span>

    <!-- IF USER IS OFFLINE -->
    <?php } else if ($online_offline_status == 1) {?>
      <span style="color:#669900;">(Member/User is Online)</span>
    <?php }?>



.. author:: imran7000
.. categories:: articles, general_interest
.. tags:: user,online,offline,online user status,offline user status,General Interest

