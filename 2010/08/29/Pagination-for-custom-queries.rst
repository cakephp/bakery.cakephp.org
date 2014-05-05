Pagination for custom queries
=============================

I was doing a project, and needed to do a custom query to return a
certain set of data from the table. I needed to be able to paginate
those results, and using the "out of the box" or "base" pagination was
not going to be able to handle this. So I needed to use the power of
the paginator object, and set a custom query, using a custom model
object, and set the options for the views to build the links
appropriately.
In the process of creating an application for a client, (they wanted a
"lite" forum) I posted some of the steps on my blog, and thought I
should share this here, as I could not find this, or I just did not
put in the correct search terms.

This lite forum has two tables, Forums, and Posts; and ties in with
the Users table. All forums are contained in the Forums table, with
the topics and posts contained in the Posts controller. The models
have relationships between each other (user hasMany posts, forum has
many posts, posts belongs to User and Forum). I have all my actions in
the forums_controller.php, with a Uses("Forums", "Posts", "Users") in
the controller. I want to be able to paginate the posts of each
topics. But I will not be able to use base pagination.

Base pagination will just pull the entire model and its relationships.
Thus meaning, that if I were to do a base pagination, as the Bake
method does, it would list all entries in the Post table, including
posts marked as topics, posts that belong to other forums, etc.

Since a full customized pagination is not needed, I need to alter the
base pagination and call just those posts requested. To do this, there
are a few additions that need to be made to the forums_controller.php
file. Near the top where all the vars are called, I entered:

::


    var $paginate = array(
    	'Post'	=> array(
    		'limit'	=> 2,
    		'page'	=> 1,
    		'order'	=> array(
    			'Post.created'	=> 'asc')
    	)
    );

I set the model object for Post, limiting the results per page to 2
right now, so I can test the links in the view, (I will change that to
20 after testing), and setting a sort order. Now I will go to the
"viewtopics" action I created. ( viewtopic($forum = null, $topic =
null) ).

In the function, I am looking for 2 parameters. I need the forum_id
and the $topic_id to build correct queries, links, etc. Since this is
not just a base find('all', array(...), I need to set a conditions
variable to pass for the pagination.

::


    $cond = array('Post.parent_topic' => $topic);

The $topic variable is the "parent", or topic post. This variable will
tell the paginator to grab all of the posts where the parent_id ==
$topic. But I should also grab the "parent" (topic post) so I can
adjust the $cond var to be:

::


    $cond = array('OR' =>array('Post.parent_topic' => $topic, 'Post.post_id' => $topic));

This will find all posts for this topic, by using "WHERE
(`Post`.`parent_topic` = x) **OR** (`Post`.`post_id` = x)". Now I can
call the paginator. However, I am in the forums_controller, calling
for a Post object. I need to set the model object when I call the
paginator, and then set the conditions for the search.

::


    $this->set('posts', $this->paginate("Post", $cond));

This now searches for all the specific posts, and creates an array
with the results and ready to paginate in the view. Since this
function relies on 2 parameters from the URL, we will need to adjust
the links in the view as the links will not include those in the base
helper calls.

To view all the posts, I created a viewtopic action. To see the
requirements to build paginator helpers in the view, please follow the
documentation at `http://book.cakephp.org/view/164/pagination`_. This
basically sets up the total number of results, how many pages, and the
navigation for each page. At the top of my viewtopic.ctp page I have

View Template:
``````````````

::


    echo $paginator->counter(array(
    'format' => __('Page %page% of %pages%, showing %current% records out of %count% total, starting on record %start%, ending on %end%', true)
    ));

At the bottom of the view, I have the following:

View Template:
``````````````

::


    <div class="paging">
    	<?php echo $paginator->prev('<< '.__('Previous Page', true), array(), null, array('class'=>'disabled'));?>
     | 	<?php echo $paginator->numbers();?>
    	<?php echo $paginator->next(__('Next Page', true).' >>', array(), null, array('class'=>'disabled'));?>
    </div>

(Yours may differ slightly, and that is ok). This sets up the base
pagination view.

The code at the top is ok, as that is not going to have any problems.
However, the bottom navigation is a little broken, as I need it to
point to (for example): example.com/forums/viewtopic/x/y/page:2. But
it points to example.com/forums/viewtopic/page:2, which will create an
error because those needed parameters are not in the URL. The
paginator functions as listed above do not pass in the parameters, so
we need to add those in.

The Paginator API documentation has a list of the different functions
available. Using these, and viewing the actual code for those
functions is also very helpful. For the purpose of this, breaking down
those methods:
prev ($title= '<< Previous', $options=array(), $disabledTitle=null,
$disabledOptions=array())
numbers ($options=array())
next ($title= 'Next >>', $options=array(), $disabledTitle=null,
$disabledOptions=array())

The prev() and the next() functions have four parameters, the title
for the link, options to set, title when the link is disabled, and
options for the disabled pagination link. The numbers() function has
only one, which is the $options. This is the one we need to work on to
get the links working. However, the options requires a specific set of
keys, which can be found at the API source code. The one we are going
to focus on is, "$options['url'] - Url of the action".

To update and fix the code above to get the correct forum, and topic,
we need to alter the prev tag as follows:

::


    $paginator->prev('<< '.__('Previous Page', true), array('url' => $paginator->params['pass']), null, array('class'=>'disabled'));?>

Just so that it is more readable, here is each parameter:
'<< '.__('Previous Page', true)
------ This is the title parameter

array('url' => $paginator->params['pass'])
------ this is the options section I modified. It is passing in the
'url' key, then passing the params array from the $paginator object
(which hold any type of parameters from the link). So if there are 2
parameters like in this example, or 10, it will get all of those.
null
------ title link disabled, no change
array('class'=>'disabled')
------ disabled options link, which we kept at the same.

So by just copying and pasting the following:
array('url' => $paginator->params['pass']) in the prev, next and
numbers methods, it will paginate the results, and put in the correct
parameters in the link. So now, those links for prev, numbers, or next
will show something like this:
example.com/forums/viewtopic/x/y/page:2 (or /page:3, or /page:4
depending on which page you are on)

And just like that, the pagination is complete for a custom query
pagination of forum/posts results.

.. _http://book.cakephp.org/view/164/pagination: http://book.cakephp.org/view/164/pagination

.. author:: shird10
.. categories:: articles, tutorials
.. tags:: Tutorials

