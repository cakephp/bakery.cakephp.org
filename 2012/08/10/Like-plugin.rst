Like plugin
===========

Add a Facebook-like 'Like' feature to your CakePHP 2.x powered web
application.


Installation
~~~~~~~~~~~~

1. Download the plugin and place it in app/Plugin

`https://github.com/aschelch/cakephp-like-plugin/zipball/master`_

or via Git

::

    
        git submodule add git://github.com/aschelch/cakephp-like-plugin.git app/Plugin/Like


2. Load the plugin by adding at the bottom of your file
Config/bootstrap.php

::

    
        CakePlugin::load('Like', array('routes' => true));


3. Create the table using the shell command :

::

    
        Console/cake Like.install


4. Attach the Likeable behavior to the Model

::

    
        public Post extends AppModel{
            $actsAs = array('Like.Likeable');
        }


That's all !


Usage
~~~~~


In the controller
`````````````````

Then to use it in your controller, you can do :

Like an item

::

    $this->Post->like($post_id, $this->Auth->user('id'));


Dislike an item

::

    $this->Post->dislike($post_id, $this->Auth->user('id'));


Find all items liked by an user

::

    $this->Post->findLikedBy($this->Auth->user('id'));


Test if an user like an item

::

    if($this->Post->isLikedBy($post_id, $this->Auth->user('id'))){...}


Find the most liked item

::

    $this->Post->find('most_liked', array('limit'=>5));



In the view
```````````

Add the helper in your controller :

::

    
        public PostController extends AppController{
            public $helpers = array('Like.Like');
        }


And, in your view:

::

    
        $this->Like->like('post', $post_id);
        $this->Like->dislike('post', $post_id);



.. _https://github.com/aschelch/cakephp-like-plugin/zipball/master: https://github.com/aschelch/cakephp-like-plugin/zipball/master

.. author:: aschelch
.. categories:: articles, plugins
.. tags:: like,cakephp2,Plugins

