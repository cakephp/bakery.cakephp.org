Autocache Behavior for automaticly caching model queries
========================================================

AutocacheBehavior is a CakePHP 2x Behavior that makes query caching as
easy as adding a 'cache'=>true condition to your find statement.
**
Catch the easier to use (and better) CakephpAutocachePlugin from
Github here:-`https://github.com/ndejong/CakephpAutocachePlugin`_
**
You really just need two files, Model/Behavior/AutocacheBehavior.php
and Model/Datasource/DummySource.php

**Q: How do I use it?**
(Step 1) - copy/symlink into place
Model/Behavior/AutocacheBehavior.php
(Step 2) - copy/symlink into place Model/Datasource/DummySource.php
(Step 3) - add the $dummy datasource to Config/database.php like
this:-

::

    public $dummy = array('datasource' => 'DummySource');

(Step 4) - define at least one cache configuration to use in core.php
or bootstrap.php, call your first one 'default' like this:-

::

    Cache::config('default', array('engine' => 'File'));

(Step 5) - Tell your model(s) they $actsAs Autocache by adding this:-

::

    public $actsAs = array('Autocache');

(Step 6) - add a 'cache' condition to your find query
(Step 7) - drink a beer, 'cause that was easy!

**Q: Do you have any examples?**
A: Yep, take a look at exampleApp in the download (or GitHub) go ahead
and install it, give it a spin!

**Q: What are my options for attaching this Behavior to my models?**
A: Just like any other Behavior you can use the following approaches
- Attach through the controller with something that looks like this:-

::

    $this->ModelName->Behaviors->attach('Autocache');

- Attach through the Model by declaring the $actsAs attribute like this::

    public $actsAs = array('Autocache');

- Check out your other options here because there are others:
  http://book.cakephp.org/2.0/en/models/behaviors.html

**Q: What Autocache Behavior settings exist?**
A: There are just three, they are:

- default_cache << defines the default cache configuration name to use
when a find query contains a 'cache' condition without an explicit
cache configuration name. By default the name is 'default'

- check_cache << tells Autocache to check if the cache configuration
name that is about to be used has actually been defined, this helps to
prevent silly mistakes. By default this is set true

- dummy_datasource << defines the dummy datastore name that needs to
be defined in your database.php file. By default it's named 'dummy'

**Q: What are the find query condition cache parameters available?**
A: There are three in total, they are in the form::

    - $conditions = array('cache'=>true)
    - $conditions = array('cache'=>'default')
    - $conditions = array('cache'=>array('config'=>'default'))
    - $conditions = array('cache'=>array('name'=>'some_name'))
    - $conditions = array('cache'=>array('flush'=>true))

The first three are essentially the same thing expressed differently

**Q: How does Autocache name cached data?**
A: Take a look at _generateCacheName() the crux of the matter is that
we take the all query parameters, serialize them and take a hash of
the result thus ensuring a useful unique name per query - yes, there
is overhead in doing this but it's still less than doing a database
query!

**Q: What's DummySource all about?**
A: In order to prevent the CakePHP Model class from making a full
request to the database when we have a cached result we need a way to
quickly cause the find() query to return with nothing so we can re-
inject the result in the afterFind() callback - it's unfortunate this
behavior requires more than one .php file, but that's the way it is -
still much tider than the previous approach that involved
cutting'n'pasting code into the AppModel.

**Q: What's the history?**
A: AutocacheBehavior is an improvement on "Automatic model data
caching for CakePHP" that I wrote a while back which itself borrowed
from "jamienay"
http://www.nicholasdejong.com/story/automatic-model-data-caching-cakephp
https://github.com/jamienay/automatic_query_caching

Head over to GitHub here:
`https://github.com/ndejong/CakephpAutocacheBehavior`_
First published here:
`http://www.nicholasdejong.com/story/cakephp-autocache-behavior`_

.. _http://www.nicholasdejong.com/story/cakephp-autocache-behavior: http://www.nicholasdejong.com/story/cakephp-autocache-behavior
.. _https://github.com/ndejong/CakephpAutocacheBehavior: https://github.com/ndejong/CakephpAutocacheBehavior
.. _https://github.com/ndejong/CakephpAutocachePlugin: https://github.com/ndejong/CakephpAutocachePlugin

.. author:: ndejong
.. categories:: articles, behaviors
.. tags:: behavior,cache,query,autocache,Behaviors

