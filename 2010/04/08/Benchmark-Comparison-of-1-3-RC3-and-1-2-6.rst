Benchmark Comparison of 1.3 RC3 and 1.2.6
=========================================

CakePHP 1.3 has lots of new features. But we may worry about the cost
for addition of them. This article reports result of benchmarks that
we can compare the performance of 1.3 RC3 and 1.2.6.


Environment
```````````

+ OS Windows Vista 32bit Home Edition
+ PHP5.2.6

    + No APC

+ mysql Ver 14.14 Distrib 5.1.42, for Win32 (ia32)


Setup
`````

#. Download archives from
   `http://github.com/cakephp/cakephp1x/downloads`_
#. Extract them into following directory.

    + WEBROOT/cakebench/12 <= 1.2.6
    + WEBROOT/cakebench/13 <= 1.3 RC3

#. Rewriting config/core.php

    + Configure::write('debug', 0); // production mode
    + Rewrite Security.salt and Security.cipherSeed to proper value
    + Set Security.level to medium for both version.



Route:
``````

::

    <?php
    	Router::connect('/', array('controller' => 'bench', 'action' => 'index'));
    	Router::connect('/:action', array('controller' => 'bench'));
    ?>


Controller Class:
`````````````````

::

    <?php
    // controllers/bench_controller.php
    class BenchController extends AppController{
    	var $name = "Bench";
    	var $uses = array();

    	function index(){

    	}

    	function model(){
    		$this->loadModel('Event');
    		$this->helpers = array('Form');
    	}
    }
    ?>



Model Class:
````````````

::

    <?php
    // models/event.php
    class Event extends AppModel{
    	var $name = "Event";
    }
    ?>



View templates:
```````````````

layouts/default.ctp
+++++++++++++++++++

::

    <?php echo $content_for_layout ?>



bench/index.ctp
+++++++++++++++

::

    Hello World!!



bench/model.ctp
+++++++++++++++

::

    <?php
    echo $form->create('Event');
    echo $form->input('name');
    echo $form->end('submit');
    ?>



Comparison method
`````````````````
Use Apache Bench for the test with "-c 100 -n 1000" option.
Test the command for 10 times, then take the stuff that Request per
second(#/sec) is the largest for comparison.


Simple Hello World Application
``````````````````````````````

This tests "index" action of the controller.

1.2.6
`````
C:\apache\bin>ab -c 100 -n 1000 http://localhost/cakebench/12/
...(omitted)
Requests per second: 13.99 [#/sec] (mean)
Time per request: 7147.920 [ms] (mean)
Time per request: 71.479 [ms] (mean, across all concurrent requests)
...


1.3 RC3
```````
C:\apache\bin>ab -c 100 -n 1000 http://localhost/cakebench/13/
...
Requests per second: 13.97 [#/sec] (mean)
Time per request: 7160.400 [ms] (mean)
Time per request: 71.604 [ms] (mean, across all concurrent requests)
...
There was no significant difference.


Loading Model
`````````````

This tests "model" action of the controller.
Loading just one model and output very simple form with form helper.

1.2.6
`````
C:\apache\bin>ab -c 100 -n 1000 http://localhost/cakebench/12/model
...
Requests per second: 8.35 [#/sec] (mean)
Time per request: 11977.680 [ms] (mean)
Time per request: 119.777 [ms] (mean, across all concurrent requests)
...


1.3 RC3
```````
C:\apache\bin>ab -c 100 -n 1000 http://localhost/cakebench/13/model
...
Requests per second: 8.50 [#/sec] (mean)
Time per request: 11767.080 [ms] (mean)
Time per request: 117.671 [ms] (mean, across all concurrent requests)
...
1.3 RC3 is about 1.8% faster than 1.2.6.
This difference cannot be ignored.


Finally
```````

This benchmarks were done on very simple cases.
Also, CakePHP1.3 has lots of performance improvement that this
benchmarks does not test.

Fortunately, my friend reported his application is over 20% faster on
1.3 RC3 than on 1.2.6.
Could you do benchmarks when your application migrate 1.2.x to 1.3 ?

.. _http://github.com/cakephp/cakephp1x/downloads: http://github.com/cakephp/cakephp1x/downloads

.. author:: hiromi
.. categories:: articles, general_interest
.. tags:: benchmark,General Interest

