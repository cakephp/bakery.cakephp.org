How to create a reusable element with ajax pagination
=====================================================

I've spent a week searching the web, reading (old) articles and
debugging code to figure out how to have a self-contained, reusable
ajax paginated element. The examples on the web about pagination work
fine BUT do not apply to elements which can be dropped in any view
with a simple $this->element('my/element'); I finally achieved the
expected results in an elegant manner, so I thought I should
contribute to CakePHP community with this tutorial. Comments are
welcome, as I am still a newbie at CakePHP (and PHP) - my background
is ASP.NET and C#. Any improvements on my Markdown syntax are also
welcome. If you like this article, click the **Thumbs Up** icon and
**rate it**!

::

    /* \app\controllers\category_controller.php - line 5 */
    var $paginate = array(
            'limit' => 5,
            'order' => array(
                    'Category.description' => 'asc'
            )
    );

4 I was facing is the following issue: since pagination is controller
specific, I could not create an element to list categories and use it
on the posts (or any other) controller.
When CakePHP starts processing a request to *posts* controller, it
creates an instance of the Paginator helper and puts in its helpers
array .

While rendering the view, a call to *$this->element()* is found and a
*requestAction()* to the *categories* controller is executed.

On our controller action, we call *$this->paginate()* and everything
should work fine, but it doesnt. We start getting warnings like this:

> Warning (2): array_merge() \[function.array-merge\]: > Argument #1
is not an array \[CORE\cake\libs\view\helpers\paginator.php, line
193\]

I figured the *Paginator* class is very dependant of controller
params->['paging'] array, which is defined when we call paginate() .

I know we have already called paginate() on our action, but remember
that the paginator will set data it needs on the current controller -
in this case, *categories*, called by *requestAction*.

So, when the view is being rendered, the controller is posts , and
*posts->Paginator* was not filled with data from *paginate()* call
inside categories . The missing item in *params* was paging .

The solution
------------

After figuring what was the problem, it was a snap to hack and test
solutions to isolate pagination in an element.

As you may have guessed already, you need a way to fill the original
controller's Paginator helper with the paging item that was set in the
element's requestAction() call.

Below you will find a detailed, step-by-step, beginner level how-to -
just like I'd love to find a week ago ;)


How-To
------
Lets start with a fresh CakePHP install, and MySQL as the database.
Please follow the Blog tutorial on CakePHP manual at
http://book.cakephp.org/view/219/Blog .

Database scripts
----------------
We need to add the categories table to the database, and fill it with
some eBay categories:

::

    CREATE  TABLE categories (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT ,
    description VARCHAR(45) NULL ,
    PRIMARY KEY (id) );
    
    INSERT INTO categories (description) VALUES ('Antiques');
    INSERT INTO categories (description) VALUES ('Art');
    INSERT INTO categories (description) VALUES ('Baby');
    INSERT INTO categories (description) VALUES ('Books');
    INSERT INTO categories (description) VALUES ('Business & Industrial');
    INSERT INTO categories (description) VALUES ('Cameras & Photo');
    INSERT INTO categories (description) VALUES ('Cell Phones & PDAs');
    INSERT INTO categories (description) VALUES ('Clothing, Shoes & Accessories');
    INSERT INTO categories (description) VALUES ('Coins & Paper Money');
    INSERT INTO categories (description) VALUES ('Collectibles');
    INSERT INTO categories (description) VALUES ('Computers & Networking');
    INSERT INTO categories (description) VALUES ('Crafts');
    INSERT INTO categories (description) VALUES ('Dolls & Bears');
    INSERT INTO categories (description) VALUES ('DVDs & Movies');
    INSERT INTO categories (description) VALUES ('eBay Motors');
    INSERT INTO categories (description) VALUES ('Electronics');



Bake FTW
--------
Please use *cake bake* to bake the Model, Controller and View for
*categories* table.
After doing that, access `http://localhost/blog/categories`_ (or your
host address) to check if everything is working fine.


Ajax Pagination
---------------
To add ajax pagination to our categories page, lets first create our
default layout by copying \cake\libs\view\layouts\default.ctp to
\app\views\layouts\default.ctp. Reserve it.
Add the $paginate var to your controller:
B0x1A1
Your page should be displaying 5 categories per page. The *gran
finale* here will be to add Ajax, which is (pardon the cheap joke)
*piece of cake*.

Add the RequestHandler component to your controller:

::

    /* \app\controllers\category_controller.php - line 12 */ 
    var $components = array('RequestHandler');

Now tell Paginator that we will be using ajax:

::

    /* \app\controllers\category_controller.php - line 18 */
    $this->helpers['Paginator'] = array('ajax' => 'Ajax');

Add the ajax loader animated gif of your choice. You can create one
for free in this amazing page: `http://ajaxload.info/`_ and save it on
\app\webroot\img\ajax-loader.gif

In your *layout.ctp*, add this on line 28:

::

    <!-- \app\views\layouts\default.ctp - line 28 -->
    <style type="text/css">
                div.disabled {
                        display: inline;
                        float: none;
                        clear: none;
                        color: #C0C0C0;
                }
        </style>

Add a link to latest jQuery library :

