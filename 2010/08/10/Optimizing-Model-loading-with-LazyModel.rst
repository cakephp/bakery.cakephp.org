Optimizing Model loading with LazyModel
=======================================

If you are running PHP5, this is what you need. This LazyModel
optimizes the loading of the models. It limits the number of loaded
models to only the ones that are actually used. When using this, you
can improve speed and decrease memory usage significantly. You should
use LazyModel in every project you build. That said, it is easy to see
this as so called â€˜premature optimizationâ€™ and maybe it is, but
adding this to your project will only take like 10 seconds and it will
pay off most of the time.


Background
~~~~~~~~~~
To be honest, this wasnâ€™t my idea at all. At first the idea showed
up as a bin by JosÃ© Lorenzo RodrÃ­guez
(`http://bin.cakephp.org/saved/39855/`_). Then Matt Curry picked it up
and improved it (`http://github.com/mcurry/lazy_loader`_). Next JosÃ©
Lorenzo RodrÃ­guez forked it and improved it even more
(`http://github.com/lorenzo/lazy_loader`_). I think that got a bit out
of hand there (no offence) and that is why I started a new project
that uses a slightly different approach.


Features
~~~~~~~~

+ Fully compatible with CakePHP 1.2 and 1.3 (all model core tests
  pass).
+ Works on PHP 5.2 and 5.3.
+ Only loads models when they are needed.
+ Works fine with Containable, OneQuery and probably every other
  behavior out there.



How it works
~~~~~~~~~~~~
By default CakePHP will load every model that you have following the
associations. This is far from efficient when you only want to use one
or two models. This is an example of a few associated models,
represented as a model chain:

Then take for example the next statement:

::

    <?php
    $this->Doutzen->find('all', array(
    	'fields' => array('Doutzen.phone'),
    	'contain' => array('Marissa' => 'Heidi')
    ));
    ?>

What we want is to only load and use the Doutzen, Marissa and Heidi
model. However in reality it loads all models in the model chain
walking down the associations. This LazyModel actually limits the
models that are loaded to the ones that are actually used , like this:

You can imagine this will speed your website up a bit and save some
memory at the same time. It is basically a win-win situation here and
you are a fool when you leave this awesome PHP5 feature alone
(LazyModel uses __set() and __isset() magic methods which are
introduced in PHP5).


Benchmarks
~~~~~~~~~~
People want benchmarks or let's call it proof. In my opinion
benchmarking this is pretty useless. If you are wondering why, Iâ€™ll
explain it for you. The speed increase or memory decrease all depends
on your application and the page you are calling. The more models and
associations you have and the less you use them, the bigger the impact
of LazyModel will be.

Here is a benchmark with a page that improved quite a bit with this
model. It is the front page of a project with +/- 25 models.


Without LazyModel
`````````````````

::


    Welcome to CakePHP v1.3.3 Console
    ---------------------------------------------------------------
    App : app
    Path: /var/www/hosts/test/app
    ---------------------------------------------------------------
    -> Testing http://test.home.frankdegraaf.net

    Total Requests made: 100
    Total Time elapsed: 6.8480186462402 (seconds)

    Requests/Second: 14.603 req/sec
    Average request time: 0.068 seconds
    Standard deviation of average request time: 0.002
    Longest/shortest request: 0.078 sec/0.066 sec

    Memory usage: 9.75MB



With LazyModel
``````````````

::

    Welcome to CakePHP v1.3.3 Console
    ---------------------------------------------------------------
    App : app
    Path: /var/www/hosts/test/app
    ---------------------------------------------------------------
    -> Testing http://test.home.frankdegraaf.net

    Total Requests made: 100
    Total Time elapsed: 4.8957378864288 (seconds)

    Requests/Second: 20.426 req/sec
    Average request time: 0.049 seconds
    Standard deviation of average request time: 0.001
    Longest/shortest request: 0.056 sec/0.048 sec

    Memory usage: 7.25MB

You can see how the speed of the site went up 40% (+5.823
requests/second) and the memory usage dropped 26% (-2.5MB). This is a
pretty good result. However this will not guarantee anything for your
site and that is why it is a useless benchmark. If you have three
models, it might improve a millisecond, but that will be as good as it
gets. So again, the bigger your application, the higher the impact.

P.S. I put the memory usage there myself, it wasnâ€™t part of that
particular benchmark, but the direct output of
memory_get_usage(true);.


Other details
~~~~~~~~~~~~~
The code can be found at my GitHub repository:

`http://github.com/phally/lazy_model/`_

There I have explained how simple it is to make it work (takes like 10
seconds) and explained some design decisions I have made. Please read
the Q for any questions that may come up.

Phally

.. _http://github.com/mcurry/lazy_loader: http://github.com/mcurry/lazy_loader
.. _http://github.com/lorenzo/lazy_loader: http://github.com/lorenzo/lazy_loader
.. _http://github.com/phally/lazy_model/: http://github.com/phally/lazy_model/
.. _http://bin.cakephp.org/saved/39855/: http://bin.cakephp.org/saved/39855/

.. author:: Frank
.. categories:: articles, models
.. tags:: model,associations,loading,phally,lazy,lazy loading,lazymodel,Models

