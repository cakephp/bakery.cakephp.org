Lightweight array dot notation
==============================

I've made some functions to speedup the work with arrays in dotted
notation.

First of all: i'm spanish, so excuse syntax/errors (thanks you).

I think the Cakephp Set class does a great job, but it's slow if you
need to use it into many iterations.

For simple dotted access to arrays here you have a set of functions
that works and do it fast (more than 10x faster than Cakephp according
to my tests).

The functions are so simple, only works with simple dotted notation,
for example 'Customers.1.name', or 'My.verylong.path.variable', but
not with 'Customers.{n}.name', or xpath, the huge amount of
functionality that Set class have may stay in Set class. My functions
are for some concrete situations.

I hope the code helps the cakephp comunity.


Functions and usage:
====================

::

    // Note that the array is passed by reference.
    dget(&$arr, $path); // returns the value or null if not exists
    // Example:
    $a = array('Customers' => array(1 => array('name' => 'john')));
    echo dget($a, 'Customers.1.name'); // prints 'john'
    
    dset(&$arr, $path, $val); // set the value into the path
    // Example:
    $a = array();
    dset($a, 'Customers.1.name', 'john');
    print_r($a); // give array('Customers' => array(1 => array('name' => 'john')));    
    
    dcount(&$arr, $path); // returns the number of items (if any) null otherwise    
    // Example:
    $a = array('Fruits' => array('pear', 'orange', 'lemon', 'watermelon'));
    echo dcount($a, 'Fruits'); // return 4
    
    ddel(&$arr, $path); // removes the item in the path if exists
    // Example:
    $a = array('Customers' => array(1 => array('name' => 'john', 'email' => 'john@example.com')));
    ddel($a, 'Customers.1.email'); // now the email key is deleted.

I preferred to use functions instead of a static class for speed, but
you can easily to put the functions into a class and turn them static
(and rename them to get, set, count and del).

With the pattern of these functions, some more can (and should) be
created.


How fast are the functions
==========================

::

    // with: 
    $array = array('key1' => array('key2' => array('key3' => 8)));
    // The native way: 
    echo $array['key1']['key2']['key3']; 
    // => 1x
    // With dget(): 
    echo dget($array, 'key1.key2.key3'); 
    // => 12x times slower
    // With cakephp set::classicExtract
    $array = Set::classicExtract($array, 'key1.key2.key3'); 
    // => more than 100x times slower



The code
========

+ Nasty with tests: `http://pastebin.com/WpLUSfmc`_
+ Only the functions: `http://pastebin.com/6qefQjMP`_
+ Update: Now i have created a github repository with a static class
  check it at:
  `https://github.com/adael/Fset/blob/master/libs/fset.php`_

Please, comment for (more than possible) bugs, or improvements. I hope
this code helps cakephp comunity. Greetings.


.. _https://github.com/adael/Fset/blob/master/libs/fset.php: https://github.com/adael/Fset/blob/master/libs/fset.php
.. _http://pastebin.com/WpLUSfmc: http://pastebin.com/WpLUSfmc
.. _http://pastebin.com/6qefQjMP: http://pastebin.com/6qefQjMP

.. author:: adael
.. categories:: articles
.. tags:: array set functions,Articles