::

    /* \app\views\layouts\default.ctp - line 39 */
    echo $this->Html->script('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');

and your image right above <div id="content">

::

    <!-- \app\views\layouts\default.ctp - line 51 -->
    <div id="spinner" style="display: none; float: right;">
                <?php echo $html->image('ajax-loader.gif'); ?>
    </div>

now, lets edit your view to make the ajax pagination work:

::

    <!-- \app\views\categories\index.ctp - line 1 -->
    <?php
        $this->Paginator->options(array(
        'update' => '#content',
        'evalScripts' => true,
        'before' => $this->Js->get('#spinner')->effect('fadeIn', array('buffer' => false)),
        'complete' => $this->Js->get('#spinner')->effect('fadeOut', array('buffer' => false)),
    ));
    ?>

and on line 49 (after $this->Paginator->next)

::

    <!-- \app\views\categories\index.ctp - line 49 -->
    <?php echo $js->writeBuffer(); ?>

Allright! Your ajax paginator should be working fine now.


Encapsulating in an Element
---------------------------
Ok, here are the tweaks I did to allow me to create an element where
ajax pagination works anywhere in my site.
First of all, we need to create the element. its pretty simple: create
the new element file : \app\views\elements\categories\list.ctp

Now, lets cut line 1 to 52 from \app\views\categories\index.ctp and
paste them on our newly creted element file.

Add this at the beginning of the index.ctp:

::

    <div class="categories index">
    <?php echo $this->element('categories/list', array("updateId" => "categoriesList")); ?>
    </div>

First thing to notice here is the updateId data element we are passing
to the view. Ajax paginator samples on the web update your entire page
content (<div id="content">) and we dont want that. So we set updateId
to the id of the wrapper div for our element which we will update via
ajax.

On the controller, we need to create a new action, lets call it
listing :

::

    function listing() {
        // avoid problems when requestAction calls this function
        $this->autoRender = false;
    
        // tell the view which control id will be updated on next post
        if (!empty($this->passedArgs['updateId'])) {
            $this->set('updateId', $this->passedArgs['updateId']);
        }
    
        $this->Category->recursive = 0;
        $categories = $this->paginate();
        $this->set('categories', $categories);
        $this->helpers['Paginator'] = array('ajax' => 'Ajax');
    
        // if this is an ajax request, render the element
        if ($this->RequestHandler->isAjax()) {
            $this->render('/elements/categories/list');
            return;
        }
    
        if (isset($this->params['requested'])) {
            // set the correct params on the paging helper of the requesting controller (not this controller)
            return array('categories' => $categories, 'paging' => $this->params['paging']);
        } else {
            $this->render('/elements/categories/list');
        }
    }

The comments should be enough explanation to this one. Pay special
attention to where we send our *'paging' item* to the view .

Finally on list.ctp element, change the first php block with this code
(until the line before <h2>):

::

    <?php
    // if we dont have data, go get it with requestAction
    if (empty($categories)) {
        $data = $this->requestAction(array('controller' => 'categories', 'action' => 'listing'));
        $categories = $data['categories'];
        $this->Paginator->params['paging'] = $data['paging'];
    }
    
    $this->Paginator->options(array(
        'update' => '#'.$updateId,
        'evalScripts' => true,
        'before' => $this->Js->get('#spinner')->effect('fadeIn', array('buffer' => false)),
        'complete' => $this->Js->get('#spinner')->effect('fadeOut', array('buffer' => false)),
        'url' => array('controller' => 'categories', 'action' => 'listing', 'updateId' => $updateId),
    ));
    
    ?>
    <div id="<?php echo $updateId ?>">

Lots of things going on here: 1. We first check if we have data
($categories) and if we dont, we need to request it via
requestAction(); 2. We also add url to paginator options, which will
tell ajax to post to our new controller action. 3. We set our div id
that will be updated again by the next ajax request


Using the element
-----------------
Now lets use the categories element in the posts index view. Open
\app\views\posts\index.ctp and put the element declaration on line 5:

::

    <?php echo $this->element('categories/list', array("updateId" => "categoriesOnPostsPage")); ?>

On posts controller, you will have to add the following vars:

::

    var $components = array('RequestHandler');
    var $helpers = array('Paginator');

Go to your blog home and enjoy your element with ajax pagination.


Conclusion
----------
Removing code duplication is one of the top software design best
practices. Unfortunatelly, some *seasoned* engineers in small and big
companies around the world are unaware of the evils that code
duplication can bring to a project.
*"One of the things I've been trying to do is look for simpler rules
underpinning good or bad design. I think one of the most valuable
rules is avoid duplication. 'Once and only once' is the Extreme
Programming phrase." - Martin Fowler*

This article is an intention to improve your CakePHP application by
bringing elements (wich should be reusable by nature) to its natural
state, even with complex functionality such as ajax pagination.

I've included a zip file with the app folder plus the extra database
script. Thank you for reading and I really hope this tutorial help you
achieve your goals.

Luciano Bargmann


.. _http://localhost/blog/categories: http://localhost/blog/categories
.. _http://ajaxload.info/: http://ajaxload.info/

.. author:: lucianobargmann
.. categories:: articles, tutorials
.. tags:: pagination,AJAX,Element,reusable,Tutorials

